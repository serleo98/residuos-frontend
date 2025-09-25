"use client";

import { useState } from "react";

export default function CrearTachoPage() {
  const [formData, setFormData] = useState({
    id_tipo: "",
    id_estado: "",
    capacidad: "",
    barrio: "",
    direccion: "",
    latitude: "",
    longitude: "",
    prioridad: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        ["capacidad", "id_estado", "id_tipo", "latitude", "longitude", "prioridad"].includes(name)
          ? value === "" ? "" : Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://integraciondeaplicaciones2.onrender.com/tachos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Tacho creado con éxito");
        // Vaciar el formulario
        setFormData({
          id_tipo: "",
          id_estado: "",
          capacidad: "",
          barrio: "",
          direccion: "",
          latitude: "",
          longitude: "",
          prioridad: "",
        });
      } else {
        const errorData = await res.json();
        setMessage(`❌ Error: ${errorData.message || "No se pudo crear el tacho"}`);
      }
    } catch {
      setMessage("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Crear Tacho 🗑️</h1>

        {/* Mostrar mensaje arriba del formulario */}
        {message && (
          <p
            className={`mb-4 font-semibold ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="flex flex-col">
            Barrio
            <input
              type="text"
              name="barrio"
              value={formData.barrio}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <label className="flex flex-col">
            Dirección
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <label className="flex flex-col">
            Capacidad
            <input
              type="number"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <label className="flex flex-col">
            ID Estado
            <input
              type="number"
              name="id_estado"
              value={formData.id_estado}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <label className="flex flex-col">
            ID Tipo (1 a 3)
            <input
              type="number"
              name="id_tipo"
              min={1}
              max={3}
              value={formData.id_tipo}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <label className="flex flex-col">
            Latitud
            <input
              type="number"
              step="0.0001"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <label className="flex flex-col">
            Longitud
            <input
              type="number"
              step="0.0001"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <label className="flex flex-col">
            Prioridad
            <input
              type="number"
              name="prioridad"
              value={formData.prioridad}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Crear Tacho
          </button>
        </form>
      </div>
    </div>
  );
}