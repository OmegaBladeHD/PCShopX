import { 
  users, type User, type InsertUser, 
  type Product, type Category, type Component, type ComponentType 
} from "@shared/schema";
import { mockProducts, mockComponents } from "../client/src/lib/utils";

// Étendre l'interface de stockage avec toutes les méthodes CRUD nécessaires
export interface IStorage {
  // Méthodes pour les utilisateurs
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Méthodes pour les produits
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(categorySlug: string): Promise<Product[]>;
  
  // Méthodes pour les catégories
  getAllCategories(): Promise<Category[]>;
  
  // Méthodes pour les composants
  getAllComponents(): Promise<Record<string, Component[]>>;
  getComponentsByType(typeId: number): Promise<Component[]>;
  getAllComponentTypes(): Promise<ComponentType[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Product[];
  private categories: Category[];
  private components: Record<string, Component[]>;
  private componentTypes: ComponentType[];
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    
    // Initialisation avec des données de test
    this.products = mockProducts as unknown as Product[];
    
    // Catégories simulées
    this.categories = [
      { id: 1, name: "Ordinateurs Portables", slug: "laptops" },
      { id: 2, name: "PC de Bureau", slug: "desktops" },
      { id: 3, name: "Composants", slug: "components" }
    ];
    
    // Types de composants simulés
    this.componentTypes = [
      { id: 1, name: "Boîtier", slug: "case" },
      { id: 2, name: "Processeur", slug: "cpu" },
      { id: 3, name: "Carte Graphique", slug: "gpu" },
      { id: 4, name: "Mémoire", slug: "ram" },
      { id: 5, name: "Stockage", slug: "storage" },
      { id: 6, name: "Alimentation", slug: "power-supply" }
    ];
    
    // Composants simulés
    this.components = mockComponents as unknown as Record<string, Component[]>;
  }

  // Implémentation des méthodes pour les utilisateurs
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Implémentation des méthodes pour les produits
  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.find(product => product.id === id);
  }
  
  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    // Dans un environnement réel, on filtrerait par l'ID de la catégorie
    // Ici on simule avec les champs isLaptop/isGaming
    if (categorySlug === "laptops") {
      return this.products.filter(product => product.isLaptop);
    } else if (categorySlug === "desktops") {
      return this.products.filter(product => !product.isLaptop);
    }
    return this.products;
  }
  
  // Implémentation des méthodes pour les catégories
  async getAllCategories(): Promise<Category[]> {
    return this.categories;
  }
  
  // Implémentation des méthodes pour les composants
  async getAllComponents(): Promise<Record<string, Component[]>> {
    return this.components;
  }
  
  async getComponentsByType(typeId: number): Promise<Component[]> {
    // Trouver le type de composant
    const componentType = this.componentTypes.find(type => type.id === typeId);
    if (!componentType) return [];
    
    // Renvoyer les composants de ce type
    return this.components[componentType.slug] || [];
  }
  
  async getAllComponentTypes(): Promise<ComponentType[]> {
    return this.componentTypes;
  }
}

export const storage = new MemStorage();
