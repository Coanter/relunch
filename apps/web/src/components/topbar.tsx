"use client";

import { Bell, ChevronDown } from "lucide-react";
import { account } from "@/lib/mock-settings";

export function Topbar() {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        className="relative rounded-xl p-2.5 transition hover:bg-gray-100"
      >
        <Bell size={24} strokeWidth={1.8} />
        {account.unreadNotifications > 0 && (
          <span className="absolute right-2 top-2 size-2 rounded-full bg-carrot" />
        )}
      </button>

      <button
        type="button"
        className="flex items-center gap-2 rounded-xl p-1 transition hover:bg-gray-100"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-brand-light font-bold text-brand-dark">
          {account.initials}
        </span>
        <ChevronDown size={20} className="text-gray-500" />
      </button>
    </div>
  );
}