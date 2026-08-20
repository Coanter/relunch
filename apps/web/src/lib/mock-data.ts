import type { Kindergarten, MenuItem, Notification } from "@/types";

// TODO: заменить на GET /api/me
export const currentUser = {
  firstName: "Айгерим",
  hasKindergarten: true, // ← переключай для проверки редиректа
};

// TODO: заменить на GET /api/kindergarten
export const kindergarten: Kindergarten = {
  id: "kg-1",
  name: "Детский сад №15",
  childrenCount: 42,
  mealsPerDay: 4,
  ageGroups: [
    { id: "g1", label: "1 - 3 года", minAge: 1, maxAge: 3, childrenCount: 18 },
    { id: "g2", label: "3 - 7 лет", minAge: 3, maxAge: 7, childrenCount: 24 },
  ],
};

// TODO: заменить на GET /api/stats
export const stats = {
  savingsPercent: 18,
  savingsDelta: 12,
  weeklyBudget: 12450,
  currency: "сом",
  withinBudget: true,
};

// TODO: заменить на GET /api/menus?limit=3
export const recentMenus: MenuItem[] = [
  { id: "m1", title: "Меню на неделю", period: "12 - 18 мая", status: "approved" },
  { id: "m2", title: "Меню на неделю", period: "5 - 11 мая", status: "approved" },
  { id: "m3", title: "Меню на день", period: "6 мая", status: "draft" },
];

// TODO: заменить на GET /api/notifications
export const notifications: Notification[] = [
  { id: "n1", title: "Пора составить меню", subtitle: "на следующую неделю", date: "15.05.2026" },
  { id: "n2", title: "Цены на 3 продукта изменились", subtitle: "посмотреть", date: "13.05.2026" },
  { id: "n3", title: "Новое обновление", subtitle: "рецептов", date: "10.05.2026" },
];