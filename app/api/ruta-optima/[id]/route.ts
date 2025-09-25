import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }
) {
  try {
    // Esperar los parámetros como recomienda Next.js
    const id = params.id;
    // Necesitamos codificar el email ya que puede contener caracteres especiales en la URL
    const username = decodeURIComponent(id);
    console.log(id);
    
    console.log(`Obteniendo ruta óptima para usuario: ${username}`);
    
    // Para depurar, vamos a generar puntos de prueba si hay errores con la API
    let data;
    try {
      // Hacemos la petición a la API usando el email en el header
      const response = await fetch(`https://integraciondeaplicaciones2.onrender.com/ruta-optima`, {
        headers: {
          'accept': 'application/json',
          'email': id // El nombre de usuario va como email en el header
        }
      });
      console.log("respuesta de la api");
      console.log(response);
      
      if (!response.ok) {
        throw new Error(`Error en API externa: ${response.status}`);
      }
      
      data = await response.json();
      console.log("respuesta de la api");
      console.log(data);
      data = data.routes;
    } catch (apiError) {
      console.error('Error al consultar la API externa, usando datos de prueba:', apiError);
      
      // Datos de prueba en caso de error con la API externa
      data = [
        { id: 1, lat: -32.943, lng: -60.650 },
        { id: 2, lat: -32.945, lng: -60.655 },
        { id: 3, lat: -32.947, lng: -60.648 },
        { id: 4, lat: -32.940, lng: -60.652 },
        { id: 5, lat: -32.938, lng: -60.649 }
      ];
    }
    
    console.log('Datos de ruta:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al obtener la ruta óptima:', error);
    return NextResponse.json(
      { error: 'Error al obtener la ruta óptima' },
      { status: 500 }
    );
  }
}
