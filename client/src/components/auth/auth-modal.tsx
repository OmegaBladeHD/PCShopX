import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface AuthModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

// Form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  rememberMe: z.boolean().optional()
});

export function AuthModal({ showModal, setShowModal }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  
  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });
  
  const handleSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log(data);
    // Here you would handle login/register
    // For a real app, this would call your API
    
    setShowModal(false);
  };
  
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Connexion" : "Inscription"}</DialogTitle>
        </DialogHeader>
        
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="votre@email.com" 
                      autoComplete="email" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      autoComplete="current-password" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center justify-between">
              <FormField
                control={loginForm.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                        id="remember-me"
                      />
                    </FormControl>
                    <Label 
                      htmlFor="remember-me" 
                      className="text-sm text-gray-700 dark:text-gray-300"
                    >
                      Se souvenir de moi
                    </Label>
                  </FormItem>
                )}
              />
              
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary-dark">
                  Mot de passe oublié?
                </a>
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              {isLogin ? "Se connecter" : "S'inscrire"}
            </Button>
          </form>
        </Form>
        
        <div className="mt-2 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "Pas encore de compte? " : "Déjà un compte? "}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
