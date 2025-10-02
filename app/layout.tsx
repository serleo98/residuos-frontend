import { AuthProvider } from "./AuthContext";
import Sidebar from "./components/Sidebar";
import "./globals.css";

export const metadata = {
  title: "CityPass+ – Residuos",
  description: "Plataforma de gestión de residuos",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="light" className="light">
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body className="flex min-h-screen bg-[#03A64A]" style={{ color: 'var(--text-on-green)' }}>
        <AuthProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <header className="bg-[#260101] p-4 flex justify-between items-center shadow" style={{ color: 'var(--text-on-dark)' }}>
              <h1 className="text-lg font-bold">CityPass+ – Residuos</h1>
            </header>
            <main className="flex-1 p-6" style={{ backgroundColor: 'var(--main-bg)', color: 'var(--foreground)' }}>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}