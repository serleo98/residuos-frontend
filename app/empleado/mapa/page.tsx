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

interface Point {
  id: number;
  lat: number;
  lng: number;
}

interface RouteSegment {
  from: number;
  to: number;
  points: { lat: number; lng: number }[];
  distance: number;
  time: number;
}

export default function MapaPage() {
  const router = useRouter();
  const [points, setPoints] = useState<Point[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [routeSegments, setRouteSegments] = useState<RouteSegment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Obtener los puntos de la ruta
        const resPoints = await fetch("/api/ruta-optima/1");
        const dataPoints = await resPoints.json();
        setPoints(dataPoints);

        if (dataPoints.length > 1) {
          // Obtener las rutas detalladas entre los puntos
          const resRoute = await fetch("/api/ruta-detallada", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataPoints),
          });

          if (!resRoute.ok) {
            throw new Error("Error al obtener la ruta detallada");
          }

          const routeData = await resRoute.json();
          setRouteSegments(routeData);
        }
      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    if (currentIndex < points.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFinish = () => {
    router.push("/empleado");
  };

  // Función para obtener todos los puntos de la ruta hasta el índice actual
  const getRoutePointsUpToIndex = (index: number) => {
    if (routeSegments.length === 0) return [];
    
    let allPoints: { lat: number; lng: number }[] = [];
    
    // Añadir cada segmento de ruta hasta el índice actual
    for (let i = 0; i < index; i++) {
      const segment = routeSegments.find(s => s.from === points[i].id && s.to === points[i+1].id);
      if (segment) {
        allPoints = [...allPoints, ...segment.points];
      }
    }
    
    return allPoints;
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Ruta Óptima</h1>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        {points.length > 0 && !isLoading && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: points[currentIndex].lat,
              lng: points[currentIndex].lng,
            }}
            zoom={15}
          >
            {/* Ruta detallada hasta el punto actual */}
            {routeSegments.length > 0 && (
              <Polyline
                path={getRoutePointsUpToIndex(currentIndex)}
                options={{
                  strokeColor: "#dd7027ff",
                  strokeOpacity: 0.9,
                  strokeWeight: 5,
                }}
              />
            )}

            {/* Todos los puntos como marcadores */}
            {points.map((point, index) => (
              <Marker
                key={point.id}
                position={{
                  lat: point.lat,
                  lng: point.lng,
                }}
                label={`${index + 1}`}
                icon={{
                  url: index === currentIndex 
                    ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png" 
                    : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }}
              />
            ))}
          </GoogleMap>
        )}
      </LoadScript>

      {isLoading && (
        <div className="text-center py-10">
          <p>Cargando ruta optimizada...</p>
        </div>
      )}

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