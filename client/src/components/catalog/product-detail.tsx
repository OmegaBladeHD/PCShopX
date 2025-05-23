import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice, Product } from "@/lib/utils";
import { X, ShoppingCart, CreditCard } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  relatedProducts: Product[];
}

export function ProductDetail({ product, isOpen, onClose, relatedProducts }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [_, navigate] = useLocation();
  
  if (!product) return null;
  
  const handleAchatImmediat = () => {
    // Stocker l'article dans le localStorage pour la page de checkout
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    };
    
    localStorage.setItem('checkout_item', JSON.stringify(cartItem));
    navigate('/checkout');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="absolute top-2 right-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="rounded-full"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image & Gallery */}
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden cursor-pointer">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto aspect-square object-cover"
                />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt={`${product.name} - vue alternative`} 
                  className="w-full h-auto aspect-square object-cover"
                />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Vue détaillée du produit" 
                  className="w-full h-auto aspect-square object-cover"
                />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Vue détaillée des ports" 
                  className="w-full h-auto aspect-square object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <DialogTitle className="text-2xl font-poppins font-bold text-gray-900 dark:text-white">
              {product.name}
            </DialogTitle>
            <p className="text-3xl text-accent font-bold mt-2">{formatPrice(product.price)}</p>
            
            <div className="mt-6">
              <h4 className="font-medium text-lg text-gray-900 dark:text-white mb-3">Caractéristiques</h4>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">Processeur</h5>
                    <p className="text-sm text-gray-900 dark:text-white">{product.cpu}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">Carte graphique</h5>
                    <p className="text-sm text-gray-900 dark:text-white">{product.gpu}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">Mémoire RAM</h5>
                    <p className="text-sm text-gray-900 dark:text-white">{product.ram} Go</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">Stockage</h5>
                    <p className="text-sm text-gray-900 dark:text-white">{product.storage}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">Poids</h5>
                    <p className="text-sm text-gray-900 dark:text-white">{product.weight || 'N/A'}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">Garantie</h5>
                    <p className="text-sm text-gray-900 dark:text-white">2 ans</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium text-lg text-gray-900 dark:text-white mb-3">Description</h4>
              <DialogDescription className="text-sm text-gray-600 dark:text-gray-300">
                {product.description}
              </DialogDescription>
            </div>
            
            {/* Quantity Selector */}
            <div className="mt-6">
              <h4 className="font-medium text-lg text-gray-900 dark:text-white mb-2">Quantité</h4>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            
            <DialogFooter className="mt-8 flex flex-col space-y-3">
              <Button 
                className="w-full" 
                onClick={handleAchatImmediat}
                size="lg"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Acheter maintenant - {formatPrice(product.price * quantity)}
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose} 
                className="w-full text-gray-700 dark:text-gray-300"
              >
                Retour au catalogue
              </Button>
            </DialogFooter>
          </div>
        </div>
        
        {/* Similar Products */}
        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Produits similaires</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <div 
                key={relatedProduct.id}
                className="bg-white dark:bg-dark-light rounded-lg shadow-sm overflow-hidden group cursor-pointer"
              >
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{relatedProduct.name}</h4>
                  <p className="text-sm font-bold text-accent">{formatPrice(relatedProduct.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
