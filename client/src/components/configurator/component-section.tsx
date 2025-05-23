import { useState } from "react";
import { Component, formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ComponentSectionProps {
  title: string;
  components: Component[];
  selectedComponent: Component | undefined;
  onSelect: (component: Component) => void;
  layout?: 'grid' | 'list';
}

export function ComponentSection({ 
  title, 
  components, 
  selectedComponent,
  onSelect,
  layout = 'list'
}: ComponentSectionProps) {
  if (layout === 'grid') {
    return (
      <div>
        <h2 className="font-poppins font-semibold text-lg mb-4 text-gray-900 dark:text-white">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {components.map(component => (
            <Card 
              key={component.id} 
              className={`border ${
                selectedComponent?.id === component.id 
                  ? 'border-primary dark:border-primary' 
                  : 'border-gray-200 dark:border-gray-700'
              } rounded-lg p-3 hover:border-primary dark:hover:border-primary cursor-pointer transition-colors`}
              onClick={() => onSelect(component)}
            >
              <CardContent className="p-0">
                {component.image && (
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-2">
                    <img 
                      src={component.image} 
                      alt={component.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="font-medium text-sm">{component.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{formatPrice(component.price)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="font-poppins font-semibold text-lg mb-4 text-gray-900 dark:text-white">{title}</h2>
      <RadioGroup value={selectedComponent?.id.toString()} onValueChange={(value) => {
        const component = components.find(c => c.id === parseInt(value));
        if (component) onSelect(component);
      }}>
        <div className="space-y-3">
          {components.map(component => (
            <div 
              key={component.id} 
              className={`flex items-center justify-between p-3 border ${
                selectedComponent?.id === component.id 
                  ? 'border-primary dark:border-primary' 
                  : 'border-gray-200 dark:border-gray-700'
              } rounded-lg hover:border-primary dark:hover:border-primary cursor-pointer`}
              onClick={() => onSelect(component)}
            >
              <div className="flex items-center">
                <RadioGroupItem 
                  value={component.id.toString()} 
                  id={`component-${component.id}`}
                  className="mr-2"
                />
                <Label 
                  htmlFor={`component-${component.id}`}
                  className="flex items-center cursor-pointer"
                >
                  <span className="ml-2 text-sm font-medium">{component.name}</span>
                </Label>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{formatPrice(component.price)}</span>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
