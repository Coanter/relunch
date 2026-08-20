import Image from "next/image";
import { getMealDishes, getMealNutrition } from "@/lib/menu-utils";
import { PRODUCTS } from "@/lib/products";
import type { Meal } from "@/types";

export function DishPanel({ meal }: { meal: Meal | null }) {
  if (!meal) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-white p-8 text-center">
        <div className="text-6xl">🍽️</div>
        <p className="text-xl font-extrabold">Выберите блюдо</p>
        <p className="max-w-xs text-gray-500">
          Нажмите на любое блюдо в меню, чтобы посмотреть ингредиенты,
          приготовление и другую информацию
        </p>
      </div>
    );
  }

  const dishes = getMealDishes(meal);
  const total = getMealNutrition(meal);

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto rounded-2xl border border-line bg-white p-6">
      <div className="relative h-40 w-full overflow-hidden rounded-xl bg-gray-100">
        {dishes[0] && (
          <Image src={dishes[0].image} alt="" fill className="object-cover" />
        )}
      </div>

      <div>
        <p className="text-sm text-gray-500">
          {meal.label} · {meal.time}
        </p>
        <h3 className="text-xl font-extrabold leading-snug">
          {dishes.map((d) => d.name).join(" · ")}
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-2 rounded-xl bg-brand-light p-3 text-center">
        {[
          ["ккал", total.calories],
          ["Б", total.protein],
          ["Ж", total.fat],
          ["У", total.carbs],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="font-bold text-brand-dark">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {dishes.map((dish) => (
        <section key={dish.id} className="border-t border-line pt-4">
          <p className="font-bold">{dish.name}</p>
          <p className="mt-0.5 text-sm text-gray-500">
            Выход: {dish.portionWeight} г · {dish.nutrition.calories} ккал
          </p>

          <p className="mt-3 text-sm font-semibold text-gray-500">
            Ингредиенты на 1 порцию
          </p>
          <ul className="mt-1.5 flex flex-col gap-1">
            {dish.ingredients.map((i) => (
              <li key={i.productId} className="flex justify-between text-sm">
                <span>
                  <span className="mr-2">{PRODUCTS[i.productId]?.emoji}</span>
                  {PRODUCTS[i.productId]?.name ?? i.productId}
                </span>
                <span className="text-gray-500">
                  {i.amount} {i.unit}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-3 text-sm font-semibold text-gray-500">
            Приготовление
          </p>
          <ol className="mt-1.5 flex list-inside list-decimal flex-col gap-1 text-sm">
            {dish.cooking.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}