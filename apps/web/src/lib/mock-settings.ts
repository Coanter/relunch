// TODO: заменить на GET /api/kindergarten/profile
export const institution = {
  name: 'Детский сад №15 "Солнышко"',
  photo: "/images/kindergarten.jpg",
  address: "г. Бишкек, ул. Токомбаева, 21",
  phone: "+996 312 12 34 56",
  email: "info@solnyshko.kg",
  workingHours: "Пн - Пт, 07:00 - 18:00",
  childrenCount: 42,
  mealsPerDay: 4,
};

// TODO: заменить на GET /api/kindergarten/menu-settings
export const menuSettings = [
  { label: "Калорийность в день", value: "1600-1900 ккал" },
  { label: "Сезон", value: "Весенне-летнее меню" },
  { label: "Диета", value: "Обычное питание" },
];

// TODO: заменить на GET /api/backups/latest
export const lastBackup = "5 мая 2026 г., 02:30";

// TODO: заменить на GET /api/me
export const account = {
  fullName: "Айгерим Кадырова",
  initials: "АК",
  unreadNotifications: 3,
};