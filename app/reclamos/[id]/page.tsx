interface Props {
  params: { id: string };
}

export default function ReclamoDetallePage({ params }: Props) {
  const { id } = params;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">📢 Reclamo {id}</h1>

      {/* Información del reclamo */}
      <div className="mb-4 p-3 border rounded bg-[#EBEDF2]">
        <p><strong>Descripción:</strong></p>
        <p>
          Aquí iría la información detallada del reclamo {id}, traída desde la base de datos.
        </p>
      </div>

      {/* Formulario de estado */}
      <div className="space-y-4">
        <textarea
          placeholder="Descripción del reclamo..."
          className="w-full p-2 border rounded h-32"
        ></textarea>

        <div className="flex space-x-4">
          <button className="bg-[#260101] text-white px-4 py-2 rounded hover:bg-red-800">
            EN CURSO
          </button>
          <button className="bg-[#260101] text-white px-4 py-2 rounded hover:bg-red-800">
            TERMINADO
          </button>
          <button className="bg-[#260101] text-white px-4 py-2 rounded hover:bg-red-800">
            RECHAZADO
          </button>
        </div>
      </div>
    </div>
  );
}