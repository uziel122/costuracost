import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

const modules = [
  {
    title: "Telas",
    description: "Administra las telas y sus costos por metro.",
    href: "/dashboard/fabrics",
  },
  {
    title: "Prendas y tallas",
    description: "Configura prendas y metros necesarios por talla.",
    href: "/dashboard/garments",
  },
  {
    title: "Mano de obra",
    description: "Administra los costos según la complejidad.",
    href: "/dashboard/labor",
  },
  {
    title: "Calculadora",
    description: "Calcula el costo final de una prenda.",
    href: "/dashboard/calculator",
  },
  {
    title: "Historial",
    description: "Consulta tus cotizaciones anteriores.",
    href: "/dashboard/quotes",
  },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-green-950">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Bienvenido, {user.name}.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.href}
              href={module.href}
              className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-xl font-bold text-green-900">
                {module.title}
              </h2>

              <p className="mt-3 text-gray-600">
                {module.description}
              </p>

              <span className="mt-5 inline-block font-semibold text-green-700">
                Entrar →
              </span>
            </Link>
          ))}
        </div>

        <form
  action="/api/auth/logout"
  method="POST"
  className="mt-10"
>
  <button
    type="submit"
    className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
  >
    Cerrar sesión
  </button>
</form>
      </div>
    </main>
  );
}