import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create product types
  const foodType = await prisma.productType.upsert({
    where: { name: 'Food' },
    update: {},
    create: {
      name: 'Food',
      description: 'Food and beverage items',
    },
  });

  const apparelType = await prisma.productType.upsert({
    where: { name: 'Apparel' },
    update: {},
    create: {
      name: 'Apparel',
      description: 'Clothing and fashion items',
    },
  });

  const electronicsType = await prisma.productType.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: {
      name: 'Electronics',
      description: 'Electronic devices and gadgets',
    },
  });

  // Create sample products
  const pizza = await prisma.product.create({
    data: {
      name: 'Margherita Pizza',
      description: 'Classic Italian pizza with tomato sauce, mozzarella, and fresh basil',
      productTypeId: foodType.id,
      images: ['/images/margherita-pizza.jpg'],
    },
  });

  const tshirt = await prisma.product.create({
    data: {
      name: 'Cotton T-Shirt',
      description: 'Comfortable 100% cotton t-shirt',
      productTypeId: apparelType.id,
      images: ['/images/cotton-tshirt.jpg'],
    },
  });

  const smartphone = await prisma.product.create({
    data: {
      name: 'Smartphone Pro',
      description: 'Latest smartphone with advanced features',
      productTypeId: electronicsType.id,
      images: ['/images/smartphone-pro.jpg'],
    },
  });

  // Create variants
  await prisma.variant.createMany({
    data: [
      // Pizza variants
      {
        sku: 'PIZZA-MARG-S',
        size: 'Small',
        price: 12.99,
        stock: 50,
        productId: pizza.id,
      },
      {
        sku: 'PIZZA-MARG-M',
        size: 'Medium',
        price: 16.99,
        stock: 40,
        productId: pizza.id,
      },
      {
        sku: 'PIZZA-MARG-L',
        size: 'Large',
        price: 20.99,
        stock: 30,
        productId: pizza.id,
      },
      // T-shirt variants
      {
        sku: 'TSHIRT-COT-S-BLU',
        size: 'Small',
        color: 'Blue',
        price: 19.99,
        stock: 25,
        productId: tshirt.id,
      },
      {
        sku: 'TSHIRT-COT-M-BLU',
        size: 'Medium',
        color: 'Blue',
        price: 19.99,
        stock: 30,
        productId: tshirt.id,
      },
      {
        sku: 'TSHIRT-COT-L-BLU',
        size: 'Large',
        color: 'Blue',
        price: 19.99,
        stock: 20,
        productId: tshirt.id,
      },
      {
        sku: 'TSHIRT-COT-S-RED',
        size: 'Small',
        color: 'Red',
        price: 19.99,
        stock: 15,
        productId: tshirt.id,
      },
      // Smartphone variants
      {
        sku: 'PHONE-PRO-128-BLK',
        size: '128GB',
        color: 'Black',
        price: 699.99,
        stock: 10,
        productId: smartphone.id,
      },
      {
        sku: 'PHONE-PRO-256-BLK',
        size: '256GB',
        color: 'Black',
        price: 799.99,
        stock: 8,
        productId: smartphone.id,
      },
    ],
  });

  // Create add-ons for food items only
  await prisma.addOn.createMany({
    data: [
      {
        name: 'Extra Cheese',
        description: 'Additional mozzarella cheese',
        price: 2.50,
        productId: pizza.id,
      },
      {
        name: 'Pepperoni',
        description: 'Premium pepperoni slices',
        price: 3.00,
        productId: pizza.id,
      },
      {
        name: 'Mushrooms',
        description: 'Fresh mushrooms',
        price: 1.50,
        productId: pizza.id,
      },
      {
        name: 'Extra Sauce',
        description: 'Additional tomato sauce',
        price: 1.00,
        productId: pizza.id,
      },
    ],
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });