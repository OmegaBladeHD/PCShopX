import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { PageTitle } from "@/components/ui/page-title";
import { useToast } from "@/hooks/use-toast";

type CheckoutItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export default function Checkout() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Récupérer l'article du localStorage
    const checkoutItemStr = localStorage.getItem('checkout_item');
    
    if (checkoutItemStr) {
      try {
        const checkoutItem = JSON.parse(checkoutItemStr) as CheckoutItem;
        setItems([checkoutItem]);
        setTotalPrice(checkoutItem.price * checkoutItem.quantity);
      } catch (e) {
        console.error("Erreur lors de la lecture du localStorage:", e);
        navigate("/");
      }
    } else {
      // Si pas d'article dans le localStorage et pas en mode vidéo, rediriger vers l'accueil
      if (!showVideo) {
        navigate("/");
      }
    }
  }, [navigate, showVideo]);

  // Si aucun article et pas en mode vidéo, ne rien afficher pendant la redirection
  if (items.length === 0 && !showVideo) {
    return null;
  }

  const handlePayment = () => {
    setIsLoading(true);
    
    // Simuler un traitement de paiement
    setTimeout(() => {
      setIsLoading(false);
      setShowVideo(true);
      // Nettoyer le localStorage
      localStorage.removeItem('checkout_item');
    }, 1500);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    toast({
      title: "Merci pour votre visite !",
      description: "Cette boutique est une démo"
    });
    navigate("/");
  };

  return (
    <div className="py-8">
      {!showVideo ? (
        <>
          <PageTitle title="Finaliser votre commande" />
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Récapitulatif de la commande */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Récapitulatif</h2>
              
              <div className="bg-white dark:bg-dark-light rounded-lg shadow p-6">
                <ul className="divide-y space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="pt-4 first:pt-0 flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </li>
                  ))}
                </ul>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg">
                  <p className="font-bold">Total</p>
                  <p className="font-bold">{formatPrice(totalPrice)}</p>
                </div>
              </div>
            </div>
            
            {/* Informations de paiement */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Informations de paiement</h2>
              
              <div className="bg-white dark:bg-dark-light rounded-lg shadow p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom sur la carte</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue="Pierre Martin"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Numéro de carte</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue="4242 4242 4242 4242"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date d'expiration</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md"
                      defaultValue="12/25"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CVC</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md"
                      defaultValue="123"
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={handlePayment}
                  disabled={isLoading}
                >
                  {isLoading ? "Traitement en cours..." : `Payer ${formatPrice(totalPrice)}`}
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6">Merci pour votre achat !</h1>
          
          {/* Video de Rick Roll */}
          <div className="w-full max-w-3xl aspect-video mb-6">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Rick Astley - Never Gonna Give You Up" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
          
          <p className="text-lg mb-8 text-center max-w-md">
            Cette boutique est une démonstration. Aucun paiement n'a été effectué.
          </p>
          
          <Button size="lg" onClick={handleCloseVideo}>
            Retourner à l'accueil
          </Button>
        </div>
      )}
    </div>
  );
}