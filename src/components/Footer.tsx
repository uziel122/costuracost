import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid md:grid-cols-3 gap-10">

          {/* INFORMACIÓN */}
          <div>
            <h2 className="text-2xl font-bold">
              🧵 CosturaCost
            </h2>

            <p className="text-gray-300 mt-4 leading-relaxed">
              Plataforma web para calcular de manera sencilla
              los costos de producción de prendas textiles.
            </p>
          </div>

          {/* ENLACES */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Navegación
            </h3>

            <div className="space-y-2">
              <Link
                href="/"
                className="block text-gray-300 hover:text-white"
              >
                Inicio
              </Link>

              <Link
                href="/about"
                className="block text-gray-300 hover:text-white"
              >
                Acerca de
              </Link>

              <Link
                href="/contact"
                className="block text-gray-300 hover:text-white"
              >
                Contacto
              </Link>

              <Link
                href="/login"
                className="block text-gray-300 hover:text-white"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>

          {/* TECNOLOGÍAS */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Tecnologías
            </h3>

            <p className="text-gray-300">
              Next.js
            </p>

            <p className="text-gray-300">
              React
            </p>

            <p className="text-gray-300">
              TypeScript
            </p>

            <p className="text-gray-300">
              Tailwind CSS
            </p>

            <p className="text-gray-300">
              Prisma + SQLite
            </p>
          </div>

        </div>

        <div className="border-t border-green-800 mt-10 pt-6 text-center">
          <p className="text-gray-400">
            © 2026 CosturaCost. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}