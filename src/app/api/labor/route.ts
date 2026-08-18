import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const laborCosts = await prisma.laborCost.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(laborCosts);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener costos de mano de obra' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { garmentType, complexity, cost } = body;

    const newLabor = await prisma.laborCost.create({
      data: {
        garmentType,
        complexity,
        cost: parseFloat(cost),
      },
    });

    return NextResponse.json(newLabor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar mano de obra' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    await prisma.laborCost.delete({ where: { id } });
    return NextResponse.json({ message: 'Registro eliminado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar mano de obra' }, { status: 500 });
  }
}