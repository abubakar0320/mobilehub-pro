"use client";

import { useState } from "react";
import { ArrowRight, Check, X, Shield, CreditCard, Box, ChevronLeft, Ticket } from "lucide-react";
import { PhoneData } from "@/lib/phones";
import { motion, AnimatePresence } from "framer-motion";

interface CheckoutButtonProps {
  phone: PhoneData | any;
  variant?: "default" | "mini";
}

export function CheckoutButton({ phone, variant = "default" }: CheckoutButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const pricePkr = phone.price.usd * 280;
  const finalPrice = pricePkr - discount;

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    paymentMethod: "card",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "CLAUDE") {
      setDiscount(pricePkr * 0.15);
    } else {
      alert("Invalid code. Try 'CLAUDE'");
    }
  };

  const handleNext = () => {
    if (step === 1 && (!formData.email || !formData.name || !formData.address)) {
      alert("Please complete shipping details.");
      return;
    }
    setStep(2);
  };

  const handleCheckout = async () => {
    if (formData.paymentMethod === 'card' && (!formData.cardNumber || !formData.expiry)) {
      alert("Please provide card details.");
      return;
    }
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep(3);
  };

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
      setDiscount(0);
      setPromoCode("");
      setFormData({ email: "", name: "", address: "", city: "", paymentMethod: "card", cardNumber: "", expiry: "", cvc: "" });
    }, 400);
  };

  return (
    <>
      {variant === "default" ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="flex-1 relative overflow-hidden group rounded-full h-14 bg-[#0f172a] hover:bg-[#1e293b] text-white font-medium tracking-tight transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-0.5"
        >
          <span>Purchase {phone.model || phone.shortName}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="flex-1 text-xs bg-[#0f172a] hover:bg-[#1e293b] text-white text-center rounded-lg py-1.5 transition-all font-medium tracking-wide"
        >
          Buy Now
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-6 p-0">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={step === 3 ? close : undefined}
              className="absolute inset-0 bg-[#0f172a]/20 backdrop-blur-sm"
            />
            
            {/* Main Modal Container */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[900px] bg-white sm:rounded-[24px] rounded-none shadow-2xl overflow-hidden flex flex-col sm:flex-row h-full sm:h-auto min-h-[600px] z-10"
            >
              
              {/* LEFT SIDE: PRODUCT SUMMARY (Stripe-like sidebar) */}
              <div className="w-full sm:w-[45%] bg-[#f8fafc] p-8 sm:p-10 border-r border-slate-100 flex flex-col">
                <div className="mb-8">
                  <div className="h-10 w-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-6">
                    <Box className="w-5 h-5 text-slate-700" />
                  </div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Total Due</h3>
                  <div className="text-4xl font-semibold tracking-tighter text-slate-900">
                    Rs. {finalPrice.toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-4 items-center mb-8">
                  <div className="h-16 w-16 bg-white border border-slate-200 rounded-xl p-2 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={phone.images.main} alt={phone.model} className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{phone.model}</div>
                    <div className="text-sm text-slate-500">{phone.specs.storage}GB • {phone.colors[0]}</div>
                  </div>
                  <div className="ml-auto font-medium text-slate-900">
                    Rs. {pricePkr.toLocaleString()}
                  </div>
                </div>

                {/* Subtotals */}
                <div className="space-y-3 text-sm border-t border-slate-200/60 pt-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900">Rs. {pricePkr.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-medium text-slate-900">Complimentary</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span className="font-medium">- Rs. {discount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Promo Code Minimal */}
                {step < 3 && (
                  <div className="mt-8 pt-6 border-t border-slate-200/60 relative">
                    <div className="absolute left-3 top-9 text-slate-400">
                      <Ticket className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Add promotion code"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      onBlur={promoCode ? handleApplyPromo : undefined}
                      className="w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all placeholder:text-slate-400"
                    />
                  </div>
                )}
                
                <div className="mt-auto pt-8 flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Secure SSL Encrypted Checkout</span>
                </div>
              </div>

              {/* RIGHT SIDE: FORMS */}
              <div className="w-full sm:w-[55%] bg-white p-8 sm:p-10 flex flex-col relative overflow-y-auto">
                {step !== 3 && (
                  <button onClick={close} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                )}

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }}
                      className="flex-1 flex flex-col"
                    >
                      <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-6">Contact & Shipping</h2>
                      
                      <div className="space-y-5 flex-1">
                        <div>
                          <label className="text-[13px] font-medium text-slate-600 mb-1.5 block">Email</label>
                          <input 
                            type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-sm"
                            placeholder="you@example.com"
                          />
                        </div>
                        
                        <div className="pt-2 border-t border-slate-100">
                          <h3 className="text-sm font-medium text-slate-800 mb-4 mt-2">Shipping Address</h3>
                          <div className="space-y-4">
                            <div>
                              <input 
                                type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-sm"
                                placeholder="Full Name"
                              />
                            </div>
                            <div>
                              <input 
                                type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-sm"
                                placeholder="Address Line 1"
                              />
                            </div>
                            <div>
                              <input 
                                type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-sm"
                                placeholder="City"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={handleNext}
                        className="w-full mt-8 bg-[#0f172a] hover:bg-[#1e293b] text-white h-12 rounded-xl text-sm font-medium tracking-wide transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        Continue to Payment
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <button onClick={() => setStep(1)} className="p-1 -ml-1 text-slate-400 hover:text-slate-800 transition-colors">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Payment</h2>
                      </div>
                      
                      <div className="space-y-6 flex-1">
                        {/* Minimal Tabs */}
                        <div className="flex p-1 bg-slate-100/80 rounded-lg gap-1">
                          <button 
                            onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.paymentMethod === 'card' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            Card
                          </button>
                          <button 
                            onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.paymentMethod === 'cod' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            Cash on Delivery
                          </button>
                        </div>

                        {formData.paymentMethod === 'card' && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-2">
                            <div>
                              <label className="text-[13px] font-medium text-slate-600 mb-1.5 block">Card details</label>
                              <div className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm focus-within:border-slate-400 focus-within:ring-1 focus-within:ring-slate-400 transition-all">
                                <div className="flex items-center px-4 py-3 border-b border-slate-100">
                                  <CreditCard className="w-4 h-4 text-slate-400 mr-3" />
                                  <input 
                                    type="text" placeholder="Card number" value={formData.cardNumber} onChange={e => setFormData({...formData, cardNumber: e.target.value})}
                                    className="w-full text-sm focus:outline-none placeholder:text-slate-300"
                                  />
                                </div>
                                <div className="flex">
                                  <input 
                                    type="text" placeholder="MM / YY" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})}
                                    className="w-1/2 px-4 py-3 text-sm border-r border-slate-100 focus:outline-none placeholder:text-slate-300"
                                  />
                                  <input 
                                    type="text" placeholder="CVC" value={formData.cvc} onChange={e => setFormData({...formData, cvc: e.target.value})}
                                    className="w-1/2 px-4 py-3 text-sm focus:outline-none placeholder:text-slate-300"
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {formData.paymentMethod === 'cod' && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                            <p className="text-sm text-slate-600 leading-relaxed">
                              You have selected <strong>Cash on Delivery</strong>. You will pay Rs. {finalPrice.toLocaleString()} in cash when the courier delivers your {phone.model}.
                            </p>
                          </motion.div>
                        )}
                      </div>

                      <button 
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        className="w-full mt-8 bg-[#0f172a] hover:bg-[#1e293b] text-white h-12 rounded-xl text-sm font-medium tracking-wide transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                      >
                        {isProcessing ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Processing...
                          </motion.div>
                        ) : (
                          `Pay Rs. ${finalPrice.toLocaleString()}`
                        )}
                      </button>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1 flex flex-col items-center justify-center text-center px-4"
                    >
                      <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                        className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-xl"
                      >
                        <Check className="w-8 h-8 text-white" strokeWidth={3} />
                      </motion.div>
                      
                      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-2">Payment successful</h2>
                      <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                        Thank you! Your order <strong>#{Math.floor(Math.random() * 899999 + 100000)}</strong> has been confirmed. A receipt has been sent to {formData.email || 'your email'}.
                      </p>

                      <button 
                        onClick={close}
                        className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-sm font-medium transition-colors"
                      >
                        Return to store
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
