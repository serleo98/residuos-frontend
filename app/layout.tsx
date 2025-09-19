import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen bg-[#EBEDF2]">
        {/* Sidebar izquierda */}
        <aside className="w-64 bg-[#C9DBF2] p-4 flex flex-col border-r border-gray-300">
          <h2 className="text-lg font-bold text-[#260101] mb-6">♻️ Residuos</h2>
          <nav className="space-y-2">
            <Link href="/empleado" className="block hover:bg-[#828CA0] p-2 rounded">👷 Empleado</Link>
            <Link href="/tachos" className="block hover:bg-[#828CA0] p-2 rounded">🗑️ Tachos</Link>
            <Link href="/emergencias" className="block hover:bg-[#828CA0] p-2 rounded">🚨 Emergencias</Link>
            <Link href="/horarios" className="block hover:bg-[#828CA0] p-2 rounded">⏰ Horarios</Link>
            <Link href="/reclamos" className="block hover:bg-[#828CA0] p-2 rounded">📢 Reclamos</Link>
          </nav>
        </aside>

        {/* Contenedor principal */}
        <div className="flex-1 flex flex-col">
          {/* Barra superior */}
          <header className="bg-[#260101] text-white p-4 flex justify-between items-center shadow">
            <h1 className="text-lg font-bold">CityPass+ – Residuos</h1>
            <nav className="space-x-4">
              <Link href="#" className="hover:underline">⚙️ Configuración</Link>
              <Link href="#" className="hover:underline">📊 Otros módulos</Link>
            </nav>
          </header>

          {/* Contenido dinámico */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}