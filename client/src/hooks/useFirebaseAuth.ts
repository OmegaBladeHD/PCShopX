import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Nettoyage lors du démontage du composant
    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Compte créé avec succès",
        description: "Vous êtes maintenant connecté"
      });
      return true;
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      toast({
        title: "Erreur lors de l'inscription",
        description: error.message || "Une erreur est survenue",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur PCShopX"
      });
      return true;
    } catch (error: any) {
      console.error("Erreur lors de la connexion:", error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Email ou mot de passe incorrect",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logInWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur PCShopX"
      });
      return true;
    } catch (error: any) {
      console.error("Erreur lors de la connexion avec Google:", error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Problème lors de la connexion avec Google",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !"
      });
      return true;
    } catch (error: any) {
      console.error("Erreur lors de la déconnexion:", error);
      toast({
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur est survenue",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    user,
    loading,
    signUp,
    logIn,
    logInWithGoogle,
    logOut,
    isAuthenticated: !!user
  };
}