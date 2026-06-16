import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Product, StorePage } from '../types';
import { PRODUCTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onPageChange: (page: StorePage) => void;
  activePage: StorePage;
  cartCount: number;
  onCartOpen: () => void;
  onProductSelect: (id: string) => void;
}

export default function Header({
  onPageChange,
  activePage,
  cartCount,
  onCartOpen,
  onProductSelect,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 23, seconds: 11 });

  // Urgency Timer Countdown (runs in real-time)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to drive continuous marketing loop
          return { hours: 6, minutes: 12, seconds: 40 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Search filter
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchResultClick = (id: string) => {
    onProductSelect(id);
    setSearchOpen(false);
    setSearchQuery('');
  };

  const formatUnit = (num: number) => num.toString().padStart(2, '0');

  return (
    <header className="w-full bg-[#0a0a0a] text-white sticky top-0 z-50 border-b border-[#222]">
      {/* 1. MARKETING TICKER - Conversion Urgency Trigger */}
      <div className="w-full bg-[#ff3e3e] text-black text-[11px] font-mono tracking-widest font-bold py-2 px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center">
        <span className="flex items-center gap-1.5 justify-center uppercase">
          <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
          Limited Release: BATCH-04 Drop - 88% Claimed
        </span>
        <span className="opacity-80 hidden sm:inline">|</span>
        <span className="flex items-center gap-2 justify-center uppercase">
          FREE 24H EXPRESS DISPATCH IF ORDERED WITHIN:
          <span className="bg-black text-white px-2 py-0.5 rounded font-bold tracking-normal inline-block tabular-nums">
            {formatUnit(timeLeft.hours)}h : {formatUnit(timeLeft.minutes)}m : {formatUnit(timeLeft.seconds)}s
          </span>
        </span>
      </div>

      {/* 2. CORE HEADER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <button
          id="menu-trigger-mobile"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 sm:p-2.5 -ml-2 text-gray-400 hover:text-white md:hidden"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Typographic Identity - An Axis representation */}
        <div 
          onClick={() => onPageChange('home')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* The structural dynamic grid axis representing brand icon */}
            <div className="absolute w-px h-full bg-white group-hover:bg-[#ff3e3e] transition-colors duration-300"></div>
            <div className="absolute w-full h-px bg-white group-hover:bg-[#ff3e3e] transition-colors duration-300"></div>
            <span className="relative z-10 text-[9px] font-mono font-black bg-[#0a0a0a] px-1 text-white group-hover:text-[#ff3e3e] transition-colors">
              X
            </span>
          </div>
          <span className="text-xl md:text-2xl font-mono tracking-[0.25em] font-black uppercase text-white group-hover:text-[#ff3e3e] transition-colors duration-200">
            AXIS
          </span>
        </div>

        {/* Desktop navigation menu */}
        <nav className="hidden md:flex items-center gap-10 font-mono text-xs tracking-widest uppercase">
          <button
            id="nav-home"
            onClick={() => onPageChange('home')}
            className={`transition-colors duration-150 py-2 relative ${
              activePage === 'home' ? 'text-[#ff3e3e]' : 'text-gray-300 hover:text-white'
            }`}
          >
            Concept
            {activePage === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff3e3e]"></span>
            )}
          </button>
          <button
            id="nav-shop"
            onClick={() => onPageChange('shop')}
            className={`transition-colors duration-150 py-2 relative ${
              activePage === 'shop' || activePage === 'pdp' ? 'text-[#ff3e3e]' : 'text-gray-300 hover:text-white'
            }`}
          >
            Collections
            {(activePage === 'shop' || activePage === 'pdp') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff3e3e]"></span>
            )}
          </button>
          <button
            id="nav-lookbook"
            onClick={() => onPageChange('lookbook')}
            className={`transition-colors duration-150 py-2 relative ${
              activePage === 'lookbook' ? 'text-[#ff3e3e]' : 'text-gray-300 hover:text-white'
            }`}
          >
            Lookbook
            {activePage === 'lookbook' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff3e3e]"></span>
            )}
          </button>
        </nav>

        {/* Utility Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Search */}
          <button
            id="search-trigger"
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-gray-400 hover:text-white transition-colors relative"
            aria-label="Toggle Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Bag with conversion trigger */}
          <button
            id="cart-trigger"
            onClick={onCartOpen}
            className="group p-2 flex items-center gap-2 bg-[#161616] hover:bg-[#222] text-white border border-[#333] hover:border-gray-500 rounded px-3 py-1.5 transition-all text-xs font-mono"
            aria-label="Open Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ff3e3e] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-bold tracking-widest">BAG</span>
          </button>
        </div>
      </div>

      {/* 3. SIMULATED SEARCH INTERFACE - CONVERSION MAKER */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 w-full bg-[#111111] border-b border-[#292929] shadow-2xl z-40 py-6"
            id="search-overlay"
          >
            <div className="max-w-3xl mx-auto px-4">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="SEARCH FOR GEAR (e.g. jacket, cargo, hoodie, accessories)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-white placeholder-gray-500 pl-12 pr-12 py-3.5 rounded border border-[#3a3a3a] text-sm tracking-wide font-mono focus:outline-none focus:border-[#ff3e3e] transition-colors"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 p-1 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Suggestions Panel */}
              <div className="mt-4">
                {searchQuery.trim().length <= 1 ? (
                  <div>
                    <h4 className="text-[10px] font-mono tracking-widest text-[#999] uppercase mb-2.5">
                      Trending Searches
                    </h4>
                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                      {['Shell', 'Cargo', 'Heavy Hoodie', 'Accessories'].map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="bg-[#222] hover:bg-[#ff3e3e] text-gray-300 hover:text-black hover:font-bold px-3 py-1.5 rounded transition-all flex items-center gap-1"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-[10px] font-mono tracking-widest text-[#999] uppercase">
                        Matching Results ({searchResults.length})
                      </h4>
                      {searchResults.length > 0 && (
                        <span className="text-[10px] font-mono text-[#ff3e3e] flex items-center gap-1 uppercase">
                          <ShieldCheck className="w-3 h-3" /> Secure Purchase Active
                        </span>
                      )}
                    </div>

                    {searchResults.length === 0 ? (
                      <div className="text-gray-500 text-xs font-mono py-4">
                        No products match your query. Try searching for "shell", "cargo", or "heavywear".
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleSearchResultClick(product.id)}
                            className="bg-[#1e1e1e] hover:bg-[#282828] border border-[#2e2e2e] hover:border-[#ff3e3e] p-2.5 rounded flex items-center gap-3 cursor-pointer transition-all"
                          >
                            <img
                              src={product.mainImage}
                              alt={product.name}
                              className="w-10 h-12 object-cover rounded bg-neutral-800"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-bold font-mono text-white truncate">
                                {product.name}
                              </h5>
                              <p className="text-[10px] text-gray-400 capitalize font-mono mt-0.5">
                                {product.category}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-bold font-mono text-[#ff3e3e]">
                                ${product.price}
                              </span>
                              {product.originalPrice && (
                                <p className="text-[9px] text-gray-500 line-through font-mono">
                                  ${product.originalPrice}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MOBILE NAVIGATION SCREEN */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 top-[110px] w-full bg-[#0a0a0a] z-35 flex flex-col md:hidden border-t border-[#333]"
            id="mobile-navigation-overlay"
          >
            <div className="p-6 flex-1 flex flex-col justify-between">
              <nav className="flex flex-col gap-6 font-mono text-lg tracking-widest uppercase">
                <button
                  onClick={() => {
                    onPageChange('home');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left pb-1 ${
                    activePage === 'home' ? 'text-[#ff3e3e] font-bold border-b border-[#ff3e3e]' : 'text-gray-300'
                  }`}
                >
                  Concept Applet
                </button>
                <button
                  onClick={() => {
                    onPageChange('shop');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left pb-1 ${
                    activePage === 'shop' || activePage === 'pdp' ? 'text-[#ff3e3e] font-bold border-b border-[#ff3e3e]' : 'text-gray-300'
                  }`}
                >
                  Shop Clothing
                </button>
                <button
                  onClick={() => {
                    onPageChange('lookbook');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left pb-1 ${
                    activePage === 'lookbook' ? 'text-[#ff3e3e] font-bold border-b border-[#ff3e3e]' : 'text-gray-300'
                  }`}
                >
                  Lookbook v4
                </button>
              </nav>

              <div className="border-t border-[#222] pt-6 font-mono text-[10px] text-gray-500 space-y-2">
                <p className="flex items-center gap-1.5 text-[#ff3e3e] uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#ff3e3e] animate-ping"></span>
                  BATCH-04 Drop Active
                </p>
                <p>© {new Date().getFullYear()} AXIS TECH APPAREL LAB. ALL RIGHTS RESERVED.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
