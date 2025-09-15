"use client";
import Link from "next/link";

export default function ReclamosPage() {
  const reclamos = [
    { id: 1, titulo: "Reclamo 1" },
    { id: 2, titulo: "Reclamo 2" },
    { id: 3, titulo: "Reclamo 3" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📢 Reclamos</h2>
      <ul className="space-y-4">
        {reclamos.map((r) => (
          <li key={r.id} className="p-4 border rounded bg-gray-50">
            {/* ✅ USAR Link en vez de <a> */}
            <Link href={`/reclamos/${r.id}`} className="text-blue-600 hover:underline">
              {r.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}