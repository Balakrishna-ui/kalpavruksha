import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding products...');
  
  const products = [
    {
      name: 'Organic Vegetables',
      category: 'Ecolimits',
      image: '/img/im1.PNG',
      description: 'Fresh, certified organic vegetables sourced directly from our local member farmers.',
    },
    {
      name: 'Natural Ripe Fruits',
      category: 'Kulfis',
      image: '/assets/prod_fruits_1773805497331.png',
      description: 'Naturally ripened seasonal fruits, free from harmful chemicals.',
    },
    {
      name: 'Pure Wild Honey',
      category: 'Honey',
      image: '/assets/prod_honey_1773805513434.png',
      description: '100% pure, raw, and unprocessed honey collected from wild forest hives.',
    },
    {
      name: 'Village Products',
      category: 'Grameenam',
      image: '/assets/prod_graminam_1773805557221.png',
      description: 'Traditional homemade essentials crafted with care by village artisans.',
    },
    {
      name: 'Wellness Range',
      category: 'Niramaya',
      image: '/assets/prod_veg_1773805467767.png',
      description: 'Authentic Ayurvedic and natural wellness products for a healthy lifestyle.',
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
