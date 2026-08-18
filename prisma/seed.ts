import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Limpiar datos existentes
  await prisma.quote.deleteMany();
  await prisma.user.deleteMany();
  await prisma.fabric.deleteMany();
  await prisma.garmentSize.deleteMany();
  await prisma.laborCost.deleteMany();

  // Usuario de prueba (Password: 123456)
  const hashedPassword = await bcrypt.hash('123456', 10);
  await prisma.user.create({
    data: {
      name: 'Diseñador Demo',
      email: 'demo@costuracost.com',
      password: hashedPassword,
    },
  });

  // Telas
  await prisma.fabric.createMany({
    data: [
      { name: 'Algodón Peinado', material: 'Algodón 100%', costPerMeter: 85.50, color: 'Blanco', supplier: 'Textiles México' },
      { name: 'Mezclilla 14oz', material: 'Algodón', costPerMeter: 140.00, color: 'Azul Indigo', supplier: 'La Marina' },
      { name: 'Lino Italiano', material: 'Lino 100%', costPerMeter: 210.00, color: 'Beige', supplier: 'Textiles del Norte' },
      { name: 'Seda Satín', material: 'Seda', costPerMeter: 320.00, color: 'Negro', supplier: 'Importaciones Moda' },
      { name: 'Poliéster Deportivo', material: 'Poliéster', costPerMeter: 65.00, color: 'Rojo', supplier: 'Textiles México' },
    ],
  });

  // Prendas y Tallas
  const garmentSizes = [
    { garmentType: 'Playera', size: 'S', metersRequired: 1.2 },
    { garmentType: 'Playera', size: 'M', metersRequired: 1.4 },
    { garmentType: 'Playera', size: 'L', metersRequired: 1.6 },
    { garmentType: 'Playera', size: 'XL', metersRequired: 1.8 },
    { garmentType: 'Pantalón', size: 'M', metersRequired: 2.2 },
    { garmentType: 'Pantalón', size: 'L', metersRequired: 2.5 },
    { garmentType: 'Vestido', size: 'M', metersRequired: 3.0 },
    { garmentType: 'Chamarra', size: 'L', metersRequired: 2.8 },
  ];
  await prisma.garmentSize.createMany({ data: garmentSizes });

  // Mano de Obra
  await prisma.laborCost.createMany({
    data: [
      { garmentType: 'Playera', complexity: 'Básica', cost: 45.00 },
      { garmentType: 'Playera', complexity: 'Intermedia', cost: 70.00 },
      { garmentType: 'Pantalón', complexity: 'Intermedia', cost: 120.00 },
      { garmentType: 'Vestido', complexity: 'Alta', cost: 280.00 },
      { garmentType: 'Chamarra', complexity: 'Alta', cost: 350.00 },
    ],
  });

  console.log('🌱 Seed ejecutado correctamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });