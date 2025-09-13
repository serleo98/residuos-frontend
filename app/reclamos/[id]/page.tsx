"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReclamoDetalle({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [reclamo, setReclamo] = useState<{ id: string; titulo: string; descripcion: string } | null>(null);

  // Simulación: traer datos desde el backend
  useEffect(() => {
    // 🔹 Acá hay que traer el reclamo desde la API con fetch(`/api/reclamos/${params.id}`)
    setReclamo({
      id: params.id,
      titulo: `Reclamo ${params.id}`,
      descripcion: `Aquí iría la información detallada del reclamo ${params.id}, traída desde la base de datos.`,
    });
  }, [params.id]);

  const actualizarEstado = async (estado: string) => {
    try {
      // 🔹 Llamada al backend para actualizar el estado
      await fetch(`/api/reclamos/${params.id}/estado`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
      });

      // 🔹 Volver al listado
      router.push("/reclamos");
    } catch (error) {
      console.error("Error actualizando reclamo:", error);
    }
  };

  if (!reclamo) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📢 {reclamo.titulo}</h2>

      <div className="p-4 bg-gray-100 rounded mb-6">
        <p className="font-semibold">Descripción:</p>
        <p>{reclamo.descripcion}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => actualizarEstado("EN_CURSO")}
          className="bg-[#3a0000] text-white px-4 py-2 rounded"
        >
          EN CURSO
        </button>
        <button
          onClick={() => actualizarEstado("TERMINADO")}
          className="bg-[#3a0000] text-white px-4 py-2 rounded"
        >
          TERMINADO
        </button>
        <button
          onClick={() => actualizarEstado("RECHAZADO")}
          className="bg-[#3a0000] text-white px-4 py-2 rounded"
        >
          RECHAZADO
        </button>
      </div>
    </div>
  );
}