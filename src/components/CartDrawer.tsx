import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, Shield, Truck, Tag, HelpCircle } from 'lucide-react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, color: string, newQty: number) => void;
  onRemoveItem: (productId: string, size: string, color: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onCheckout: () => void;
  promoCode: string;
  onApplyPromo: (code: string) => void;
  discountRate: number; // e.g. 0.1 for 10%
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  onCheckout,
  promoCode,
  onApplyPromo,
  discountRate,
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccessMsg, setPromoSuccessMsg] = useState('');

  const handleApplyPromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'AXIS10') {
      onApplyPromo('AXIS10');
      setPromoSuccessMsg('PROMO CODE APPLIED: 10% OFF COUPLING');
      setPromoError('');
    } else {
      setPromoError('INVALID VECTOR CODE');
      setPromoSuccessMsg('');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  };

  const FREE_SHIPPING_THRESHOLD = 200;
  const subtotal = calculateSubtotal();
  const rawDiscount = subtotal * discountRate;
  const deliveryCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 15;
  const finalTotal = subtotal - rawDiscount + deliveryCost;

  // Free shipping progress variables
  const spendLeft = FREE_SHIPPING_THRESHOLD - subtotal;
  const percentProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  // Socks reference for Upsell Block
  const socksProduct = PRODUCTS.find((p) => p.id === 'prod-006');
  const hasSocksInCart = cartItems.some((item) => item.product.id === 'prod-006');

  const handleQuickAddSocks = () => {
    if (socksProduct) {
      onAddToCart(socksProduct, 'L', 'Aero Salt');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scurry Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
            id="cart-backdrop"
          ></motion.div>

          {/* Scurry Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-[#0a0a0a] border-l border-[#222] text-white z-50 shadow-2xl flex flex-col justify-between"
            id="cart-sidebar-panel"
          >
            {/* 1. DRAWER HEADER */}
            <div className="p-5 border-b border-[#1e1e1e] flex justify-between items-center bg-[#0d0d0d]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm uppercase tracking-widest font-black text-white">
                  BAG CONTAINER
                </span>
                <span className="bg-[#ff3e3e] text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} ITEMS
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. PROGRESS BAR TOWARDS FREE SHIPPING */}
            {subtotal > 0 && (
              <div className="bg-[#111] border-b border-[#1e1e1e] p-4 font-mono text-[10px] text-center space-y-2">
                {spendLeft > 0 ? (
                  <p className="text-gray-400 uppercase">
                    Assembling further <span className="text-[#ff3e3e] font-bold">${spendLeft.toFixed(2)}</span> of apparel unlocks FREE CONCIERGE courier
                  </p>
                ) : (
                  <p className="text-[#24b47e] font-bold uppercase flex items-center justify-center gap-1">
                    <Truck className="w-3.5 h-3.5 animate-bounce" /> CONCIERGE EXPRESS COURIER UNLOCKED
                  </p>
                )}
                <div className="w-full bg-[#222] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#ff3e3e] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${percentProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* 3. DYNAMIC DRAWER BODY CONTENT */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-gray-500 scale-100 animate-pulse">
                    <Trash2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-xs uppercase text-white font-bold tracking-widest">
                      Bag Is Vacant
                    </p>
                    <p className="font-sans text-xs text-gray-500 max-w-[200px] leading-relaxed mx-auto">
                      Access the collections catalog and secure allocation quantities.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-white hover:bg-[#ff3e3e] text-black hover:text-white font-mono text-[10px] tracking-widest uppercase font-bold py-2.5 px-6 rounded transition-all cursor-pointer"
                  >
                    Load Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart Items List */}
                  <div className="space-y-3.5" id="cart-items-scoller">
                    {cartItems.map((item, index) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                        className="bg-[#111] border border-[#1e1e1e] hover:border-gray-700 p-3 rounded flex gap-4 text-left transition-all relative"
                      >
                        <img
                          src={item.product.mainImage}
                          alt={item.product.name}
                          className="w-16 h-20 object-cover bg-neutral-900 rounded shrink-0 border border-[#222]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="space-y-0.5">
                            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-normal truncate pr-6">
                              {item.product.name}
                            </h4>
                            <div className="flex gap-2 text-[9px] font-mono text-[#888] uppercase">
                              <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                              <span>•</span>
                              <span>Color: <strong className="text-white">{item.selectedColor}</strong></span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#1a1a1a]">
                            {/* Quantity triggers */}
                            <div className="flex items-center bg-black/50 border border-[#333] rounded overflow-hidden">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.product.id,
                                    item.selectedSize,
                                    item.selectedColor,
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                                className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="font-mono text-xs px-2.5 font-bold">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.product.id,
                                    item.selectedSize,
                                    item.selectedColor,
                                    item.quantity + 1
                                  )
                                }
                                className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>

                            <span className="font-mono text-xs font-bold text-[#ff3e3e]">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Trash Button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                          className="absolute top-2 right-2 p-1 text-gray-500 hover:text-[#ff3e3e] transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* HIGH-CONVERTING UP-SELL COMPONENT */}
                  {!hasSocksInCart && socksProduct && (
                    <div className="bg-[#111] p-3 rounded border border-dashed border-[#ff3e3e]/40 text-left space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-mono text-[9px] text-[#ff3e3e] bg-[#ff3e3e]/10 py-0.5 px-2 rounded uppercase font-bold tracking-wider">
                            Perfect Pairing
                          </span>
                          <h5 className="font-mono text-xs font-bold text-white mt-1 uppercase">
                            {socksProduct.name}
                          </h5>
                          <p className="font-sans text-[10px] text-gray-500 font-normal leading-normal">
                            Heavy padded shock dispersion socks. Complete your streetwear look.
                          </p>
                        </div>
                        <span className="font-mono text-xs font-bold text-white">${socksProduct.price}</span>
                      </div>
                      <button
                        onClick={handleQuickAddSocks}
                        className="w-full bg-[#1e1e1e] hover:bg-[#ff3e3e] text-white hover:text-black font-mono text-[10px] font-bold py-2 rounded uppercase transition-all flex items-center justify-center gap-1 border border-[#2d2d2d] hover:border-transparent cursor-pointer"
                      >
                        + Add To Outfit Set
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 4. TOTAL BILLING CALCULATOR & CTA */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-[#1e1e1e] bg-[#0d0d0d] space-y-4">
                {/* Promo application block */}
                <form onSubmit={handleApplyPromoSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="ENTER PROMO CODE (e.g. AXIS10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full bg-[#141414] text-white placeholder-gray-600 pl-8 pr-3 py-2 border border-[#2d2d2d] rounded font-mono text-[10px] uppercase focus:outline-none focus:border-[#ff3e3e] tracking-wide"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#222] hover:bg-white text-white hover:text-black font-mono text-[9px] font-extrabold uppercase px-4 py-2 rounded transition-colors cursor-pointer"
                  >
                    Apply code
                  </button>
                </form>

                {/* Promo feedbacks */}
                {promoError && (
                  <p className="font-mono text-[9px] text-[#ff3e3e] text-left uppercase">
                    ⚠ {promoError} (USE: AXIS10)
                  </p>
                )}
                {promoSuccessMsg && (
                  <p className="font-mono text-[9px] text-[#24b47e] text-left uppercase font-bold">
                    ✓ {promoSuccessMsg}
                  </p>
                )}

                {/* Bill matrix */}
                <div className="space-y-2 font-mono text-[11px] text-gray-400 border-t border-[#1a1a1a] pt-3">
                  <div className="flex justify-between">
                    <span className="uppercase">Bag Subtotal</span>
                    <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountRate > 0 && (
                    <div className="flex justify-between text-[#24b47e]">
                      <span className="uppercase">Axis promo coupling (10%)</span>
                      <span>-${rawDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="uppercase">CONCIERGE EXPRESS COURIER</span>
                    <span className="text-white font-semibold">
                      {deliveryCost === 0 ? (
                        <span className="text-[#24b47e] font-bold">FREE</span>
                      ) : (
                        `$${deliveryCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-white border-t border-[#1a1a1a] pt-2 font-bold">
                    <span className="uppercase">Assembled Total</span>
                    <span className="text-[#ff3e3e] text-sm">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Main Action Line */}
                <div className="space-y-2">
                  <button
                    onClick={onCheckout}
                    className="w-full bg-[#ff3e3e] hover:bg-white text-white hover:text-black font-mono text-xs tracking-widest uppercase font-black py-4.5 rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-[#ff3e3e]/15 active:scale-95 border border-transparent"
                    id="cart-checkout-btn"
                  >
                    <CreditCard className="w-4 h-4" /> Secure Rapid Checkout
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[8px] font-mono text-gray-500 uppercase select-none">
                    <Shield className="w-3 h-3 text-[#ff3e3e]" />
                    <span>STEALTH 256-BIT CRYPTO PROTECTIONS ACTIVE</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
