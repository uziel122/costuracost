"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSent(true);

    e.currentTarget.reset();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="bg-green-950 text-white">
          <div className="max-w-7xl mx-auto px-6 py-20 text-center">
            <p className="text-green-300 font-semibold">
              CONTACTO
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3">
              Estamos para ayudarte
            </h1>

            <p className="max-w-2xl mx-auto mt-5 text-gray-300">
              ¿Tienes alguna pregunta, sugerencia o comentario?
              Escríbenos.
            </p>
          </div>
        </section>

        {/* CONTACTO */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-10">

            {/* INFORMACIÓN */}
            <div>
              <p className="text-green-700 font-semibold">
                HABLEMOS
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                ¿Cómo podemos ayudarte?
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed">
                Utiliza el formulario para enviarnos tus dudas,
                comentarios o sugerencias relacionadas con
                CosturaCost.
              </p>

              <div className="mt-8 space-y-5">

                <div className="flex gap-4">
                  <div className="text-3xl">
                    📧
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Correo electrónico
                    </h3>

                    <p className="text-gray-600">
                      contacto@costuracost.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-3xl">
                    💬
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Comentarios
                    </h3>

                    <p className="text-gray-600">
                      Tu opinión nos ayuda a mejorar.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* FORMULARIO */}
            <div className="bg-white rounded-2xl shadow-lg p-8">

              {sent && (
                <div className="mb-6 bg-green-100 text-green-800 p-4 rounded-lg">
                  ¡Mensaje enviado correctamente!
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="font-semibold">
                    Nombre
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div>
                  <label className="font-semibold">
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    required
                    placeholder="correo@ejemplo.com"
                    className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div>
                  <label className="font-semibold">
                    Asunto
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div>
                  <label className="font-semibold">
                    Mensaje
                  </label>

                  <textarea
                    required
                    rows={5}
                    placeholder="Escribe tu mensaje..."
                    className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-900 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
                >
                  Enviar mensaje
                </button>
              </form>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}