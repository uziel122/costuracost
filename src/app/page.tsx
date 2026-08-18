import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main>

        {/* HERO */}
        <section className="bg-green-950 text-white">
          <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

            <div className="max-w-3xl">

              <span className="inline-block bg-green-800 text-green-200 px-4 py-2 rounded-full text-sm font-semibold">
                🧵 COSTURACOST
              </span>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight mt-6">
                Calcula el costo de tus prendas
                <span className="text-green-400">
                  {" "}de forma sencilla.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-2xl">
                Calcula materiales, mano de obra y utilidad
                para obtener cotizaciones precisas de tus
                prendas textiles.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">

                <Link
                  href="/register"
                  className="bg-white text-green-950 px-7 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
                >
                  Comenzar ahora →
                </Link>

                <Link
                  href="/about"
                  className="border border-green-500 px-7 py-3 rounded-lg font-semibold hover:bg-green-900 transition"
                >
                  Conocer más
                </Link>

              </div>

            </div>

          </div>
        </section>

        {/* CARACTERÍSTICAS */}
        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="text-center max-w-2xl mx-auto">
            <p className="text-green-700 font-semibold">
              TODO EN UN SOLO LUGAR
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Herramientas para administrar tus costos
            </h2>

            <p className="text-gray-600 mt-4">
              CosturaCost reúne las herramientas necesarias
              para calcular y organizar tus cotizaciones.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

            {[
              {
                icon: "🧵",
                title: "Catálogo de telas",
                text: "Registra telas, materiales, proveedores y costos por metro.",
              },
              {
                icon: "👕",
                title: "Prendas y tallas",
                text: "Define los metros necesarios para cada tipo de prenda y talla.",
              },
              {
                icon: "👷",
                title: "Mano de obra",
                text: "Configura costos dependiendo de la complejidad.",
              },
              {
                icon: "🧮",
                title: "Calculadora",
                text: "Obtén automáticamente el costo total y la utilidad.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-7 rounded-2xl shadow-sm border hover:shadow-lg transition"
              >
                <div className="text-5xl">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mt-5">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {feature.text}
                </p>
              </div>
            ))}

          </div>

        </section>

        {/* CÓMO FUNCIONA */}
        <section className="bg-white py-20">

          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center">
              <p className="text-green-700 font-semibold">
                PROCESO
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                ¿Cómo funciona?
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mt-12">

              {[
                {
                  number: "01",
                  title: "Selecciona",
                  text: "Elige la tela que utilizarás.",
                },
                {
                  number: "02",
                  title: "Define",
                  text: "Selecciona prenda y talla.",
                },
                {
                  number: "03",
                  title: "Calcula",
                  text: "Agrega mano de obra y utilidad.",
                },
                {
                  number: "04",
                  title: "Guarda",
                  text: "Guarda tu cotización y genera un PDF.",
                },
              ].map((step) => (
                <div key={step.number} className="text-center">

                  <div className="w-14 h-14 bg-green-900 text-white rounded-full flex items-center justify-center mx-auto font-bold">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-bold mt-5">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {step.text}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="bg-green-900 rounded-3xl p-10 md:p-16 text-center text-white">

            <h2 className="text-3xl md:text-4xl font-bold">
              Empieza a calcular tus cotizaciones
            </h2>

            <p className="text-green-100 mt-4 max-w-xl mx-auto">
              Crea tu cuenta y comienza a utilizar las
              herramientas de CosturaCost.
            </p>

            <Link
              href="/register"
              className="inline-block mt-8 bg-white text-green-950 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Crear mi cuenta
            </Link>

          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}