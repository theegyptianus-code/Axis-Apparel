import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Lookbook from './components/Lookbook';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import { PRODUCTS } from './data';
import { Product, CartItem, ShippingDetails, StorePage, ViewState } from './types';
import {
  ShieldCheck,
  Info,
  Sparkles,
  Filter,
  ChevronRight,
  Sliders,
  AlertTriangle,
  Flame,
  Globe,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>({ page: 'home' });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);

  // Social Proof Toast State
  const [activeNotification, setActiveNotification] = useState<{
    collector: string;
    location: string;
    item: string;
    time: string;
  } | null>(null);

  // 1. CAROUSEL LOCAL STORAGE LOADER
  useEffect(() => {
    const cachedCart = localStorage.getItem('axis_cart_allocation');
    if (cachedCart) {
      try {
        setCart(JSON.parse(cachedCart));
      } catch (e) {
        console.error('Failed to parse cached cart coordinates', e);
      }
    }
  }, []);

  // 2. STOCK CAROUSEL TOASTS (SIMULATED LIVE REVIEWS / PURCHASES)
  useEffect(() => {
    const SOCIAL_NAMES = ['Liam', 'Sophia', 'Kenji', 'Marcus', 'Charlotte', 'Aiden', 'Elena', 'Justin'];
    const SOCIAL_LOCATIONS = ['Berlin', 'Tokyo Retail', 'London Outpost', 'Portland Depot', 'Paris Outpost', 'New York Techwear Loft'];
    const SOCIAL_ITEMS = [
      'SYNAPSE Technical Shell v2',
      'APEX Tactical Utility Cargo',
      'CHRONOS Heavyweight Hoodie',
      'VECTOR Modular Compression Belt'
    ];

    const showPurchaseToast = () => {
      const name = SOCIAL_NAMES[Math.floor(Math.random() * SOCIAL_NAMES.length)];
      const location = SOCIAL_LOCATIONS[Math.floor(Math.random() * SOCIAL_LOCATIONS.length)];
      const item = SOCIAL_ITEMS[Math.floor(Math.random() * SOCIAL_ITEMS.length)];
      const timeNum = Math.floor(Math.random() * 8) + 1;

      setActiveNotification({
        collector: name,
        location,
        item,
        time: `${timeNum} min${timeNum > 1 ? 's' : ''} ago`
      });

      // Hide after 5 seconds
      setTimeout(() => {
        setActiveNotification(null);
      }, 5500);
    };

    // First trigger in 8 seconds
    const initialTimer = setTimeout(showPurchaseToast, 8000);

    // Repeat every 28 seconds
    const interval = setInterval(showPurchaseToast, 28000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Sync Cart
  const saveCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('axis_cart_allocation', JSON.stringify(updatedCart));
  };

  // 3. CART HANDLERS
  const handleAddToCart = (product: Product, size: string, color: string) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor === color
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      const updated = [...cart, { product, quantity: 1, selectedSize: size, selectedColor: color }];
      saveCart(updated);
    }
    // Instant drawer opening for high-converting visual feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: string, color: string, newQty: number) => {
    const updated = cart.map((item) => {
      if (
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
      ) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    saveCart(updated);
  };

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    const updated = cart.filter(
      (item) =>
        !(
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor === color
        )
    );
    saveCart(updated);
  };

  const handleApplyPromo = (code: string) => {
    if (code.toUpperCase() === 'AXIS10') {
      setPromoCode('AXIS10');
      setDiscountRate(0.1); // 10% discount
    }
  };

  // 4. CHECKOUT SUCCESS PIPELINE
  const handlePlaceOrder = (details: ShippingDetails) => {
    setShippingDetails(details);
    // Clear local cache cart variables on success
    saveCart([]);
    setViewState({ page: 'confirmation' });
    setIsCartOpen(false);
  };

  // Selection Page Navifiers
  const handlePageChange = (page: StorePage) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setViewState({ page });
  };

  const handleProductSelect = (id: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setViewState({ page: 'pdp', activeProductId: id });
  };

  // 5. QUERY / FILTER METRICS
  const getFilteredAndSortedProducts = () => {
    let list = [...PRODUCTS];

    // Filter categories
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Sort categories
    if (sortBy === 'low-to-high') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-to-low') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  };

  const activeProduct = PRODUCTS.find((p) => p.id === viewState.activeProductId);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans select-none antialiased">
      
      {/* Dynamic Security Header */}
      <Header
        onPageChange={handlePageChange}
        activePage={viewState.page}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartOpen={() => setIsCartOpen(true)}
        onProductSelect={handleProductSelect}
      />

      {/* CORE VIEWPORT CAROUSEL CONTROLLER */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* A. HOMEPAGE CONCEPT CONTAINER */}
          {viewState.page === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Cinematic hero section */}
              <Hero
                onShopClick={() => handlePageChange('shop')}
                onLookbookClick={() => handlePageChange('lookbook')}
              />

              {/* Home spotlight shelf - Highly converting showcase */}
              <section className="py-14 max-w-7xl mx-auto px-4 md:px-8 border-t border-[#161616]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 text-left">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider text-[#ff3e3e]">
                      <Flame className="w-3.5 h-3.5" /> HIGHEST CONVERSION SETS
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-mono uppercase font-extrabold tracking-tight">
                      TRENDING ARCHITECTURE
                    </h2>
                  </div>
                  <button
                    onClick={() => handlePageChange('shop')}
                    className="font-mono text-xs text-white hover:text-[#ff3e3e] font-bold border-b border-gray-600 hover:border-[#ff3e3e] pb-1 transition-all uppercase"
                  >
                    Load all blueprints ({PRODUCTS.length}) →
                  </button>
                </div>

                {/* Grid items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PRODUCTS.slice(0, 3).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={(id) => handleProductSelect(id)}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </section>

              {/* Conversion benefit blocks */}
              <section className="bg-[#0b0b0b] border-t border-b border-[#111] py-12 px-4 md:px-8 text-left">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2 font-mono">
                    <span className="text-[#ff3e3e] font-bold text-xs uppercase block">01 / GEOMETRIC LOGISTICS</span>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Hourly Dispatch Sequence</h4>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">
                      All orders in BATCH-04 are sealed immediately and sorted by active priority. Shipments depart our concrete fulfillment depots within 24 consecutive hours.
                    </p>
                  </div>
                  <div className="space-y-2 font-mono">
                    <span className="text-[#ff3e3e] font-bold text-xs uppercase block">02 / SECURE ASSEMBLY</span>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">30-Day Resolution Policy</h4>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">
                      We offer hassle-free, secure returns and sizes substitutions. Pack-away cases contain pre-built post labels to return goods securely to our centers.
                    </p>
                  </div>
                  <div className="space-y-2 font-mono">
                    <span className="text-[#ff3e3e] font-bold text-xs uppercase block">03 / CALIBRATED COMFORT</span>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">The Sizing Standard</h4>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">
                      Our products undergo rigid pre-shrunk diagnostic thermal loops to guarantee consistent fits. If an item does not align with your physical posture, returns are gratis.
                    </p>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* B. CATALOG / COLLECTION GRID */}
          {viewState.page === 'shop' && (
            <motion.div
              key="shop-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-8 max-w-7xl mx-auto px-4 md:px-8"
            >
              {/* Category selector row */}
              <div className="flex flex-col md:flex-row gap-6 justify-between items-baseline border-b border-[#1c1c1c] pb-6 mb-8 text-left">
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block font-semibold">
                    AXIS INDEX SOURCE
                  </span>
                  <h2 className="font-mono text-2xl uppercase tracking-tight font-black leading-tight text-white">
                    TECHNICAL APPAREL Blueprints
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {['all', 'outerwear', 'tops', 'bottoms', 'accessories'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-2 border rounded uppercase transition-colors font-bold cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#ff3e3e] text-white border-transparent'
                          : 'bg-[#111] hover:bg-[#1a1a1a] text-gray-300 border-[#222]'
                      }`}
                    >
                      {cat === 'all' ? 'All items' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sorting toolbar controls */}
              <div className="flex flex-col sm:flex-row md:justify-end items-center gap-4 mb-8 font-mono text-xs">
                <div className="flex items-center gap-2 text-gray-400">
                  <Sliders className="w-4 h-4 text-[#ff3e3e]" />
                  <span>Sort Filter:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#111] text-white border border-[#2d2d2d] rounded px-3 py-1.5 focus:outline-none focus:border-[#ff3e3e] cursor-pointer"
                  >
                    <option value="featured">Featured Allocation</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                    <option value="rating">Top Rated Collectors</option>
                  </select>
                </div>
              </div>

              {/* The Core Products Catalog Grid */}
              {getFilteredAndSortedProducts().length === 0 ? (
                <div className="text-center py-20 font-mono text-gray-500">
                  No active collection items match selected categories.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getFilteredAndSortedProducts().map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={(id) => handleProductSelect(id)}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* C. PRODUCT DETAIL VIEWPORT */}
          {viewState.page === 'pdp' && activeProduct && (
            <motion.div
              key="pdp-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProductDetail
                product={activeProduct}
                onBack={() => {
                  setSelectedCategory('all');
                  handlePageChange('shop');
                }}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          )}

          {/* D. INTERACTIVE EDITORIAL LOOKBOOK */}
          {viewState.page === 'lookbook' && (
            <motion.div
              key="lookbook-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Lookbook
                onProductSelect={handleProductSelect}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          )}

          {/* E. SECURED EXPRESS CHECKOUT */}
          {viewState.page === 'checkout' && (
            <motion.div
              key="checkout-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Checkout
                cartItems={cart}
                discountRate={discountRate}
                onPlaceOrder={handlePlaceOrder}
                onBackToCart={() => {
                  setIsCartOpen(true);
                  handlePageChange('shop');
                }}
              />
            </motion.div>
          )}

          {/* F. CELEBRATION LEDGER (ORDER CONFIRMED) */}
          {viewState.page === 'confirmation' && (
            <motion.div
              key="confirmation-page"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <OrderConfirmation
                shippingDetails={shippingDetails}
                onContinueShopping={() => handlePageChange('shop')}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* SECURED SIDE CONTAINER BAG DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddToCart={handleAddToCart}
        onCheckout={() => {
          setIsCartOpen(false);
          handlePageChange('checkout');
        }}
        promoCode={promoCode}
        onApplyPromo={handleApplyPromo}
        discountRate={discountRate}
      />

      {/* 6. GLOBAL FOOTER LAYOUT */}
      <footer className="bg-[#080808] border-t border-[#1a1a1a] text-gray-500 py-12 md:py-16 text-left font-mono">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="space-y-4">
            <h3 className="text-white text-base tracking-widest font-black uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3e3e]"></span> AXIS APP-LAB
            </h3>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              Geometric, weather-protective perimeter shielding. Premium garments designed to mitigate physical barriers inside high-density modern environments.
            </p>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">Sourcing Indices</h4>
            <ul className="text-xs space-y-2 list-none p-0 text-gray-400">
              <li>
                <button onClick={() => { setSelectedCategory('all'); handlePageChange('shop'); }} className="hover:text-[#ff3e3e] uppercase">
                  All blueprints
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('outerwear'); handlePageChange('shop'); }} className="hover:text-[#ff3e3e] uppercase">
                  Shield Jackets
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('bottoms'); handlePageChange('shop'); }} className="hover:text-[#ff3e3e] uppercase">
                  Tactical Cargo bottoms
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('accessories'); handlePageChange('shop'); }} className="hover:text-[#ff3e3e] uppercase">
                  Web Modular accessories
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">System Protocols</h4>
            <ul className="text-xs space-y-2 list-none p-0 text-gray-400 uppercase">
              <li className="hover:text-white cursor-pointer">Security Certifications</li>
              <li className="hover:text-white cursor-pointer">Depot Locations finder</li>
              <li className="hover:text-white cursor-pointer">Concierge logistics specs</li>
              <li className="hover:text-white cursor-pointer">Solder Grey Calibration</li>
            </ul>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">Depot Signals</h4>
            <p className="font-sans text-xs text-gray-400 leading-normal">
              Subscribe to immediate telemetry updates of next collection drops. No advertisement sludge.
            </p>
            <div className="flex pt-1 truncate">
              <input
                type="email"
                placeholder="EMAIL REFERENCE..."
                className="bg-[#111] pr-3 text-xs pl-3 py-2 border border-[#2d2d2d] focus:border-[#ff3e3e] focus:outline-none placeholder-gray-600 rounded-l max-w-[150px] uppercase text-white font-mono"
              />
              <button className="bg-white hover:bg-[#ff3e3e] text-black hover:text-black font-extrabold text-[10px] tracking-widest px-4 rounded-r uppercase transition-colors">
                Link
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-[#111] mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-[10px] text-gray-600 uppercase">
          <p>© {new Date().getFullYear()} AXIS APPARELS LAB. SECTIONS SUBJECT TO ACTIVE PATENT ENFORCEMENT.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-[#ff3e3e]" /> BATCH-04-ONLINE</span>
            <span>SECURE AES PROTOCOL ACTIVE</span>
          </div>
        </div>
      </footer>

      {/* 7. LIVE SOCIAL FEEDS CONVERSION TOAST - MAXIMUM ENGAGEMENT */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed bottom-4 left-4 z-50 bg-[#111111]/95 backdrop-blur border border-[#ff3e3e]/30 shadow-2xl p-3.5 rounded-lg text-left max-w-[310px] hidden sm:block pointer-events-none"
            id="live-conversion-toast"
          >
            <div className="flex items-start gap-3">
              <div className="bg-[#ff3e3e]/15 p-2 rounded border border-[#ff3e3e]/25 text-[#ff3e3e] shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
              </div>
              <div className="min-w-0 font-mono text-[10px]">
                <p className="text-gray-400 capitalize-first leading-snug">
                  <span className="text-white font-extrabold">{activeNotification.collector}</span> in {activeNotification.location} secured allocation of:
                </p>
                <p className="text-white font-extrabold text-[11px] uppercase tracking-wide mt-1 text-[#ff3e3e]">
                  {activeNotification.item}
                </p>
                <p className="text-gray-500 text-[9px] uppercase mt-1">
                  Claimed: {activeNotification.time}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
