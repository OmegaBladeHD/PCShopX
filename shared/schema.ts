import { pgTable, text, serial, integer, boolean, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define user table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

// Define product categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  slug: true,
});

// Define products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  price: doublePrecision("price").notNull(),
  categoryId: integer("category_id").notNull(),
  cpuType: text("cpu_type").notNull(), // Intel or AMD
  cpu: text("cpu").notNull(), // Full CPU name
  gpuType: text("gpu_type").notNull(), // NVIDIA, AMD, or Intel
  gpu: text("gpu").notNull(), // Full GPU name
  ram: integer("ram").notNull(), // Amount in GB
  storage: text("storage").notNull(), // Description of storage
  image: text("image").notNull(), // Image URL
  weight: text("weight"), // Optional weight info
  description: text("description").notNull(),
  isLaptop: boolean("is_laptop").notNull().default(false),
  isGaming: boolean("is_gaming").notNull().default(false),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

// Define PC components for configurator
export const componentTypes = pgTable("component_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const insertComponentTypeSchema = createInsertSchema(componentTypes).pick({
  name: true,
  slug: true,
});

export const components = pgTable("components", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  typeId: integer("type_id").notNull(),
  price: doublePrecision("price").notNull(),
  image: text("image").notNull(),
  description: text("description"),
});

export const insertComponentSchema = createInsertSchema(components).omit({
  id: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type ComponentType = typeof componentTypes.$inferSelect;
export type InsertComponentType = z.infer<typeof insertComponentTypeSchema>;

export type Component = typeof components.$inferSelect;
export type InsertComponent = z.infer<typeof insertComponentSchema>;
