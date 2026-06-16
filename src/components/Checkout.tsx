import React, { useState, useEffect } from 'react';
import { CartItem, ShippingDetails } from '../types';
import { CreditCard, ShieldCheck, Truck, Lock, ArrowLeft, Terminal, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface CheckoutProps {
  cartItems: CartItem[];
  discountRate: number;
  onPlaceOrder: (details: ShippingDetails) => void;
  onBackToCart: () => void;
}

export default function Checkout({
  cartItems,
  discountRate,
  onPlaceOrder,
  onBackToCart,
}: CheckoutProps) {
  const [form, setForm] = useState<ShippingDetails>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Subtotal mathematical breakdown
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  };

  const FREE_SHIPPING_THRESHOLD = 200;
  const subtotal = calculateSubtotal();
  const rawDiscount = subtotal * discountRate;
  const deliveryCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 15;
  const finalTotal = subtotal - rawDiscount + deliveryCost;

  // Apply quick Express wallet presets (helps conversion!)
  const handleExpressWallet = (provider: 'apple' | 'google') => {
    setForm((prev) => ({
      ...prev,
      email: `${provider}.user@gmail.com`,
      firstName: 'Alex',
      lastName: 'Spectre',
      address: '100 Architectural Axis Heights',
      city: 'Portland',
      zipCode: '97201',
      phone: '503-555-0192',
      paymentMethod: provider === 'apple' ? 'applepay' : 'googlepay',
    }));
    // Clear errors
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.email || !form.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!form.firstName) newErrors.firstName = 'First name is required';
    if (!form.lastName) newErrors.lastName = 'Last name is required';
    if (!form.address) newErrors.address = 'Street destination is required';
    if (!form.city) newErrors.city = 'City index is required';
    if (!form.zipCode) newErrors.zipCode = 'ZIP index is required';
    if (!form.phone) newErrors.phone = 'Contact number is required';

    if (form.paymentMethod === 'card') {
      if (!form.cardNumber || form.cardNumber.replace(/\s+/g, '').length < 16) {
        newErrors.cardNumber = 'Valid 16-digit Card terminal reference is required';
      }
      if (!form.cardExpiry || !form.cardExpiry.includes('/')) {
        newErrors.cardExpiry = 'Expiry (MM/YY) is required';
      }
      if (!form.cardCvc || form.cardCvc.length < 3) {
        newErrors.cardCvc = '3-digit security key is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate high-security terminal confirmation delay
    setTimeout(() => {
      setIsSubmitting(false);
      onPlaceOrder(form);
    }, 1800);
  };

  return (
    <div className="bg-[#050505] text-white py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Navigation line */}
        <button
          onClick={onBackToCart}
          className="mb-8 font-mono text-xs text-gray-400 hover:text-[#ff3e3e] flex items-center gap-2 transition-colors uppercase py-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Bag View
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 text-left">
          
          {/* LEFT: Billing / Courier Address inputs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Quick checkout tabs */}
            <div className="bg-[#111111] border border-[#2d2d2d] p-5 rounded space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#ff3e3e] flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#ff3e3e]" /> Express One-Click Wallets
              </h3>
              <p className="font-sans text-xs text-gray-400 leading-normal">
                Skip registration and auto-fill certified postal telemetry coordinates instantly.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleExpressWallet('apple')}
                  className="bg-[#1e1e1e] hover:bg-white text-white hover:text-black font-semibold font-mono text-[10px] tracking-widest py-3 rounded uppercase border border-[#333] transition-colors flex items-center justify-center gap-1.5 cursor-pointer hover:border-transparent"
                >
                   Apple Pay Presets
                </button>
                <button
                  type="button"
                  onClick={() => handleExpressWallet('google')}
                  className="bg-[#1e1e1e] hover:bg-white text-white hover:text-black font-semibold font-mono text-[10px] tracking-widest py-3 rounded uppercase border border-[#333] transition-colors flex items-center justify-center gap-1.5 cursor-pointer hover:border-transparent"
                >
                  G Pay Presets
                </button>
              </div>
            </div>

            {/* Core Billing Address Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-mono text-xs font-extrabold uppercase tracking-widest text-white border-b border-[#222] pb-2">
                  01. Customer Delivery Profile
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-gray-400 uppercase">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-[#111] text-white border border-[#2d2d2d] rounded px-3 py-2.5 font-mono text-xs focus:border-[#ff3e3e] focus:outline-none"
                    />
                    {errors.firstName && <p className="text-[10px] font-mono text-[#ff3e3e] uppercase">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-gray-400 uppercase">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-[#111] text-white border border-[#2d2d2d] rounded px-3 py-2.5 font-mono text-xs focus:border-[#ff3e3e] focus:outline-none"
                    />
                    {errors.lastName && <p className="text-[10px] font-mono text-[#ff3e3e] uppercase">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-gray-400 uppercase">Contact Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="e.g. collector@axis.com"
                      className="w-full bg-[#111] text-white border border-[#2d2d2d] rounded px-3 py-2.5 font-mono text-xs focus:border-[#ff3e3e] focus:outline-none"
                    />
                    {errors.email && <p className="text-[10px] font-mono text-[#ff3e3e] uppercase">{errors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-gray-400 uppercase">Mobile Phone Reference</label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 555-010-9426"
                      className="w-full bg-[#111] text-white border border-[#2d2d2d] rounded px-3 py-2.5 font-mono text-xs focus:border-[#ff3e3e] focus:outline-none"
                    />
                    {errors.phone && <p className="text-[10px] font-mono text-[#ff3e3e] uppercase">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-gray-400 uppercase">Shipping Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    placeholder="Street name, floor, suite coordinates"
                    className="w-full bg-[#111] text-white border border-[#2d2d2d] rounded px-3 py-2.5 font-mono text-xs focus:border-[#ff3e3e] focus:outline-none"
                  />
                  {errors.address && <p className="text-[10px] font-mono text-[#ff3e3e] uppercase">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-gray-400 uppercase">City</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleInputChange}
                      className="w-full bg-[#111] text-white border border-[#2d2d2d] rounded px-3 py-2.5 font-mono text-xs focus:border-[#ff3e3e] focus:outline-none"
                    />
                    {errors.city && <p className="text-[10px] font-mono text-[#ff3e3e] uppercase">{errors.city}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-gray-400 uppercase">Zip / Postal Index</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={form.zipCode}
                      onChange={handleInputChange}
                      className="w-full bg-[#111] text-white border border-[#2d2d2d] rounded px-3 py-2.5 font-mono text-xs focus:border-[#ff3e3e] focus:outline-none"
                    />
                    {errors.zipCode && <p className="text-[10px] font-mono text-[#ff3e3e] uppercase">{errors.zipCode}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-gray-400 uppercase">Country</label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleInputChange}
                      className="w-full bg-[#111] text-white border border-[#2d2d2d] rounded px-3 py-3 font-mono text-xs focus:border-[#ff3e3e] focus:outline-none"
                    >
                      <option value="United States">United States</option>
                      <option value="Germany">Germany (Berlin Hub)</option>
                      <option value="United Kingdom">United Kingdom (London Hub)</option>
                      <option value="Japan">Japan (Tokyo Hub)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Secure Payment details form */}
              <div className="space-y-4 pt-4">
                <h3 className="font-mono text-xs font-extrabold uppercase tracking-widest text-white border-b border-[#222] pb-2">
                  02. Secured Financial Assembly
                </h3>

                <div className="flex gap-4 font-mono text-xs pb-1">
                  <label className={`flex-1 p-3 border rounded text-center cursor-pointer transition-all ${form.paymentMethod === 'card' ? 'border-[#ff3e3e] bg-[#ff3e3e]/5' : 'border-[#2d2d2d] hover:border-white'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={form.paymentMethod === 'card'}
                      onChange={() => setForm(prev => ({ ...prev, paymentMethod: 'card' }))}
                      className="sr-only"
                    />
                    <span>Card Terminal</span>
                  </label>
                  <label className={`flex-1 p-3 border rounded text-center cursor-pointer transition-all ${form.paymentMethod === 'applepay' ? 'border-[#ff3e3e] bg-[#ff3e3e]/5' : 'border-[#2d2d2d] hover:border-white'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="applepay"
                      checked={form.paymentMethod === 'applepay'}
                      onChange={() => setForm(prev => ({ ...prev, paymentMethod: 'applepay' }))}
                      className="sr-only"
                    />
                    <span> Apple Pay</span>
                  </label>
                  <label className={`flex-1 p-3 border rounded text-center cursor-pointer transition-all ${form.paymentMethod === 'googlepay' ? 'border-[#ff3e3e] bg-[#ff3e3e]/5' : 'border-[#2d2d2d] hover:border-white'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="googlepay"
                      checked={form.paymentMethod === 'googlepay'}
                      onChange={() => setForm(prev => ({ ...prev, paymentMethod: 'googlepay' }))}
                      className="sr-only"
                    />
                    <span>G Pay System</span>
                  </label>
                </div>

                {form.paymentMethod === 'card' ? (
                  <div className="space-y-4 bg-[#111]/40 border border-[#2d2d2d] p-5 rounded">
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] text-gray-400">CREDIT CARD NUMBER</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={form.cardNumber}
                          onChange={handleInputChange}
                          maxLength={19}
                          placeholder="4000 1234 5678 9010"
                          className="w-full bg-[#111] text-white border border-[#2d2d2d] rounded pl-10 pr-3 py-2.5 font-mono text-xs focus:border-[#ff3e3e] focus:outline-none"
                        />
                        <CreditCard className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                      </div>
                      {errors.cardNumber && <p className="text-[10px] font-mono text-[#ff3e3e] uppercase">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[10px] text-gray-400">EXPIRATION (MM/YY)</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={form.cardExpiry}
                          onChange={handleInputChange}
                          maxLength={5}
                          placeholder="12/28"
                          className="w-full bg-[#111] text-white border border-[#2d2d2d] rounded px-3 py-2.5 font-mono text-xs focus:border-[#ff3e3e] focus:outline-none"
                        />
                        {errors.cardExpiry && <p className="text-[10px] font-mono text-[#ff3e3e] uppercase">{errors.cardExpiry}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[10px] text-gray-400">SECURITY CODE (CVC)</label>
                        <input
                          type="password"
                          name="cardCvc"
                          value={form.cardCvc}
                          onChange={handleInputChange}
                          maxLength={3}
                          placeholder="•••"
                          className="w-full bg-[#111] text-white border border-[#2d2d2d] rounded px-3 py-2.5 font-mono text-xs focus:border-[#ff3e3e] focus:outline-none"
                        />
                        {errors.cardCvc && <p className="text-[10px] font-mono text-[#ff3e3e] uppercase">{errors.cardCvc}</p>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center bg-[#111111] border border-dashed border-[#333] p-6 rounded space-y-2">
                    <p className="font-mono text-xs font-bold uppercase text-[#ff3e3e] flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> WALLET PIPELINE READY
                    </p>
                    <p className="font-sans text-xs text-gray-400">
                      You will confirm transactions securely via your provider biometrics terminal.
                    </p>
                  </div>
                )}
              </div>

              {/* Place order CTA */}
              <div className="pt-4 space-y-3.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#ff3e3e] hover:bg-white text-white hover:text-black font-mono text-xs tracking-widest uppercase font-black py-4 rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-[#ff3e3e]/15 select-none disabled:bg-gray-700 disabled:text-gray-400 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-1.5 animate-pulse uppercase">
                      <Lock className="w-4 h-4 animate-spin" /> ESTABLISHING ENCRPYTED CHAIN...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 uppercase font-black">
                      PLACE COMPLIANT ORDER (${finalTotal.toFixed(2)})
                    </span>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1 px-4 text-center font-mono text-[8px] text-gray-600 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ff3e3e]" />
                  <span>256-bit AES encryption applied. Returns eligible for 30 consecutive days.</span>
                </div>
              </div>

            </form>
          </div>

          {/* RIGHT COLUMN: Live billing tally */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111] border border-[#222] p-5 rounded space-y-5">
              <h3 className="font-mono text-xs font-black uppercase tracking-widest text-[#999] border-b border-[#222] pb-2 text-left">
                Bag Summary index
              </h3>

              {/* Items Summary list */}
              <div className="space-y-4 max-h-[290px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex justify-between items-start gap-4 pb-3 border-b border-[#1a1a1a]"
                  >
                    <img
                      src={item.product.mainImage}
                      alt={item.product.name}
                      className="w-12 h-16 object-cover bg-neutral-900 rounded shrink-0 border border-[#222]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <h4 className="font-mono text-xs font-bold text-white truncate max-w-[180px]">
                        {item.product.name}
                      </h4>
                      <p className="font-mono text-[9px] text-[#777] uppercase mt-0.5">
                        QTY: {item.quantity} • SIZE: {item.selectedSize}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#ff3e3e]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Math totals stack */}
              <div className="space-y-2.5 font-mono text-xs text-gray-400 pt-1">
                <div className="flex justify-between">
                  <span className="uppercase">Vector Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discountRate > 0 && (
                  <div className="flex justify-between text-[#24b47e]">
                    <span className="uppercase">AXIS Discount coupling (-10%)</span>
                    <span>-${rawDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="uppercase">Express Courier Courier</span>
                  <span>
                    {deliveryCost === 0 ? (
                      <span className="text-[#24b47e] font-bold">FREE</span>
                    ) : (
                      `$${deliveryCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-white border-t border-[#222] pt-3.5 font-bold text-sm">
                  <span className="uppercase text-xs font-bold">Total Tally locked</span>
                  <span className="text-[#ff3e3e]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="bg-black/40 border border-[#2a2a2a] p-4 rounded text-left space-y-3 font-mono text-[9px] text-[#888] tracking-wide">
                <p className="flex items-center gap-2 uppercase text-gray-300">
                  <Truck className="w-3.5 h-3.5 text-[#ff3e3e]" /> Concierge Dispatch Enabled
                </p>
                <p className="leading-relaxed">
                  Your batch allocation will be registered instantly at our AXIS Solder Grey distribution facility. Packing cycles are immediate. Tracking info dispatched via SMS.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
