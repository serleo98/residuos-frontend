const tachos = [
  { id: "Tacho 1", estado: "Vacío", ubicacion: "dkfshgb 16541" },
  { id: "Tacho 2", estado: "Medio", ubicacion: "dkfshgb 19462" },
  { id: "Tacho 3", estado: "Lleno", ubicacion: "dkfshgb 25489" },
  { id: "Tacho 4", estado: "Fuera de servicio", ubicacion: "dkfshgb 32698" },
];

export default function TachosPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h1 className="text-xl font-bold mb-6">🗑️ Estado de Tachos</h1>

      <div className="space-y-4">
        {tachos.map((tacho, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 border rounded bg-[#EBEDF2]"
          >
            <div className="flex flex-col">
              <span className="font-medium">{tacho.id}</span>
              <span className="text-gray-700">Estado: {tacho.estado}</span>
            </div>
            <span className="text-gray-700">Identificación: {tacho.ubicacion}</span>
          </div>
        ))}
      </div>
    </div>
  );
}