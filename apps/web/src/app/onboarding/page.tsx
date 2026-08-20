"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const MEALS_OPTIONS = [
  "2 приёма (завтрак, обед)",
  "3 приёма (завтрак, обед, полдник)",
  "4 приёма (завтрак, обед, полдник, ужин)",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [childrenCount, setChildrenCount] = useState("");
  const [groups, setGroups] = useState(["1 - 3 года", "3 - 7 лет"]);
  const [meals, setMeals] = useState(MEALS_OPTIONS[2]);

  const addGroup = () => {
    const label = prompt("Название группы, например «3 - 5 лет»");
    if (label?.trim()) setGroups([...groups, label.trim()]);
  };

  const handleSubmit = () => {
    // TODO: POST /api/kindergarten
    router.push("/dashboard");
  };

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-5 py-4 font-semibold outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-extrabold">Создайте ваш детский сад</h1>
      <p className="mt-2 text-gray-500">
        Укажите основную информацию о вашем саде
      </p>

      <div className="mt-10 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-500">
            Название детского сада
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Детский сад №15"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="count" className="text-gray-500">
            Количество детей
          </label>
          <input
            id="count"
            type="number"
            min={1}
            value={childrenCount}
            onChange={(e) => setChildrenCount(e.target.value)}
            placeholder="42"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-gray-500">Возрастные группы</span>
          <div className="flex flex-wrap items-center gap-4">
            {groups.map((g) => (
              <span
                key={g}
                className="rounded-xl border border-line px-5 py-3.5 font-semibold"
              >
                {g}
              </span>
            ))}
            <button
              type="button"
              onClick={addGroup}
              className="font-bold transition hover:text-brand"
            >
              + Добавить группу
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="meals" className="text-gray-500">
            Количество приемов пищи
          </label>
          <select
            id="meals"
            value={meals}
            onChange={(e) => setMeals(e.target.value)}
            className={inputClass}
          >
            {MEALS_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-2 rounded-xl bg-brand py-4 font-bold text-white transition hover:bg-brand-dark"
        >
          Продолжить
        </button>
      </div>
    </main>
  );
}