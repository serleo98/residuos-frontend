const reclamos = [
  { id: 1, titulo: "Reclamo 1" },
  { id: 2, titulo: "Reclamo 2" },
  { id: 3, titulo: "Reclamo 3" },
  { id: 4, titulo: "Reclamo 4" },
  { id: 5, titulo: "Reclamo 5" },
];

export default function ReclamosPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-xl font-bold mb-6">📢 Listado de Reclamos</h1>

      <ul className="space-y-3">
        {reclamos.map((reclamo) => (
          <li
            key={reclamo.id}
            className="flex justify-between items-center p-3 border rounded bg-[#EBEDF2]"
          >
            <span>{reclamo.titulo}</span>
            <a
              href={`/reclamos/${reclamo.id}`}
              className="bg-[#260101] text-white px-3 py-1 rounded hover:bg-red-800"
            >
              Ver
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}