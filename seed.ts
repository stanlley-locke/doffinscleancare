import { db } from './src/db/index';
import { services } from './src/db/schema';

async function seed() {
  console.log('🌱 Seeding full service catalog with user details...');

  const catalog = [
    {
      name: 'carpet_cleaning',
      displayName: 'Carpet Cleaning',
      description: 'Deep cleaning to remove dirt, stains, and allergens, leaving carpets fresh and hygienic.',
      features: JSON.stringify([
        "Advanced steam cleaning and hot water extraction",
        "Removes deep-seated dirt, bacteria, and allergens",
        "Safe for all carpet types including wool and synthetic",
        "Fast drying time"
      ]),
      startingPrice: 30,
      unit: 'sqf',
      category: 'Cleaning',
      imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1080',
      displayOrder: 1,
    },
    {
      name: 'sofa_cleaning',
      displayName: 'Sofa Set Cleaning',
      description: 'We clean fabric and leather sofas, restoring freshness and comfort.',
      features: JSON.stringify([
        "Specialized cleaning for fabric, leather, and suede",
        "Stain removal and odor elimination",
        "Conditioning treatment for leather sofas",
        "Extends the life of your furniture"
      ]),
      startingPrice: 3500,
      unit: 'set',
      category: 'Cleaning',
      imageUrl: 'https://images.unsplash.com/photo-1759722665623-c4c1075c0a6b?q=80&w=1080',
      displayOrder: 2,
    },
    {
      name: 'mattress_cleaning',
      displayName: 'Mattress Cleaning',
      description: 'Eliminate dust mites, bacteria, and odors for a healthier sleeping environment.',
      features: JSON.stringify([
        "Deep sanitization and dust mite elimination",
        "Removes allergens, bacteria, and dead skin cells",
        "Stain and odor removal",
        "Improves sleep quality and health"
      ]),
      startingPrice: 1500,
      unit: 'item',
      category: 'Cleaning',
      imageUrl: 'https://images.unsplash.com/photo-1632053005001-c529ba47372d?q=80&w=1080',
      displayOrder: 3,
    },
    {
      name: 'deep_cleaning',
      displayName: 'Deep House Cleaning',
      description: 'Comprehensive cleaning for kitchens, bathrooms, and entire homes.',
      features: JSON.stringify([
        "Complete home cleaning from top to bottom",
        "Kitchen and bathroom deep cleaning",
        "Window, wall, and floor cleaning",
        "Perfect for move-in/move-out cleaning"
      ]),
      startingPrice: 12000,
      unit: 'home',
      category: 'Cleaning',
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1080',
      displayOrder: 4,
    },
    {
      name: 'post_construction',
      displayName: 'Post Construction Cleaning',
      description: 'We remove dust, debris, and stains after construction or renovation.',
      features: JSON.stringify([
        "Complete debris and dust removal",
        "Paint splatter and adhesive removal",
        "Window and surface polishing",
        "Makes your new space move-in ready"
      ]),
      startingPrice: 15000,
      unit: 'project',
      category: 'Cleaning',
      imageUrl: 'https://images.unsplash.com/photo-1581578731522-745a05ad9ad2?q=80&w=1080',
      displayOrder: 5,
    },
    {
      name: 'commercial_cleaning',
      displayName: 'Commercial & Office Cleaning',
      description: 'Professional cleaning solutions for offices, shops, and business spaces.',
      features: JSON.stringify([
        "Regular office maintenance cleaning",
        "Carpet and upholstery cleaning",
        "Restroom and break room sanitization",
        "Flexible scheduling to avoid disruption"
      ]),
      startingPrice: 0,
      unit: 'quote',
      category: 'Commercial',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1080',
      displayOrder: 6,
    },
    {
      name: 'pest_control',
      displayName: 'Pest Control Services',
      description: 'Effective treatment for a wide range of household and commercial pests.',
      features: JSON.stringify([
        "Bedbugs - complete elimination and prevention",
        "Cockroaches - targeted fumigation",
        "Ants - colony elimination",
        "Rodents - humane removal and prevention",
        "Other pests - customized treatment plans"
      ]),
      startingPrice: 3500,
      unit: 'service',
      category: 'Pest Control',
      imageUrl: 'https://images.unsplash.com/photo-1583907659441-ae7649f4857?q=80&w=1080',
      displayOrder: 7,
    },
  ];

  for (const item of catalog) {
    await db.insert(services).values({
      ...item,
      updatedAt: new Date(),
    }).onConflictDoUpdate({
      target: services.name,
      set: { 
        displayName: item.displayName,
        description: item.description,
        features: item.features,
        startingPrice: item.startingPrice,
        unit: item.unit,
        category: item.category,
        imageUrl: item.imageUrl,
        displayOrder: item.displayOrder,
        updatedAt: new Date() 
      },
    });
  }

  console.log('✅ Catalog seeding complete with final details!');
  process.exit(0);
}

seed();
