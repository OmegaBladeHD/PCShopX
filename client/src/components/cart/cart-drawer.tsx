import { useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { 
  Sheet,
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Link } from "wouter";

interface CartDrawerProps {
  cart: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

export function CartDrawer({ 
  cart, 
  updateQuantity, 
  removeFromCart, 
  clearCart, 
  totalPrice 
}: CartDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart size={20} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Votre Panier</SheetTitle>
        </SheetHeader>
        
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
            <ShoppingCart size={64} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Votre panier est vide</h3>
            <p className="text-muted-foreground mt-2">
              Parcourez notre catalogue pour trouver votre PC idéal
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4">
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-start gap-3 border-b pb-3">
                    {item.image && (
                      <div className="h-16 w-16 rounded overflow-hidden bg-secondary shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <p className="text-primary font-semibold">{formatPrice(item.price)}</p>
                      
                      <div className="flex items-center mt-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            
            <SheetFooter className="pt-4 border-t">
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-lg">{formatPrice(totalPrice)}</span>
                </div>
                
                <div className="flex justify-between gap-2">
                  <Button variant="outline" onClick={clearCart}>
                    Vider le panier
                  </Button>
                  <SheetClose asChild>
                    <Link href="/checkout">
                      <Button className="w-full">
                        Passer commande
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}