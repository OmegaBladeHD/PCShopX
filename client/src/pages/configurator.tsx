import { useState } from "react";
import { PageTitle } from "@/components/ui/page-title";
import { ComponentSection } from "@/components/configurator/component-section";
import { Summary } from "@/components/configurator/summary";
import { mockComponents, Component, PCConfiguration } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export default function ConfiguratorPage() {
  const [configuration, setConfiguration] = useState<PCConfiguration>({
    totalPrice: 0
  });
  
  // Fetch components
  const { data: components, isLoading } = useQuery({
    queryKey: ['/api/components'],
    queryFn: async () => {
      // For development, use mock data
      return mockComponents;
      // In production, this would use the queryFn from queryClient
    }
  });
  
  const handleSelectCase = (component: Component) => {
    setConfiguration(prev => {
      const newPrice = prev.totalPrice - (prev.case?.price || 0) + component.price;
      return {
        ...prev,
        case: component,
        totalPrice: newPrice
      };
    });
  };
  
  const handleSelectCPU = (component: Component) => {
    setConfiguration(prev => {
      const newPrice = prev.totalPrice - (prev.cpu?.price || 0) + component.price;
      return {
        ...prev,
        cpu: component,
        totalPrice: newPrice
      };
    });
  };
  
  const handleSelectGPU = (component: Component) => {
    setConfiguration(prev => {
      const newPrice = prev.totalPrice - (prev.gpu?.price || 0) + component.price;
      return {
        ...prev,
        gpu: component,
        totalPrice: newPrice
      };
    });
  };
  
  const handleSelectRAM = (component: Component) => {
    setConfiguration(prev => {
      const newPrice = prev.totalPrice - (prev.ram?.price || 0) + component.price;
      return {
        ...prev,
        ram: component,
        totalPrice: newPrice
      };
    });
  };
  
  const handleSelectStorage = (component: Component) => {
    setConfiguration(prev => {
      const newPrice = prev.totalPrice - (prev.storage?.price || 0) + component.price;
      return {
        ...prev,
        storage: component,
        totalPrice: newPrice
      };
    });
  };
  
  const handleSelectPowerSupply = (component: Component) => {
    setConfiguration(prev => {
      const newPrice = prev.totalPrice - (prev.powerSupply?.price || 0) + component.price;
      return {
        ...prev,
        powerSupply: component,
        totalPrice: newPrice
      };
    });
  };
  
  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!components) {
    return (
      <div className="py-12 text-center">
        <p>Impossible de charger les composants.</p>
      </div>
    );
  }
  
  return (
    <div className="py-6">
      <PageTitle title="Configurez votre PC Tour personnalisé" />
      
      <div className="bg-white dark:bg-dark rounded-lg card-shadow p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Options */}
          <div className="lg:col-span-2 space-y-8">
            {/* Boîtier */}
            <ComponentSection 
              title="Boîtier" 
              components={components.case}
              selectedComponent={configuration.case}
              onSelect={handleSelectCase}
              layout="grid"
            />
            
            {/* CPU */}
            <ComponentSection 
              title="Processeur (CPU)" 
              components={components.cpu}
              selectedComponent={configuration.cpu}
              onSelect={handleSelectCPU}
            />
            
            {/* GPU */}
            <ComponentSection 
              title="Carte Graphique (GPU)" 
              components={components.gpu}
              selectedComponent={configuration.gpu}
              onSelect={handleSelectGPU}
              layout="grid"
            />
            
            {/* RAM */}
            <ComponentSection 
              title="Mémoire RAM" 
              components={components.ram}
              selectedComponent={configuration.ram}
              onSelect={handleSelectRAM}
            />
            
            {/* Storage */}
            <ComponentSection 
              title="Stockage" 
              components={components.storage}
              selectedComponent={configuration.storage}
              onSelect={handleSelectStorage}
            />
            
            {/* Power Supply */}
            <ComponentSection 
              title="Alimentation" 
              components={components.powerSupply}
              selectedComponent={configuration.powerSupply}
              onSelect={handleSelectPowerSupply}
            />
          </div>
          
          {/* Order Summary */}
          <Summary config={configuration} />
        </div>
      </div>
    </div>
  );
}
