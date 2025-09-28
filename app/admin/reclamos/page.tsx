"use client";

import Link from "next/link";

export default function ReclamosPage() {
  const reclamos = [
    { id: 1, titulo: "Tacho roto" },
    { id: 2, titulo: "Recolección atrasada" },
    { id: 3, titulo: "Tacho en la calle"},
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📢 Lista de Reclamos</h1>
      <ul className="space-y-2">
        {reclamos.map((r) => (
          <li key={r.id} className="p-2 bg-gray-200 rounded">
            <Link href={`/admin/reclamos/${r.id}`} className="hover:underline">
              {r.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}