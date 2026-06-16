import React, { useEffect, useState } from 'react';
import { ShippingDetails } from '../types';
import { ShieldCheck, Calendar, ArrowRight, Truck, Mail, Copy, Package } from 'lucide-react';
import { motion } from 'motion/react';

interface OrderConfirmationProps {
  shippingDetails: ShippingDetails | null;
  onContinueShopping: () => void;
}

export default function OrderConfirmation({
  shippingDetails,
  onContinueShopping,
}: OrderConfirmationProps) {
  const [trackingId, setTrackingId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate static tracker index
    const randomHex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
    setTrackingId(`AXIS-TRK-${randomHex}-26`);
  }, []);

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate 2-3 days delivery date from current local date (2026-06-16)
  const getDeliveryDateStr = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-[#050505] text-white py-12 min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-4 text-center space-y-8">
        
        {/* Animated Celebration Icon Wrapper */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <span className="absolute w-full h-full rounded-full bg-[#ff3e3e]/10 animate-ping"></span>
          <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#ff3e3e] shadow-xl">
            <ShieldCheck className="w-8 h-8 font-black" />
          </div>
        </div>

        {/* Text Header */}
        <div className="space-y-2">
          <span className="font-mono text-[10px] uppercase text-[#ff3e3e] tracking-[0.25em] font-black">
            DEPOT ALLOCATION CONFIRMED
          </span>
          <h1 className="text-3xl sm:text-4.5xl font-mono uppercase font-black tracking-tight leading-none text-white">
            TRANSACTION COMMITTED
          </h1>
          <p className="font-sans text-xs text-gray-500 max-w-sm mx-auto">
            Your unique order has successfully claimed allocation in AXIS BATCH-04. Systems have begun packing your order.
          </p>
        </div>

        {/* Dynamic Delivery Date Card - Psychology booster */}
        <div className="bg-[#111111] border border-[#2d2d2d] p-5 rounded space-y-3.5 text-left">
          <div className="flex items-center gap-2 text-[#ff3e3e] font-mono text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4" /> SECURED TRANSIT WINDOW
          </div>
          <div className="space-y-1">
            <p className="font-sans text-xs text-gray-400">Estimated Dispatch Arrival:</p>
            <p className="font-mono text-base font-black text-white uppercase">{getDeliveryDateStr()}</p>
          </div>
          <p className="font-sans text-[10px] text-gray-500 leading-normal">
            Orders processed via our express Concierge route are prioritized. Delays are mitigated through automated routing index parameters.
          </p>
        </div>

        {/* Shipment Tracker Indices */}
        <div className="bg-[#111111] border border-[#1e1e1e] p-5 rounded space-y-4 text-left font-mono">
          <div className="flex justify-between items-center text-[10px] border-b border-[#222] pb-2">
            <span className="text-gray-500 uppercase">TELEMETRY KEY</span>
            <span className="text-white font-bold">{trackingId}</span>
          </div>

          <div className="space-y-1.5 text-xs text-gray-300">
            <p className="flex justify-between items-baseline gap-4 text-[10px] text-gray-500 uppercase">
              <span>Carrier Node</span>
              <strong className="text-white">AXIS CONCIERGE EXPRESS</strong>
            </p>
            <p className="flex justify-between items-baseline gap-4 text-[10px] text-gray-500 uppercase">
              <span>Destination</span>
              <strong className="text-white truncate max-w-[200px]">
                {shippingDetails?.address}, {shippingDetails?.city}
              </strong>
            </p>
            <p className="flex justify-between items-baseline gap-4 text-[10px] text-gray-500 uppercase">
              <span>Contact Ref</span>
              <strong className="text-white">{shippingDetails?.email}</strong>
            </p>
          </div>

          {/* Copy Tracking Trigger */}
          <button
            onClick={handleCopyTracking}
            className="w-full bg-[#1e1e1e] hover:bg-[#333] border border-[#2c2c2c] text-slate-300 hover:text-white text-[9px] font-mono uppercase py-2 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Copy className="w-3 h-3 text-[#ff3e3e]" />
            {copied ? 'COPIED INDEX' : 'COPY TRACKING REFERENCE'}
          </button>
        </div>

        {/* Simulated Delivery Progress Pipeline */}
        <div className="space-y-4 text-left">
          <h4 className="font-mono text-[9px] text-[#888] tracking-widest uppercase">
            ACTIVE DEPOT ASSEMBLY PIPELINE
          </h4>

          <div className="grid grid-cols-4 gap-1 relative font-mono text-[9px]">
            {/* The line backdrop */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-[#222] z-0"></div>
            <div className="absolute top-4 left-0 w-1/4 h-0.5 bg-[#ff3e3e] z-0"></div>

            <div className="text-center space-y-2 relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#ff3e3e] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#ff3e3e]/30">
                <Package className="w-3.5 h-3.5" />
              </div>
              <span className="block font-bold text-white uppercase text-[8px]">Committed</span>
            </div>

            <div className="text-center space-y-2 relative z-10 opacity-75">
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-gray-500 border border-[#2d2d2d] flex items-center justify-center mx-auto">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <span className="block font-medium text-gray-500 uppercase text-[8px]">Assembly</span>
            </div>

            <div className="text-center space-y-2 relative z-10 opacity-50">
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-gray-500 border border-[#2d2d2d] flex items-center justify-center mx-auto">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <span className="block font-medium text-gray-500 uppercase text-[8px]">Transit</span>
            </div>

            <div className="text-center space-y-2 relative z-10 opacity-30">
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-gray-500 border border-[#2d2d2d] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="block font-medium text-gray-500 uppercase text-[8px]">Arrived</span>
            </div>
          </div>
        </div>

        {/* Back navigation */}
        <div className="pt-4 border-t border-[#1e1e1e]">
          <button
            onClick={onContinueShopping}
            className="w-full bg-white hover:bg-[#ff3e3e] text-black hover:text-black font-mono text-xs tracking-widest uppercase font-bold py-3.5 rounded transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-white/5"
          >
            Continue Sourcing Gear <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
