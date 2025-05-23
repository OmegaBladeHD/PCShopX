import { Button } from "@/components/ui/button";
import { PCConfiguration, formatPrice } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-context";

interface SummaryProps {
  config: PCConfiguration;
}

export function Summary({ config }: SummaryProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: Date.now(), // In a real app, this would be a unique configuration ID
      name: "PC Personnalisé",
      price: config.totalPrice,
      quantity: 1,
      image: config.case?.image
    });
  };
  
  const handleSaveConfig = () => {
    // In a real app, this would save the config to user's account
    alert("Fonctionnalité de sauvegarde non implémentée pour cette démo");
  };
  
  return (
    <div className="lg:col-span-1">
      <div className="bg-gray-50 dark:bg-dark-light rounded-lg p-6 sticky top-24">
        <h2 className="font-poppins font-semibold text-lg mb-4 text-gray-900 dark:text-white">Récapitulatif</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Boîtier</span>
            <span className="text-sm font-medium">{config.case?.name || 'Non sélectionné'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Processeur</span>
            <span className="text-sm font-medium">{config.cpu?.name || 'Non sélectionné'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Carte graphique</span>
            <span className="text-sm font-medium">{config.gpu?.name || 'Non sélectionné'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Mémoire</span>
            <span className="text-sm font-medium">{config.ram?.name || 'Non sélectionné'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Stockage</span>
            <span className="text-sm font-medium">{config.storage?.name || 'Non sélectionné'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Alimentation</span>
            <span className="text-sm font-medium">{config.powerSupply?.name || 'Non sélectionné'}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mb-6">
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span className="text-primary dark:text-primary-dark">{formatPrice(config.totalPrice)}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={handleAddToCart} 
            className="w-full"
            disabled={!config.case || !config.cpu || !config.gpu || !config.ram || !config.storage || !config.powerSupply}
          >
            Ajouter au panier
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSaveConfig}
            className="w-full text-gray-700 dark:text-gray-300"
          >
            Sauvegarder ma configuration
          </Button>
        </div>
      </div>
    </div>
  );
}
