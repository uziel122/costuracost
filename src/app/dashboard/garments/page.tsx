'use client';

import { useState, useEffect } from 'react';

interface GarmentSize {
  id: string;
  garmentType: string;
  size: string;
  metersRequired: number;
}

export default function GarmentsPage() {
  const [items, setItems] = useState<GarmentSize[]>([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({ garmentType: '', size: 'M', metersRequired: '' });

  const fetchGarments = async () => {
    const res = await fetch('/api/garments');
    const data = await res.json();
    if (Array.isArray(data)) setItems(data);
  };

  useEffect(() => {
    fetchGarments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/garments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ garmentType: '', size: 'M', metersRequired: '' });
      fetchGarments();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Deseas eliminar este registro?')) return;
    const res = await fetch(`/api/garments?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchGarments();
  };

  const filteredItems = items.filter((item) =>
    item.garmentType.toLowerCase().includes(search.toLowerCase()) ||
    item.size.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-emerald-900">👕 Catálogo de Prendas y Tallas</h2>

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
            placeholder="Ej. Pantalón"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Talla</label>
          <select
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="mt-1 w-full border rounded-lg p-2 border-gray-300"
          >
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Metros Requeridos</label>
          <input
            type="number"
            step="0.1"
            required
            value={formData.metersRequired}
            onChange={(e) => setFormData({ ...formData, metersRequired: e.target.value })}
            className="mt-1 w-full border rounded-lg p-2 border-gray-300"
            placeholder="Ej. 2.5"
          />
        </div>
        <div className="flex items-end">
          <button type="submit" className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-semibold p-2.5 rounded-lg transition">
            ➕ Registrar
          </button>
        </div>
      </form>

      {/* Tabla */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
        <input
          type="text"
          placeholder="🔍 Buscar prenda o talla..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-2.5 border-gray-300"
        />

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600 text-sm">
              <th className="p-3">Prenda</th>
              <th className="p-3">Talla</th>
              <th className="p-3">Metros Necesarios</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{item.garmentType}</td>
                <td className="p-3"><span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full font-bold">{item.size}</span></td>
                <td className="p-3 font-semibold">{item.metersRequired} m</td>
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