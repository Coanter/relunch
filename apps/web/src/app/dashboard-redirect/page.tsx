import { redirect } from "next/navigation";
import { currentUser } from "@/lib/mock-data";

export default function DashboardRedirect() {
  // TODO: заменить на реальную проверку из БД
  redirect(currentUser.hasKindergarten ? "/dashboard" : "/onboarding");
}