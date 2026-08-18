"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";

type Fabric = {
  id: string;
  name: string;
  material: string;
  costPerMeter: number;
  color: string;
  supplier: string;
};

type GarmentSize = {
  id: string;
  garmentType: string;
  size: string;
  metersRequired: number;
};

type LaborCost = {
  id: string;
  garmentType: string;
  complexity: string;
  cost: number;
};

export default function CalculatorPage() {
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [garments, setGarments] = useState<GarmentSize[]>([]);
  const [laborCosts, setLaborCosts] = useState<LaborCost[]>([]);

  const [fabricId, setFabricId] = useState("");
  const [garmentType, setGarmentType] = useState("");
  const [size, setSize] = useState("");
  const [complexity, setComplexity] = useState("");

  const [profitMargin, setProfitMargin] = useState("");

  const [loading, setLoading] = useState(true);

  // Cargar datos desde las APIs
  useEffect(() => {
    const loadData = async () => {
      try {
        const [fabricsResponse, garmentsResponse, laborResponse] =
          await Promise.all([
            fetch("/api/fabrics"),
            fetch("/api/garments"),
            fetch("/api/labor"),
          ]);

        if (!fabricsResponse.ok) {
          throw new Error("No se pudieron cargar las telas");
        }

        if (!garmentsResponse.ok) {
          throw new Error("No se pudieron cargar las prendas");
        }

        if (!laborResponse.ok) {
          throw new Error("No se pudo cargar la mano de obra");
        }

        const fabricsData = await fabricsResponse.json();
        const garmentsData = await garmentsResponse.json();
        const laborData = await laborResponse.json();

        setFabrics(fabricsData);
        setGarments(garmentsData);
        setLaborCosts(laborData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Tela seleccionada
  const selectedFabric = fabrics.find(
    (fabric) => fabric.id === fabricId
  );

  // Talla seleccionada
  const selectedGarment = garments.find(
    (garment) =>
      garment.garmentType === garmentType &&
      garment.size === size
  );

  // Mano de obra seleccionada
  const selectedLabor = laborCosts.find(
    (labor) =>
      labor.garmentType === garmentType &&
      labor.complexity === complexity
  );

  // Datos calculados
  const metersRequired = selectedGarment?.metersRequired ?? 0;

  const costPerMeter = selectedFabric?.costPerMeter ?? 0;

  const laborCost = selectedLabor?.cost ?? 0;

  const fabricCost = metersRequired * costPerMeter;

  const subtotal = fabricCost + laborCost;

  const profitPercentage = Number(profitMargin) || 0;

  const profitAmount =
    (subtotal * profitPercentage) / 100;

  const total = subtotal + profitAmount;

  // Tipos de prendas sin repetir
  const garmentTypes = Array.from(
    new Set(garments.map((garment) => garment.garmentType))
  );

  // Tallas disponibles según la prenda
  const availableSizes = garments.filter(
    (garment) => garment.garmentType === garmentType
  );

  // Cuando cambia la prenda, limpiar talla y complejidad
  const handleGarmentChange = (value: string) => {
    setGarmentType(value);
    setSize("");
    setComplexity("");
  };

  // Limpiar calculadora
  const handleClear = () => {
    setFabricId("");
    setGarmentType("");
    setSize("");
    setComplexity("");
    setProfitMargin("");
  };

  // PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(6, 78, 59);
    doc.text("CosturaCost", 14, 20);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Cotización de Prenda", 14, 30);

    doc.setFontSize(11);

    doc.text(
      `Fecha: ${new Date().toLocaleDateString("es-MX")}`,
      14,
      42
    );

    doc.text(
      `Tela: ${selectedFabric?.name || "No seleccionada"}`,
      14,
      54
    );

    doc.text(
      `Material: ${selectedFabric?.material || "-"}`,
      14,
      64
    );

    doc.text(
      `Color: ${selectedFabric?.color || "-"}`,
      14,
      74
    );

    doc.text(
      `Prenda: ${garmentType || "No seleccionada"}`,
      14,
      86
    );

    doc.text(
      `Talla: ${size || "No seleccionada"}`,
      14,
      96
    );

    doc.text(
      `Complejidad: ${complexity || "No seleccionada"}`,
      14,
      106
    );

    doc.text(
      `Metros necesarios: ${metersRequired.toFixed(2)} m`,
      14,
      118
    );

    doc.text(
      `Costo por metro: $${costPerMeter.toFixed(2)} MXN`,
      14,
      128
    );

    doc.text(
      `Costo de tela: $${fabricCost.toFixed(2)} MXN`,
      14,
      138
    );

    doc.text(
      `Mano de obra: $${laborCost.toFixed(2)} MXN`,
      14,
      148
    );

    doc.text(
      `Subtotal: $${subtotal.toFixed(2)} MXN`,
      14,
      158
    );

    doc.text(
      `Utilidad (${profitPercentage}%): $${profitAmount.toFixed(2)} MXN`,
      14,
      168
    );

    doc.setFontSize(16);
    doc.setTextColor(6, 78, 59);

    doc.text(
      `TOTAL: $${total.toFixed(2)} MXN`,
      14,
      185
    );

    doc.save(
      `cotizacion-costuracost-${Date.now()}.pdf`
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600">
          Cargando datos...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* ENCABEZADO */}
      <div>
        <h2 className="text-3xl font-bold text-emerald-900">
          🧮 Calculadora de Costos
        </h2>

        <p className="text-gray-600 mt-2">
          Selecciona la prenda, talla, tela y complejidad
          para calcular el costo de fabricación.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* FORMULARIO */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Datos de la cotización
          </h3>

          <div className="space-y-5">

            {/* TELA */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🧵 Tela
              </label>

              <select
                value={fabricId}
                onChange={(e) =>
                  setFabricId(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg py-2.5 px-3 bg-white outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">
                  Selecciona una tela
                </option>

                {fabrics.map((fabric) => (
                  <option
                    key={fabric.id}
                    value={fabric.id}
                  >
                    {fabric.name} - $
                    {fabric.costPerMeter.toFixed(2)}/m
                  </option>
                ))}
              </select>

              {selectedFabric && (
                <p className="text-xs text-gray-500 mt-1">
                  {selectedFabric.material} ·{" "}
                  {selectedFabric.color}
                </p>
              )}
            </div>

            {/* PRENDA */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                👕 Tipo de prenda
              </label>

              <select
                value={garmentType}
                onChange={(e) =>
                  handleGarmentChange(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg py-2.5 px-3 bg-white outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">
                  Selecciona una prenda
                </option>

                {garmentTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* TALLA */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                📏 Talla
              </label>

              <select
                value={size}
                onChange={(e) =>
                  setSize(e.target.value)
                }
                disabled={!garmentType}
                className="w-full border border-gray-300 rounded-lg py-2.5 px-3 bg-white outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:text-gray-400"
              >
                <option value="">
                  {garmentType
                    ? "Selecciona una talla"
                    : "Primero selecciona una prenda"}
                </option>

                {availableSizes.map((garment) => (
                  <option
                    key={garment.id}
                    value={garment.size}
                  >
                    {garment.size} -{" "}
                    {garment.metersRequired} m
                  </option>
                ))}
              </select>
            </div>

            {/* COMPLEJIDAD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🔨 Complejidad
              </label>

              <select
                value={complexity}
                onChange={(e) =>
                  setComplexity(e.target.value)
                }
                disabled={!garmentType}
                className="w-full border border-gray-300 rounded-lg py-2.5 px-3 bg-white outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:text-gray-400"
              >
                <option value="">
                  Selecciona complejidad
                </option>

                <option value="Básica">
                  Básica
                </option>

                <option value="Intermedia">
                  Intermedia
                </option>

                <option value="Alta">
                  Alta
                </option>
              </select>
            </div>

            {/* UTILIDAD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                📈 Porcentaje de utilidad
              </label>

              <div className="relative">

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={profitMargin}
                  onChange={(e) =>
                    setProfitMargin(e.target.value)
                  }
                  placeholder="Ej. 30"
                  className="w-full border border-gray-300 rounded-lg py-2.5 pr-10 pl-3 outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>

              </div>
            </div>

            {/* INFORMACIÓN AUTOMÁTICA */}
            {selectedGarment && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">

                <p className="text-sm text-gray-600">
                  Metros necesarios
                </p>

                <p className="text-xl font-bold text-emerald-800">
                  {metersRequired.toFixed(2)} m
                </p>

              </div>
            )}

            {/* BOTONES */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              <button
                type="button"
                onClick={handleExportPDF}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition"
              >
                📄 Descargar PDF
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="sm:w-32 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition"
              >
                🗑️ Limpiar
              </button>

            </div>

          </div>
        </div>

        {/* RESUMEN */}
        <div className="bg-emerald-900 text-white p-6 rounded-xl shadow-md flex flex-col justify-between">

          <div>

            <h3 className="text-xl font-semibold mb-6 border-b border-emerald-700 pb-3">
              Desglose de Cotización
            </h3>

            <div className="space-y-5 text-emerald-100">

              <div className="flex justify-between gap-4">
                <span>Tela:</span>

                <span className="font-semibold text-white text-right">
                  {selectedFabric?.name || "-"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Prenda:</span>

                <span className="font-semibold text-white">
                  {garmentType || "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Talla:</span>

                <span className="font-semibold text-white">
                  {size || "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Metros:</span>

                <span className="font-semibold text-white">
                  {metersRequired.toFixed(2)} m
                </span>
              </div>

              <div className="flex justify-between">
                <span>Costo de tela:</span>

                <span className="font-semibold text-white">
                  ${fabricCost.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Mano de obra:</span>

                <span className="font-semibold text-white">
                  ${laborCost.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between border-t border-emerald-800 pt-3">
                <span>Subtotal:</span>

                <span className="font-semibold text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>
                  Utilidad ({profitPercentage}%):
                </span>

                <span className="font-semibold text-white">
                  ${profitAmount.toFixed(2)}
                </span>
              </div>

            </div>
          </div>

          {/* TOTAL */}
          <div className="pt-6 border-t border-emerald-700 mt-8">

            <div className="flex justify-between items-center">

              <span className="text-lg">
                Total Final:
              </span>

              <span className="text-3xl font-extrabold text-emerald-400">
                ${total.toFixed(2)}
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}