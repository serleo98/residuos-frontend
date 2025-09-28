"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Usuarios mockeados con roles
  const users = [
    { user: "empleado1", pass: "1234", role: "basurero" },
    { user: "empleado2", pass: "1234", role: "basurero" },
    { user: "creador", pass: "1234", role: "creador" },
    { user: "admin", pass: "admin", role: "admin" },
    { user: "eze@example.com", pass: "1234", role: "basurero" },
    { user: "leo@example.com", pass: "1234", role: "basurero" },
    { user: "juan@example.com", pass: "1234", role: "basurero" },
    { user: "sergio@example.com", pass: "1234", role: "basurero" },
    { user: "fede@example.com", pass: "1234", role: "basurero" },
    { user: "gonza@example.com", pass: "1234", role: "basurero" },
    { user: "maria@example.com", pass: "1234", role: "basurero" },
    { user: "lucia@example.com", pass: "1234", role: "basurero" },
    { user: "sofia@example.com", pass: "1234", role: "basurero" },
    { user: "camila@example.com", pass: "1234", role: "basurero" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUser = users.find(
      (u) => u.user === username && u.pass === password
    );

    if (validUser) {
      localStorage.setItem("user", JSON.stringify(validUser));
      router.push("/home"); // 🔥 siempre redirige al home
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}