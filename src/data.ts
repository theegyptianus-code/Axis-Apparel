import { Product, Review } from './types';

// Import newly generated images
import heroBanner from './assets/images/axis_hero_banner_1781625146944.jpg';
import stealthJacket from './assets/images/axis_stealth_jacket_1781625164683.jpg';
import cargoPants from './assets/images/axis_cargo_pants_1781625179559.jpg';
import oversizedHoodie from './assets/images/axis_oversized_hoodie_1781625195230.jpg';

export { heroBanner };

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'SYNAPSE Technical Shell v2',
    slug: 'synapse-technical-shell-v2',
    price: 185,
    originalPrice: 240,
    category: 'outerwear',
    description: 'Designed as a perimeter shield. A breathable, water-resistant technical windbreaker optimized for multi-axis range of motion, sporting custom welded seams.',
    longDescription: 'The SYNAPSE Technical Shell v2 represents the pure intersection of tactile engineering and weather defense. Built for high-density environments, its outer shell repels torrential moisture while letting excess bodily heat escape via silent zipper vents on the structural axis channels. Ergonomic articulation ensures full overhead range without riding up.',
    mainImage: stealthJacket,
    alternateImages: [
      stealthJacket,
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=80'
    ],
    features: [
      '3-Layer laminated micro-grid ripstop standarding',
      'Lasercut seam bonding with premium thermal seal tape',
      'Dual multi-axis chest utility chambers with watertight seals',
      'Adjustable 3-point storm hood with quick-release toggles',
      'Articulated elbow joints for unrestricted arm motion'
    ],
    specs: {
      fit: 'Slightly oversized for layering compatibility. Recommend your standard size.',
      fabric: '88% Recycled Technical Nylon, 12% Elastane Matte Coating',
      weight: '340g / Ultra-light utility',
      care: 'Machine wash cold inside-out. Line dry. Do not iron seams.'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Stealth Black', hex: '#111111' },
      { name: 'Solder Grey', hex: '#5c5e62' }
    ],
    rating: 4.85,
    reviewCount: 42,
    limitedStockCount: 4,
    isNewArrival: true
  },
  {
    id: 'prod-002',
    name: 'APEX Tactical Utility Cargo',
    slug: 'apex-tactical-utility-cargo',
    price: 140,
    originalPrice: 175,
    category: 'bottoms',
    description: 'Heavyweight organic cotton utility pants. Incorporates dual-depth hidden pockets, micro-adjusted metal buckle cuffs, and double-layered knee articulation.',
    longDescription: 'Engineered for premium structural utility, the APEX Cargo Pants restructure traditional workwear lines. Crafted using dual-twisted premium cotton warp threads for unmatched durability, featuring structural reinforced rivets along maximum tension points. Standardized geometric seams highlight the modern streetwear proportions.',
    mainImage: cargoPants,
    alternateImages: [
      cargoPants,
      'https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80'
    ],
    features: [
      'Dense 430GSM heavy double-twisted canvas cotton',
      '6 engineered storage quadrants that align flat empty',
      'Friction-lock speed-cinches at thighs and ankles',
      'Double-ply articulated knee panes to mitigate knee blowouts',
      'Indestructible brass reinforced main axis shank button'
    ],
    specs: {
      fit: 'Relaxed, tapered silhouette. True to size.',
      fabric: '100% Organic Ring-Spun Cotton Dry Canvas',
      weight: '520g Heavy duty draping',
      care: 'Cold wash Separately. Air dry to maintain crisp pocket geometry.'
    },
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Alabaster Desert', hex: '#eae5d9' },
      { name: 'Stealth Black', hex: '#111111' }
    ],
    rating: 4.92,
    reviewCount: 29,
    limitedStockCount: 7,
    isNewArrival: true
  },
  {
    id: 'prod-003',
    name: 'CHRONOS Heavyweight Hoodie',
    slug: 'chronos-heavyweight-hoodie',
    price: 125,
    category: 'tops',
    description: 'Ultra-dense French terry cotton fleece hoodie. Drop-shoulder boxy fit with clean elastic-free cuffs and structural double-layered hood structure.',
    longDescription: 'The CHRONOS is an exploration in material mass. Knit from premium organic long-staple cotton, this 500GSM fleece is brushed on the inside to achieve unparalleled structural comfort. Features dry-touch outer yarn, seamless shoulders, and raw structural seam accents that pay homage to architectural geometry.',
    mainImage: oversizedHoodie,
    alternateImages: [
      oversizedHoodie,
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&auto=format&fit=crop&q=80'
    ],
    features: [
      '500GSM combed luxury French Terry loops',
      'Zero-rib raw drape hem matching active streetwear proportions',
      'Seamless flatline armscye to minimize skin friction',
      'Double-layered shell-formed hood (stands stiff without cords)',
      'Subtle 3D AXIS silicone badge at the lower rear quadrant'
    ],
    specs: {
      fit: 'Boxy, cropped length. Highly modern. Select size down for slim fit.',
      fabric: '100% GOTS-Certified Combed Long-Staple Cotton',
      weight: '760g Complete item mass (Size L)',
      care: 'Wash inside-out with dark colors. Do not tumble dry.'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Slate Gray', hex: '#373a40' },
      { name: 'Aero Salt', hex: '#f0f0ed' }
    ],
    rating: 4.79,
    reviewCount: 37,
    limitedStockCount: 9,
    isNewArrival: false
  },
  {
    id: 'prod-004',
    name: 'VECTOR Modular Compression Belt',
    slug: 'vector-modular-compression-belt',
    price: 45,
    category: 'accessories',
    description: 'Rigid military-grade nylon webbing belt with quick-release aerospace alloy buckle mechanism and stealth dynamic elastic loop.',
    longDescription: 'A tactical compression belt with instantaneous magnetic-mechanical connection mechanism. Anchored to provide structured apparel tension, allowing customized length micro-adjustments on the millimetric level.',
    mainImage: 'https://images.unsplash.com/photo-1624222247344-550fb8ecf782?w=600&auto=format&fit=crop&q=80',
    alternateImages: [
      'https://images.unsplash.com/photo-1624222247344-550fb8ecf782?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=80'
    ],
    features: [
      'Magnetic quick-connect mechanical system with safety locks',
      'Resilient military spec continuous high-tension webbing',
      'Matte black anodized aluminum components',
      'Concealed elastic webbing for dynamic breathing flexibility'
    ],
    specs: {
      fit: 'Fully adjustable. One size fits waist 28 through 42 inches.',
      fabric: 'Core Nylon Twill Cord, Alloy buckle clasp',
      weight: '120g Lightweight structural anchor',
      care: 'Wipe surface with damp towel. Do not submerge alloy.'
    },
    sizes: ['ONE SIZE'],
    colors: [
      { name: 'Tactical Black', hex: '#111111' },
      { name: 'Armor Olive', hex: '#3b3f30' }
    ],
    rating: 4.88,
    reviewCount: 19,
    limitedStockCount: 12,
    isNewArrival: false
  },
  {
    id: 'prod-005',
    name: 'SYNAPSE Grid Utility Shield Cap',
    slug: 'synapse-grid-utility-shield-cap',
    price: 35,
    category: 'accessories',
    description: 'Minimalist 5-panel headpiece built from rain-shedding tech fibers, complete with laser perforations and friction buckle closure.',
    longDescription: 'High-performance cap combining unstructured ventilation alongside architectural crown reinforcing. Engineered to retain anatomical crown fit while packing flat to fit compact utility pockets.',
    mainImage: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&auto=format&fit=crop&q=80',
    alternateImages: [
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&auto=format&fit=crop&q=80'
    ],
    features: [
      'Repellent technical grid pattern lightweight shell',
      'Laser-perforated lateral vents to increase aerodynamic cooling',
      'Soft moisture-wicking synthetic technical sweatband',
      'Flexible pack-away EVA shield brim prevents permanent wrinkles'
    ],
    specs: {
      fit: 'Medium profile five-panel. Adjustable sliding strap.',
      fabric: '94% Polyester, 6% Spandex Mesh Lining',
      weight: '65g Featherweight perimeter protection',
      care: 'Hand wash with mild organic detergent. Dry flat.'
    },
    sizes: ['ONE SIZE'],
    colors: [
      { name: 'Stealth Black', hex: '#111111' },
      { name: 'Solder Grey', hex: '#5c5e62' }
    ],
    rating: 4.67,
    reviewCount: 14,
    isNewArrival: false
  },
  {
    id: 'prod-006',
    name: 'AXIS Heavy Impact Socks (3-Pack)',
    slug: 'axis-heavy-impact-socks-3-pack',
    price: 24,
    category: 'accessories',
    description: 'Extra-cushioned high-performance crew socks. Ribbed shin brace zones, strategic ventilation paths, and reinforced anatomical heels.',
    longDescription: 'High density technical socks crafted to offer deep pressure dispersion throughout structural footwear steps. Designed with high compression midfoot bands and thick cushion foundations that decrease joint impact.',
    mainImage: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=600&auto=format&fit=crop&q=80',
    alternateImages: [
      'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=600&auto=format&fit=crop&q=80'
    ],
    features: [
      'Multi-density zone knitting with anatomical arches',
      'Dynamic grid channels on foot dorsum to speed moisture extraction',
      'Thick terry protective heel-pad loop cushioning',
      'Stitch-free hand-linked seamless toe box prevents chafing'
    ],
    specs: {
      fit: 'Unisex Crew length sizing. Tight supportive elasticity.',
      fabric: '76% Organic combed cotton, 19% Tech polyester, 5% Lycra',
      weight: 'Medium-thick insulation padding',
      care: 'Tumble wash warm. Turn inside out before washing.'
    },
    sizes: ['M', 'L'],
    colors: [
      { name: 'Aero Salt', hex: '#eae5d9' },
      { name: 'Stealth Black', hex: '#111111' }
    ],
    rating: 4.95,
    reviewCount: 61,
    isNewArrival: false
  }
];

