import { ChevronDown, Coins, TrendingUp, Users } from "lucide-react";
import {
  kindergarten,
  currentUser,
  notifications,
  recentMenus,
  stats,
} from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <main className="px-10 py-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">
            Доброе утро, {currentUser.firstName}!
          </h1>
          <button
            type="button"
            className="mt-2 flex items-center gap-1.5 text-gray-500 transition hover:text-ink"
          >
            {kindergarten.name}
            <ChevronDown size={18} />
          </button>
        </div>

        <button
          type="button"
          className="rounded-xl bg-brand px-7 py-3.5 font-bold text-white transition hover:bg-brand-dark"
        >
          + Создать меню
        </button>
      </header>

      <section className="mt-6 grid gap-5 lg:grid-cols-3">
        <article className="relative overflow-hidden rounded-2xl border border-line bg-white p-6">
          <p className="font-semibold">Экономия продуктов</p>
          <p className="text-sm text-gray-500">за этот месяц</p>
          <p className="mt-6 text-5xl font-extrabold">
            {stats.savingsPercent}
            <span className="text-3xl text-brand">%</span>
          </p>
          <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand">
            <TrendingUp size={16} />
            {stats.savingsDelta}% к прошлому месяцу
          </p>
        </article>

        <article className="rounded-2xl border border-line bg-white p-6">
          <p className="font-semibold">Бюджет на неделю</p>
          <p className="mt-9 text-4xl font-extrabold">
            {stats.weeklyBudget.toLocaleString("ru-RU")} {stats.currency}
          </p>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm font-medium text-brand">
              {stats.withinBudget ? "в пределах бюджета" : "превышен"}
            </p>
            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-light text-brand">
              <Coins size={22} />
            </span>
          </div>
        </article>

        <article className="rounded-2xl border border-line bg-white p-6">
          <div className="flex items-start justify-between">
            <p className="font-semibold">Детей в саду</p>
            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-light text-brand">
              <Users size={22} />
            </span>
          </div>
          <p className="mt-4 text-5xl font-extrabold">
            {kindergarten.childrenCount}
          </p>
          <div className="mt-4 flex divide-x divide-line text-sm text-gray-500">
            {kindergarten.ageGroups.map((g) => (
              <p key={g.id} className="px-4 first:pl-0">
                {g.label}: {g.childrenCount}
              </p>
            ))}
          </div>
        </article>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <h2 className="text-2xl font-extrabold">Последние меню</h2>
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
            {recentMenus.map((menu) => (
              <li
                key={menu.id}
                className="flex flex-wrap items-center gap-4 p-5"
              >
                <div className="min-w-40 flex-1">
                  <p className="text-lg font-bold">{menu.title}</p>
                  <p className="text-sm text-gray-500">{menu.period}</p>
                </div>

                <span
                  className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                    menu.status === "approved"
                      ? "bg-brand-light text-brand-dark"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {menu.status === "approved" ? "Утверждено" : "Черновик"}
                </span>

                <button
                  type="button"
                  className="rounded-lg border border-brand px-6 py-2.5 font-bold text-brand transition hover:bg-brand-light"
                >
                  Открыть
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold">Уведомления</h2>
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
            {notifications.map((n) => (
              <li key={n.id} className="p-5">
                <p className="font-bold">{n.title}</p>
                <div className="mt-1 flex items-center justify-between gap-3 text-sm text-gray-500">
                  <span>{n.subtitle}</span>
                  <span>{n.date}</span>
                </div>
              </li>
            ))}
            <li className="p-5 text-center">
              <button
                type="button"
                className="text-lg font-bold text-brand-dark"
              >
                Все уведомления
              </button>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}