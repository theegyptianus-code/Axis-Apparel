import React from 'react';
import { Sparkles, ArrowRight, TrendingUp, Sliders, Shield } from 'lucide-react';
import { heroBanner } from '../data';
import { motion } from 'motion/react';

interface HeroProps {
  onShopClick: () => void;
  onLookbookClick: () => void;
}

export default function Hero({ onShopClick, onLookbookClick }: HeroProps) {
  return (
    <section className="relative bg-[#050505] text-white overflow-hidden py-10 md:py-16">
      {/* Dynamic Grid overlay matching architectural "AXIS" style */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] mix-blend-screen">
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-white"></div>
        <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-white"></div>
        <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-white"></div>
        <div className="absolute left-0 right-0 top-1/4 h-[1px] bg-white"></div>
        <div className="absolute left-0 right-0 top-2/4 h-[1px] bg-white"></div>
        <div className="absolute left-0 right-0 top-3/4 h-[1px] bg-white"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Brand Concept & Core Copy Block (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-1.5 self-start font-mono text-[10px] uppercase font-bold tracking-widest text-[#ff3e3e] bg-[#ff3e3e]/10 border border-[#ff3e3e]/30 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3e3e] animate-ping"></span>
              LIVE ALLOCATION DROP
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-mono leading-tight tracking-tighter uppercase font-black">
                GEOMETRIC
                <span className="block text-[#ff3e3e]">SHIELDING.</span>
              </h1>
              <p className="font-sans text-sm sm:text-base text-gray-400 font-normal leading-relaxed max-w-md">
                AXIS restructure apparel perimeter. Designed with heavy-combed raw fibers, multi-axis welded joints, and concealed pockets. Refined streetwear for high-density living.
              </p>
            </div>

            {/* Simulated Live Stock Tracker - Psychology Conversion Trigger */}
            <div className="bg-[#121212] border border-[#2a2a2a] p-4 rounded pr-6">
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="text-gray-400 flex items-center gap-1.5 uppercase">
                  <TrendingUp className="w-3.5 h-3.5 text-[#ff3e3e]" /> Drop Allocation Block
                </span>
                <span className="text-white font-bold">92% Claimed</span>
              </div>
              <div className="w-full bg-[#222] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#ff3e3e] h-full w-[92%] rounded-full animate-pulse"></div>
              </div>
              <p className="text-[10px] font-mono text-gray-500 mt-2 flex items-center gap-1 uppercase">
                <Sliders className="w-3 h-3 text-[#ff3e3e]" /> BATCH-04 depletion speeds are elevated. Only XS and XL sizes remaining in high-tier volumes.
              </p>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                id="hero-shop-now"
                onClick={onShopClick}
                className="group flex-1 bg-white hover:bg-[#ff3e3e] text-black hover:text-black font-mono text-xs tracking-widest uppercase font-bold px-6 py-4 rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-white/5 hover:shadow-[#ff3e3e]/20"
              >
                Access Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                id="hero-view-lookbook"
                onClick={onLookbookClick}
                className="flex-1 bg-transparent hover:bg-white/5 text-white font-mono text-xs tracking-widest uppercase border border-gray-700 hover:border-white px-6 py-4 rounded transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                Visual Lookbook
              </button>
            </div>

            {/* Social Trust triggers */}
            <div className="pt-3 flex items-center gap-4 border-t border-[#1a1a1a]">
              <div className="flex -space-x-2">
                <img className="w-7 h-7 rounded-full border-2 border-black object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Collector" referrerPolicy="no-referrer" />
                <img className="w-7 h-7 rounded-full border-2 border-black object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Collector" referrerPolicy="no-referrer" />
                <img className="w-7 h-7 rounded-full border-2 border-black object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Collector" referrerPolicy="no-referrer" />
              </div>
              <div className="font-mono text-[10px] text-gray-500">
                <p className="text-gray-300 font-bold">RATED 4.93 / 5.00</p>
                <p className="uppercase">by 2,400+ techwear collectors</p>
              </div>
            </div>
          </div>

          {/* Epic Hero Artwork (Right) */}
          <div className="lg:col-span-7 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ff3e3e] to-[#ff7171] rounded opacity-15 blur-xl group-hover:opacity-20 transition-opacity"></div>
            
            <div className="relative border border-[#2d2d2d] bg-[#111] overflow-hidden rounded shadow-2xl">
              {/* Top Bar simulating a custom hardware calibration header */}
              <div className="bg-[#161616] border-b border-[#2d2d2d] px-4 py-2.5 flex items-center justify-between font-mono text-[9px] text-[#888] tracking-widest uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff3e3e]"></span>
                  AXIS APPARATUS LABS
                </span>
                <span>CHAMBER_01_HERO_V3</span>
              </div>
              
              <div className="aspect-video w-full relative">
                <img
                  src={heroBanner}
                  alt="AXIS Premium Streetwear Studio Photoshoot"
                  className="w-full h-full object-cover grayscale brightness-95 contrast-105 group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual grid coordinates tag - overlays */}
                <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded font-mono text-[10px] text-gray-300 pointer-events-none uppercase">
                  <p className="font-bold text-[#ff3e3e]">COORDINATES INDEX</p>
                  <p className="text-gray-500 text-[8px]">LAT: 52.5200° N | LONG: 13.4050° E</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
