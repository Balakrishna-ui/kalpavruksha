import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding products...');
  
  const products = [
    {
      name: 'Organic Vegetables',
      category: 'Ecolimits',
      img: '/img/im1.PNG',
      price: 499,
      rating: 4.8,
      reviews: 124,
      description: 'Fresh, certified organic vegetables sourced directly from our local member farmers.',
    },
    {
      name: 'Natural Ripe Fruits',
      category: 'Kulfis',
      img: '/assets/prod_fruits_1773805497331.png',
      price: 850,
      rating: 4.5,
      reviews: 89,
      description: 'Naturally ripened seasonal fruits, free from harmful chemicals.',
    },
    {
      name: 'Pure Wild Honey',
      category: 'Honey',
      img: '/assets/prod_honey_1773805513434.png',
      price: 1200,
      rating: 4.9,
      reviews: 215,
      description: '100% pure, raw, and unprocessed honey collected from wild forest hives.',
    },
    {
      name: 'Village Products',
      category: 'Grameenam',
      img: '/assets/prod_graminam_1773805557221.png',
      price: 350,
      rating: 4.7,
      reviews: 56,
      description: 'Traditional homemade essentials crafted with care by village artisans.',
    },
    {
      name: 'Wellness Range',
      category: 'Niramaya',
      img: '/assets/prod_veg_1773805467767.png',
      price: 1500,
      rating: 4.6,
      reviews: 112,
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
