const horarios = [
  { zona: "Zona A", horario: "08:00 - 16:00" },
  { zona: "Zona B", horario: "08:00 - 16:00" },
  { zona: "Zona C", horario: "08:00 - 16:00" },
  { zona: "Zona D", horario: "08:00 - 16:00" },
];

export default function HorariosPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h1 className="text-xl font-bold mb-6">🕒 Horarios de Recolección</h1>

      <div className="space-y-4">
        {horarios.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 border rounded bg-[#EBEDF2]"
          >
            <span className="font-medium">{item.zona}</span>
            <span className="text-gray-700">{item.horario}</span>
          </div>
        ))}
      </div>
    </div>
  );
}