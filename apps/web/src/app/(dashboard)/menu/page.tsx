"use client";

import { useMemo, useState } from "react";
import { CircleCheck, Download, SlidersHorizontal } from "lucide-react";
import { MealCard } from "@/components/menu/meal-card";
import { DishPanel } from "@/components/menu/dish-panel";
import { getMealNutrition, sumNutrition } from "@/lib/menu-utils";
import { weekMenu } from "@/lib/mock-menu";

export default function MenuPage() {
  const [dayId, setDayId] = useState(weekMenu.days[0].id);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);

  const day = weekMenu.days.find((d) => d.id === dayId)!;
  const selectedMeal = day.meals.find((m) => m.id === selectedMealId) ?? null;

  const total = useMemo(
    () => sumNutrition(day.meals.map((m) => ({ nutrition: getMealNutrition(m) }))),
    [day],
  );

  return (
    <main className="flex h-screen flex-col px-8 py-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">
            {weekMenu.title} ({weekMenu.period})
          </h1>
          <p className="mt-1 text-gray-500">
            Сбалансировано для {weekMenu.childrenCount} детей ({weekMenu.ageRange})
            &nbsp;·&nbsp; {weekMenu.mealsPerDay} приёма пищи в день
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-3 font-medium transition hover:bg-gray-50"
          >
            <SlidersHorizontal size={18} />
            Редактировать параметры
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark"
          >
            <CircleCheck size={18} />
            Утвердить меню
          </button>
        </div>
      </header>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          {weekMenu.days.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => {
                setDayId(d.id);
                setSelectedMealId(null);
              }}
              className={`rounded-xl px-6 py-2.5 font-semibold transition ${
                d.id === dayId
                  ? "bg-brand text-white"
                  : "border border-line bg-white hover:bg-gray-50"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-gray-600 transition hover:bg-gray-50"
        >
          <Download size={18} />
          Экспорт меню (PDF)
        </button>
      </div>

      <div className="mt-5 grid min-h-0 flex-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex min-h-0 flex-col gap-4">
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1">
            {day.meals.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-line p-10 text-center text-gray-500">
                Меню на этот день ещё не составлено
              </p>
            ) : (
              day.meals.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  active={meal.id === selectedMealId}
                  onSelect={() => setSelectedMealId(meal.id)}
                />
              ))
            )}
          </div>

          <div className="flex flex-wrap items-center gap-8 rounded-2xl border border-line bg-white px-6 py-4">
            <p className="font-extrabold">
              Итого за день:{" "}
              <span className="text-brand">{total.calories} ккал</span>
            </p>
            <p className="text-gray-500">Белки: {total.protein}</p>
            <p className="text-gray-500">Жиры: {total.fat}</p>
            <p className="text-gray-500">Углеводы: {total.carbs}</p>
          </div>
        </div>

        <DishPanel meal={selectedMeal} />
      </div>
    </main>
  );
}