export const MOCK_REVIEWS: Record<string, Review[]> = {
  'prod-001': [
    {
      id: 'rev-101',
      author: 'Marcus K.',
      date: '2026-05-12',
      rating: 5,
      title: 'Flawless weather tech layer',
      comment: 'Been testing this through cold morning squalls in Berlin. It is entirely waterproof, doesn’t sweaty on the inside, and look completely futuristic. The matte black is super intense.',
      verified: true,
      sizePurchased: 'L',
      fitRating: 'True to Size'
    },
    {
      id: 'rev-102',
      author: 'Sophia V.',
      date: '2026-05-30',
      rating: 4,
      title: 'Premium finish but fits slightly boxy',
      comment: 'Excellent ripstop texture. It does sit quite loose with plenty of room below for chunky midlayers. If you prefer a tight razor fit, definitely size down.',
      verified: true,
      sizePurchased: 'S',
      fitRating: 'Runs Large'
    },
    {
      id: 'rev-103',
      author: 'Aidan L.',
      date: '2026-06-02',
      rating: 5,
      title: 'Dynamic geometric panelling is sick',
      comment: 'The horizontal axis pockets are super useful. iPhone fits inside completely horizontal and doesnt sway around when rushing down train stairs.',
      verified: true,
      sizePurchased: 'M',
      fitRating: 'True to Size'
    }
  ],
  'prod-002': [
    {
      id: 'rev-201',
      author: 'Elena R.',
      date: '2026-04-20',
      rating: 5,
      title: 'Incredible fabric density',
      comment: 'The 430GSM heavy canvas drapes so beautifully, they don’t get wrinkled or clingy. Cinching mechanisms on ankles let me shift from balloon streetwear look to narrow tactical form factor in 2 seconds.',
      verified: true,
      sizePurchased: '30',
      fitRating: 'True to Size'
    },
    {
      id: 'rev-202',
      author: 'Justin T.',
      date: '2026-05-14',
      rating: 5,
      title: 'Worth every cent',
      comment: 'Honestly better than cargo pants from top designer brands double the price. Very stealth pockets, completely silent buckles. Heavy, rigid but fits perfectly.',
      verified: true,
      sizePurchased: '34',
      fitRating: 'True to Size'
    }
  ],
  'prod-003': [
    {
      id: 'rev-301',
      author: 'Naoki H.',
      date: '2026-05-01',
      rating: 5,
      title: 'Unbelievably heavy mass',
      comment: 'The hood structural mold is crazy. Stands rigid by itself like sculpture. Matte dry-touch fabric makes this a daily driver. The cropped waist keeps my body line tall.',
      verified: true,
      sizePurchased: 'M',
      fitRating: 'True to Size'
    },
    {
      id: 'rev-302',
      author: 'Chloe G.',
      date: '2026-06-11',
      rating: 4,
      title: 'Ultra thick boxy masterpiece',
      comment: 'Perfect washed charcoal hue. Super cozy and heavyweight. The neck is a bit snug when slipping on, but keeps wind entirely locked out when on.',
      verified: true,
      sizePurchased: 'S',
      fitRating: 'Runs Small'
    }
  ]
};
