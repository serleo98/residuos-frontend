"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmpleadoPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = [
    { user: "empleado1", pass: "1234" },
    { user: "empleado2", pass: "1234" },
    { user: "admin", pass: "admin" },
    { user: "eze@example.com", pass: "1234" },
    { user: "leo@example.com", pass: "1234" },
    { user: "juan@example.com", pass: "1234" },
    { user: "sergio@example.com", pass: "1234" },
    { user: "fede@example.com", pass: "1234" },
    { user: "gonza@example.com", pass: "1234" },
    { user: "maria@example.com", pass: "1234" },
    { user: "lucia@example.com", pass: "1234" },
    { user: "sofia@example.com", pass: "1234" },
    { user: "camila@example.com", pass: "1234" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUser = users.find(
      (u) => u.user === username && u.pass === password
    );

    if (validUser) {
      localStorage.setItem("user", username);
      router.push("/empleado/mapa");
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