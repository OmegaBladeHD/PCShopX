import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API prefix for all routes
  const API_PREFIX = "/api";

  // Get all products
  app.get(`${API_PREFIX}/products`, async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get product by id
  app.get(`${API_PREFIX}/products/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Get all categories
  app.get(`${API_PREFIX}/categories`, async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Get all products by category
  app.get(`${API_PREFIX}/categories/:slug/products`, async (req, res) => {
    try {
      const { slug } = req.params;
      const products = await storage.getProductsByCategory(slug);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  // Get all components
  app.get(`${API_PREFIX}/components`, async (req, res) => {
    try {
      const components = await storage.getAllComponents();
      res.json(components);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch components" });
    }
  });

  // Get components by type
  app.get(`${API_PREFIX}/components/type/:typeId`, async (req, res) => {
    try {
      const typeId = parseInt(req.params.typeId);
      if (isNaN(typeId)) {
        return res.status(400).json({ message: "Invalid component type ID" });
      }

      const components = await storage.getComponentsByType(typeId);
      res.json(components);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch components by type" });
    }
  });

  // Get all component types
  app.get(`${API_PREFIX}/component-types`, async (req, res) => {
    try {
      const types = await storage.getAllComponentTypes();
      res.json(types);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch component types" });
    }
  });

  // User registration
  app.post(`${API_PREFIX}/auth/register`, async (req, res) => {
    try {
      const userInput = insertUserSchema.parse(req.body);
      
      // Check if user exists
      const existingUser = await storage.getUserByUsername(userInput.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      // Check if email exists
      const existingEmail = await storage.getUserByEmail(userInput.email);
      if (existingEmail) {
        return res.status(409).json({ message: "Email already exists" });
      }

      const newUser = await storage.createUser(userInput);
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = newUser;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  // User login
  app.post(`${API_PREFIX}/auth/login`, async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) { // In a real app, use bcrypt for password comparison
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Don't return the password in the response
      const { password: _, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
