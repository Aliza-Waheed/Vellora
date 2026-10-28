import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { handleImageError } from '../utils/imageHelper';

export const Wishlist = () => {
    const navigate = useNavigate();
    const { wishlist, toggleWishlist, moveToCart } = useShop();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

            {/* Header */}
            <div className="border-b border-[#E8DFD8] pb-6">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#9E7B82]">Customer Favourites</span>
                <h1 className="font-serif text-3xl font-bold text-[#2C1810] mt-0.5">My Wishlist</h1>
                <p className="text-xs text-gray-500 mt-1">
                    {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
                </p>
            </div>

            {wishlist.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-[#E8DFD8] text-center space-y-4 max-w-lg mx-auto my-12">
                    <div className="w-16 h-16 bg-[#FAF6F0] rounded-full flex items-center justify-center mx-auto text-gray-300 border border-[#E8DFD8]">
                        <Heart className="w-8 h-8 text-[#9E7B82]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#2C1810]">Your wishlist is currently empty</h3>
                    <p className="text-xs text-gray-500">
                        Explore our luxury unstitched lawn, festive chiffon ensembles, and royal velvet dresses to save your favourites!
                    </p>
                    <Link
                        to="/shop"
                        className="inline-block bg-[#2C1810] text-[#FAF6F0] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#362219] transition"
                    >
                        Browse Catalogue
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {wishlist.map((prod) => (
                        <div
                            key={prod.id}
                            className="bg-white rounded-2xl border border-[#E8DFD8] overflow-hidden shadow-xs hover:shadow-lg transition duration-300 flex flex-col justify-between"
                        >
                            <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden bg-[#FAF6F0]">
                                <img
                                    src={prod.images?.[0]}
                                    alt={prod.name}
                                    onError={handleImageError}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => toggleWishlist(prod)}
                                    className="absolute top-3 right-3 p-2 bg-white/90 text-red-500 rounded-full shadow-md hover:bg-red-50 transition"
                                    aria-label="Remove"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <span className="text-[9px] sm:text-[10px] font-semibold text-[#9E7B82] uppercase tracking-wider">{prod.brand}</span>
                                    <h3
                                        onClick={() => navigate(`/product/${prod.id}`)}
                                        className="font-serif font-bold text-xs sm:text-sm text-[#2C1810] mt-0.5 hover:text-[#D4AF37] cursor-pointer line-clamp-1"
                                    >
                                        {prod.name}
                                    </h3>
                                    <span className="text-xs sm:text-sm font-bold text-[#2C1810] block mt-1 sm:mt-2">
                                        Rs. {prod.price.toLocaleString()}
                                    </span>
                                </div>

                                <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-[#F4EBE1]">
                                    <button
                                        onClick={() => moveToCart(prod)}
                                        className="w-full bg-[#2C1810] text-[#FAF6F0] py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-[#362219] transition flex items-center justify-center gap-1.5"
                                    >
                                        <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" /> <span className="hidden xs:inline">Move to</span> Bag
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};
