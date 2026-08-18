'use client';

import { useState, useEffect } from 'react';

interface Fabric {
  id: string;
  name: string;
  material: string;
  costPerMeter: number;
  color: string;
  supplier: string;
}

export default function FabricsPage() {
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    material: '',
    costPerMeter: '',
    color: '',
    supplier: '',
  });

  const fetchFabrics = async () => {
    const res = await fetch('/api/fabrics');
    const data = await res.json();
    if (Array.isArray(data)) setFabrics(data);
  };

  useEffect(() => {
    fetchFabrics();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/fabrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ name: '', material: '', costPerMeter: '', color: '', supplier: '' });
      fetchFabrics();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Deseas eliminar esta tela?')) return;
    const res = await fetch(`/api/fabrics?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchFabrics();
  };

  const filteredFabrics = fabrics.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.material.toLowerCase().includes(search.toLowerCase()) ||
      f.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-emerald-900">🧵 Catálogo de Telas</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre de la Tela</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 w-full border rounded-lg p-2 border-gray-300"
            placeholder="Ej. Algodón Peinado"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Material</label>
          <input
            type="text"
            required
            value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
            className="mt-1 w-full border rounded-lg p-2 border-gray-300"
            placeholder="Ej. Algodón 100%"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Costo por Metro ($)</label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.costPerMeter}
            onChange={(e) => setFormData({ ...formData, costPerMeter: e.target.value })}
            className="mt-1 w-full border rounded-lg p-2 border-gray-300"
            placeholder="Ej. 85.50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="text"
            required
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="mt-1 w-full border rounded-lg p-2 border-gray-300"
            placeholder="Ej. Blanco"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Proveedor</label>
          <input
            type="text"
            required
            value={formData.supplier}
            onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
            className="mt-1 w-full border rounded-lg p-2 border-gray-300"
            placeholder="Ej. Textiles México"
          />
        </div>
        <div className="flex items-end">
          <button type="submit" className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-semibold p-2.5 rounded-lg transition">
            ➕ Agregar Tela
          </button>
        </div>
      </form>

      {/* Buscador y Tabla */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre, material o proveedor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-2.5 border-gray-300"
        />

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600 text-sm">
              <th className="p-3">Nombre</th>
              <th className="p-3">Material</th>
              <th className="p-3">Costo / m</th>
              <th className="p-3">Color</th>
              <th className="p-3">Proveedor</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredFabrics.map((fabric) => (
              <tr key={fabric.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{fabric.name}</td>
                <td className="p-3">{fabric.material}</td>
                <td className="p-3 text-emerald-700 font-semibold">${fabric.costPerMeter.toFixed(2)}</td>
                <td className="p-3">{fabric.color}</td>
                <td className="p-3">{fabric.supplier}</td>
                <td className="p-3 text-center">
                  <button onClick={() => handleDelete(fabric.id)} className="text-red-600 hover:text-red-800 font-semibold">
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