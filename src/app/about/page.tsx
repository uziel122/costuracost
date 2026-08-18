import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="bg-green-950 text-white">
          <div className="max-w-7xl mx-auto px-6 py-24 text-center">
            <p className="text-green-300 font-semibold mb-4">
              CONOCE COSTURACOST
            </p>

            <h1 className="text-4xl md:text-6xl font-bold">
              Calcula mejor.
              <br />
              Produce mejor.
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-300">
              CosturaCost es una plataforma diseñada para
              facilitar el cálculo de costos de prendas textiles.
            </p>
          </div>
        </section>

        {/* QUÉ ES */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>
              <p className="text-green-700 font-semibold">
                ¿QUÉ ES COSTURACOST?
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
                Una herramienta para simplificar tus cotizaciones
              </h2>

              <p className="text-gray-600 mt-6 leading-relaxed">
                CosturaCost permite calcular el costo aproximado
                de una prenda tomando en cuenta el precio de la
                tela, los metros necesarios, la mano de obra y
                el porcentaje de utilidad.
              </p>

              <p className="text-gray-600 mt-4 leading-relaxed">
                El objetivo es proporcionar una herramienta
                sencilla, rápida y organizada para personas
                dedicadas a la confección y producción textil.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-6xl mb-6">
                🧵
              </div>

              <h3 className="text-2xl font-bold text-green-900">
                Nuestro objetivo
              </h3>

              <p className="text-gray-600 mt-4">
                Facilitar la toma de decisiones al momento de
                establecer precios para prendas textiles.
              </p>
            </div>

          </div>
        </section>

        {/* CARACTERÍSTICAS */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center mb-12">
              <p className="text-green-700 font-semibold">
                CARACTERÍSTICAS
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                Todo lo necesario para calcular tus costos
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {[
                {
                  icon: "🧵",
                  title: "Telas",
                  text: "Administra materiales y precios por metro.",
                },
                {
                  icon: "👕",
                  title: "Prendas",
                  text: "Registra prendas y metros necesarios por talla.",
                },
                {
                  icon: "👷",
                  title: "Mano de obra",
                  text: "Configura costos según la complejidad.",
                },
                {
                  icon: "🧮",
                  title: "Calculadora",
                  text: "Obtén el costo total de cada prenda.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gray-50 p-6 rounded-xl border"
                >
                  <div className="text-4xl">
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-bold mt-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {item.text}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* TECNOLOGÍAS */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <p className="text-green-700 font-semibold">
              TECNOLOGÍA
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Construido con tecnologías modernas
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                "Next.js",
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Prisma",
                "SQLite",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-5 py-3 bg-white border rounded-full shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}