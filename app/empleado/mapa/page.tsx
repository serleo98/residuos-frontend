"use client";

import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

export default function MapaPage() {
  const router = useRouter();
  const [points, setPoints] = useState<{ id: number; lat: number; lng: number }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await fetch("https://integraciondeaplicaciones2.onrender.com/ruta-optima/1");
        const data = await res.json();
        setPoints(data);
      } catch (err) {
        console.error("Error cargando ruta:", err);
      }
    };
    fetchRoute();
  }, []);

  const handleNext = () => {
    if (currentIndex < points.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFinish = () => {
    router.push("/empleado");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Ruta Óptima</h1>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        {points.length > 0 && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: points[currentIndex].lat,
              lng: points[currentIndex].lng,
            }}
            zoom={15}
          >
            {/* Ruta parcial hasta el punto actual */}
            <Polyline
              path={points.slice(0, currentIndex + 1).map((p) => ({ lat: p.lat, lng: p.lng }))}
              options={{
                strokeColor: "#dd7027ff",
                strokeOpacity: 0.9,
                strokeWeight: 5,
              }}
            />

            {/* Marcador actual */}
            <Marker
              position={{
                lat: points[currentIndex].lat,
                lng: points[currentIndex].lng,
              }}
              label={`${currentIndex + 1}`}
            />
          </GoogleMap>
        )}
      </LoadScript>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleNext}
          disabled={currentIndex >= points.length - 1}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
        <button
          onClick={handleFinish}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Fin
        </button>
      </div>
    </div>
  );
}