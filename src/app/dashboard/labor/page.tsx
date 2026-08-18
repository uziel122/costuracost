'use client';

import { useState, useEffect } from 'react';

interface LaborCost {
  id: string;
  garmentType: string;
  complexity: string;
  cost: number;
}

export default function LaborPage() {
  const [items, setItems] = useState<LaborCost[]>([]);
  const [formData, setFormData] = useState({ garmentType: '', complexity: 'Básica', cost: '' });

  const fetchLabor = async () => {
    const res = await fetch('/api/labor');
    const data = await res.json();
    if (Array.isArray(data)) setItems(data);
  };

  useEffect(() => {
    fetchLabor();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/labor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ garmentType: '', complexity: 'Básica', cost: '' });
      fetchLabor();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Deseas eliminar esta tarifa?')) return;
    const res = await fetch(`/api/labor?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchLabor();
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-emerald-900">✂️ Configuración de Mano de Obra</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Prenda</label>
          <input
            type="text"
            required
            value={formData.garmentType}
            onChange={(e) => setFormData({ ...formData, garmentType: e.target.value })}
            className="mt-1 w-full border rounded-lg p-2 border-gray-300"
            placeholder="Ej. Vestido"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Complejidad</label>
          <select
            value={formData.complexity}
            onChange={(e) => setFormData({ ...formData, complexity: e.target.value })}
            className="mt-1 w-full border rounded-lg p-2 border-gray-300"
          >
            <option value="Básica">Básica</option>
            <option value="Intermedia">Intermedia</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Costo ($)</label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
            className="mt-1 w-full border rounded-lg p-2 border-gray-300"
            placeholder="Ej. 150.00"
          />
        </div>
        <div className="flex items-end">
          <button type="submit" className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-semibold p-2.5 rounded-lg transition">
            ➕ Agregar Tarifa
          </button>
        </div>
      </form>

      {/* Tabla */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600 text-sm">
              <th className="p-3">Prenda</th>
              <th className="p-3">Complejidad</th>
              <th className="p-3">Costo Mano de Obra</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{item.garmentType}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    item.complexity === 'Básica' ? 'bg-blue-100 text-blue-800' :
                    item.complexity === 'Intermedia' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.complexity}
                  </span>
                </td>
                <td className="p-3 text-emerald-700 font-semibold">${item.cost.toFixed(2)}</td>
                <td className="p-3 text-center">
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 font-semibold">
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}