import React, { useState } from 'react';
import { ShoppingBag, Star, AlertCircle, Eye } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onSelect: (id: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  key?: string;
}

export default function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [quickSizeOpen, setQuickSizeOpen] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);

  const displayImage = hovered && product.alternateImages && product.alternateImages[1]
    ? product.alternateImages[1]
    : product.mainImage;

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0].name : 'Stealth Black';
    onAddToCart(product, size, defaultColor);
    
    // Success feedback
    setSuccessAdd(true);
    setQuickSizeOpen(false);
    setTimeout(() => setSuccessAdd(false), 2000);
  };

  return (
    <div
      onClick={() => onSelect(product.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setQuickSizeOpen(false);
      }}
      className="group relative bg-[#0d0d0d] border border-[#1e1e1e] hover:border-gray-500 rounded overflow-hidden flex flex-col h-full cursor-pointer transition-all"
      id={`product-card-${product.id}`}
    >
      {/* 1. IMAGE CONTAINER */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#151515]">
        
        {/* Dynamic Badge Overlays */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 font-mono text-[9px] uppercase tracking-wider font-bold">
          {product.isNewArrival && (
            <span className="bg-white text-black px-2 py-1 rounded shadow-md">
              INITIAL DROP
            </span>
          )}
          {product.limitedStockCount && product.limitedStockCount <= 5 ? (
            <span className="bg-[#ff3e3e] text-white px-2 py-1 rounded shadow-md flex items-center gap-1 animate-pulse">
              <AlertCircle className="w-3 h-3" /> LOW STOCK (ONLY {product.limitedStockCount})
            </span>
          ) : product.originalPrice ? (
            <span className="bg-[#ff3e3e]/15 text-[#ff3e3e] border border-[#ff3e3e]/35 px-2 py-1 rounded">
              SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          ) : null}
        </div>

        {/* Product image (dual transition) */}
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover grayscale brightness-90 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Visual search/Quick view overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <div className="bg-black/80 p-2 rounded backdrop-blur-md border border-white/10 hover:border-white transition-colors">
            <Eye className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Sizing drawer for Quick Add - Conversion booster! */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <AnimatePresence>
            {!quickSizeOpen ? (
              hovered && (
                <motion.button
                  key="quick-add-btn"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuickSizeOpen(true);
                  }}
                  className="w-full bg-[#ff3e3e] hover:bg-white text-white hover:text-black font-mono text-[10px] tracking-widest uppercase font-bold py-3.5 flex items-center justify-center gap-1.5 shadow-xl transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  QUICK SIZE ADD
                </motion.button>
              )
            ) : (
              <motion.div
                key="quick-size-select"
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                exit={{ y: 30 }}
                className="w-full bg-black/95 backdrop-blur-md border-t border-[#333] p-3 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-[9px] text-[#888] uppercase tracking-wider">Select Size</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickSizeOpen(false);
                    }}
                    className="font-mono text-[9px] text-[#ff3e3e] hover:text-white uppercase font-bold"
                  >
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={(e) => handleQuickAdd(size, e)}
                      className="bg-[#222] hover:bg-[#ff3e3e] text-white hover:text-black font-semibold font-mono text-xs py-2 rounded transition-all active:scale-95 border border-[#333] hover:border-transparent"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Temporary added check tracker popup */}
        <AnimatePresence>
          {successAdd && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 bg-[#ff3e3e]/85 backdrop-blur-sm flex flex-col items-center justify-center z-30 p-4 text-center text-white"
            >
              <ShoppingBag className="w-8 h-8 mb-2 animate-bounce" />
              <p className="font-mono text-xs font-bold uppercase tracking-widest">ADDED TO BAG</p>
              <p className="text-[10px] opacity-90 mt-1 font-mono">STEALTH SYSTEM READY</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* 2. PRODUCT DETAILS SECTION */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              {product.category}
            </span>
            
            {/* Real Rating representation */}
            <div className="flex items-center gap-1 font-mono text-[10px] text-gray-400">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="font-mono text-xs tracking-wide uppercase font-bold text-white group-hover:text-[#ff3e3e] transition-colors leading-relaxed truncate">
            {product.name}
          </h3>
        </div>

        <div className="flex justify-between items-baseline pt-1.5 border-t border-[#1a1a1a]">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm font-bold text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <span className="font-mono text-[9px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
            VISIT DETAILS →
          </span>
        </div>
      </div>

    </div>
  );
}
