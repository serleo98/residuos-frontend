import { NextResponse } from 'next/server';

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

export async function POST(request: Request) {
  try {
    const points = await request.json() as Point[];
    
    if (!points || points.length < 2) {
      return NextResponse.json(
        { error: 'Se requieren al menos dos puntos' },
        { status: 400 }
      );
    }
    
    // Array para almacenar todas las rutas entre puntos adyacentes
    const routeSegments: RouteSegment[] = [];
    
    // Obtener rutas para cada par de puntos consecutivos usando Mapbox Directions API
    for (let i = 0; i < points.length - 1; i++) {
      const from = points[i];
      const to = points[i + 1];
      
      try {
        // Token de acceso de Mapbox (el usuario debería reemplazar esto con su propio token)
        const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN || 'pk.ey...'; // Reemplazar con un token real
        
        // URL de la API de Mapbox Directions
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${from.lng},${from.lat};${to.lng},${to.lat}?geometries=geojson&overview=full&access_token=${mapboxToken}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error en Mapbox Directions: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.routes || data.routes.length === 0) {
          throw new Error('No se encontró ruta en Mapbox');
        }
        
        // Extraer los puntos de la ruta desde la respuesta de Mapbox
        const route = data.routes[0];
        const coordinates = route.geometry.coordinates;
        
        // Convertir el formato de Mapbox (lng, lat) a nuestro formato (lat, lng)
        const routePoints = coordinates.map((coord: [number, number]) => ({
          lng: coord[0],
          lat: coord[1]
        }));
        
        routeSegments.push({
          from: from.id,
          to: to.id,
          points: routePoints,
          distance: route.distance,
          time: route.duration * 1000 // Convertir segundos a milisegundos
        });
      } catch (error) {
        console.error('Error al obtener ruta desde Mapbox:', error);
        
        // Si falla la API de Mapbox, usar nuestra cuadrícula como fallback
        const gridPoints = getEnhancedLinearRoute(from, to);
        
        const distance = calculateDistance(from, to);
        const estimatedSpeed = 30 * 1000 / 3600; // 30 km/h en m/s
        const estimatedTime = Math.round(distance / estimatedSpeed) * 1000;
        
        routeSegments.push({
          from: from.id,
          to: to.id,
          points: gridPoints,
          distance: distance,
          time: estimatedTime
        });
      }
    }
    
    return NextResponse.json(routeSegments);
  } catch (error) {
    console.error('Error al obtener la ruta detallada:', error);
    return NextResponse.json(
      { error: 'Error al obtener la ruta detallada' },
      { status: 500 }
    );
  }
}

// Función para decodificar una polyline de Google Maps
function decodePolyline(encoded: string): { lat: number; lng: number }[] {
  const poly = [];
  let index = 0, lat = 0, lng = 0;

  while (index < encoded.length) {
    let b, shift = 0, result = 0;
    
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    
    const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;
    
    shift = 0;
    result = 0;
    
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    
    const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;
    
    poly.push({
      lat: lat / 1e5,
      lng: lng / 1e5
    });
  }
  
  return poly;
}

// Función para crear una ruta que sigue estrictamente las calles de una cuadrícula urbana
function getEnhancedLinearRoute(from: Point, to: Point): { lat: number; lng: number }[] {
  // Definimos una cuadrícula de calles
  // Aproximadamente cada 0.0015 grados de lat/lng es una cuadra en una ciudad típica
  const gridSize = 0.0015;
  
  // Función para encontrar el punto de cuadrícula más cercano
  function snapToGrid(lat: number, lng: number): { lat: number, lng: number } {
    return {
      lat: Math.round(lat / gridSize) * gridSize,
      lng: Math.round(lng / gridSize) * gridSize
    };
  }
  
  // Convertimos los puntos de inicio y fin a la cuadrícula
  const startGrid = snapToGrid(from.lat, from.lng);
  const endGrid = snapToGrid(to.lat, to.lng);
  
  // Calculamos los pasos necesarios en cada dirección
  const latSteps = Math.round((endGrid.lat - startGrid.lat) / gridSize);
  const lngSteps = Math.round((endGrid.lng - startGrid.lng) / gridSize);
  
  // Creamos un array para almacenar la ruta
  const routePoints: { lat: number; lng: number }[] = [];
  
  // Añadimos el punto de inicio exacto
  routePoints.push({ lat: from.lat, lng: from.lng });
  
  // Si no estamos en una intersección de calles, nos movemos primero hacia la cuadrícula
  if (from.lat !== startGrid.lat || from.lng !== startGrid.lng) {
    routePoints.push({ lat: startGrid.lat, lng: startGrid.lng });
  }
  
  // Decidimos si primero nos movemos en latitud o longitud (simulando manzanas)
  const moveLatFirst = Math.abs(latSteps) > Math.abs(lngSteps);
  
  let currentLat = startGrid.lat;
  let currentLng = startGrid.lng;
  
  if (moveLatFirst) {
    // Primero nos movemos en dirección norte/sur por las "calles verticales"
    const latDirection = Math.sign(latSteps);
    for (let i = 0; i < Math.abs(latSteps); i++) {
      currentLat += latDirection * gridSize;
      routePoints.push({ lat: currentLat, lng: currentLng });
    }
    
    // Luego nos movemos en dirección este/oeste por las "calles horizontales"
    const lngDirection = Math.sign(lngSteps);
    for (let i = 0; i < Math.abs(lngSteps); i++) {
      currentLng += lngDirection * gridSize;
      routePoints.push({ lat: currentLat, lng: currentLng });
    }
  } else {
    // Primero nos movemos en dirección este/oeste por las "calles horizontales"
    const lngDirection = Math.sign(lngSteps);
    for (let i = 0; i < Math.abs(lngSteps); i++) {
      currentLng += lngDirection * gridSize;
      routePoints.push({ lat: currentLat, lng: currentLng });
    }
    
    // Luego nos movemos en dirección norte/sur por las "calles verticales"
    const latDirection = Math.sign(latSteps);
    for (let i = 0; i < Math.abs(latSteps); i++) {
      currentLat += latDirection * gridSize;
      routePoints.push({ lat: currentLat, lng: currentLng });
    }
  }
  
  // Si el punto final no está exactamente en una intersección, agregamos un movimiento hacia él
  if (endGrid.lat !== to.lat || endGrid.lng !== to.lng) {
    routePoints.push({ lat: to.lat, lng: to.lng });
  }
  
  // Verificamos si el último punto añadido es el destino, si no, lo añadimos
  const lastPoint = routePoints[routePoints.length - 1];
  if (lastPoint.lat !== to.lat || lastPoint.lng !== to.lng) {
    routePoints.push({ lat: to.lat, lng: to.lng });
  }
  
  return routePoints;
}

// Función para calcular la distancia entre dos puntos usando la fórmula de Haversine
function calculateDistance(from: Point, to: Point): number {
  const R = 6371e3; // Radio de la Tierra en metros
  const φ1 = (from.lat * Math.PI) / 180;
  const φ2 = (to.lat * Math.PI) / 180;
  const Δφ = ((to.lat - from.lat) * Math.PI) / 180;
  const Δλ = ((to.lng - from.lng) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distancia en metros
}
