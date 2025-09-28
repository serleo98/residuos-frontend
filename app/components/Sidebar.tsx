"use client";
import Link from "next/link";
import { useAuth } from "../AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-green-500 p-4 flex flex-col border-r border-gray-300">
      <h2 className="text-lg font-bold text-[#260101] mb-6">♻️ Residuos</h2>
      <nav className="space-y-2 flex-1">
        {user?.role === "basurero" && (
          <>
            <Link href="/empleado/mapa" className="block hover:bg-[#828CA0] p-2 rounded">🗺️ Mapa</Link>
            <Link href="/empleado/emergencias" className="block hover:bg-[#828CA0] p-2 rounded">🚨 Emergencias</Link>
            <Link href="/empleado/horarios" className="block hover:bg-[#828CA0] p-2 rounded">⏰ Horarios</Link>
          </>
        )}
        {user?.role === "admin" && (
          <>
            <Link href="/admin/reclamos" className="block hover:bg-[#828CA0] p-2 rounded">📢 Reclamos</Link>
            <Link href="/admin/tachos" className="block hover:bg-[#828CA0] p-2 rounded">🗑️ Administración de Tachos</Link>
          </>
        )}
        {user?.role === "creador" && (
          <Link href="/creador/crear-tacho" className="block hover:bg-[#828CA0] p-2 rounded">🗑️ Crear Tachos</Link>
        )}
      </nav>

      {user && (
        <button
          onClick={logout}
          className="mt-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🚪 Logout
        </button>
      )}
    </aside>
  );
}