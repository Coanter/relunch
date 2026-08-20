import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Building2,
  ChevronRight,
  ClipboardList,
  Clock,
  CloudUpload,
  Download,
  History,
  Link2,
  Pencil,
  ShieldCheck,
  UserRound,
  Users,
  Utensils,
  UtensilsCrossed,
  Wallet,
  CalendarCheck,
  Upload,
} from "lucide-react";
import { Topbar } from "@/components/topbar";
import { institution, lastBackup, menuSettings } from "@/lib/mock-settings";

const MAIN_SETTINGS = [
  {
    href: "/settings/profile",
    icon: Building2,
    title: "Профиль учреждения",
    subtitle: "Информация о детском саде, адрес, контакты, режим работы",
  },
  {
    href: "/settings/groups",
    icon: Users,
    title: "Дети и возрастные группы",
    subtitle: "Количество детей, возрастные группы и режимы питания",
  },
  {
    href: "/settings/meals",
    icon: Utensils,
    title: "Приёмы пищи",
    subtitle: "Настройка приёмов пищи и времени подачи",
  },
  {
    href: "/settings/norms",
    icon: CalendarCheck,
    title: "Порции и нормы",
    subtitle: "Нормы питания по СанПиН и выход готовых блюд",
  },
  {
    href: "/settings/prices",
    icon: Wallet,
    title: "Цены и единицы измерения",
    subtitle: "Единицы измерения продуктов и валюты",
  },
];

const SYSTEM_SETTINGS = [
  {
    href: "/settings/users",
    icon: UserRound,
    title: "Пользователи и роли",
    subtitle: "Управление пользователями и их правами доступа",
  },
  {
    href: "/settings/notifications",
    icon: Bell,
    title: "Уведомления",
    subtitle: "Настройка email и push - уведомлений",
  },
  {
    href: "/settings/integrations",
    icon: Link2,
    title: "Интеграции",
    subtitle: "Интеграция с поставщиками и другими сервисами",
  },
  {
    href: "/settings/backup",
    icon: CloudUpload,
    title: "Резервное копирование",
    subtitle: "Резервное копирование и восстановление данных",
  },
  {
    href: "/settings/activity",
    icon: History,
    title: "Журнал действий",
    subtitle: "История действий пользователей в системе",
  },
];

export default function SettingsPage() {
  return (
    <main className="px-8 py-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Настройки</h1>
          <p className="mt-1 text-gray-500">
            Управление системой и параметрами вашего детского сада
          </p>
        </div>
        <Topbar />
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.8fr_1fr]">
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="text-xl font-extrabold">Основные настройки</h2>
            <SettingsGroup items={MAIN_SETTINGS} />
          </section>

          <section>
            <h2 className="text-xl font-extrabold">Система</h2>
            <SettingsGroup items={SYSTEM_SETTINGS} />
          </section>
        </div>

        <aside className="flex flex-col gap-5">
          {/* УЧРЕЖДЕНИЕ */}
          <div className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-extrabold">Учреждение</h3>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm transition hover:bg-gray-50"
              >
                <Pencil size={14} className="text-brand" />
                Редактировать
              </button>
            </div>

            <div className="mt-4 flex gap-4">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-full bg-gray-100">
                <Image
                  src={institution.photo}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <p className="font-bold">{institution.name}</p>
                <p className="text-gray-600">{institution.address}</p>
                <p className="text-gray-600">{institution.phone}</p>
                <p className="text-gray-600">{institution.email}</p>
              </div>
            </div>

            <dl className="mt-5 flex flex-col gap-3 border-t border-line pt-4 text-sm">
              <InfoRow
                icon={<Clock size={18} />}
                label="Режим работы"
                value={institution.workingHours}
              />
              <InfoRow
                icon={<Users size={18} />}
                label="Количество детей"
                value={`${institution.childrenCount} ребенка`}
              />
              <InfoRow
                icon={<UtensilsCrossed size={18} />}
                label="Приёмы пищи"
                value={`${institution.mealsPerDay} раза в день`}
              />
            </dl>
          </div>

          {/* НАСТРОЙКИ МЕНЮ */}
          <div className="rounded-2xl border border-line bg-brand-light/60 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold">Текущие настройки меню</h3>
              <ClipboardList size={22} className="text-brand" />
            </div>

            <dl className="mt-4 flex flex-col gap-3 text-sm">
              {menuSettings.map((s) => (
                <div key={s.label} className="flex justify-between gap-3">
                  <dt className="text-gray-600">{s.label}</dt>
                  <dd className="font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* БЕЗОПАСНОСТЬ */}
          <div className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold">Безопасность данных</h3>
              <ShieldCheck size={22} className="text-brand" />
            </div>

            <p className="mt-3 text-sm text-gray-600">
              Ваши данные надёжно защищены
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Последнее резервное копирование:
              <br />
              {lastBackup}
            </p>

            <button
              type="button"
              className="mt-4 flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50"
            >
              <CloudUpload size={18} className="text-brand" />
              Создать копию сейчас
            </button>
          </div>

          {/* ЭКСПОРТ */}
          <div className="rounded-2xl border border-line bg-white p-5">
            <h3 className="text-lg font-extrabold">Экспорт и импорт</h3>
            <p className="mt-2 text-sm text-gray-600">
              Импортируйте или экспортируйте данные меню, рецептов и закупок.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50"
              >
                <Upload size={18} className="text-brand" />
                Экспорт данных
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50"
              >
                <Download size={18} className="text-brand" />
                Импорт данных
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

type SettingsItem = {
  href: string;
  icon: typeof Building2;
  title: string;
  subtitle: string;
};

function SettingsGroup({ items }: { items: SettingsItem[] }) {
  return (
    <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {items.map(({ href, icon: Icon, title, subtitle }) => (
        <li key={href}>
          <Link
            href={href}
            className="flex items-center gap-4 p-4 transition hover:bg-gray-50"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
              <Icon size={22} strokeWidth={1.8} />
            </span>

            <div className="min-w-0 flex-1">
              <p className="font-bold">{title}</p>
              <p className="truncate text-sm text-gray-500">{subtitle}</p>
            </div>

            <ChevronRight size={22} className="shrink-0 text-gray-400" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-brand">{icon}</span>
      <dt className="text-gray-600">{label}</dt>
      <dd className="ml-auto font-medium">{value}</dd>
    </div>
  );
}