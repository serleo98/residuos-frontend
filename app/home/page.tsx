"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Bienvenido {user.user} 👋</h1>

      {user.role === "basurero" && (
        <>
          <button
            onClick={() => router.push("/empleado/mapa")}
            className="block my-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            🗺️ Ver mapa
          </button>

          <button
            onClick={() => router.push("/empleado/emergencias")}
            className="block my-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            🚨 Emergencias
          </button>

          <button
            onClick={() => router.push("/horarios")}
            className="block my-2 bg-indigo-500 text-white px-4 py-2 rounded"
          >
            🕒 Horarios de recolección
          </button>
        </>
      )}

      {user.role === "admin" && (
        <>
          <button
            onClick={() => router.push("/admin/reclamos")}
            className="block my-2 bg-yellow-500 text-white px-4 py-2 rounded"
          >
            📢 Reclamos
          </button>

          <button
            onClick={() => router.push("/admin/tachos")}
            className="block my-2 bg-purple-500 text-white px-4 py-2 rounded"
          >
            🗑️ Administración de Tachos
          </button>
          <button
            onClick={() => router.push("/creador/crear-tacho")}
            className="block my-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            🗑️ Crear Tachos
          </button>
          <button
            onClick={() => router.push("/horarios")}
            className="block my-2 bg-indigo-500 text-white px-4 py-2 rounded"
          >
            🕒 Horarios de recolección
          </button>
        </>
      )}
    </div>
  );
}