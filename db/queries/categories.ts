import { db } from "../index";
import { categories } from "../schema";

export type Category = typeof categories.$inferSelect;

export async function getCategories(): Promise<Category[]> {
  return db.select().from(categories).orderBy(categories.sortOrder);
}
