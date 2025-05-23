import { Switch, Route } from "wouter";
import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ConfiguratorPage from "@/pages/configurator";
import Contact from "@/pages/contact";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

function App() {
  const [activeTab, setActiveTab] = useState("catalogue");

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Switch>
            <Route path="/" component={() => {
              // Ensure activeTab is correctly set when navigating
              if (activeTab !== "catalogue") setActiveTab("catalogue");
              return <Home />;
            }} />
            <Route path="/configurator" component={() => {
              if (activeTab !== "configurateur") setActiveTab("configurateur");
              return <ConfiguratorPage />;
            }} />
            <Route path="/contact" component={() => {
              if (activeTab !== "contact") setActiveTab("contact");
              return <Contact />;
            }} />
            <Route component={NotFound} />
          </Switch>
        </main>
        
        <Footer />
      </div>
    </TooltipProvider>
  );
}

export default App;
