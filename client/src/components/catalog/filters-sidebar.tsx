import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface FiltersProps {
  onFilterChange: (filters: any) => void;
}

export function FiltersSidebar({ onFilterChange }: FiltersProps) {
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
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    applyFilters();
  };
  
  const handleCategoryChange = (key: keyof typeof categoryFilters, checked: boolean) => {
    setCategoryFilters({ ...categoryFilters, [key]: checked });
    applyFilters();
  };
  
  const handleBrandChange = (key: keyof typeof brandFilters, checked: boolean) => {
    setBrandFilters({ ...brandFilters, [key]: checked });
    applyFilters();
  };
  
  const handleCpuChange = (key: keyof typeof cpuFilters, checked: boolean) => {
    setCpuFilters({ ...cpuFilters, [key]: checked });
    applyFilters();
  };
  
  const handleRamChange = (key: keyof typeof ramFilters, checked: boolean) => {
    setRamFilters({ ...ramFilters, [key]: checked });
    applyFilters();
  };
  
  const handleGpuChange = (key: keyof typeof gpuFilters, checked: boolean) => {
    setGpuFilters({ ...gpuFilters, [key]: checked });
    applyFilters();
  };
  
  const handleStorageChange = (key: keyof typeof storageFilters, checked: boolean) => {
    setStorageFilters({ ...storageFilters, [key]: checked });
    applyFilters();
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
    applyFilters();
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
  };
  
  return (
    <aside className="w-full md:w-64 flex-shrink-0 hidden md:block">
      <div className="bg-white dark:bg-dark rounded-lg card-shadow p-4 sticky top-20">
        <h2 className="font-poppins font-semibold text-lg mb-4 text-gray-900 dark:text-white">Filtrer par :</h2>
        
        {/* Categories */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Catégories</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox 
                id="portable-gaming" 
                checked={categoryFilters.portableGaming}
                onCheckedChange={(checked) => handleCategoryChange('portableGaming', checked as boolean)}
              />
              <Label htmlFor="portable-gaming" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Portable gaming</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="portable-bureau" 
                checked={categoryFilters.portableBureau}
                onCheckedChange={(checked) => handleCategoryChange('portableBureau', checked as boolean)}
              />
              <Label htmlFor="portable-bureau" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Portable bureau</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="tour-gaming" 
                checked={categoryFilters.tourGaming}
                onCheckedChange={(checked) => handleCategoryChange('tourGaming', checked as boolean)}
              />
              <Label htmlFor="tour-gaming" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Tour gaming</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="tour-bureau" 
                checked={categoryFilters.tourBureau}
                onCheckedChange={(checked) => handleCategoryChange('tourBureau', checked as boolean)}
              />
              <Label htmlFor="tour-bureau" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Tour bureau</Label>
            </div>
          </div>
        </div>
        
        {/* Brands */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Marques</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox 
                id="msi" 
                checked={brandFilters.msi}
                onCheckedChange={(checked) => handleBrandChange('msi', checked as boolean)}
              />
              <Label htmlFor="msi" className="ml-2 text-sm text-gray-700 dark:text-gray-300">MSI</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="asus" 
                checked={brandFilters.asus}
                onCheckedChange={(checked) => handleBrandChange('asus', checked as boolean)}
              />
              <Label htmlFor="asus" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Asus</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="dell" 
                checked={brandFilters.dell}
                onCheckedChange={(checked) => handleBrandChange('dell', checked as boolean)}
              />
              <Label htmlFor="dell" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Dell</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="lenovo" 
                checked={brandFilters.lenovo}
                onCheckedChange={(checked) => handleBrandChange('lenovo', checked as boolean)}
              />
              <Label htmlFor="lenovo" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Lenovo</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="hp" 
                checked={brandFilters.hp}
                onCheckedChange={(checked) => handleBrandChange('hp', checked as boolean)}
              />
              <Label htmlFor="hp" className="ml-2 text-sm text-gray-700 dark:text-gray-300">HP</Label>
            </div>
          </div>
        </div>
        
        {/* CPU */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">CPU</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox 
                id="intel" 
                checked={cpuFilters.intel}
                onCheckedChange={(checked) => handleCpuChange('intel', checked as boolean)}
              />
              <Label htmlFor="intel" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Intel</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="amd-cpu" 
                checked={cpuFilters.amd}
                onCheckedChange={(checked) => handleCpuChange('amd', checked as boolean)}
              />
              <Label htmlFor="amd-cpu" className="ml-2 text-sm text-gray-700 dark:text-gray-300">AMD</Label>
            </div>
          </div>
        </div>
        
        {/* RAM */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">RAM</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox 
                id="ram-8" 
                checked={ramFilters.ram8}
                onCheckedChange={(checked) => handleRamChange('ram8', checked as boolean)}
              />
              <Label htmlFor="ram-8" className="ml-2 text-sm text-gray-700 dark:text-gray-300">8 Go</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="ram-16" 
                checked={ramFilters.ram16}
                onCheckedChange={(checked) => handleRamChange('ram16', checked as boolean)}
              />
              <Label htmlFor="ram-16" className="ml-2 text-sm text-gray-700 dark:text-gray-300">16 Go</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="ram-32" 
                checked={ramFilters.ram32}
                onCheckedChange={(checked) => handleRamChange('ram32', checked as boolean)}
              />
              <Label htmlFor="ram-32" className="ml-2 text-sm text-gray-700 dark:text-gray-300">32 Go</Label>
            </div>
          </div>
        </div>
        
        {/* GPU */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">GPU</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox 
                id="nvidia" 
                checked={gpuFilters.nvidia}
                onCheckedChange={(checked) => handleGpuChange('nvidia', checked as boolean)}
              />
              <Label htmlFor="nvidia" className="ml-2 text-sm text-gray-700 dark:text-gray-300">NVIDIA</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="amd-gpu" 
                checked={gpuFilters.amd}
                onCheckedChange={(checked) => handleGpuChange('amd', checked as boolean)}
              />
              <Label htmlFor="amd-gpu" className="ml-2 text-sm text-gray-700 dark:text-gray-300">AMD</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="intel-gpu" 
                checked={gpuFilters.intel}
                onCheckedChange={(checked) => handleGpuChange('intel', checked as boolean)}
              />
              <Label htmlFor="intel-gpu" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Intel</Label>
            </div>
          </div>
        </div>
        
        {/* Storage */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Stockage</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox 
                id="ssd" 
                checked={storageFilters.ssd}
                onCheckedChange={(checked) => handleStorageChange('ssd', checked as boolean)}
              />
              <Label htmlFor="ssd" className="ml-2 text-sm text-gray-700 dark:text-gray-300">SSD</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="hdd" 
                checked={storageFilters.hdd}
                onCheckedChange={(checked) => handleStorageChange('hdd', checked as boolean)}
              />
              <Label htmlFor="hdd" className="ml-2 text-sm text-gray-700 dark:text-gray-300">HDD</Label>
            </div>
          </div>
        </div>
        
        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Prix</h3>
          <div>
            <Slider
              value={priceRange}
              min={500}
              max={3000}
              step={100}
              onValueChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span>{priceRange[0]}€</span>
              <span>{priceRange[1]}€</span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline"
          onClick={resetFilters}
          className="w-full text-gray-700 dark:text-gray-300"
        >
          Réinitialiser filtres
        </Button>
      </div>
    </aside>
  );
}
