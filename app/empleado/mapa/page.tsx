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
  const [user, setUser] = useState<string | null>(null);

  // 🔹 Validación de login antes de mostrar mapa
  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (!loggedUser) {
      router.push("/login"); // Si no hay login -> redirige
    } else {
      setUser(loggedUser);
    }
  }, [router]);

  // 🔹 Cargar ruta desde backend
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
    router.push("/empleado"); // O dashboard final
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      {/* Header con usuario y logout */}
      <div className="flex justify-between items-center bg-green-700 text-white p-4 rounded-md mb-4">
        <h1 className="text-xl font-bold">Ruta Óptima 🗺️</h1>
        <div className="flex items-center gap-4">
          {user && <span className="italic">👤 {user}</span>}
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Mapa */}
      <div className="flex-1">
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
              {/* 🔹 Trazo parcial hasta el punto actual */}
              <Polyline
                path={points.slice(0, currentIndex + 1).map((p) => ({ lat: p.lat, lng: p.lng }))}
                options={{
                  strokeColor: "#dd7027ff",
                  strokeOpacity: 0.9,
                  strokeWeight: 5,
                }}
              />

              {/* 🔹 Marcador actual */}
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
      </div>

      {/* Botones de navegación */}
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