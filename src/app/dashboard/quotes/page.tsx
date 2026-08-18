"use client";

import { useEffect, useState } from "react";

interface Quote {
  id: string;
  fabricName: string;
  garmentType: string;
  size: string;
  metersRequired: number;
  fabricCost: number;
  laborCost: number;
  profitPercentage: number;
  total: number;
  createdAt: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadQuotes();
  }, []);

  async function loadQuotes() {
    try {
      setLoading(true);

      const response = await fetch("/api/quotes");

      if (!response.ok) {
        throw new Error("No se pudieron cargar las cotizaciones");
      }

      const data = await response.json();

      setQuotes(data.quotes || data);
    } catch (error) {
      console.error(error);
      setError("No se pudieron cargar las cotizaciones");
    } finally {
      setLoading(false);
    }
  }

  async function deleteQuote(id: string) {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar esta cotización?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/quotes?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar");
      }

      setQuotes((current) =>
        current.filter((quote) => quote.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar la cotización");
    }
  }

  function formatMoney(value: number) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value);
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-gray-900">
            Historial de cotizaciones
          </h1>

          <p className="mt-4 text-gray-600">
            Cargando cotizaciones...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Historial de cotizaciones
          </h1>

          <p className="mt-2 text-gray-600">
            Consulta las cotizaciones que has guardado.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {quotes.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold text-gray-800">
              No tienes cotizaciones
            </h2>

            <p className="mt-2 text-gray-500">
              Las cotizaciones que guardes desde la calculadora
              aparecerán aquí.
            </p>

            <a
              href="/dashboard/calculator"
              className="mt-6 inline-block rounded-lg bg-green-800 px-6 py-3 font-semibold text-white hover:bg-green-900"
            >
              Ir a la calculadora
            </a>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="rounded-xl bg-white p-6 shadow-md"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {quote.garmentType}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {formatDate(quote.createdAt)}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                    {quote.size}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-700">

                  <div className="flex justify-between">
                    <span>Tela:</span>
                    <span className="font-medium">
                      {quote.fabricName}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Metros:</span>
                    <span className="font-medium">
                      {quote.metersRequired} m
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Costo tela:</span>
                    <span>
                      {formatMoney(quote.fabricCost)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Mano de obra:</span>
                    <span>
                      {formatMoney(quote.laborCost)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Utilidad:</span>
                    <span>
                      {quote.profitPercentage}%
                    </span>
                  </div>

                </div>

                <div className="my-5 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-green-800">
                      {formatMoney(quote.total)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() => deleteQuote(quote.id)}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Eliminar
                  </button>

                  <button
                    onClick={() =>
                      alert("La función de duplicar la agregaremos después.")
                    }
                    className="flex-1 rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900"
                  >
                    Duplicar
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}