import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// GET /api/quotes
// Obtener las cotizaciones del usuario autenticado
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "No estás autenticado" },
        { status: 401 }
      );
    }

    const quotes = await prisma.quote.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      quotes,
    });
  } catch (error) {
    console.error("GET_QUOTES_ERROR:", error);

    return NextResponse.json(
      {
        error: "No se pudieron obtener las cotizaciones",
      },
      {
        status: 500,
      }
    );
  }
}

// POST /api/quotes
// Crear una nueva cotización
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "No estás autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const fabricName = String(body.fabricName || "").trim();
    const garmentType = String(body.garmentType || "").trim();
    const size = String(body.size || "").trim();

    const metersRequired = Number(body.metersRequired);
    const fabricCost = Number(body.fabricCost);
    const laborCost = Number(body.laborCost);
    const profitPercentage = Number(body.profitPercentage || 0);
    const total = Number(body.total);

    if (
      !fabricName ||
      !garmentType ||
      !size ||
      !Number.isFinite(metersRequired) ||
      !Number.isFinite(fabricCost) ||
      !Number.isFinite(laborCost) ||
      !Number.isFinite(total)
    ) {
      return NextResponse.json(
        {
          error: "Datos de cotización incompletos o inválidos",
        },
        {
          status: 400,
        }
      );
    }

    const quote = await prisma.quote.create({
      data: {
        userId: user.id,
        fabricName,
        garmentType,
        size,
        metersRequired,
        fabricCost,
        laborCost,
        profitPercentage,
        total,
      },
    });

    return NextResponse.json(
      {
        message: "Cotización guardada correctamente",
        quote,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST_QUOTES_ERROR:", error);

    return NextResponse.json(
      {
        error: "No se pudo guardar la cotización",
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE /api/quotes?id=ID
// Eliminar una cotización del usuario autenticado
export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "No estás autenticado" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: "Falta el ID de la cotización",
        },
        {
          status: 400,
        }
      );
    }

    const quote = await prisma.quote.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!quote) {
      return NextResponse.json(
        {
          error: "Cotización no encontrada",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.quote.delete({
      where: {
        id: quote.id,
      },
    });

    return NextResponse.json({
      message: "Cotización eliminada correctamente",
    });
  } catch (error) {
    console.error("DELETE_QUOTES_ERROR:", error);

    return NextResponse.json(
      {
        error: "No se pudo eliminar la cotización",
      },
      {
        status: 500,
      }
    );
  }
}