import type { MenuDay, WeekMenu } from "@/types";

function day(id: string, label: string, dishes: string[][]): MenuDay {
  const [breakfast, lunch, snack, dinner] = dishes;
  return {
    id,
    label,
    meals: [
      { id: `${id}-b`, type: "breakfast", label: "Завтрак", time: "08:30", dishIds: breakfast },
      { id: `${id}-l`, type: "lunch", label: "Обед", time: "12:30", dishIds: lunch },
      { id: `${id}-s`, type: "snack", label: "Полдник", time: "15:30", dishIds: snack },
      { id: `${id}-d`, type: "dinner", label: "Ужин", time: "17:30", dishIds: dinner },
    ],
  };
}

// TODO: заменить на GET /api/menus/:id
export const weekMenu: WeekMenu = {
  id: "wm-1",
  title: "Меню на неделю",
  period: "12-18 мая",
  childrenCount: 42,
  ageRange: "3-5 лет",
  mealsPerDay: 4,
  status: "draft",
  days: [
    day("d1", "Пн 12 мая", [
      ["r-oat"],
      ["r-borsch", "r-cutlet-rice", "r-compote"],
      ["r-yogurt"],
      ["r-casserole", "r-tea"],
    ]),
    day("d2", "Вт 13 мая", [
      ["r-oat", "r-tea"],
      ["r-meatball-soup", "r-pasta-cheese", "r-compote"],
      ["r-yogurt"],
      ["r-buckwheat-cutlet", "r-tea"],
    ]),
    day("d3", "Ср 14 мая", [
      ["r-casserole", "r-tea"],
      ["r-borsch", "r-plov", "r-compote"],
      ["r-yogurt"],
      ["r-pasta-cheese", "r-tea"],
    ]),
    day("d4", "Чт 15 мая", [
      ["r-oat", "r-tea"],
      ["r-meatball-soup", "r-cutlet-puree", "r-compote"],
      ["r-yogurt"],
      ["r-buckwheat-cutlet", "r-tea"],
    ]),
    day("d5", "Пт 16 мая", [
      ["r-oat", "r-tea"],
      ["r-borsch", "r-plov", "r-compote"],
      ["r-yogurt"],
      ["r-casserole", "r-tea"],
    ]),
  ],
};