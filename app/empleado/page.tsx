"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmpleadoLogin() {
  const [nombre, setNombre] = useState("");
  const [clave, setClave] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // 🔹 Aquí se debe consultar al backend si hay camiones
    const hayCamion = Math.random() > 0.5; // Simulación
    if (hayCamion) {
      router.push("/empleado/mapa");
    } else {
      router.push("/empleado/no-ride");
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-blue-200 p-6 rounded-lg shadow-md w-80">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Clave"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-red-900 text-white py-2 rounded hover:bg-red-700"
        >
          Ingresar
        </button>
        <p className="text-center text-xs mt-2 text-gray-600 cursor-pointer">
          Recuperar clave
        </p>
      </div>
    </div>
  );
}