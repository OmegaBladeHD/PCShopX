import { Switch, Route } from "wouter";
import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ConfiguratorPage from "@/pages/configurator";
import Contact from "@/pages/contact";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

// Contexte global pour le panier d'achat
import { CartProvider } from "@/components/cart/cart-context";

function App() {
  const [activeTab, setActiveTab] = useState("catalogue");
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onLoginClick={() => setShowAuthModal(true)}
            />
            
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <Switch>
                <Route path="/" component={() => {
                  // Ensure activeTab is correctly set when navigating
                  if (activeTab !== "catalogue") setActiveTab("catalogue");
                  return <Home showAuthModal={showAuthModal} setShowAuthModal={setShowAuthModal} />;
                }} />
                <Route path="/configurator" component={() => {
                  if (activeTab !== "configurateur") setActiveTab("configurateur");
                  return <ConfiguratorPage />;
                }} />
                <Route path="/contact" component={() => {
                  if (activeTab !== "contact") setActiveTab("contact");
                  return <Contact />;
                }} />
                <Route path="/checkout" component={() => {
                  return <div>Checkout Page</div>;
                }} />
                <Route component={NotFound} />
              </Switch>
            </main>
            
            <Footer />
            <Toaster />
          </div>
        </CartProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
