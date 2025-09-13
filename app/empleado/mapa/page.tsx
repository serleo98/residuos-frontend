"use client";
import { useRouter } from "next/navigation";

export default function MapaEmpleado() {
  const router = useRouter();

  const handleFinish = () => {
    // 🔹 Acá se puede también avisar al backend que terminó su ruta
    router.push("/empleado"); // Redirige al login de empleado
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-xl font-bold mb-4">Ruta asignada</h2>
      <img
        src="/mapa.png"
        alt="Mapa con ruta"
        className="border rounded shadow-md w-[600px] h-[400px] object-cover"
      />
      <button
        onClick={handleFinish}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Fin
      </button>
    </div>
  );
}