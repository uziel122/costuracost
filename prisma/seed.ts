import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Insertando datos iniciales...");

  // =========================
  // TELAS
  // =========================

  await prisma.fabric.createMany({
    data: [
      {
        name: "Algodón",
        material: "Algodón",
        costPerMeter: 85.5,
        color: "Blanco",
        supplier: "Proveedor General",
      },
      {
        name: "Poliéster",
        material: "Poliéster",
        costPerMeter: 65,
        color: "Negro",
        supplier: "Proveedor General",
      },
      {
        name: "Mezclilla",
        material: "Denim",
        costPerMeter: 120,
        color: "Azul",
        supplier: "Proveedor General",
      },
      {
        name: "Lino",
        material: "Lino",
        costPerMeter: 150,
        color: "Beige",
        supplier: "Proveedor General",
      },
      {
        name: "Seda",
        material: "Seda",
        costPerMeter: 220,
        color: "Rojo",
        supplier: "Proveedor General",
      },
    ],
  });

  // =========================
  // TIPOS DE PRENDA Y TALLAS
  // =========================

  await prisma.garmentSize.createMany({
    data: [
      // Playera
      {
        garmentType: "Playera",
        size: "S",
        metersRequired: 1.2,
      },
      {
        garmentType: "Playera",
        size: "M",
        metersRequired: 1.4,
      },
      {
        garmentType: "Playera",
        size: "L",
        metersRequired: 1.5,
      },
      {
        garmentType: "Playera",
        size: "XL",
        metersRequired: 1.7,
      },
      {
        garmentType: "Playera",
        size: "XXL",
        metersRequired: 1.9,
      },

      // Pantalón
      {
        garmentType: "Pantalón",
        size: "S",
        metersRequired: 1.5,
      },
      {
        garmentType: "Pantalón",
        size: "M",
        metersRequired: 1.7,
      },
      {
        garmentType: "Pantalón",
        size: "L",
        metersRequired: 1.9,
      },
      {
        garmentType: "Pantalón",
        size: "XL",
        metersRequired: 2.1,
      },
      {
        garmentType: "Pantalón",
        size: "XXL",
        metersRequired: 2.3,
      },

      // Vestido
      {
        garmentType: "Vestido",
        size: "S",
        metersRequired: 2.0,
      },
      {
        garmentType: "Vestido",
        size: "M",
        metersRequired: 2.2,
      },
      {
        garmentType: "Vestido",
        size: "L",
        metersRequired: 2.4,
      },
      {
        garmentType: "Vestido",
        size: "XL",
        metersRequired: 2.6,
      },
      {
        garmentType: "Vestido",
        size: "XXL",
        metersRequired: 2.8,
      },

      // Sudadera
      {
        garmentType: "Sudadera",
        size: "S",
        metersRequired: 1.8,
      },
      {
        garmentType: "Sudadera",
        size: "M",
        metersRequired: 2.0,
      },
      {
        garmentType: "Sudadera",
        size: "L",
        metersRequired: 2.2,
      },
      {
        garmentType: "Sudadera",
        size: "XL",
        metersRequired: 2.4,
      },
      {
        garmentType: "Sudadera",
        size: "XXL",
        metersRequired: 2.6,
      },
    ],
  });

  // =========================
  // COSTOS DE MANO DE OBRA
  // =========================

  await prisma.laborCost.createMany({
    data: [
      {
        garmentType: "Playera",
        complexity: "Básica",
        cost: 70,
      },
      {
        garmentType: "Pantalón",
        complexity: "Intermedia",
        cost: 120,
      },
      {
        garmentType: "Vestido",
        complexity: "Alta",
        cost: 180,
      },
      {
        garmentType: "Sudadera",
        complexity: "Intermedia",
        cost: 130,
      },
    ],
  });

  console.log("✅ Datos iniciales insertados correctamente.");
}

main()
  .catch((error) => {
    console.error("❌ Error al insertar datos:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });