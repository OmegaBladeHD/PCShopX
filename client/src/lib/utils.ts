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
// Importation des images pour les produits
// Laptops
import msiKatana1 from "../assets/images/laptops/msi_katana_1.jpg";
import rogStrixG15_1 from "../assets/images/laptops/rog_strix_g15_1.jpg";
import dellLatitude1 from "../assets/images/laptops/dell_latitude_1.webp";
import legion7_1 from "../assets/images/laptops/legion_7_1.png";

// Desktops
import ryzen5Rtx4060_1 from "../assets/images/desktops/ryzen5_rtx4060_1.png";
import ryzen7Rtx5090_1 from "../assets/images/desktops/ryzen7_rtx5090_1.png";

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
    image: msiKatana1,
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
    image: ryzen7Rtx5090_1,
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
    image: dellLatitude1,
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
    image: ryzen5Rtx4060_1,
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
    image: legion7_1,
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
    image: rogStrixG15_1,
    weight: "2.3 kg",
    description: "PC portable gaming avec design audacieux, RGB synchronisé et performances de haute volée pour tous vos jeux.",
    isLaptop: true,
    isGaming: true
  }
];

// Importation des images pour les composants
// Boîtiers
import phanteksCase from "@assets/images/components/case/phanteks_xt_pro.jpg";
import musetexCase from "@assets/images/components/case/musetex_rgb.jpg";

// CPUs
import i5_13400f from "@assets/images/components/cpu/i5_13400f.jpg";
import i7_13700kf from "@assets/images/components/cpu/i7_13700kf.jpg";
import ryzen5_5600x from "@assets/images/components/cpu/ryzen5_5600x.jpg";
import ryzen7_5700g from "@assets/images/components/cpu/ryzen7_5700g.jpg";

// GPUs
import rtx4060_1 from "@assets/images/components/gpu/rtx4060_1.jpg";
import rtx4070_1 from "@assets/images/components/gpu/rtx4070_1.jpg";
import rtx5090_1 from "@assets/images/components/gpu/rtx5090_1.jpg";

// RAM
import corsair16gb from "@assets/images/components/ram/corsair_16gb.jpg";
import corsair32gb from "@assets/images/components/ram/corsair_32gb.jpg";
import corsair64gb from "@assets/images/components/ram/corsair_64gb.jpg";

// Mock PC component data
export const mockComponents: { [key: string]: Component[] } = {
  case: [
    {
      id: 1,
      name: "Phanteks XT Pro Ultra",
      typeId: 1,
      price: 149.99,
      image: phanteksCase
    },
    {
      id: 2,
      name: "MUSETEX ATX RGB",
      typeId: 1,
      price: 109.99,
      image: musetexCase
    },
    {
      id: 3,
      name: "Be Quiet Pure Base 500",
      typeId: 1,
      price: 89.99,
      image: musetexCase
    }
  ],
  cpu: [
    {
      id: 4,
      name: "Intel Core i5-13400F",
      typeId: 2,
      price: 199.99,
      image: i5_13400f
    },
    {
      id: 5,
      name: "Intel Core i7-13700KF",
      typeId: 2,
      price: 429.99,
      image: i7_13700kf
    },
    {
      id: 6,
      name: "AMD Ryzen 5 5600X",
      typeId: 2,
      price: 249.99,
      image: ryzen5_5600x
    },
    {
      id: 7,
      name: "AMD Ryzen 7 5700G",
      typeId: 2,
      price: 329.99,
      image: ryzen7_5700g
    }
  ],
  gpu: [
    {
      id: 8,
      name: "NVIDIA RTX 4060 - 8GB",
      typeId: 3,
      price: 349.99,
      image: rtx4060_1
    },
    {
      id: 9,
      name: "NVIDIA RTX 4070 - 12GB",
      typeId: 3,
      price: 629.99,
      image: rtx4070_1
    },
    {
      id: 10,
      name: "NVIDIA RTX 5090 - 24GB",
      typeId: 3,
      price: 1999.99,
      image: rtx5090_1
    }
  ],
  ram: [
    {
      id: 11,
      name: "Corsair Vengeance RGB 16Go (2x8GB)",
      typeId: 4,
      price: 79.99,
      image: corsair16gb
    },
    {
      id: 12,
      name: "Corsair Vengeance RGB Pro 32Go (2x16GB)",
      typeId: 4,
      price: 129.99,
      image: corsair32gb
    },
    {
      id: 13,
      name: "Corsair Vengeance RGB DDR5 64Go (2x32GB)",
      typeId: 4,
      price: 269.99,
      image: corsair64gb
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
