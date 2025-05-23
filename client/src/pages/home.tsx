import { useState, useEffect } from "react";
import { FiltersSidebar } from "@/components/catalog/filters-sidebar";
import { MobileFilters } from "@/components/catalog/mobile-filters";
import { ProductGrid } from "@/components/catalog/product-grid";
import { mockProducts, Product } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Fetch products
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      // For development, use mock data
      return mockProducts;
      // In production, this would use the queryFn from queryClient
    }
  });
  
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);
  
  const handleFilterChange = (filters: any) => {
    if (!products) return;
    
    // Apply filters
    let filtered = [...products];
    
    // Price range filter
    if (filters.priceRange && filters.priceRange.length === 2) {
      filtered = filtered.filter(
        product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );
    }
    
    // Category filters
    const selectedCategories = Object.entries(filters.categories)
      .filter(([_, selected]) => selected)
      .map(([key]) => key);
      
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => {
        if (selectedCategories.includes('portableGaming') && product.isLaptop && product.isGaming) return true;
        if (selectedCategories.includes('portableBureau') && product.isLaptop && !product.isGaming) return true;
        if (selectedCategories.includes('tourGaming') && !product.isLaptop && product.isGaming) return true;
        if (selectedCategories.includes('tourBureau') && !product.isLaptop && !product.isGaming) return true;
        return false;
      });
    }
    
    // Brand filters
    const selectedBrands = Object.entries(filters.brands)
      .filter(([_, selected]) => selected)
      .map(([key]) => key.toUpperCase());
      
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.some(brand => product.brand.toUpperCase().includes(brand))
      );
    }
    
    // CPU filters
    const selectedCpuTypes = Object.entries(filters.cpu)
      .filter(([_, selected]) => selected)
      .map(([key]) => key.toUpperCase());
      
    if (selectedCpuTypes.length > 0) {
      filtered = filtered.filter(product => 
        selectedCpuTypes.some(type => product.cpuType.toUpperCase().includes(type))
      );
    }
    
    // RAM filters
    const selectedRamSizes: number[] = [];
    if (filters.ram.ram8) selectedRamSizes.push(8);
    if (filters.ram.ram16) selectedRamSizes.push(16);
    if (filters.ram.ram32) selectedRamSizes.push(32);
    
    if (selectedRamSizes.length > 0) {
      filtered = filtered.filter(product => selectedRamSizes.includes(product.ram));
    }
    
    // GPU filters
    const selectedGpuTypes = Object.entries(filters.gpu)
      .filter(([_, selected]) => selected)
      .map(([key]) => key.toUpperCase());
      
    if (selectedGpuTypes.length > 0) {
      filtered = filtered.filter(product => 
        selectedGpuTypes.some(type => product.gpuType.toUpperCase().includes(type))
      );
    }
    
    // Storage filters
    const selectedStorageTypes = Object.entries(filters.storage)
      .filter(([_, selected]) => selected)
      .map(([key]) => key.toUpperCase());
      
    if (selectedStorageTypes.length > 0) {
      filtered = filtered.filter(product => 
        selectedStorageTypes.some(type => product.storage.toUpperCase().includes(type))
      );
    }
    
    setFilteredProducts(filtered);
  };
  
  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-500">Erreur de chargement des produits. Veuillez réessayer.</p>
      </div>
    );
  }
  
  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Desktop */}
        <FiltersSidebar onFilterChange={handleFilterChange} />
        
        {/* Mobile filters toggle & panel */}
        <MobileFilters onFilterChange={handleFilterChange} />
        
        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
