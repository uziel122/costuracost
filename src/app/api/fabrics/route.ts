import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const fabrics = await prisma.fabric.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(fabrics);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener las telas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, material, costPerMeter, color, supplier } = body;

    const newFabric = await prisma.fabric.create({
      data: {
        name,
        material,
        costPerMeter: parseFloat(costPerMeter),
        color,
        supplier,
      },
    });

    return NextResponse.json(newFabric, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar la tela' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    await prisma.fabric.delete({ where: { id } });
    return NextResponse.json({ message: 'Tela eliminada exitosamente' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar la tela' }, { status: 500 });
  }
}