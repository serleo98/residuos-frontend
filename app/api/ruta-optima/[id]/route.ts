import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const response = await fetch(`https://integraciondeaplicaciones2.onrender.com/ruta-optima/1`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al obtener la ruta óptima:', error);
    return NextResponse.json(
      { error: 'Error al obtener la ruta óptima' },
      { status: 500 }
    );
  }
}
