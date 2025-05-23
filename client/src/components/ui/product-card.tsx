import { formatPrice, Product } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    
    toast({
      title: "Produit ajouté au panier",
      description: `${product.name} a été ajouté au panier`,
    });
  };

  return (
    <Card className="bg-white dark:bg-dark rounded-lg card-shadow card-shadow-hover transition-shadow duration-300 overflow-hidden group h-full flex flex-col">
      <div className="relative pt-[56.25%] bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-poppins font-semibold text-lg text-gray-900 dark:text-white mb-1">{product.name}</h3>
        <p className="text-accent dark:text-accent text-xl font-bold mb-2">{formatPrice(product.price)}</p>
        <div className="space-y-1 mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">CPU:</span> {product.cpu}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">GPU:</span> {product.gpu}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">RAM:</span> {product.ram}GB
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Stockage:</span> {product.storage}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          className="flex-1" 
          variant="outline"
          onClick={() => onViewDetails(product)}
        >
          <Search className="h-4 w-4 mr-2" />
          Détails
        </Button>
        <Button 
          className="flex-1"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </CardFooter>
    </Card>
  );
}
