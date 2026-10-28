import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, CheckCircle, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { handleImageError } from '../utils/imageHelper';

export const QuickViewModal = () => {
    const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useShop();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (!quickViewProduct) return null;

    const product = quickViewProduct;
    const inWishlist = isInWishlist(product.id);
    const selectedVariant = product.variants?.[selectedVariantIndex] || null;

    const handleAddToCart = () => {
        addToCart(product, selectedVariant, quantity);
        setQuickViewProduct(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div className="relative w-full max-w-3xl bg-[#FDFBF7] rounded-2xl shadow-2xl overflow-hidden border border-[#E8DFD8] flex flex-col md:flex-row max-h-[92vh] overflow-y-auto">

                {/* Close Button */}
                <button
                    onClick={() => setQuickViewProduct(null)}
                    className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 p-1.5 sm:p-2 bg-white/90 backdrop-blur-xs text-gray-500 hover:text-black rounded-full shadow-sm transition"
                    aria-label="Close"
                >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Gallery */}
                <div className="md:w-1/2 bg-white p-3 sm:p-4 flex flex-col items-center justify-between">
                    <div className="w-full h-52 sm:h-72 md:h-80 overflow-hidden rounded-xl bg-[#FAF6F0] border border-[#E8DFD8]">
                        <img
                            src={product.images?.[selectedImageIndex] || product.images?.[0]}
                            alt={product.name}
                            onError={handleImageError}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Thumbnails */}
                    {product.images && product.images.length > 1 && (
                        <div className="flex gap-2 mt-2 sm:mt-3 overflow-x-auto w-full justify-center">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImageIndex(idx)}
                                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition shrink-0 ${selectedImageIndex === idx ? 'border-[#D4AF37]' : 'border-transparent opacity-70'
                                        }`}
                                >
                                    <img src={img} alt="" onError={handleImageError} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details & Selectors */}
                <div className="md:w-1/2 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto bg-[#FDFBF7]">
                    <div>
                        <div className="flex items-center gap-2 text-xs text-[#9E7B82] font-semibold uppercase tracking-wider">
                            <span>{product.brand}</span>
                            <span>•</span>
                            <span className="text-[#2C1810]">{product.stitchedType || 'Luxury Product'}</span>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-[#2C1810] mt-1">{product.name}</h3>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs font-semibold text-[#2C1810]">{product.rating || 5.0}</span>
                            <span className="text-xs text-gray-400">({product.reviewCount || 12} reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3 mt-4">
                            <span className="text-2xl font-bold text-[#2C1810]">
                                Rs. {(product.price + (selectedVariant?.priceExtra || 0)).toLocaleString()}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                                <>
                                    <span className="text-sm text-gray-400 line-through">
                                        Rs. {product.originalPrice.toLocaleString()}
                                    </span>
                                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
                                        {product.discountPercent}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="text-xs text-gray-600 mt-3 leading-relaxed line-clamp-3">
                            {product.description}
                        </p>

                        {/* Fabric / Specs */}
                        {product.fabric && (
                            <p className="text-xs text-[#9E7B82] font-medium mt-2">
                                <strong>Fabric/Spec:</strong> {product.fabric}
                            </p>
                        )}

                        {/* Variants */}
                        {product.variants && product.variants.length > 0 && (
                            <div className="mt-4">
                                <label className="block text-xs font-bold text-[#2C1810] uppercase tracking-wider mb-2">
                                    Select {product.variants[0].type}:
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((v, idx) => (
                                        <button
                                            key={v.id || idx}
                                            onClick={() => setSelectedVariantIndex(idx)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${selectedVariantIndex === idx
                                                    ? 'bg-[#2C1810] text-[#FAF6F0] border-[#2C1810]'
                                                    : 'bg-white text-gray-700 border-[#E8DFD8] hover:border-[#D4AF37]'
                                                }`}
                                        >
                                            {v.value} {v.priceExtra > 0 ? `(+Rs. ${v.priceExtra})` : ''}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stock indicator */}
                        <p className="text-xs text-emerald-700 font-semibold mt-3 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> In Stock & Ready to Dispatch Across Pakistan
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-[#E8DFD8] space-y-3">
                        <div className="flex gap-3">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-gradient-to-r from-[#2C1810] to-[#362219] text-[#FAF6F0] py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-95 transition shadow-md flex items-center justify-center gap-2"
                            >
                                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" /> Add to Bag
                            </button>
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`p-3 rounded-full border transition ${inWishlist ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white text-gray-600 border-[#E8DFD8] hover:border-[#D4AF37]'
                                    }`}
                                aria-label="Wishlist"
                            >
                                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500' : ''}`} />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};
