import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Star, Heart, ShoppingBag, Eye, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';

export const Home = () => {
    const navigate = useNavigate();
    const { products, categories, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();

    const [banners, setBanners] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [activeBannerIndex, setActiveBannerIndex] = useState(0);

    useEffect(() => {
        const fetchHomeContent = async () => {
            try {
                const [banData, revData] = await Promise.all([
                    api.getBanners(),
                    api.getReviews()
                ]);
                setBanners(banData || []);
                setReviews(revData || []);
            } catch (err) {
                console.error('Error fetching home content:', err);
            }
        };

        fetchHomeContent();
    }, []);

    const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
    const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

    // Default clean hero banner fallback if no custom banners are added yet
    const displayBanners = banners.length > 0 ? banners : [
        {
            id: 'default-ban',
            title: 'Welcome to Vellora Boutique',
            subtitle: 'Pakistan’s premier destination for handcrafted luxury unstitched lawn, botanical skincare, and royal Kundan jewelry.',
            buttonText: 'Explore Boutique Catalogue',
            link: '/shop',
            imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=80'
        }
    ];

    const prevBanner = () => {
        setActiveBannerIndex(prev => (prev === 0 ? displayBanners.length - 1 : prev - 1));
    };

    const nextBanner = () => {
        setActiveBannerIndex(prev => (prev === displayBanners.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="space-y-16 pb-16">

            {/* Hero Banner Slider */}
            <section className="relative overflow-hidden bg-[#2C1810]">
                <div className="relative h-[480px] sm:h-[560px] lg:h-[620px]">
                    {displayBanners.map((banner, idx) => (
                        <div
                            key={banner.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeBannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                                }`}
                        >
                            <img
                                src={banner.imageUrl}
                                alt={banner.title}
                                className="w-full h-full object-cover object-center filter brightness-[0.7]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                    <div className="max-w-xl text-white space-y-4 animate-fade-in">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                                            <Sparkles className="w-3.5 h-3.5" /> Festive Collection 2026
                                        </span>
                                        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#FAF6F0]">
                                            {banner.title}
                                        </h1>
                                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
                                            {banner.subtitle}
                                        </p>
                                        <div className="pt-4 flex flex-wrap gap-4">
                                            <Link
                                                to={banner.link || '/shop'}
                                                className="bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#2C1810] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:brightness-110 transition shadow-lg flex items-center gap-2 group"
                                            >
                                                <span>{banner.buttonText || 'Shop Collection'}</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                                            </Link>
                                            <Link
                                                to="/admin"
                                                className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition flex items-center gap-1.5"
                                            >
                                                <Plus className="w-4 h-4 text-[#D4AF37]" /> Add Products via Admin
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Banner Controls */}
                    {displayBanners.length > 1 && (
                        <div className="absolute bottom-6 right-6 z-20 flex gap-2">
                            <button
                                onClick={prevBanner}
                                className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextBanner}
                                className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Categories Showcase Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#9E7B82]">Curated Categories</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810] mt-1">Shop By Boutique Collection</h2>
                    <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-3"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => navigate(`/shop?category=${cat.slug}`)}
                            className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md border border-[#E8DFD8] transition duration-500 hover:-translate-y-1.5 hover:shadow-xl"
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
                                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                                    {cat.subcategories?.length || 5} Subcategories
                                </span>
                                <h3 className="font-serif text-xl font-bold mt-0.5 group-hover:text-[#D4AF37] transition">
                                    {cat.name}
                                </h3>
                                <p className="text-xs text-gray-300 mt-1 line-clamp-2 font-light">
                                    {cat.description}
                                </p>
                                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#FAF6F0] group-hover:text-[#D4AF37]">
                                    <span>Explore Collection</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* New Arrivals Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#9E7B82]">Catalogue</span>
                        <h2 className="font-serif text-3xl font-bold text-[#2C1810] mt-0.5">Featured Products</h2>
                    </div>
                    <Link
                        to="/shop"
                        className="text-xs font-bold uppercase tracking-wider text-[#2C1810] hover:text-[#D4AF37] flex items-center gap-1 group"
                    >
                        <span>View Full Shop</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </Link>
                </div>

                {products.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl border border-[#E8DFD8] text-center space-y-4">
                        <h3 className="font-serif text-xl font-bold text-[#2C1810]">Catalog is Ready for Your Products</h3>
                        <p className="text-xs text-gray-500 max-w-md mx-auto">
                            All dummy data has been removed. You can now use the Admin Dashboard to upload real boutique dresses, skincare, cosmetics, and jewelry!
                        </p>
                        <Link
                            to="/admin"
                            className="inline-block bg-[#2C1810] text-[#FAF6F0] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#362219] transition"
                        >
                            Open Admin Dashboard
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.slice(0, 4).map((prod) => {
                            const inWishlist = isInWishlist(prod.id);
                            return (
                                <div
                                    key={prod.id}
                                    className="bg-white rounded-2xl border border-[#E8DFD8] overflow-hidden shadow-xs hover:shadow-lg transition duration-300 flex flex-col justify-between group"
                                >
                                    <div className="relative h-72 overflow-hidden bg-[#FAF6F0]">
                                        <img
                                            src={prod.images?.[0]}
                                            alt={prod.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <span className="text-[10px] font-semibold text-[#9E7B82] uppercase tracking-wider">{prod.brand}</span>
                                            <h3
                                                onClick={() => navigate(`/product/${prod.id}`)}
                                                className="font-serif font-bold text-sm text-[#2C1810] mt-0.5 hover:text-[#D4AF37] cursor-pointer line-clamp-1"
                                            >
                                                {prod.name}
                                            </h3>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-[#F4EBE1] flex items-center justify-between">
                                            <span className="text-sm font-bold text-[#2C1810]">
                                                Rs. {prod.price.toLocaleString()}
                                            </span>
                                            <button
                                                onClick={() => addToCart(prod)}
                                                className="bg-[#2C1810] text-[#FAF6F0] p-2 rounded-full"
                                            >
                                                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Promotional Banner */}
            <section className="bg-gradient-to-r from-[#2C1810] via-[#362219] to-[#2C1810] text-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8 my-12 border-y border-[#D4AF37]/30">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl space-y-4 text-center lg:text-left">
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                            ✦ Vellora Boutique Offer ✦
                        </span>
                        <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
                            Enjoy 10% OFF Your First Order
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                            Use code <strong className="text-[#D4AF37] font-bold">WELCOME10</strong> at checkout across all boutique categories.
                        </p>
                        <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
                            <Link
                                to="/shop"
                                className="bg-[#D4AF37] text-[#2C1810] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#b8860b] transition shadow-lg"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>

                    <div className="relative w-full max-w-md h-72 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/40">
                        <img
                            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
                            alt="Promotional Showcase"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                            <p className="font-serif text-lg font-bold text-white">Vellora Pakistani Boutique</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};
