"use client";
import { useState } from "react";
import { useAuth } from "../AuthContext";

interface Horario {
  id: number;
  zona: string;
  horario: string;
}

export default function HorariosPage() {
  const { user, loading } = useAuth();
  const [horarios, setHorarios] = useState<Horario[]>([
    { id: 1, zona: "A", horario: "08:00 - 12:00" },
    { id: 2, zona: "B", horario: "14:00 - 18:00" },
  ]);

  const [zona, setZona] = useState("");
  const [horario, setHorario] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const handleAgregar = () => {
    if (!zona || !horario) return;
    if (editandoId) {
      setHorarios((prev) =>
        prev.map((h) => (h.id === editandoId ? { ...h, zona, horario } : h))
      );
      setEditandoId(null);
    } else {
      setHorarios((prev) => [...prev, { id: Date.now(), zona, horario }]);
    }
    setZona("");
    setHorario("");
  };

  const handleEditar = (id: number) => {
    const h = horarios.find((h) => h.id === id);
    if (h) {
      setZona(h.zona);
      setHorario(h.horario);
      setEditandoId(h.id);
    }
  };

  const handleEliminar = (id: number) => {
    setHorarios((prev) => prev.filter((h) => h.id !== id));
  };

  // 🔹 manejo de loading y login
  if (loading) return <p className="p-4">⏳ Cargando sesión...</p>;
  if (!user) return <p className="p-4">⚠️ Debes iniciar sesión</p>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">⏰ Horarios por Zona</h2>

      <ul className="space-y-2 mb-6">
        {horarios.map((h) => (
          <li
            key={h.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded"
          >
            <span>
              <strong>Zona:</strong> {h.zona} | <strong>Horario:</strong>{" "}
              {h.horario}
            </span>
            {user.role === "admin" && (
              <div className="space-x-2">
                <button
                  onClick={() => handleEditar(h.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleEliminar(h.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  🗑️ Eliminar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {user.role === "admin" && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Zona"
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Horario (ej: 08:00 - 12:00)"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAgregar}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editandoId ? "💾 Guardar cambios" : "➕ Agregar horario"}
          </button>
        </div>
      )}
    </div>
  );
}