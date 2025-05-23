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
    name: "PC GAMER - AMD Ryzen 7 9800X3D - RTX 5090",
    brand: "Custom",
    price: 3899.99,
    category: "desktop",
    cpuType: "AMD",
    cpu: "AMD Ryzen 7 9800X3D",
    gpuType: "NVIDIA",
    gpu: "NVIDIA RTX 5090 24GB",
    ram: 32,
    storage: "2TB SSD NVMe",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    weight: "15 kg",
    description: "Tour gaming ultime avec éclairage RGB pour une expérience de jeu immersive et des performances exceptionnelles.",
    isLaptop: false,
    isGaming: true
  },
  {
    id: 3,
    name: "Dell Latitude 5420",
    brand: "Dell",
    price: 1399.99,
    category: "laptop",
    cpuType: "Intel",
    cpu: "Intel Core i7-1185G7",
    gpuType: "Intel",
    gpu: "Intel Iris Xe Graphics",
    ram: 16,
    storage: "512GB SSD NVMe",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    weight: "1.4 kg",
    description: "Portable premium pour les professionnels, alliant puissance, fiabilité et élégance dans un format compact.",
    isLaptop: true,
    isGaming: false
  },
  {
    id: 4,
    name: "PC GAMER - AMD Ryzen 5 - RTX 4060",
    brand: "Custom",
    price: 1499.99,
    category: "desktop",
    cpuType: "AMD",
    cpu: "AMD Ryzen 5 3500X",
    gpuType: "NVIDIA",
    gpu: "NVIDIA RTX 4060 8GB",
    ram: 16,
    storage: "480GB SSD + 2TB HDD",
    image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    weight: "12 kg",
    description: "Tour gaming avec un excellent rapport qualité-prix pour des performances de jeu solides.",
    isLaptop: false,
    isGaming: true
  },
  {
    id: 5,
    name: "Lenovo Legion 7 Pro",
    brand: "Lenovo",
    price: 1999.99,
    category: "laptop",
    cpuType: "AMD",
    cpu: "AMD Ryzen 9 7945HX",
    gpuType: "NVIDIA",
    gpu: "NVIDIA RTX 4090 16GB",
    ram: 32,
    storage: "2TB SSD NVMe",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    weight: "2.5 kg",
    description: "Le portable gaming ultime avec écran 16:10 QHD+ 240Hz et performances de pointe pour une expérience immersive.",
    isLaptop: true,
    isGaming: true
  },
  {
    id: 6,
    name: "ASUS ROG Strix G15",
    brand: "ASUS",
    price: 1699.99,
    category: "laptop",
    cpuType: "AMD",
    cpu: "AMD Ryzen 7 6800H",
    gpuType: "NVIDIA",
    gpu: "NVIDIA RTX 3070 Ti 8GB",
    ram: 16,
    storage: "1TB SSD NVMe",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    weight: "2.3 kg",
    description: "PC portable gaming avec design audacieux, RGB synchronisé et performances de haute volée pour tous vos jeux.",
    isLaptop: true,
    isGaming: true
  }
];

// Mock PC component data
export const mockComponents: { [key: string]: Component[] } = {
  case: [
    {
      id: 1,
      name: "Phanteks XT Pro Ultra",
      typeId: 1,
      price: 149.99,
      image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "MUSETEX ATX RGB",
      typeId: 1,
      price: 109.99,
      image: "https://pixabay.com/get/g1db56f1356a9d7f175b67de509271bba8a4d10c8a621541ad777adf4f0f08a56601297e7a6f1669040bd9a88c1a56ac9ffb54fd41dee34bf28c2cd86a0480113_1280.jpg"
    },
    {
      id: 3,
      name: "Be Quiet Pure Base 500",
      typeId: 1,
      price: 89.99,
      image: "https://pixabay.com/get/ge183743c12088c8bf6c69433c1ef702c9902d5e8c385ac69ad8b95937422c8b762ae4378fb69ed688f0905b6a1c2c6ea1104cc84203b971113908291a6921d01_1280.jpg"
    }
  ],
  cpu: [
    {
      id: 4,
      name: "Intel Core i5-13400F",
      typeId: 2,
      price: 199.99,
      image: "https://images.unsplash.com/photo-1591799265444-d66432b91588?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Intel Core i7-13700KF",
      typeId: 2,
      price: 429.99,
      image: "https://images.unsplash.com/photo-1591799265444-d66432b91588?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "AMD Ryzen 5 5600X",
      typeId: 2,
      price: 249.99,
      image: "https://images.unsplash.com/photo-1591799265444-d66432b91588?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      name: "AMD Ryzen 7 5700G",
      typeId: 2,
      price: 329.99,
      image: "https://images.unsplash.com/photo-1591799265444-d66432b91588?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ],
  gpu: [
    {
      id: 8,
      name: "NVIDIA RTX 4060 - 8GB",
      typeId: 3,
      price: 349.99,
      image: "https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 9,
      name: "NVIDIA RTX 4070 - 12GB",
      typeId: 3,
      price: 629.99,
      image: "https://pixabay.com/get/g954e43b72d7136149b3122d4992d6a6eec0783f05f6b3fe7ae865c2198199856a088f8e7e041567711e9648f038ba47e42eab42ab8b77b27ed59a213cfa1e1cd_1280.jpg"
    },
    {
      id: 10,
      name: "NVIDIA RTX 5090 - 24GB",
      typeId: 3,
      price: 1999.99,
      image: "https://pixabay.com/get/g13539c6bed650b4381fab8d20074885a04d68d54eb5471b0f3842071055cdf2f98827cb4ca3e76b0565f12efeb75ab174b941129c686e379d507e783d8b7c877_1280.jpg"
    }
  ],
  ram: [
    {
      id: 11,
      name: "Corsair Vengeance RGB 16Go (2x8GB)",
      typeId: 4,
      price: 79.99,
      image: "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 12,
      name: "Corsair Vengeance RGB Pro 32Go (2x16GB)",
      typeId: 4,
      price: 129.99,
      image: "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 13,
      name: "Corsair Vengeance RGB DDR5 64Go (2x32GB)",
      typeId: 4,
      price: 269.99,
      image: "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ],
  storage: [
    {
      id: 14,
      name: "SSD 512 Go NVMe",
      typeId: 5,
      price: 69.99,
      image: ""
    },
    {
      id: 15,
      name: "SSD 1 To NVMe",
      typeId: 5,
      price: 109.99,
      image: ""
    },
    {
      id: 16,
      name: "SSD 2 To NVMe + HDD 2 To",
      typeId: 5,
      price: 229.99,
      image: ""
    }
  ],
  powerSupply: [
    {
      id: 17,
      name: "550W 80+ Bronze",
      typeId: 6,
      price: 59.99,
      image: ""
    },
    {
      id: 18,
      name: "650W 80+ Gold",
      typeId: 6,
      price: 89.99,
      image: ""
    },
    {
      id: 19,
      name: "850W 80+ Platinum",
      typeId: 6,
      price: 149.99,
      image: ""
    }
  ]
};
