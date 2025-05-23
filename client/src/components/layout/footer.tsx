import { Logo } from "@/components/ui/logo";
import { useTheme } from "@/components/ui/theme-provider";
import { Facebook, Instagram, Twitter, Youtube, Sun, Moon } from "lucide-react";

export function Footer() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return (
    <footer className="bg-white dark:bg-dark mt-12 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">À propos</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Qui sommes-nous
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Nos valeurs
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Nos engagements
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">Assistance</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Livraison
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Retours & Garanties
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">Légal</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  CGV
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">Suivez-nous</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 dark:text-gray-300">&copy; 2023 PCShopX. Tous droits réservés.</p>
          
          {/* Dark/Light Mode Toggle */}
          <div className="mt-4 md:mt-0">
            <button 
              onClick={toggleTheme} 
              className="inline-flex items-center p-2 rounded-full bg-gray-100 dark:bg-dark-light text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
