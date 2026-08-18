import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const garments = await prisma.garmentSize.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(garments);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener las prendas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { garmentType, size, metersRequired } = body;

    const newGarment = await prisma.garmentSize.create({
      data: {
        garmentType,
        size,
        metersRequired: parseFloat(metersRequired),
      },
    });

    return NextResponse.json(newGarment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar prenda' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    await prisma.garmentSize.delete({ where: { id } });
    return NextResponse.json({ message: 'Registro eliminado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar registro' }, { status: 500 });
  }
}