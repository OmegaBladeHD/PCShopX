import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterX, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface MobileFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function MobileFilters({ onFilterChange }: MobileFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([500, 3000]);
  const [categoryFilters, setCategoryFilters] = useState({
    portableGaming: false,
    portableBureau: false,
    tourGaming: false,
    tourBureau: false
  });
  
  const [brandFilters, setBrandFilters] = useState({
    msi: false,
    asus: false,
    dell: false,
    lenovo: false,
    hp: false
  });
  
  const [cpuFilters, setCpuFilters] = useState({
    intel: false,
    amd: false
  });
  
  const [ramFilters, setRamFilters] = useState({
    ram8: false,
    ram16: false,
    ram32: false
  });
  
  const [gpuFilters, setGpuFilters] = useState({
    nvidia: false,
    amd: false,
    intel: false
  });
  
  const [storageFilters, setStorageFilters] = useState({
    ssd: false,
    hdd: false
  });
  
  useEffect(() => {
    // Listen for event to toggle mobile filters
    const handleToggleFilters = () => {
      setShowFilters(prev => !prev);
    };
    
    document.addEventListener('toggle-mobile-filters', handleToggleFilters);
    
    return () => {
      document.removeEventListener('toggle-mobile-filters', handleToggleFilters);
    };
  }, []);
  
  const handleCategoryChange = (key: keyof typeof categoryFilters, checked: boolean) => {
    setCategoryFilters({ ...categoryFilters, [key]: checked });
  };
  
  const handleBrandChange = (key: keyof typeof brandFilters, checked: boolean) => {
    setBrandFilters({ ...brandFilters, [key]: checked });
  };
  
  const handleCpuChange = (key: keyof typeof cpuFilters, checked: boolean) => {
    setCpuFilters({ ...cpuFilters, [key]: checked });
  };
  
  const handleRamChange = (key: keyof typeof ramFilters, checked: boolean) => {
    setRamFilters({ ...ramFilters, [key]: checked });
  };
  
  const handleGpuChange = (key: keyof typeof gpuFilters, checked: boolean) => {
    setGpuFilters({ ...gpuFilters, [key]: checked });
  };
  
  const handleStorageChange = (key: keyof typeof storageFilters, checked: boolean) => {
    setStorageFilters({ ...storageFilters, [key]: checked });
  };
  
  const applyFilters = () => {
    const filters = {
      priceRange,
      categories: categoryFilters,
      brands: brandFilters,
      cpu: cpuFilters,
      ram: ramFilters,
      gpu: gpuFilters,
      storage: storageFilters
    };
    
    onFilterChange(filters);
    setShowFilters(false);
  };
  
  const resetFilters = () => {
    setPriceRange([500, 3000]);
    setCategoryFilters({
      portableGaming: false,
      portableBureau: false,
      tourGaming: false,
      tourBureau: false
    });
    setBrandFilters({
      msi: false,
      asus: false,
      dell: false,
      lenovo: false,
      hp: false
    });
    setCpuFilters({
      intel: false,
      amd: false
    });
    setRamFilters({
      ram8: false,
      ram16: false,
      ram32: false
    });
    setGpuFilters({
      nvidia: false,
      amd: false,
      intel: false
    });
    setStorageFilters({
      ssd: false,
      hdd: false
    });
    
    const filters = {
      priceRange: [500, 3000],
      categories: {
        portableGaming: false,
        portableBureau: false,
        tourGaming: false,
        tourBureau: false
      },
      brands: {
        msi: false,
        asus: false,
        dell: false,
        lenovo: false,
        hp: false
      },
      cpu: {
        intel: false,
        amd: false
      },
      ram: {
        ram8: false,
        ram16: false,
        ram32: false
      },
      gpu: {
        nvidia: false,
        amd: false,
        intel: false
      },
      storage: {
        ssd: false,
        hdd: false
      }
    };
    
    onFilterChange(filters);
  };

  // Toggle filter button for mobile
  const FilterToggleButton = () => (
    <Button 
      onClick={() => setShowFilters(true)} 
      className="md:hidden flex items-center px-3 py-2 text-sm font-medium rounded-md bg-white dark:bg-dark shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-light"
      variant="outline"
    >
      <FilterX className="h-5 w-5 mr-1" />
      Filtres
    </Button>
  );
  
  return (
    <>
      <div className="md:hidden mb-4 flex justify-start">
        <FilterToggleButton />
      </div>
      
      {/* Mobile filters panel */}
      {showFilters && (
        <div className="md:hidden fixed inset-0 z-30 bg-gray-600 bg-opacity-75">
          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white dark:bg-dark shadow-xl overflow-y-auto">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filtres</h2>
                    <button onClick={() => setShowFilters(false)} className="rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300">
                      <span className="sr-only">Fermer</span>
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-6 overflow-y-auto">
                  {/* Categories */}
                  <div>
                    <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Catégories</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="portable-gaming-mobile" 
                          checked={categoryFilters.portableGaming}
                          onCheckedChange={(checked) => handleCategoryChange('portableGaming', checked as boolean)}
                        />
                        <Label htmlFor="portable-gaming-mobile" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Portable gaming</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="portable-bureau-mobile" 
                          checked={categoryFilters.portableBureau}
                          onCheckedChange={(checked) => handleCategoryChange('portableBureau', checked as boolean)}
                        />
                        <Label htmlFor="portable-bureau-mobile" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Portable bureau</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="tour-gaming-mobile" 
                          checked={categoryFilters.tourGaming}
                          onCheckedChange={(checked) => handleCategoryChange('tourGaming', checked as boolean)}
                        />
                        <Label htmlFor="tour-gaming-mobile" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Tour gaming</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="tour-bureau-mobile" 
                          checked={categoryFilters.tourBureau}
                          onCheckedChange={(checked) => handleCategoryChange('tourBureau', checked as boolean)}
                        />
                        <Label htmlFor="tour-bureau-mobile" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Tour bureau</Label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Brands */}
                  <div>
                    <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Marques</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="msi-mobile" 
                          checked={brandFilters.msi}
                          onCheckedChange={(checked) => handleBrandChange('msi', checked as boolean)}
                        />
                        <Label htmlFor="msi-mobile" className="ml-2 text-sm text-gray-700 dark:text-gray-300">MSI</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="asus-mobile" 
                          checked={brandFilters.asus}
                          onCheckedChange={(checked) => handleBrandChange('asus', checked as boolean)}
                        />
                        <Label htmlFor="asus-mobile" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Asus</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="dell-mobile" 
                          checked={brandFilters.dell}
                          onCheckedChange={(checked) => handleBrandChange('dell', checked as boolean)}
                        />
                        <Label htmlFor="dell-mobile" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Dell</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="lenovo-mobile" 
                          checked={brandFilters.lenovo}
                          onCheckedChange={(checked) => handleBrandChange('lenovo', checked as boolean)}
                        />
                        <Label htmlFor="lenovo-mobile" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Lenovo</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="hp-mobile" 
                          checked={brandFilters.hp}
                          onCheckedChange={(checked) => handleBrandChange('hp', checked as boolean)}
                        />
                        <Label htmlFor="hp-mobile" className="ml-2 text-sm text-gray-700 dark:text-gray-300">HP</Label>
                      </div>
                    </div>
                  </div>
                  
                  {/* More filters ... */}
                  {/* CPU, RAM, GPU, Storage filter sections would be similar to above */}
                  
                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Prix</h3>
                    <div>
                      <Slider
                        value={priceRange}
                        min={500}
                        max={3000}
                        step={100}
                        onValueChange={setPriceRange}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <span>{priceRange[0]}€</span>
                        <span>{priceRange[1]}€</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <Button onClick={applyFilters} className="w-full">
                      Appliquer les filtres
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={resetFilters} 
                      className="w-full text-gray-700 dark:text-gray-300"
                    >
                      Réinitialiser filtres
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
