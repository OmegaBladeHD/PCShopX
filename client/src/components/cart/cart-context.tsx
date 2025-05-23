import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '@/lib/utils';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { getUserCart, saveUserCart, mergeWithLocalCart, deleteUserCart } from '@/lib/cartService';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
}

const initialCartContext: CartContextType = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0
};

export const CartContext = createContext<CartContextType>(initialCartContext);

export function useCart() {
  return useContext(CartContext);
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartSyncing, setIsCartSyncing] = useState(false);
  const { user } = useFirebaseAuth();

  // Charger le panier au démarrage depuis localStorage ou Firestore
  useEffect(() => {
    const loadCart = async () => {
      setIsCartSyncing(true);
      try {
        // Récupérer d'abord le panier local
        const savedCart = localStorage.getItem('cart');
        let localCart: CartItem[] = [];
        
        if (savedCart) {
          try {
            localCart = JSON.parse(savedCart);
          } catch (e) {
            console.error('Erreur lors du chargement du panier local:', e);
            localStorage.removeItem('cart');
          }
        }

        // Si l'utilisateur est connecté, fusionner avec le panier Firestore
        if (user) {
          const firestoreCart = await getUserCart(user);
          
          if (firestoreCart) {
            // Fusion des paniers si l'utilisateur a un panier sur Firestore
            const mergedCart = await mergeWithLocalCart(user, localCart);
            setCart(mergedCart);
            
            // Sauvegarder le panier fusionné sur Firestore
            const totalPrice = mergedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await saveUserCart(user, mergedCart, totalPrice);
          } else if (localCart.length > 0) {
            // Si pas de panier sur Firestore mais un panier local existe, le sauvegarder
            setCart(localCart);
            const totalPrice = localCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await saveUserCart(user, localCart, totalPrice);
          }
        } else {
          // Si l'utilisateur n'est pas connecté, utiliser simplement le panier local
          setCart(localCart);
        }
      } catch (error) {
        console.error('Erreur lors de la synchronisation du panier:', error);
      } finally {
        setIsCartSyncing(false);
      }
    };

    loadCart();
  }, [user]);

  // Mettre à jour les totaux et sauvegarder le panier à chaque changement
  useEffect(() => {
    if (isCartSyncing) return; // Éviter les boucles de synchronisation
    
    // Calculer les totaux
    const items = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(items);
    
    const price = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalPrice(price);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Sauvegarder dans Firestore si l'utilisateur est connecté
    const syncToFirestore = async () => {
      if (user) {
        try {
          await saveUserCart(user, cart, price);
        } catch (error) {
          console.error('Erreur lors de la sauvegarde du panier sur Firestore:', error);
        }
      }
    };
    
    syncToFirestore();
  }, [cart, user, isCartSyncing]);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Si l'article existe déjà, augmenter sa quantité
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity } 
            : cartItem
        );
      } else {
        // Sinon, ajouter le nouvel article
        return [...prevCart, { ...item }];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = async () => {
    setCart([]);
    localStorage.removeItem('cart');
    
    // Si l'utilisateur est connecté, supprimer également le panier dans Firestore
    if (user) {
      try {
        await deleteUserCart(user);
      } catch (error) {
        console.error('Erreur lors de la suppression du panier sur Firestore:', error);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}