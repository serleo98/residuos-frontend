"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user"); // 🗑️ borramos el usuario
    router.push("/"); // 👈 redirigimos al login
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    >
      🚪 Cerrar sesión
    </button>
  );
}