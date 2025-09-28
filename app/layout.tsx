"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <html lang="es">
      <body className="flex min-h-screen bg-[#03A64A]">
        {/* Sidebar */}
        <aside className="w-64 bg-green-500 p-4 flex flex-col border-r border-gray-300">
          <h2 className="text-lg font-bold text-[#260101] mb-6">♻️ Residuos</h2>

          <nav className="space-y-2 flex-1">
            {/* Opciones por rol */}
            {user?.role === "basurero" && (
              <>
                <Link href="/empleado/mapa" className="block hover:bg-[#828CA0] p-2 rounded">
                  🗺️ Mapa
                </Link>
                <Link href="/empleado/emergencias" className="block hover:bg-[#828CA0] p-2 rounded">
                  🚨 Emergencias
                </Link>
                <Link href="/empleado/horarios" className="block hover:bg-[#828CA0] p-2 rounded">
                  ⏰ Horarios
                </Link>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <Link href="/admin/reclamos" className="block hover:bg-[#828CA0] p-2 rounded">
                  📢 Reclamos
                </Link>
                <Link href="/admin/tachos" className="block hover:bg-[#828CA0] p-2 rounded">
                  🗑️ Administración de Tachos
                </Link>
              </>
            )}

            {user?.role === "creador" && (
              <Link href="/creador/crear-tacho" className="block hover:bg-[#828CA0] p-2 rounded">
                🗑️ Crear Tachos
              </Link>
            )}
          </nav>

          {/* Logout solo si está logueado */}
          {user && (
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              🚪 Cerrar sesión
            </button>
          )}
        </aside>

        {/* Contenedor principal */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-[#260101] text-white p-4 flex justify-between items-center shadow">
            <h1 className="text-lg font-bold">CityPass+ – Residuos</h1>
          </header>

          {/* Contenido dinámico */}
          <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  );
}