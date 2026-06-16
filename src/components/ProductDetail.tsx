import React, { useState, useEffect, useRef } from 'react';
import { Product, Review } from '../types';
import { MOCK_REVIEWS } from '../data';
import {
  Star,
  CheckCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  Info,
  Scale,
  Sparkles,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export default function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(product.mainImage);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Default');
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const [reviewFilter, setReviewFilter] = useState<number | null>(null);

  // Fit Finder state
  const [showFitFinder, setShowFitFinder] = useState(false);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('imperial');
  const [height, setHeight] = useState('70'); // inches or cm
  const [weight, setWeight] = useState('165'); // lbs or kg
  const [fitRecommendation, setFitRecommendation] = useState('');

  // Cart feedback
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Scroll detection for Sticky Bottom Bar
  const [showStickyBar, setShowStickyBar] = useState(false);
  const mainAddToCartRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Reset selection when changing products
    setSelectedSize('');
    setSelectedColor(product.colors[0]?.name || 'Default');
    setActiveImage(product.mainImage);
    setActiveTab('details');
    setReviewFilter(null);
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      if (mainAddToCartRef.current) {
        const rect = mainAddToCartRef.current.getBoundingClientRect();
        // If the main add-to-cart button is scrolled out of view, show sticky bar
        setShowStickyBar(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sizing finder calculator logic
  const calculateRecommendSize = () => {
    let weightKg = parseFloat(weight);
    let heightCm = parseFloat(height);

    if (unitSystem === 'imperial') {
      weightKg = parseFloat(weight) * 0.453592; // lbs to kg
      heightCm = parseFloat(height) * 2.54; // inches to cm
    }

    if (isNaN(weightKg) || isNaN(heightCm)) {
      setFitRecommendation('Please enter valid measurements.');
      return;
    }

    let recommended = 'M';
    if (weightKg < 65) {
      recommended = 'S';
    } else if (weightKg >= 65 && weightKg < 80) {
      recommended = 'M';
    } else if (weightKg >= 80 && weightKg < 95) {
      recommended = 'L';
    } else {
      recommended = 'XL';
    }

    // Map clothing size to pant sizes if category is bottoms
    if (product.category === 'bottoms') {
      const bottomsMap: Record<string, string> = {
        'S': '30',
        'M': '32',
        'L': '34',
        'XL': '36'
      };
      recommended = bottomsMap[recommended] || '32';
    }

    setFitRecommendation(recommended);
  };

  const handleApplyRecommendedSize = () => {
    if (fitRecommendation && fitRecommendation !== 'Please enter valid measurements.') {
      setSelectedSize(fitRecommendation);
      setShowFitFinder(false);
    }
  };

  const handleAddToCartSubmit = () => {
    if (!selectedSize) {
      // Auto pulse or focus size selectors
      const element = document.getElementById('size-selector-pdp');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('border-[#ff3e3e]', 'animate-bounce');
        setTimeout(() => element.classList.remove('border-[#ff3e3e]', 'animate-bounce'), 1500);
      }
      return;
    }

    onAddToCart(product, selectedSize, selectedColor);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2500);
  };

  const reviews: Review[] = MOCK_REVIEWS[product.id] || [];
  const filteredReviews = reviewFilter
    ? reviews.filter((r) => r.rating === reviewFilter)
    : reviews;

  return (
    <div className="bg-[#050505] text-white py-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Back navigation line */}
        <button
          onClick={onBack}
          className="mb-8 font-mono text-xs text-gray-400 hover:text-[#ff3e3e] flex items-center gap-2 transition-colors uppercase py-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          
          {/* LEFT COLUMN: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] bg-[#111] overflow-hidden rounded border border-[#2d2d2d]">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover grayscale brightness-95"
                referrerPolicy="no-referrer"
              />
              
              {/* Image Coordinate Watermark */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-[8px] font-mono border border-[#333] tracking-widest px-2.5 py-1 text-gray-500 uppercase">
                AXIS FRAME_CALIBRATION: ACTIVE
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-3 gap-2.5">
              {product.alternateImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-[3/4] bg-[#111] overflow-hidden rounded border transition-all cursor-pointer ${
                    activeImage === img ? 'border-[#ff3e3e] scale-[0.98]' : 'border-transparent hover:border-gray-500'
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Conversion Content Shelf */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Scarcity Trigger */}
            <div className="bg-[#ff3e3e]/10 border border-[#ff3e3e]/25 text-[#ff3e3e] text-xs font-mono font-bold tracking-widest py-3 px-4 rounded flex items-center justify-between uppercase">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3e3e] animate-ping"></span>
                LOW HARVEST: SPECIAL RELEASE
              </span>
              <span>BATCH-04 LIMIT</span>
            </div>

            {/* Product Meta */}
            <div className="space-y-1.5">
              <span className="font-mono text-xs uppercase text-[#ff3e3e] tracking-widest font-bold">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3.5xl font-mono uppercase tracking-tight font-black leading-tight text-white">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-baseline gap-2 font-mono">
                  <span className="text-2xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                
                {/* Visual Rating Link */}
                <div className="flex items-center gap-1 text-xs text-amber-500 font-mono pl-4 border-l border-[#222]">
                  <Star className="w-4 h-4 fill-current text-yellow-500" />
                  <span className="text-white font-bold">{product.rating}</span>
                  <span className="text-gray-500">({product.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <p className="font-sans text-sm text-gray-400 capitalize-first leading-relaxed">
              {product.description}
            </p>

            {/* Dynamic Sizing Interface with Fit Finder trigger */}
            <div className="space-y-3.5 pt-2">
              <div className="flex justify-between items-baseline font-mono text-xs">
                <span className="text-gray-300 font-bold uppercase">Size Matrix</span>
                <button
                  onClick={() => setShowFitFinder(!showFitFinder)}
                  className="text-[#ff3e3e] hover:text-white font-semibold flex items-center gap-1 uppercase tracking-wide focus:outline-none py-1"
                >
                  <Scale className="w-3.5 h-3.5" /> Intelligent Fit Finder
                </button>
              </div>

              {/* Fit finder slide panel */}
              <AnimatePresence>
                {showFitFinder && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-[#111111] border border-[#2a2a2a] p-4 rounded text-left overflow-hidden space-y-4"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-[#222]">
                      <h4 className="font-mono text-[10px] tracking-widest text-white uppercase font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#ff3e3e]" /> AXIS FIT CALCULATOR
                      </h4>
                      <div className="font-mono text-[9px] bg-black border border-[#333] rounded overflow-hidden flex">
                        <button
                          onClick={() => setUnitSystem('imperial')}
                          className={`px-2 py-1 transition-colors ${unitSystem === 'imperial' ? 'bg-[#ff3e3e] text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                          IMPERIAL
                        </button>
                        <button
                          onClick={() => setUnitSystem('metric')}
                          className={`px-2 py-1 transition-colors ${unitSystem === 'metric' ? 'bg-[#ff3e3e] text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                          METRIC
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] text-[#888] uppercase">
                          Height ({unitSystem === 'imperial' ? 'inches' : 'cm'})
                        </label>
                        <input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="w-full bg-[#1e1e1e] border border-[#3a3a3a] rounded px-3 py-2 font-mono text-xs text-white focus:border-[#ff3e3e] focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] text-[#888] uppercase">
                          Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})
                        </label>
                        <input
                          type="number"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className="w-full bg-[#1e1e1e] border border-[#3a3a3a] rounded px-3 py-2 font-mono text-xs text-white focus:border-[#ff3e3e] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2.5 pt-2">
                      <button
                        onClick={calculateRecommendSize}
                        className="flex-1 bg-white hover:bg-white text-black font-mono text-[10px] font-bold tracking-widest py-2.5 rounded uppercase transition-all"
                      >
                        Calculate Optimal
                      </button>
                    </div>

                    {fitRecommendation && (
                      <div className="bg-black/40 border border-[#333] p-2.5 rounded flex items-center justify-between">
                        <div>
                          <p className="font-mono text-[9px] text-gray-500 uppercase">Recommended Vector</p>
                          <p className="font-mono text-sm font-bold text-white">Size: <span className="text-[#ff3e3e] text-base">{fitRecommendation}</span></p>
                        </div>
                        {fitRecommendation !== 'Please enter valid measurements.' && (
                          <button
                            onClick={handleApplyRecommendedSize}
                            className="bg-[#222] hover:bg-[#ff3e3e] text-white hover:text-black font-mono text-[9px] font-bold px-3 py-2 rounded uppercase transition-colors"
                          >
                            Apply Size
                          </button>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Size grids */}
              <div
                className="grid grid-cols-4 gap-2.5 border border-[#1e1e1e] p-1.5 rounded"
                id="size-selector-pdp"
              >
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`font-mono text-xs font-semibold py-3 rounded border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#ff3e3e] text-white border-transparent shadow shadow-[#ff3e3e]/30'
                          : 'bg-[#121212] hover:bg-[#1a1a1a] text-gray-300 border-[#2a2a2a]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {/* Urgency Stock Warning below size picker */}
              {selectedSize && product.limitedStockCount && (
                <p className="text-[10px] font-mono text-[#ff3e3e] flex items-center gap-1.5 uppercase bg-[#ff3e3e]/5 py-2 px-3 rounded border border-[#ff3e3e]/15">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> ONLY {product.limitedStockCount} ITEMS IN {selectedSize} CURRENTLY IN DEPOT STOCK. ALLOCATION WILL DEPLETE SOON.
                </p>
              )}
            </div>

            {/* Color Matrix */}
            <div className="space-y-3 font-mono text-xs pt-1">
              <span className="text-gray-300 font-bold uppercase">Color Identity</span>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`group flex items-center gap-2 rounded-full px-3 py-1.5 border transition-colors cursor-pointer ${
                      selectedColor === color.name
                        ? 'bg-white text-black border-transparent'
                        : 'bg-[#121212] text-gray-300 border-[#2a2a2a] hover:bg-[#1e1e1e]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/20"
                      style={{ backgroundColor: color.hex }}
                    ></span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Core Add to Cart Trigger */}
            <div className="pt-4 space-y-3">
              <button
                ref={mainAddToCartRef}
                id="pdp-add-to-cart"
                onClick={handleAddToCartSubmit}
                className="w-full bg-white hover:bg-[#ff3e3e] text-black hover:text-black font-mono text-xs tracking-widest uppercase font-black py-4.5 rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-white/5 active:scale-[0.99] border border-transparent"
              >
                Assemble Into Bag
              </button>

              {/* Express checkout triggers */}
              <div className="flex items-center gap-2 font-mono text-[9px] text-gray-500 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff3e3e]" />
                <span className="uppercase">COMPLIANT STEALTH ENCRYPTION APPLIED</span>
              </div>
            </div>

            {/* Added feedback */}
            <AnimatePresence>
              {addedFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-[#24b47e]/15 border border-[#24b47e]/35 text-[#24b47e] text-xs font-mono py-3 px-4 rounded text-center uppercase"
                >
                  ✓ Assembled! Bag inventory locked for 15:00 minutes.
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3. INFORMATION TABS */}
            <div className="pt-4 border-t border-[#1a1a1a]">
              <div className="flex border-b border-[#1a1a1a] font-mono text-[10px] uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 pb-3 text-center transition-colors font-bold ${
                    activeTab === 'details' ? 'text-[#ff3e3e] border-b-2 border-[#ff3e3e]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`flex-1 pb-3 text-center transition-colors font-bold ${
                    activeTab === 'specs' ? 'text-[#ff3e3e] border-b-2 border-[#ff3e3e]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Fit & Spec
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 pb-3 text-center transition-colors font-bold ${
                    activeTab === 'reviews' ? 'text-[#ff3e3e] border-b-2 border-[#ff3e3e]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>

              <div className="pt-4 text-xs font-sans leading-relaxed text-gray-400">
                {activeTab === 'details' && (
                  <div className="space-y-4">
                    <p className="capitalize-first">{product.longDescription}</p>
                    <ul className="space-y-2 list-none p-0 font-mono text-[11px]">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-white">
                          <CheckCircle className="w-3.5 h-3.5 text-[#ff3e3e] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-4 font-mono text-[11px] text-gray-300">
                    <div className="bg-[#111111] p-3 rounded border border-[#1f1f1f]">
                      <p className="text-gray-500 uppercase text-[9px] mb-1">DESIGN FIT</p>
                      <p>{product.specs.fit}</p>
                    </div>
                    <div className="bg-[#111111] p-3 rounded border border-[#1f1f1f]">
                      <p className="text-gray-500 uppercase text-[9px] mb-1">MATERIAL MATRIX</p>
                      <p>{product.specs.fabric}</p>
                    </div>
                    <div className="bg-[#111111] p-3 rounded border border-[#1f1f1f]">
                      <p className="text-gray-500 uppercase text-[9px] mb-1">WEIGHT</p>
                      <p>{product.specs.weight}</p>
                    </div>
                    <div className="bg-[#111111] p-3 rounded border border-[#1f1f1f]">
                      <p className="text-gray-500 uppercase text-[9px] mb-1">RESTORE CARE</p>
                      <p>{product.specs.care}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {/* Filter reviews UI */}
                    <div className="flex items-center gap-2.5 font-mono text-[10px] text-gray-400 border-b border-[#111] pb-3">
                      <span>Filter Rating:</span>
                      {[5, 4].map((stars) => (
                        <button
                          key={stars}
                          onClick={() => setReviewFilter(reviewFilter === stars ? null : stars)}
                          className={`px-2 py-1 rounded border transition-colors ${
                            reviewFilter === stars
                              ? 'bg-[#ff3e3e] text-white border-transparent'
                              : 'bg-[#111] text-gray-300 border-[#222] hover:border-gray-500'
                          }`}
                        >
                          {stars}★
                        </button>
                      ))}
                      {reviewFilter && (
                        <button
                          onClick={() => setReviewFilter(null)}
                          className="text-[#ff3e3e] hover:text-white"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {filteredReviews.length === 0 ? (
                      <p className="py-2 text-center text-gray-500 font-mono">No review blocks match filters.</p>
                    ) : (
                      <div className="space-y-4 overflow-y-auto max-h-[250px] pr-2">
                        {filteredReviews.map((rev) => (
                          <div key={rev.id} className="bg-[#111] p-3.5 rounded border border-[#1a1a1a] space-y-1.5 text-left">
                            <div className="flex justify-between items-start font-mono text-[10px]">
                              <div>
                                <span className="font-bold text-white block">{rev.author}</span>
                                <span className="text-gray-500">{rev.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < rev.rating ? 'text-yellow-500 fill-current' : 'text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex gap-2 text-[9px] font-mono text-gray-400">
                              <span className="bg-black border border-[#222] px-1.5 py-0.5 rounded">SIZE: {rev.sizePurchased}</span>
                              <span className="bg-black border border-[#222] px-1.5 py-0.5 rounded">FIT: {rev.fitRating}</span>
                            </div>

                            <p className="text-white font-semibold font-mono text-xs">{rev.title}</p>
                            <p className="font-sans text-xs text-gray-400 leading-relaxed">{rev.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-[#1a1a1a] font-mono text-[10px] text-gray-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#ff3e3e]" />
                <span className="uppercase">Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#ff3e3e]" />
                <span className="uppercase">30-day Easy Returns</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 4. CONVERSION FLOATING STICKY BAR - STICKY ADD TO BAG ON SCROLL */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-0 left-0 w-full bg-[#111111]/90 backdrop-blur-md border-t border-[#ff3e3e]/30 p-3 z-40 hidden sm:block shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="w-10 h-13 object-cover rounded bg-[#151515]"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left font-mono">
                  <h4 className="text-xs font-bold uppercase truncate max-w-[200px] text-white">
                    {product.name}
                  </h4>
                  <p className="text-[#ff3e3e] text-xs font-bold mt-0.5">
                    ${product.price}
                  </p>
                </div>
              </div>

              {/* Sizing + Action in single line */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400 mr-2">
                  <span className="uppercase">SIZE:</span>
                  <div className="flex gap-1 bg-black p-0.5 border border-[#333] rounded">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-2 py-1 text-[9px] rounded font-bold transition-all ${
                          selectedSize === size ? 'bg-[#ff3e3e] text-white' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAddToCartSubmit}
                  className="bg-[#ff3e3e] hover:bg-white text-white hover:text-black font-mono text-[10px] tracking-widest font-black uppercase py-3 px-6 rounded transition-all cursor-pointer shadow-lg shadow-[#ff3e3e]/15 flex items-center gap-2"
                >
                  Instant Secure Assemble
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
