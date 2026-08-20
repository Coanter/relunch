"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Bookmark,
  ChevronDown,
  Clock,
  ListFilter,
  Plus,
  Search,
  Settings2,
  Users,
} from "lucide-react";
import { CATEGORY_LABELS, RECIPES } from "@/lib/recipes";
import { PRODUCTS } from "@/lib/products";
import { weekMenu } from "@/lib/mock-menu";
import type { Recipe, RecipeCategory } from "@/types";

const PAGE_SIZE = 9;

function formatTime(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!h) return `${m} мин`;
  return m ? `${h} ч ${m} мин` : `${h} ч`;
}

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<RecipeCategory | "all">("all");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Recipe | null>(null);

  const counts = useMemo(() => {
    const map = new Map<RecipeCategory, number>();
    for (const r of RECIPES) map.set(r.category, (map.get(r.category) ?? 0) + 1);
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECIPES.filter((r) => {
      if (category !== "all" && r.category !== category) return false;
      if (onlyFavorites && !r.isFavorite) return false;
      if (!q) return true;
      const inName = r.name.toLowerCase().includes(q);
      const inIngredients = r.ingredients.some((i) =>
        PRODUCTS[i.productId]?.name.toLowerCase().includes(q),
      );
      return inName || inIngredients;
    });
  }, [query, category, onlyFavorites]);

  const visible = filtered.slice(0, limit);

  return (
    <main className="flex h-screen flex-col px-8 py-6">
      <header className="flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-extrabold">Рецепты</h1>

        <div className="relative min-w-64 flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(PAGE_SIZE);
            }}
            placeholder="Поиск по названию блюда, ингредиенту..."
            className="w-full rounded-xl border border-line bg-white py-3 pl-12 pr-4 outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-3 font-medium transition hover:bg-gray-50"
        >
          <ListFilter size={18} />
          Фильтр
        </button>

        <button
          type="button"
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          className={`flex items-center gap-2 rounded-xl border px-5 py-3 font-medium transition ${
            onlyFavorites
              ? "border-brand bg-brand-light text-brand-dark"
              : "border-line bg-white hover:bg-gray-50"
          }`}
        >
          <Bookmark size={18} />
          Избранное
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark"
        >
          <Plus size={18} />
          Добавить рецепт
        </button>
      </header>

      <p className="mt-5 text-gray-500">Найдено {filtered.length} рецепта</p>

      <div className="mt-3 grid min-h-0 flex-1 gap-5 lg:grid-cols-[220px_1.7fr_1fr]">
        {/* КАТЕГОРИИ */}
        <aside className="flex flex-col rounded-2xl border border-line bg-white p-3">
          <nav className="flex flex-col gap-0.5">
            <CategoryButton
              label="Все рецепты"
              count={RECIPES.length}
              active={category === "all"}
              onClick={() => {
                setCategory("all");
                setLimit(PAGE_SIZE);
              }}
            />
            {(Object.keys(CATEGORY_LABELS) as RecipeCategory[]).map((key) => (
              <CategoryButton
                key={key}
                label={CATEGORY_LABELS[key]}
                count={counts.get(key) ?? 0}
                active={category === key}
                onClick={() => {
                  setCategory(key);
                  setLimit(PAGE_SIZE);
                }}
              />
            ))}
          </nav>

          <button
            type="button"
            className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-line px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            <Settings2 size={18} className="text-brand" />
            Управление категориями
          </button>
        </aside>

        {/* СЕТКА РЕЦЕПТОВ */}
        <section className="flex min-h-0 flex-col">
          <div className="grid flex-1 auto-rows-min gap-4 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((recipe) => (
              <button
                key={recipe.id}
                type="button"
                onClick={() => setSelected(recipe)}
                className={`overflow-hidden rounded-2xl border bg-white text-left transition hover:shadow-md ${
                  selected?.id === recipe.id
                    ? "border-brand ring-2 ring-brand/20"
                    : "border-line"
                }`}
              >
                <div className="relative h-36 w-full bg-gray-100">
                  <Image src={recipe.image} alt="" fill className="object-cover" />
                </div>

                <div className="flex flex-col gap-2 p-4">
                  <p className="font-bold leading-snug">{recipe.name}</p>

                  <span className="w-fit rounded-md bg-brand-light px-2.5 py-1 text-xs font-medium text-brand-dark">
                    {CATEGORY_LABELS[recipe.category]}
                  </span>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Users size={14} />
                      {weekMenu.childrenCount} порции
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {formatTime(recipe.cookTimeMin)}
                    </span>
                  </div>
                </div>
              </button>
            ))}

            {filtered.length === 0 && (
              <p className="col-span-full rounded-2xl border border-dashed border-line p-10 text-center text-gray-500">
                Ничего не найдено
              </p>
            )}
          </div>

          {limit < filtered.length && (
            <button
              type="button"
              onClick={() => setLimit(limit + PAGE_SIZE)}
              className="mx-auto mt-4 flex items-center gap-2 rounded-xl border border-line bg-white px-6 py-3 font-medium transition hover:bg-gray-50"
            >
              Показать ещё
              <ChevronDown size={18} />
            </button>
          )}
        </section>

        {/* ПАНЕЛЬ РЕЦЕПТА */}
        <RecipePanel recipe={selected} />
      </div>
    </main>
  );
}

function CategoryButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between rounded-xl px-4 py-3 transition ${
        active ? "bg-brand-light font-semibold text-brand-dark" : "hover:bg-gray-50"
      }`}
    >
      {label}
      <span className={active ? "" : "text-gray-500"}>{count}</span>
    </button>
  );
}

function RecipePanel({ recipe }: { recipe: Recipe | null }) {
  if (!recipe) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-white p-8 text-center">
        <div className="text-6xl">📖</div>
        <p className="text-xl font-extrabold">Выберите рецепт</p>
        <p className="max-w-xs text-gray-500">
          Нажмите на любое блюдо, чтобы посмотреть ингредиенты, способ
          приготовление и другую информацию
        </p>
      </div>
    );
  }

  const n = recipe.nutrition;

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto rounded-2xl border border-line bg-white p-6">
      <div className="relative h-40 w-full overflow-hidden rounded-xl bg-gray-100">
        <Image src={recipe.image} alt="" fill className="object-cover" />
      </div>

      <div>
        <h3 className="text-xl font-extrabold">{recipe.name}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {CATEGORY_LABELS[recipe.category]} · выход {recipe.portionWeight} г ·{" "}
          {formatTime(recipe.cookTimeMin)}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 rounded-xl bg-brand-light p-3 text-center">
        {[
          ["ккал", n.calories],
          ["Б", n.protein],
          ["Ж", n.fat],
          ["У", n.carbs],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="font-bold text-brand-dark">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <section>
        <p className="text-sm font-semibold text-gray-500">
          Ингредиенты на 1 порцию
        </p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {recipe.ingredients.map((i) => (
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
      </section>

      <section>
        <p className="text-sm font-semibold text-gray-500">Приготовление</p>
        <ol className="mt-2 flex list-inside list-decimal flex-col gap-1.5 text-sm">
          {recipe.cooking.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}