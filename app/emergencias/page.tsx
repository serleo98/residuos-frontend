export default function EmergenciasPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">🚨 Reporte de Emergencia</h1>
      <form className="space-y-4">
        <select className="w-full p-2 border rounded">
          <option value="">Seleccionar tipo de emergencia</option>
          <option value="incendio">🔥 Incendio</option>
          <option value="robo">🚔 Robo</option>
          <option value="accidente">🚑 Accidente</option>
        </select>
        <textarea
          placeholder="Describir emergencia..."
          className="w-full p-2 border rounded h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-[#260101] text-white px-6 py-2 rounded hover:bg-red-800"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}