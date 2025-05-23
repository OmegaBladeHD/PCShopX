import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Product types
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  cpuType: string;
  cpu: string;
  gpuType: string;
  gpu: string;
  ram: number;
  storage: string;
  image: string;
  weight?: string;
  description: string;
  isLaptop: boolean;
  isGaming: boolean;
}

// PC Component types
export interface ComponentType {
  id: number;
  name: string;
  slug: string;
}

export interface Component {
  id: number;
  name: string;
  typeId: number;
  price: number;
  image: string;
  description?: string;
}

// Cart types
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Configuration type
export interface PCConfiguration {
  case?: Component;
  cpu?: Component;
  gpu?: Component;
  ram?: Component;
  storage?: Component;
  powerSupply?: Component;
  totalPrice: number;
}

// User type
export interface User {
  id: number;
  username: string;
  email: string;
}

// Format currency
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
}

// Mock products data (for development only)
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "MSI Katana GF66",
    brand: "MSI",
    price: 1299.99,
    category: "laptop",
    cpuType: "Intel",
    cpu: "Intel Core i7-12700H",
    gpuType: "NVIDIA",
    gpu: "NVIDIA RTX 3070 8GB",
    ram: 16,
    storage: "1TB SSD NVMe",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    weight: "2.3 kg",
    description: "Ce PC portable de gaming offre des performances exceptionnelles pour tous vos jeux et applications intensives.",
    isLaptop: true,
    isGaming: true
  },
  {
    id: 2,
    name: "ASUS ROG Strix G15",
    brand: "ASUS",
    price: 1899.99,
    category: "desktop",
    cpuType: "AMD",
    cpu: "AMD Ryzen 9 5900X",
    gpuType: "NVIDIA",
    gpu: "NVIDIA RTX 3080 10GB",
    ram: 32,
    storage: "2TB SSD NVMe",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    weight: "12.5 kg",
    description: "Tour gaming ultra-puissante avec éclairage RGB pour une expérience de jeu immersive.",
    isLaptop: false,
    isGaming: true
  },
  {
    id: 3,
    name: "Dell XPS 15",
    brand: "Dell",
    price: 1599.99,
    category: "laptop",
    cpuType: "Intel",
    cpu: "Intel Core i9-11900H",
    gpuType: "NVIDIA",
    gpu: "NVIDIA RTX 3050 Ti 4GB",
    ram: 32,
    storage: "1TB SSD NVMe",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    weight: "1.8 kg",
    description: "Portable premium pour les professionnels et créateurs de contenu, alliant puissance et élégance.",
    isLaptop: true,
    isGaming: false
  },
  {
    id: 4,
    name: "HP Omen 30L",
    brand: "HP",
    price: 1499.99,
    category: "desktop",
    cpuType: "Intel",
    cpu: "Intel Core i7-11700K",
    gpuType: "NVIDIA",
    gpu: "NVIDIA RTX 3070 8GB",
    ram: 16,
    storage: "1TB SSD + 2TB HDD",
    image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    weight: "12 kg",
    description: "Tour gaming avec un design unique pour des performances de jeu extraordinaires.",
    isLaptop: false,
    isGaming: true
  },
  {
    id: 5,
    name: "Lenovo Legion 5 Pro",
    brand: "Lenovo",
    price: 1399.99,
    category: "laptop",
    cpuType: "AMD",
    cpu: "AMD Ryzen 7 5800H",
    gpuType: "NVIDIA",
    gpu: "NVIDIA RTX 3070 8GB",
    ram: 16,
    storage: "1TB SSD NVMe",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    weight: "2.5 kg",
    description: "Portable gaming équilibré avec un écran 16:10 QHD+ pour une expérience immersive.",
    isLaptop: true,
    isGaming: true
  },
  {
    id: 6,
    name: "Dell Inspiron Desktop",
    brand: "Dell",
    price: 899.99,
    category: "desktop",
    cpuType: "Intel",
    cpu: "Intel Core i5-11400",
    gpuType: "Intel",
    gpu: "Intel UHD Graphics 730",
    ram: 8,
    storage: "512GB SSD + 1TB HDD",
    image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    weight: "5.5 kg",
    description: "Tour de bureau idéale pour une utilisation quotidienne et la productivité.",
    isLaptop: false,
    isGaming: false
  }
];

