import Image from "next/image";
import { ChevronRight, CookingPot, Croissant, CupSoda, Soup } from "lucide-react";
import { getMealDishes, getMealNutrition } from "@/lib/menu-utils";
import type { Meal, MealType } from "@/types";

const MEAL_STYLE: Record<MealType, { icon: typeof Soup; color: string }> = {
  breakfast: { icon: CookingPot, color: "bg-green-100 text-green-600" },
  lunch: { icon: Soup, color: "bg-blue-100 text-blue-500" },
  snack: { icon: CupSoda, color: "bg-orange-100 text-orange-500" },
  dinner: { icon: Croissant, color: "bg-purple-100 text-purple-500" },
};

type Props = { meal: Meal; active: boolean; onSelect: () => void };

export function MealCard({ meal, active, onSelect }: Props) {
  const { icon: Icon, color } = MEAL_STYLE[meal.type];
  const dishes = getMealDishes(meal);
  const n = getMealNutrition(meal);

  return (
    <article
      className={`flex gap-5 rounded-2xl border bg-white p-4 transition ${
        active ? "border-brand ring-2 ring-brand/20" : "border-line"
      }`}
    >
      <div className="flex w-24 shrink-0 flex-col items-start gap-2 pt-2">
        <span className={`flex size-9 items-center justify-center rounded-full ${color}`}>
          <Icon size={18} />
        </span>
        <p className="font-bold">{meal.label}</p>
        <p className="-mt-1 text-sm text-gray-500">{meal.time}</p>
      </div>

      <div className="relative h-32 w-40 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        {dishes[0] && (
          <Image src={dishes[0].image} alt="" fill className="object-cover" />
        )}
      </div>

      <div className="flex flex-col items-start gap-2 py-1">
        <ul className="font-bold leading-snug">
          {dishes.map((d) => (
            <li key={d.id}>{d.name}</li>
          ))}
        </ul>

        <p className="text-sm text-gray-500">
          {n.calories} ккал &nbsp;•&nbsp; Б: {n.protein} г &nbsp;•&nbsp; Ж: {n.fat} г
          &nbsp;•&nbsp; У: {n.carbs} г
        </p>

        <button
          type="button"
          onClick={onSelect}
          className="mt-auto flex items-center gap-8 rounded-lg border border-line px-4 py-2 text-sm text-gray-600 transition hover:border-brand hover:text-brand"
        >
          Подробнее о блюде
          <ChevronRight size={16} />
        </button>
      </div>
    </article>
  );
}