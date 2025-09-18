import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://gin-production-a8d8.up.railway.app/garbage/coords', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Para asegurar datos frescos cada vez
    });

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al obtener datos de puntos:', error);
    return NextResponse.json({ error: 'Error al obtener datos' }, { status: 500 });
  }
}
