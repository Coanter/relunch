export type Unit = "кг" | "л" | "шт" | "бух.";

export type Product = {
  id: string;
  name: string;
  emoji: string;
  unit: Unit;
  pricePerUnit: number;
};

// TODO: заменить на GET /api/products
export const PRODUCTS: Record<string, Product> = {
  carrot:   { id: "carrot",   name: "Морковь",              emoji: "🥕", unit: "кг",   pricePerUnit: 30 },
  potato:   { id: "potato",   name: "Картофель",            emoji: "🥔", unit: "кг",   pricePerUnit: 17 },
  milk:     { id: "milk",     name: "Молоко",               emoji: "🥛", unit: "л",    pricePerUnit: 60 },
  chicken:  { id: "chicken",  name: "Куриное филе",         emoji: "🍗", unit: "кг",   pricePerUnit: 220 },
  apple:    { id: "apple",    name: "Яблоки",               emoji: "🍏", unit: "кг",   pricePerUnit: 60 },
  beet:     { id: "beet",     name: "Свёкла",               emoji: "🫐", unit: "кг",   pricePerUnit: 25 },
  cabbage:  { id: "cabbage",  name: "Капуста белокочанная", emoji: "🥬", unit: "кг",   pricePerUnit: 20 },
  onion:    { id: "onion",    name: "Лук репчатый",         emoji: "🧅", unit: "кг",   pricePerUnit: 18 },
  pasta:    { id: "pasta",    name: "Макароны",             emoji: "🍝", unit: "кг",   pricePerUnit: 40 },
  egg:      { id: "egg",      name: "Яйцо куриное",         emoji: "🥚", unit: "шт",   pricePerUnit: 7 },
  curd:     { id: "curd",     name: "Творог",               emoji: "🍚", unit: "кг",   pricePerUnit: 180 },
  bread:    { id: "bread",    name: "Хлеб ржаной",          emoji: "🍞", unit: "бух.", pricePerUnit: 35 },
  oil:      { id: "oil",      name: "Масло подсолнечное",   emoji: "🧴", unit: "л",    pricePerUnit: 120 },
  oats:     { id: "oats",     name: "Овсяные хлопья",       emoji: "🌾", unit: "кг",   pricePerUnit: 90 },
  butter:   { id: "butter",   name: "Масло сливочное",      emoji: "🧈", unit: "кг",   pricePerUnit: 650 },
  sugar:    { id: "sugar",    name: "Сахар",                emoji: "🍬", unit: "кг",   pricePerUnit: 75 },
  salt:     { id: "salt",     name: "Соль",                 emoji: "🧂", unit: "кг",   pricePerUnit: 20 },
  rice:     { id: "rice",     name: "Рис",                  emoji: "🍚", unit: "кг",   pricePerUnit: 110 },
  sourCream:{ id: "sourCream",name: "Сметана 15%",          emoji: "🥣", unit: "кг",   pricePerUnit: 260 },
  driedFruit:{id: "driedFruit",name: "Сухофрукты",          emoji: "🍇", unit: "кг",   pricePerUnit: 320 },
  yogurt:   { id: "yogurt",   name: "Йогурт натуральный",   emoji: "🥛", unit: "кг",   pricePerUnit: 190 },
  berries:  { id: "berries",  name: "Ягоды и фрукты",       emoji: "🍓", unit: "кг",   pricePerUnit: 280 },
  raisins:  { id: "raisins",  name: "Изюм",                 emoji: "🍇", unit: "кг",   pricePerUnit: 350 },
  tea:      { id: "tea",      name: "Чай",                  emoji: "🍵", unit: "кг",   pricePerUnit: 900 },
  buckwheat:{ id: "buckwheat",name: "Гречневая крупа",      emoji: "🌾", unit: "кг",   pricePerUnit: 85 },
  cheese:   { id: "cheese",   name: "Сыр твёрдый",          emoji: "🧀", unit: "кг",   pricePerUnit: 480 },
  garlic:   { id: "garlic",   name: "Чеснок",               emoji: "🧄", unit: "кг",   pricePerUnit: 150 },
};