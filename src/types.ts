export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: 'tops' | 'bottoms' | 'accessories' | 'outerwear';
  description: string;
  longDescription: string;
  mainImage: string;
  alternateImages: string[];
  features: string[];
  specs: {
    fit: string;
    fabric: string;
    weight: string;
    care: string;
  };
  sizes: string[];
  colors: { name: string; hex: string }[];
  rating: number;
  reviewCount: number;
  limitedStockCount?: number;
  isNewArrival?: boolean;
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  sizePurchased: string;
  fitRating: 'Runs Small' | 'True to Size' | 'Runs Large';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface ShippingDetails {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  paymentMethod: 'card' | 'applepay' | 'googlepay';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

export type StorePage = 'home' | 'shop' | 'pdp' | 'lookbook' | 'checkout' | 'confirmation';

export interface ViewState {
  page: StorePage;
  activeProductId?: string;
  activeCategory?: string;
  searchQuery?: string;
}
