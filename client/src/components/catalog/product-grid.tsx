import { useState } from "react";
import { ProductCard } from "@/components/ui/product-card";
import { Product } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductDetail } from "./product-detail";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortOption, setSortOption] = useState("price-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  
  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "popularity":
        // Mock popularity sorting - in a real app this would be based on sales or views
        return b.id - a.id;
      case "newest":
        // Mock newest sorting - in a real app this would be based on release date
        return b.id - a.id;
      default:
        return 0;
    }
  });
  
  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  
  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return (
    <div className="flex-1">
      {/* Sorting & Filter Toggle */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Prix: croissant</SelectItem>
              <SelectItem value="price-desc">Prix: décroissant</SelectItem>
              <SelectItem value="popularity">Popularité</SelectItem>
              <SelectItem value="newest">Nouveautés</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onViewDetails={(product) => setSelectedProduct(product)}
          />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className="cursor-pointer"
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className="cursor-pointer"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      
      {/* Product Detail Modal */}
      <ProductDetail 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        relatedProducts={selectedProduct ? sortedProducts.filter(p => p.id !== selectedProduct.id).slice(0, 4) : []}
      />
    </div>
  );
}
