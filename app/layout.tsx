import { AuthProvider } from "./AuthContext";
import Sidebar from "./components/Sidebar";
import "./globals.css";

export const metadata = {
  title: "CityPass+ – Residuos",
  description: "Plataforma de gestión de residuos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen bg-[#03A64A]">
        <AuthProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <header className="bg-[#260101] text-white p-4 flex justify-between items-center shadow">
              <h1 className="text-lg font-bold">CityPass+ – Residuos</h1>
            </header>
            <main className="flex-1 p-6 bg-gray-100">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}