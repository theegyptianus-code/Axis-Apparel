import React, { useState } from 'react';
import { ShoppingBag, X, Star, CreditCard, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface LookbookProps {
  onProductSelect: (id: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

interface Hotspot {
  productId: string;
  top: string; // percentage
  left: string; // percentage
  label: string;
}

export default function Lookbook({ onProductSelect, onAddToCart }: LookbookProps) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // Define hotspots relative to our hero image coordinates
  const HOTSPOTS: Hotspot[] = [
    {
      productId: 'prod-001',
      top: '38%',
      left: '32%',
      label: 'SYNAPSE Technical Shell v2'
    },
    {
      productId: 'prod-003',
      top: '25%',
      left: '68%',
      label: 'CHRONOS Heavyweight Hoodie'
    },
    {
      productId: 'prod-002',
      top: '72%',
      left: '52%',
      label: 'APEX Tactical Utility Cargo'
    }
  ];

  const handleHotspotClick = (hotspot: Hotspot) => {
    setActiveHotspot(hotspot);
    setSelectedSize(''); // Reset Selected Size
  };

  const getProductObj = (id: string): Product | undefined => {
    return PRODUCTS.find((p) => p.id === id);
  };

  const handleAddToCart = (product: Product) => {
    if (!selectedSize) {
      alert('Please select a size to proceed.');
      return;
    }

    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0].name : 'Default';
    onAddToCart(product, selectedSize, defaultColor);

    // Show rapid success tracking
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setActiveHotspot(null);
    }, 1800);
  };

  return (
    <div className="bg-[#0b0b0b] text-white py-10 md:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Layout description */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="font-mono text-xs uppercase text-[#ff3e3e] tracking-[0.2em] font-bold">
            AXIS LOOKBOOK INDEX v4
          </span>
          <h2 className="text-3xl sm:text-4.5xl font-mono uppercase font-black tracking-tight leading-tight">
            INTERACTIVE LOOKBOOK
          </h2>
          <p className="font-sans text-sm text-gray-400 max-w-lg mx-auto">
            Explore geometric pieces styled in unison. Hold your cursor or tap pulsing focal markers to reveal item specifications and add components directly.
          </p>
        </div>

        {/* Cinematic Lookbook Canvas */}
        <div className="relative border border-[#222] bg-[#111] rounded overflow-hidden shadow-2xl">
          {/* Top panel simulation */}
          <div className="bg-[#161616] border-b border-[#222] px-4 py-2.5 flex items-center justify-between font-mono text-[9px] text-[#888] tracking-widest uppercase">
            <span>SATELLITE SPECTRE PROJECTION</span>
            <span>ZOOM: OPTIMIZED INTERACTIVE</span>
          </div>

          <div className="relative aspect-[16/9] w-full min-h-[300px]">
            {/* The primary lookbook streetwear models picture we generated */}
            <img
              src={PRODUCTS[0].alternateImages[0]} // Using the high-fashion hero banner as canvas
              alt="AXIS Styled Lookbook Grid"
              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-300 pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* Pulsing Hotspots */}
            {HOTSPOTS.map((hotspot, idx) => {
              const active = activeHotspot?.productId === hotspot.productId;
              return (
                <div
                  key={idx}
                  className="absolute"
                  style={{ top: hotspot.top, left: hotspot.left }}
                >
                  <button
                    onClick={() => handleHotspotClick(hotspot)}
                    className="relative w-8 h-8 flex items-center justify-center focus:outline-none cursor-pointer group"
                    aria-label={`Hotspot matching ${hotspot.label}`}
                  >
                    {/* Pulsing visual outer rings */}
                    <span className="absolute w-full h-full rounded-full bg-[#ff3e3e] opacity-40 animate-ping"></span>
                    <span className="absolute w-4 h-4 rounded-full bg-[#ff3e3e]"></span>
                    
                    <span className="absolute left-10 bg-black/95 backdrop-blur font-mono text-[9px] uppercase tracking-widest border border-white/10 px-2 py-1 rounded select-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-white z-10">
                      {hotspot.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hotspot details overlay box or side drawer */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed inset-x-4 bottom-4 md:absolute md:inset-auto md:bottom-8 md:right-8 bg-black/95 backdrop-blur-md border border-[#ff3e3e]/30 p-5 rounded max-w-md shadow-2xl z-40 text-left"
              id="lookbook-hotspot-panel"
            >
              {(() => {
                const prod = getProductObj(activeHotspot.productId);
                if (!prod) return null;
                return (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-[9px] text-[#ff3e3e] uppercase tracking-widest font-bold">
                          LOOK COORDINATES
                        </span>
                        <h3 className="font-mono text-sm uppercase font-bold text-white tracking-wide mt-0.5">
                          {prod.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <X className="w-4.5 h-4.5" />
                      </button>
                    </div>

                    <div className="flex gap-4">
                      <img
                        src={prod.mainImage}
                        alt={prod.name}
                        className="w-16 h-20 object-cover rounded bg-neutral-900 border border-[#222]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-baseline gap-2 font-mono">
                          <span className="text-sm font-bold text-white">${prod.price}</span>
                          {prod.originalPrice && (
                            <span className="text-[10px] text-gray-500 line-through">${prod.originalPrice}</span>
                          )}
                        </div>
                        <p className="font-sans text-xs text-gray-400 leading-relaxed truncate-2-lines">
                          {prod.description}
                        </p>
                        <button
                          onClick={() => onProductSelect(prod.id)}
                          className="font-mono text-[9px] text-[#ff3e3e] hover:text-white uppercase font-bold tracking-wider pt-0.5 inline-block"
                        >
                          View Full Layout Spec →
                        </button>
                      </div>
                    </div>

                    {/* Sizing Grid Container */}
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] text-[#888] uppercase select-none block">
                        Select Sizing Allocation
                      </span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {prod.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`font-mono text-xs font-semibold py-1.5 rounded border transition-all cursor-pointer ${
                              selectedSize === sz
                                ? 'bg-[#ff3e3e] text-white border-transparent'
                                : 'bg-[#121212] hover:bg-[#1a1a1a] text-gray-300 border-[#2a2a2a]'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Quick Add */}
                    <div className="space-y-2">
                      <button
                        onClick={() => handleAddToCart(prod)}
                        className="w-full bg-white hover:bg-[#ff3e3e] text-black hover:text-black font-mono text-[10px] tracking-widest font-extrabold uppercase py-3 rounded transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Assemble Look Component
                      </button>
                    </div>

                    <AnimatePresence>
                      {successMsg && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-[#24b47e]/15 border border-[#24b47e]/35 text-[#24b47e] text-[10px] font-mono py-2 rounded text-center uppercase"
                        >
                          Assembled! Component securely loaded into bag.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
