"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  CircleHelp,
  Folder,
  Home,
  LogOut,
  Settings,
  ShoppingCart,
} from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Главная", icon: Home },
  { href: "/menu", label: "Меню", icon: Calculator },
  { href: "/purchases", label: "Закупки", icon: ShoppingCart },
  { href: "/library", label: "Библиотека", icon: Folder },
  { href: "/settings", label: "Настройки", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-line bg-white px-4 py-8">
      <Link href="/dashboard" className="mb-10 px-3">
        <Image
          src="/images/logo.png"
          alt="Relunch"
          width={754}
          height={263}
          className="h-11 w-auto"
        />
      </Link>

      <nav className="flex flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${
                active ? "bg-brand-light text-ink" : "text-ink hover:bg-gray-50"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r bg-brand" />
              )}
              <Icon size={22} strokeWidth={1.8} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1">
        <Link
          href="/help"
          className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition hover:bg-gray-50"
        >
          <CircleHelp size={22} strokeWidth={1.8} />
          Помощь
        </Link>
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold transition hover:bg-gray-50"
        >
          <LogOut size={22} strokeWidth={1.8} />
          Выход
        </button>
      </div>
    </aside>
  );
}