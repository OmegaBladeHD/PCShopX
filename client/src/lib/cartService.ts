import { 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc,
  collection,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { User } from 'firebase/auth';
import { CartItem } from './utils';

export interface CartData {
  items: CartItem[];
  lastUpdated: any; // firestore timestamp
  totalPrice: number;
}

// Récupérer le panier d'un utilisateur depuis Firestore
export async function getUserCart(user: User): Promise<CartData | null> {
  if (!user?.uid) return null;

  try {
    const cartDocRef = doc(db, 'carts', user.uid);
    const cartDoc = await getDoc(cartDocRef);

    if (cartDoc.exists()) {
      return cartDoc.data() as CartData;
    }
    
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    return null;
  }
}

// Sauvegarder le panier d'un utilisateur dans Firestore
export async function saveUserCart(user: User, cartItems: CartItem[], totalPrice: number): Promise<boolean> {
  if (!user?.uid) return false;

  try {
    const cartDocRef = doc(db, 'carts', user.uid);
    
    const cartData: CartData = {
      items: cartItems,
      lastUpdated: serverTimestamp(),
      totalPrice: totalPrice
    };
    
    await setDoc(cartDocRef, cartData);
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du panier:', error);
    return false;
  }
}

// Fusionner le panier local avec le panier stocké dans Firestore
export async function mergeWithLocalCart(user: User, localCart: CartItem[]): Promise<CartItem[]> {
  if (!user?.uid || !localCart.length) return localCart;

  try {
    const firestoreCart = await getUserCart(user);
    
    if (!firestoreCart) return localCart;
    
    // Fusionner les paniers en additionnant les quantités
    const mergedCart = [...localCart];
    
    firestoreCart.items.forEach(firestoreItem => {
      const existingItemIndex = mergedCart.findIndex(localItem => localItem.id === firestoreItem.id);
      
      if (existingItemIndex !== -1) {
        // Si l'article existe déjà dans le panier local, ajouter les quantités
        mergedCart[existingItemIndex].quantity += firestoreItem.quantity;
      } else {
        // Sinon, ajouter l'article du panier Firestore
        mergedCart.push(firestoreItem);
      }
    });
    
    return mergedCart;
  } catch (error) {
    console.error('Erreur lors de la fusion des paniers:', error);
    return localCart;
  }
}

// Supprimer le panier d'un utilisateur
export async function deleteUserCart(user: User): Promise<boolean> {
  if (!user?.uid) return false;

  try {
    const cartDocRef = doc(db, 'carts', user.uid);
    await deleteDoc(cartDocRef);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du panier:', error);
    return false;
  }
}