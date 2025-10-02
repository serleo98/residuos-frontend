"use client";
import Link from "next/link";
import { useAuth } from "../AuthContext";

export default function Sidebar() {
  const { user, logout, loading } = useAuth();

  // 🔹 Espera a que se resuelva la sesión
  if (loading) return null;

  // 🔹 No hay usuario -> no mostrar nada
  if (!user) return null;

  return (
    <aside className="w-64 bg-green-500 p-4 flex flex-col border-r border-gray-300 min-h-screen" style={{ color: 'var(--text-on-green)' }}>
      <h2 className="text-lg font-bold mb-6">♻️ Residuos</h2>

      <nav className="space-y-2 flex-1" style={{ color: 'var(--link-color)' }}>
        {user.role === "basurero" && (
          <>
            <Link href="/empleado/mapa" className="block hover:bg-[#828CA0] p-2 rounded" style={{ color: 'var(--link-color)' }}>
              🗺️ Mapa
            </Link>
            <Link href="/empleado/emergencias" className="block hover:bg-[#828CA0] p-2 rounded" style={{ color: 'var(--link-color)' }}>
              🚨 Emergencias
            </Link>
            <Link href="/horarios" className="block hover:bg-[#828CA0] p-2 rounded" style={{ color: 'var(--link-color)' }}>
              ⏰ Horarios
            </Link>
          </>
        )}

        {user.role === "admin" && (
          <>
            <Link href="/admin/reclamos" className="block hover:bg-[#828CA0] p-2 rounded" style={{ color: 'var(--link-color)' }}>
              📢 Reclamos
            </Link>
            <Link href="/admin/tachos" className="block hover:bg-[#828CA0] p-2 rounded" style={{ color: 'var(--link-color)' }}>
              🗑️ Administración de Tachos
            </Link>
            <Link href="/admin/crear-tacho" className="block hover:bg-[#828CA0] p-2 rounded" style={{ color: 'var(--link-color)' }}>
              🗑️ Crear Tachos
            </Link>
            <Link href="/horarios" className="block hover:bg-[#828CA0] p-2 rounded" style={{ color: 'var(--link-color)' }}>
              ⏰ Gestionar Horarios
            </Link>
          </>
        )}
      </nav>

      <button
        onClick={logout}
        className="mt-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        🚪 Cerrar sesión
      </button>
    </aside>
  );
}