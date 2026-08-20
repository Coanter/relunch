"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  Download,
  Info,
  Pencil,
  Scale,
  Send,
  ShoppingBasket,
  SlidersHorizontal,
  CircleCheck,
  Wallet,
} from "lucide-react";
import { weekMenu } from "@/lib/mock-menu";
import { buildShoppingList } from "@/lib/build-shopping-list";

const VISIBLE = 13;

export default function PurchasesPage() {
  const [expanded, setExpanded] = useState(false);

  const { items, totalWeight, totalCost } = useMemo(
    () => buildShoppingList(weekMenu, weekMenu.childrenCount),
    [],
  );

  const visible = expanded ? items : items.slice(0, VISIBLE);

  return (
    <main className="px-8 py-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">
            Список закупок на неделю ({weekMenu.period})
          </h1>
          <p className="mt-1 text-gray-500">
            Основано на утверждённом меню для {weekMenu.childrenCount} детей (
            {weekMenu.ageRange}) &nbsp;·&nbsp; {weekMenu.mealsPerDay} приёма пищи в день
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-3 font-medium transition hover:bg-gray-50"
          >
            <SlidersHorizontal size={18} />
            Редактировать меню
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark"
          >
            <CircleCheck size={18} />
            Сформировать закупку
          </button>
        </div>
      </header>

      <section className="mt-5 flex flex-wrap items-center gap-10 rounded-2xl border border-line bg-white px-6 py-4">
        <span className="flex size-11 items-center justify-center rounded-xl text-brand">
          <ShoppingBasket size={28} />
        </span>

        {[
          { label: "Период закупки", value: weekMenu.period },
          { label: "Количество детей", value: `${weekMenu.childrenCount} ребенка` },
          { label: "Приёмы пищи", value: `${weekMenu.mealsPerDay} раза в день` },
        ].map((f) => (
          <div key={f.label}>
            <p className="text-sm text-gray-500">{f.label}</p>
            <p className="text-lg font-bold">{f.value}</p>
          </div>
        ))}

        <button
          type="button"
          className="ml-auto flex items-center gap-2 text-gray-600 transition hover:text-brand"
        >
          <Pencil size={18} />
          Изменить параметры
        </button>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.9fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-line bg-white">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Продукт</th>
                <th className="px-4 py-4 font-semibold">Количество</th>
                <th className="px-4 py-4 font-semibold">Ед. изм.</th>
                <th className="px-4 py-4 font-semibold">Цена за ед.</th>
                <th className="px-6 py-4 font-semibold">Стоимость</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {visible.map(({ product, quantity, total }) => (
                <tr key={product.id}>
                  <td className="px-6 py-3.5 font-bold">
                    <span className="mr-3">{product.emoji}</span>
                    {product.name}
                  </td>
                  <td className="px-4 text-center font-bold">{quantity}</td>
                  <td className="px-4 text-center text-gray-500">{product.unit}</td>
                  <td className="px-4 text-center font-bold">
                    {product.pricePerUnit} сом
                  </td>
                  <td className="px-6 text-center font-bold">{total} сом</td>
                </tr>
              ))}
            </tbody>
          </table>

          {items.length > VISIBLE && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="flex w-full items-center justify-center gap-2 bg-gray-50 py-4 font-bold text-brand transition hover:bg-gray-100"
            >
              {expanded ? "Свернуть" : `Показать все продукты (${items.length})`}
              <ChevronDown
                size={20}
                className={expanded ? "rotate-180 transition" : "transition"}
              />
            </button>
          )}
        </section>

        <aside className="flex flex-col gap-5">
          <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-xl font-extrabold">Итого по закупке</h2>

            <div className="mt-5 flex flex-col gap-4 divide-y divide-line">
              <div className="flex gap-3">
                <ShoppingBasket size={24} className="shrink-0 text-brand" />
                <div>
                  <p className="text-gray-600">Общее количество продуктов</p>
                  <p className="mt-1">
                    <span className="text-lg font-bold">{items.length}</span>{" "}
                    <span className="text-gray-500">наименования</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Scale size={24} className="shrink-0 text-brand" />
                <div>
                  <p className="text-gray-600">Общий вес</p>
                  <p className="mt-1 text-lg font-bold">{totalWeight} кг</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Wallet size={24} className="shrink-0 text-brand" />
                <div>
                  <p className="text-gray-600">Предварительная стоимость</p>
                  <p className="mt-1 text-2xl font-extrabold text-brand">
                    {totalCost.toLocaleString("ru-RU")} сом
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-5 flex gap-3 rounded-xl bg-brand-light p-4 text-sm text-gray-700">
              <Info size={20} className="shrink-0 text-brand" />
              Стоимость указана ориентировочно и может меняться в зависимости от
              поставщика
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-5">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-xl border border-line py-3.5 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <Download size={18} className="text-brand" />
              Скачать список (PDF)
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-xl border border-line py-3.5 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <Send size={18} className="text-brand" />
              Отправить поставщику
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}