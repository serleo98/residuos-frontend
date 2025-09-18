"use client";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "600px",
};

interface Point {
  id?: number;
  lat: number;
  lng: number;
}

interface GarbageResponse {
  base: {
    label: string;
    lat: number;
    lng: number;
  };
  count: number;
  points: Point[];
  radius_m: number;
}

export default function MapPage() {
  const router = useRouter();
  const [routePoints, setRoutePoints] = useState<Point[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGarbagePoints = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/garbage');
        if (!response.ok) {
          throw new Error(`Error de API: ${response.status}`);
        }
        
        const data: GarbageResponse = await response.json();
        
        // Añadimos el punto base al inicio para tener un punto de partida
        const allPoints = [data.base, ...data.points];
        setRoutePoints(allPoints);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setIsLoading(false);
      }
    };

    fetchGarbagePoints();
  }, []);

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

      {isLoading && (
        <div className="flex justify-center items-center h-60">
          <p className="text-lg">Cargando rutas de recolección...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error al cargar los puntos: {error}</p>
        </div>
      )}

      {!isLoading && !error && routePoints.length > 0 && (
        <>
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
                  label={`${index}`}
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
        </>
      )}
    </div>
  );
}