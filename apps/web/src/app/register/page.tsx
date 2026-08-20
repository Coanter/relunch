import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Clock,
  Lock,
  Mail,
  ShieldCheck,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { TextField } from "@/components/ui/text-field";

const features = [
  {
    icon: ShieldCheck,
    color: "bg-green-100 text-green-600",
    title: "Соблюдение норм",
    text: "Меню соответствует СанПин и возрастным потребностям детей",
  },
  {
    icon: Clock,
    color: "bg-orange-100 text-orange-500",
    title: "Экономия времени",
    text: "AI составляет меню за секунды вместо часов ручной работы",
  },
  {
    icon: ShoppingCart,
    color: "bg-purple-100 text-purple-500",
    title: "Контроль бюджета",
    text: "Точный расчет продуктов и сокращение перерасхода",
  },
  {
    icon: Users,
    color: "bg-blue-100 text-blue-500",
    title: "Удобный доступ",
    text: "Делитесь меню с поварами и родителями в один клик",
  },
];

const socials = [
  { icon: <FcGoogle size={20} />, label: "Google" },
  { icon: <FaFacebook size={20} className="text-[#1877F2]" />, label: "Facebook" },
  { icon: <FaApple size={20} />, label: "Apple" },
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* ЛЕВАЯ ЧАСТЬ */}
      <aside className="relative hidden overflow-hidden bg-cream lg:block">
        <Image
          src="/images/auth-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-bottom"
        />
        <div className="relative z-10 flex flex-col gap-8 p-12 xl:p-16">
          {/* <Image
            src="/images/logo.png"
            alt="Relunch"
            width={300}
            height={13}
            priority

          /> */}

          <h1 className="text-4xl font-extrabold leading-tight xl:text-[2.6rem]">
            Создайте аккаунт
            <br />и начните экономить
            <br />
            время и ресурсы
          </h1>

          <p className="max-w-md text-[15px] leading-relaxed text-gray-600">
            Relunch помогает детским садам составлять сбалансированное меню за
            секунды, соблюдая все нормы и заботясь о здоровье детей.
          </p>

          <ul className="flex flex-col gap-5">
            {features.map(({ icon: Icon, color, title, text }) => (
              <li key={title} className="flex gap-4">
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full ${color}`}
                >
                  <Icon size={20} />
                </span>
                <div>
                  <p className="font-bold">{title}</p>
                  <p className="max-w-xs text-sm leading-snug text-gray-600">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* ПРАВАЯ ЧАСТЬ */}
      <main className="flex flex-col px-6 py-8 sm:px-12 lg:px-16 lg:py-10">
        <p className="self-end text-sm">
          Уже есть аккаунт?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand underline underline-offset-2"
          >
            Войти
          </Link>
        </p>

        <div className="mx-auto mt-8 w-full max-w-xl">
          <span className="flex size-11 items-center justify-center rounded-xl bg-brand-light text-brand">
            <User size={22} />
          </span>

          <h2 className="mt-5 text-3xl font-extrabold">Создание аккаунта</h2>
          <p className="mt-1 text-[15px] text-gray-600">
            Заполните информацию для регистрации
          </p>

          <form className="mt-7 flex flex-col gap-5">
            <TextField
              id="kindergarten"
              label="Название детского сада"
              placeholder="Введите название детского сада"
              icon={<Building2 size={18} />}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="firstName"
                label="Имя"
                placeholder="Введите ваше имя"
                icon={<User size={18} />}
              />
              <TextField
                id="lastName"
                label="Фамилия"
                placeholder="Введите вашу фамилию"
                icon={<User size={18} />}
              />
            </div>

            <TextField
              id="email"
              type="email"
              label="Email"
              placeholder="example@mail.com"
              icon={<Mail size={18} />}
            />
            <TextField
              id="password"
              type="password"
              label="Пароль"
              placeholder="Минимум 8 символов"
              icon={<Lock size={18} />}
            />
            <TextField
              id="confirmPassword"
              type="password"
              label="Подтвердите пароль"
              placeholder="Повторите пароль"
              icon={<Lock size={18} />}
            />

            <label className="flex gap-2.5 text-sm">
              <input
                type="checkbox"
                className="mt-0.5 size-4 shrink-0 accent-brand"
              />
              <span>
                Я согласен(на) с{" "}
                <Link href="/terms" className="text-brand underline">
                  условиями использования
                </Link>{" "}
                и{" "}
                <Link href="/privacy" className="text-brand underline">
                  политикой конфиденциальности
                </Link>
              </span>
            </label>

            <button
              type="submit"
              className="rounded-lg bg-brand py-3.5 font-bold text-white transition hover:bg-brand-dark"
            >
              Создать аккаунт
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-line" />
            <span className="text-sm text-gray-500">
              или зарегистрируйтесь через
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {socials.map(({ icon, label }) => (
              <button
                key={label}
                type="button"
                className="flex items-center justify-center gap-2.5 rounded-lg border border-line py-3 text-sm font-medium transition hover:bg-gray-50"
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Нажимая «Создать аккаунт», вы соглашаетесь с нашими{" "}
            <Link href="/terms" className="text-carrot">
              условиями
            </Link>{" "}
            и{" "}
            <Link href="/privacy" className="text-brand">
              политикой конфиденциальности
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}