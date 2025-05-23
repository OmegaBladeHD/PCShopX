import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const loginSchema = z.object({
  username: z.string().min(3, { message: 'Le nom d'utilisateur doit contenir au moins 3 caractères' }),
  password: z.string().min(5, { message: 'Le mot de passe doit contenir au moins 5 caractères' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function AuthModal({ showModal, setShowModal }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<string>('login');
  const { login } = useAuth();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    if (activeTab === 'login') {
      const success = await login(values.username, values.password);
      if (success) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur PCShopX !",
        });
        setShowModal(false);
      } else {
        toast({
          title: "Échec de la connexion",
          description: "Nom d'utilisateur ou mot de passe incorrect",
          variant: "destructive",
        });
      }
    } else {
      // Dans une vraie application, ce serait une requête API pour créer un compte
      toast({
        title: "Création de compte",
        description: "Cette fonctionnalité n'est pas encore disponible dans cette démo",
      });
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Compte PCShopX</DialogTitle>
          <DialogDescription>
            Connectez-vous ou créez un compte pour accéder à votre espace personnel.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom d'utilisateur</FormLabel>
                      <FormControl>
                        <Input placeholder="demo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-xs text-muted-foreground">
                  Pour cette démo, utilisez: <br />
                  <strong>Utilisateur:</strong> demo | <strong>Mot de passe:</strong> demo123
                </div>
                <Button type="submit" className="w-full">Se connecter</Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="register">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom d'utilisateur</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Créer un compte</Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}