import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';

export const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 4000);
        }
    };

    return (
        <footer className="bg-[#2C1810] text-[#FAF6F0] pt-16 pb-8 border-t border-[#D4AF37]/30">

            {/* Value Proposition Badges */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12 border-b border-[#362219]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-3.5 sm:gap-4">
                        <div className="p-3 bg-[#362219] text-[#D4AF37] rounded-full border border-[#D4AF37]/20">
                            <Truck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-serif font-bold text-sm tracking-wide text-[#FAF6F0]">Nationwide Express</h4>
                            <p className="text-xs text-gray-400 mt-0.5">Free delivery over Rs. 3,000</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-4">
                        <div className="p-3 bg-[#362219] text-[#D4AF37] rounded-full border border-[#D4AF37]/20">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-serif font-bold text-sm tracking-wide text-[#FAF6F0]">100% Authentic Guarantee</h4>
                            <p className="text-xs text-gray-400 mt-0.5">Pure fabrics & organic beauty</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-4">
                        <div className="p-3 bg-[#362219] text-[#D4AF37] rounded-full border border-[#D4AF37]/20">
                            <RefreshCw className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-serif font-bold text-sm tracking-wide text-[#FAF6F0]">Easy Returns & Exchanges</h4>
                            <p className="text-xs text-gray-400 mt-0.5">7-day hassle-free exchange policy</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-4">
                        <div className="p-3 bg-[#362219] text-[#D4AF37] rounded-full border border-[#D4AF37]/20">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-serif font-bold text-sm tracking-wide text-[#FAF6F0]">Cash on Delivery</h4>
                            <p className="text-xs text-gray-400 mt-0.5">Pay safely at your doorstep</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Links */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link to="/" className="inline-block">
                            <span className="font-serif text-3xl tracking-[0.2em] font-bold text-[#FAF6F0]">VELLORA</span>
                            <span className="block text-[9px] uppercase tracking-[0.4em] text-[#D4AF37]">Luxury Pakistani Boutique</span>
                        </Link>
                        <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
                            Vellora is Pakistan’s premier destination for handcrafted luxury unstitched lawn, festive chiffon ensembles, regal velvet suits, and designer stitched pret.
                        </p>

                        <div className="space-y-2 pt-2 text-xs text-gray-300">
                            <p className="flex items-center gap-2.5">
                                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                                Gulberg III, Main Boulevard, Lahore, Pakistan
                            </p>
                            <p className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-[#D4AF37]" />
                                +92 300 1234567 / +92 42 35789000
                            </p>
                            <p className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-[#D4AF37]" />
                                support@vellora.pk
                            </p>
                        </div>
                    </div>

                    {/* Quick Categories */}
                    <div>
                        <h4 className="font-serif font-bold text-sm tracking-widest uppercase text-[#D4AF37] mb-4">Shop Collections</h4>
                        <ul className="space-y-2.5 text-xs text-gray-300">
                            <li><Link to="/shop?category=chiffon-luxury" className="hover:text-[#D4AF37] transition">Chiffon Luxury Dress</Link></li>
                            <li><Link to="/shop?category=festive-formal" className="hover:text-[#D4AF37] transition">Festive & Formal Wear</Link></li>
                            <li><Link to="/shop?category=velvet-edition" className="hover:text-[#D4AF37] transition">Royal Velvet Edition</Link></li>
                            <li><Link to="/shop?category=ready-to-wear" className="hover:text-[#D4AF37] transition">Ready-to-Wear Stitched</Link></li>
                            <li><Link to="/shop?category=luxury-dresses" className="hover:text-[#D4AF37] transition">Designer Luxury Suits</Link></li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h4 className="font-serif font-bold text-sm tracking-widest uppercase text-[#D4AF37] mb-4">Customer Care</h4>
                        <ul className="space-y-2.5 text-xs text-gray-300">
                            <li><Link to="/track-order" className="hover:text-[#D4AF37] transition font-semibold text-[#FAF6F0]">Track Your Order</Link></li>
                            <li><Link to="/account" className="hover:text-[#D4AF37] transition">My Account & Orders</Link></li>
                            <li><Link to="/wishlist" className="hover:text-[#D4AF37] transition">My Wishlist</Link></li>
                            <li><a href="#faq" className="hover:text-[#D4AF37] transition">Shipping Policy & Rates</a></li>
                            <li><a href="#faq" className="hover:text-[#D4AF37] transition">Returns & Exchange Form</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Signup */}
                    <div>
                        <h4 className="font-serif font-bold text-sm tracking-widest uppercase text-[#D4AF37] mb-4">Join The Club</h4>
                        <p className="text-xs text-gray-300 mb-3">
                            Subscribe to receive private sale invitations, festive catalog releases, and 10% off your first luxury order.
                        </p>

                        <form onSubmit={handleSubscribe} className="space-y-2">
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#362219] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#D4AF37] text-[#2C1810] p-1.5 rounded-md hover:bg-[#b8860b] transition"
                                    aria-label="Subscribe"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            {subscribed && (
                                <p className="text-[11px] text-emerald-400 font-medium">✦ Thank you for subscribing to Vellora!</p>
                            )}
                        </form>
                    </div>

                </div>
            </div>

            {/* Bottom Bar & Payment Providers */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-[#362219] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400 text-center md:text-left">
                <p>© 2026 VELLORA Store. All rights reserved. Crafted for Pakistani Luxury Shopping.</p>

                {/* Payment Badges */}
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold w-full text-center sm:w-auto sm:text-left">Accepted:</span>
                    <span className="bg-[#362219] px-2 py-1 rounded text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/20">Cash on Delivery</span>
                    <span className="bg-[#362219] px-2 py-1 rounded text-[10px] font-bold text-[#FAF6F0] border border-gray-700">Bank Transfer</span>
                    <span className="bg-emerald-950 px-2 py-1 rounded text-[10px] font-bold text-emerald-400 border border-emerald-800">Easypaisa</span>
                    <span className="bg-red-950 px-2 py-1 rounded text-[10px] font-bold text-red-400 border border-red-800">JazzCash</span>
                    <span className="bg-[#362219] px-2 py-1 rounded text-[10px] font-bold text-gray-300 border border-gray-700">Visa / MC</span>
                </div>
            </div>

        </footer>
    );
};
