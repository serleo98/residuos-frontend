"use client";

import { useState } from "react";

export default function EmergenciasPage() {
  const [tipo, setTipo] = useState("");
  const [detalle, setDetalle] = useState("");

  const emergencias = ["Incendio", "Accidente", "Derrumbe", "Inundación", "Otro"];

  const handleSubmit = async () => {
    if (!tipo || !detalle) {
      alert("Por favor selecciona un tipo y agrega detalle.");
      return;
    }

    try {
      const res = await fetch(
        "https://integraciondeaplicaciones2.onrender.com/enviar-emergencia",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tipo: tipo.toLowerCase(), // ejemplo: "incendio"
            descripcion: detalle,     // ejemplo: "tacho incendiado"
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Error al enviar la emergencia");
      }

      alert("🚨 Emergencia reportada correctamente.");
      setTipo("");
      setDetalle("");
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo enviar la emergencia, intenta nuevamente.");
    }
  };

  return (
    <div className="flex h-screen">

      <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Emergencias</h1>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">Selecciona tipo de emergencia:</h2>
          <div className="flex flex-wrap gap-3">
            {emergencias.map((e) => (
              <button
                key={e}
                onClick={() => setTipo(e)}
                className={`px-4 py-2 rounded-lg border ${
                  tipo === e ? "bg-green-600 text-white" : "bg-white"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">Detalle de la emergencia:</h2>
          <textarea
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            className="w-full h-32 border rounded-lg p-3"
            placeholder="Escribe aquí más información..."
          />
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-600 text-white rounded-lg"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}