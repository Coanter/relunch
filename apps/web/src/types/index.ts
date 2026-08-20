import type { Product } from "@/lib/products";

export type Nutrition = {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};

export type Ingredient = {
  productId: string;
  /** количество на ОДНУ порцию */
  amount: number;
  unit: "г" | "мл" | "шт";
};

export type RecipeCategory =
  | "first"
  | "second"
  | "side"
  | "porridge"
  | "salad"
  | "drink"
  | "bakery"
  | "dessert"
  | "sauce";

export type Recipe = {
  id: string;
  name: string;
  category: RecipeCategory;
  image: string;
  cookTimeMin: number;
  portionWeight: number;
  nutrition: Nutrition;
  ingredients: Ingredient[];
  cooking: string[];
  isFavorite?: boolean;
};

export type MealType = "breakfast" | "lunch" | "snack" | "dinner";

export type Meal = {
  id: string;
  type: MealType;
  label: string;
  time: string;
  /** ссылки на рецепты из библиотеки */
  dishIds: string[];
};

export type MenuDay = {
  id: string;
  label: string;
  meals: Meal[];
};

export type MenuStatus = "approved" | "draft";

export type WeekMenu = {
  id: string;
  title: string;
  period: string;
  childrenCount: number;
  ageRange: string;
  mealsPerDay: number;
  status: MenuStatus;
  days: MenuDay[];
};

export type MenuItem = {
  id: string;
  title: string;
  period: string;
  status: MenuStatus;
};

export type ShoppingItem = {
  product: Product;
  quantity: number;
  total: number;
};

export type AgeGroup = {
  id: string;
  label: string;
  minAge: number;
  maxAge: number;
  childrenCount: number;
};

export type Kindergarten = {
  id: string;
  name: string;
  childrenCount: number;
  ageGroups: AgeGroup[];
  mealsPerDay: number;
};

export type Notification = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
};