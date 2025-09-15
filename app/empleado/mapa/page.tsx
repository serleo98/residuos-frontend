"use client";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "600px",
};

// 📍 Ejemplo de puntos de ruta (esto vendría del backend)
const routePoints = [
  { lat: -34.6037, lng: -58.3816 }, // inicio (Obelisco, CABA)
  { lat: -34.6118, lng: -58.4173 }, // pin intermedio
  { lat: -34.6170, lng: -58.4450 }, // pin intermedio
  { lat: -34.6280, lng: -58.4630 }, // final
];

export default function MapPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < routePoints.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Ruta completada 🚛✅");
      router.push("/empleado");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🗺️ Ruta de Recolección</h2>

      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={routePoints[currentIndex]}
          zoom={14}
        >
          {/* Dibujar toda la ruta con una línea */}
          <Polyline
            path={routePoints}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 4,
            }}
          />

          {/* Poner todos los pines */}
          {routePoints.map((point, index) => (
            <Marker
              key={index}
              position={point}
              label={`${index + 1}`}
              // 🔵 Destacar solo el pin actual
              icon={
                index === currentIndex
                  ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              }
            />
          ))}
        </GoogleMap>
      </LoadScript>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleNext}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {currentIndex < routePoints.length - 1 ? "Siguiente ➡️" : "Finalizar ✅"}
        </button>
      </div>
    </div>
  );
}