import { getRecipe } from "./recipes";
import type { Meal, Nutrition, Recipe } from "@/types";

export function getMealDishes(meal: Meal): Recipe[] {
  return meal.dishIds
    .map(getRecipe)
    .filter((r): r is Recipe => Boolean(r));
}

export function sumNutrition(items: { nutrition: Nutrition }[]): Nutrition {
  return items.reduce(
    (acc, i) => ({
      calories: acc.calories + i.nutrition.calories,
      protein: acc.protein + i.nutrition.protein,
      fat: acc.fat + i.nutrition.fat,
      carbs: acc.carbs + i.nutrition.carbs,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 },
  );
}

export function getMealNutrition(meal: Meal): Nutrition {
  return sumNutrition(getMealDishes(meal));
}