// Mock PC component data
export const mockComponents: { [key: string]: Component[] } = {
  case: [
    {
      id: 1,
      name: "NZXT H510",
      typeId: 1,
      price: 89.99,
      image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Corsair 4000D",
      typeId: 1,
      price: 109.99,
      image: "https://pixabay.com/get/ge183743c12088c8bf6c69433c1ef702c9902d5e8c385ac69ad8b95937422c8b762ae4378fb69ed688f0905b6a1c2c6ea1104cc84203b971113908291a6921d01_1280.jpg"
    },
    {
      id: 3,
      name: "Phanteks P500A",
      typeId: 1,
      price: 149.99,
      image: "https://pixabay.com/get/g1db56f1356a9d7f175b67de509271bba8a4d10c8a621541ad777adf4f0f08a56601297e7a6f1669040bd9a88c1a56ac9ffb54fd41dee34bf28c2cd86a0480113_1280.jpg"
    }
  ],
  cpu: [
    {
      id: 4,
      name: "Intel Core i5-12600K",
      typeId: 2,
      price: 299.99,
      image: ""
    },
    {
      id: 5,
      name: "Intel Core i7-12700K",
      typeId: 2,
      price: 449.99,
      image: ""
    },
    {
      id: 6,
      name: "AMD Ryzen 5 5600X",
      typeId: 2,
      price: 279.99,
      image: ""
    },
    {
      id: 7,
      name: "AMD Ryzen 7 5800X",
      typeId: 2,
      price: 399.99,
      image: ""
    }
  ],
  gpu: [
    {
      id: 8,
      name: "NVIDIA RTX 3060 - 12GB",
      typeId: 3,
      price: 399.99,
      image: "https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 9,
      name: "NVIDIA RTX 3070 - 8GB",
      typeId: 3,
      price: 599.99,
      image: "https://pixabay.com/get/g954e43b72d7136149b3122d4992d6a6eec0783f05f6b3fe7ae865c2198199856a088f8e7e041567711e9648f038ba47e42eab42ab8b77b27ed59a213cfa1e1cd_1280.jpg"
    },
    {
      id: 10,
      name: "AMD RX 6700 XT - 12GB",
      typeId: 3,
      price: 499.99,
      image: "https://pixabay.com/get/g13539c6bed650b4381fab8d20074885a04d68d54eb5471b0f3842071055cdf2f98827cb4ca3e76b0565f12efeb75ab174b941129c686e379d507e783d8b7c877_1280.jpg"
    }
  ],
  ram: [
    {
      id: 11,
      name: "8 Go DDR4 3200MHz",
      typeId: 4,
      price: 59.99,
      image: ""
    },
    {
      id: 12,
      name: "16 Go DDR4 3600MHz",
      typeId: 4,
      price: 99.99,
      image: ""
    },
    {
      id: 13,
      name: "32 Go DDR4 3600MHz",
      typeId: 4,
      price: 189.99,
      image: ""
    }
  ],
  storage: [
    {
      id: 14,
      name: "SSD 512 Go NVMe",
      typeId: 5,
      price: 79.99,
      image: ""
    },
    {
      id: 15,
      name: "SSD 1 To NVMe",
      typeId: 5,
      price: 129.99,
      image: ""
    },
    {
      id: 16,
      name: "SSD 1 To NVMe + HDD 2 To",
      typeId: 5,
      price: 199.98,
      image: ""
    }
  ],
  powerSupply: [
    {
      id: 17,
      name: "550W 80+ Bronze",
      typeId: 6,
      price: 69.99,
      image: ""
    },
    {
      id: 18,
      name: "650W 80+ Gold",
      typeId: 6,
      price: 99.99,
      image: ""
    },
    {
      id: 19,
      name: "750W 80+ Gold",
      typeId: 6,
      price: 129.99,
      image: ""
    }
  ]
};
