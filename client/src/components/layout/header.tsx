import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ShoppingBag } from "lucide-react";
import { AuthModal } from "@/components/auth/auth-modal";
import { useCart } from "@/components/cart/cart-context";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [_, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { cart } = useCart();
  
  const navItems = [
    { name: "Accueil", path: "/", tab: "catalogue" },
    { name: "Configuration PC", path: "/configurator", tab: "configurateur" },
    { name: "Contact / FAQ", path: "/contact", tab: "contact" },
  ];

  const handleNavigation = (path: string, tab: string) => {
    navigate(path);
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-dark shadow-md dark:shadow-dark-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Nav */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>
            <nav className="hidden md:ml-6 md:flex space-x-8 items-center" aria-label="Navigation principale">
              {navItems.map((item) => (
                <button
                  key={item.tab}
                  onClick={() => handleNavigation(item.path, item.tab)}
                  className={`navbar-link ${activeTab === item.tab ? 'navbar-link-active' : ''}`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
          {/* User Actions */}
          <div className="flex items-center">
            <div className="flex-shrink-0 relative">
              <Button 
                onClick={() => setShowAuthModal(true)} 
                className="mr-3" 
                size="sm"
              >
                <User className="h-5 w-5 mr-2" />
                Connexion
              </Button>
              
              <button className="relative inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-primary dark:text-primary-dark hover:bg-gray-100 dark:hover:bg-dark transition-colors focus:outline-none">
                <span className="sr-only">Panier</span>
                <ShoppingBag className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-white text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="ml-2 flex items-center md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                type="button" 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-light focus:outline-none" 
                aria-controls="mobile-menu" 
                aria-expanded="false"
              >
                <span className="sr-only">Ouvrir menu principal</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark shadow-lg" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNavigation(item.path, item.tab)}
                className={`block px-3 py-2 rounded-md w-full text-left text-base font-medium ${
                  activeTab === item.tab 
                    ? 'text-primary dark:text-primary-dark bg-gray-100 dark:bg-dark-light' 
                    : ''
                }`}
              >
                {item.name}
              </button>
            ))}
            {activeTab === 'catalogue' && (
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.dispatchEvent(new CustomEvent('toggle-mobile-filters'));
                }}
                className="md:hidden block px-3 py-2 rounded-md w-full text-left text-base font-medium text-accent dark:text-accent-dark"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtres
              </button>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal showModal={showAuthModal} setShowModal={setShowAuthModal} />
    </header>
  );
}
