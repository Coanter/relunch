import { PRODUCTS } from "./products";
import { getMealDishes } from "./menu-utils";
import type { ShoppingItem, WeekMenu } from "@/types";

function toBaseUnit(amount: number, unit: "г" | "мл" | "шт") {
  return unit === "шт" ? amount : amount / 1000;
}

export function buildShoppingList(
  menu: WeekMenu,
  childrenCount: number,
): { items: ShoppingItem[]; totalWeight: number; totalCost: number } {
  const totals = new Map<string, number>();

  for (const day of menu.days) {
    for (const meal of day.meals) {
      for (const dish of getMealDishes(meal)) {
        for (const ing of dish.ingredients) {
          const qty = toBaseUnit(ing.amount, ing.unit) * childrenCount;
          totals.set(ing.productId, (totals.get(ing.productId) ?? 0) + qty);
        }
      }
    }
  }

  const items: ShoppingItem[] = [];

  for (const [productId, rawQty] of totals) {
    const product = PRODUCTS[productId];
    if (!product) continue;
    const quantity = Math.ceil(rawQty);
    items.push({ product, quantity, total: quantity * product.pricePerUnit });
  }

  items.sort((a, b) => b.total - a.total);

  return {
    items,
    totalWeight: items
      .filter((i) => i.product.unit === "кг")
      .reduce((sum, i) => sum + i.quantity, 0),
    totalCost: items.reduce((sum, i) => sum + i.total, 0),
  };
}