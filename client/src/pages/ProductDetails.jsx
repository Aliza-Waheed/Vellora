import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, CheckCircle, ArrowRight, Share2, Send } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';
import { handleImageError } from '../utils/imageHelper';

export const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, addToCart, toggleWishlist, isInWishlist } = useShop();

    const [product, setProduct] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    // New review form state
    const [reviewName, setReviewName] = useState('');
    const [reviewCity, setReviewCity] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    useEffect(() => {
        const found = products.find(p => p.id === id || p.slug === id);
        if (found) {
            setProduct(found);
            setSelectedImageIndex(0);
            setSelectedVariantIndex(0);
        }
    }, [id, products]);

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#2C1810]">Product Not Found</h2>
                <p className="text-xs text-gray-500">The product you are looking for does not exist or has been removed.</p>
                <Link to="/shop" className="inline-block bg-[#2C1810] text-[#FAF6F0] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                    Return to Shop
                </Link>
            </div>
        );
    }

    const inWishlist = isInWishlist(product.id);
    const selectedVariant = product.variants?.[selectedVariantIndex] || null;
    const currentPrice = product.price + (selectedVariant?.priceExtra || 0);

    const relatedProducts = products
        .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product, selectedVariant, quantity);
    };

    const handleBuyNow = () => {
        addToCart(product, selectedVariant, quantity);
        navigate('/checkout');
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (reviewComment.trim()) {
            try {
                await api.submitReview({
                    productId: product.id,
                    customerName: reviewName || 'Verified Buyer',
                    customerCity: reviewCity || 'Pakistan',
                    rating: reviewRating,
                    comment: reviewComment
                });
                setReviewSubmitted(true);
                setReviewComment('');
                setTimeout(() => setReviewSubmitted(false), 5000);
            } catch (err) {
                console.error('Review submit failed:', err);
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-16">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-gray-500 overflow-x-auto whitespace-nowrap">
                <Link to="/" className="hover:text-[#2C1810]">Home</Link>
                <span>/</span>
                <Link to="/shop" className="hover:text-[#2C1810]">Shop</Link>
                <span>/</span>
                <span className="text-[#2C1810] font-semibold truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
            </nav>

            {/* Main Product Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                {/* Left Gallery Column */}
                <div className="space-y-4">
                    <div className="w-full h-[340px] sm:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden bg-white border border-[#E8DFD8] shadow-sm relative">
                        <img
                            src={product.images?.[selectedImageIndex] || product.images?.[0]}
                            alt={product.name}
                            onError={handleImageError}
                            className="w-full h-full object-cover"
                        />
                        {product.discountPercent > 0 && (
                            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-red-600 text-white text-xs font-bold uppercase px-2.5 py-1 rounded-full shadow-md">
                                {product.discountPercent}% OFF
                            </span>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {product.images && product.images.length > 1 && (
                        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImageIndex(idx)}
                                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition flex-shrink-0 ${selectedImageIndex === idx ? 'border-[#D4AF37] shadow-md' : 'border-[#E8DFD8] opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <img src={img} alt="" onError={handleImageError} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Info Column */}
                <div className="space-y-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9E7B82]">{product.brand}</span>
                            <button onClick={() => toggleWishlist(product)} className="text-gray-400 hover:text-red-500 transition p-1">
                                <Heart className={`w-6 h-6 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                            </button>
                        </div>

                        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#2C1810] mt-1">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mt-2 sm:mt-3">
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <span className="text-xs font-semibold text-[#2C1810]">{product.rating}</span>
                            <span className="text-xs text-gray-400">({product.reviewCount || 15} reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                            <span className="text-2xl sm:text-3xl font-bold text-[#2C1810]">
                                Rs. {currentPrice.toLocaleString()}
                            </span>
                            {product.originalPrice > product.price && (
                                <span className="text-xs sm:text-sm text-gray-400 line-through">
                                    Rs. {product.originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>

                        <p className="text-xs text-gray-600 mt-3 sm:mt-4 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Variant Selectors */}
                        {product.variants && product.variants.length > 0 && (
                            <div className="mt-5 sm:mt-6 space-y-2 sm:space-y-3 pt-4 border-t border-[#F4EBE1]">
                                <label className="block text-xs font-bold text-[#2C1810] uppercase tracking-wider">
                                    Select {product.variants[0].type}:
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((v, idx) => (
                                        <button
                                            key={v.id || idx}
                                            onClick={() => setSelectedVariantIndex(idx)}
                                            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold border transition ${selectedVariantIndex === idx
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

                        {/* Quantity Selector */}
                        <div className="mt-5 sm:mt-6 pt-4 border-t border-[#F4EBE1] flex items-center gap-4">
                            <label className="text-xs font-bold text-[#2C1810] uppercase tracking-wider">Quantity:</label>
                            <div className="flex items-center border border-[#E8DFD8] rounded-full bg-white px-3 py-1">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="text-gray-500 hover:text-black font-bold text-sm px-2"
                                >
                                    -
                                </button>
                                <span className="px-3 text-xs font-semibold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="text-gray-500 hover:text-black font-bold text-sm px-2"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 sm:mt-8 space-y-3">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-[#FAF6F0] border-2 border-[#2C1810] text-[#2C1810] py-3 sm:py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#2C1810] hover:text-[#FAF6F0] transition flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" /> Add to Bag
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="flex-1 bg-gradient-to-r from-[#2C1810] to-[#362219] text-[#FAF6F0] py-3 sm:py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-95 transition shadow-lg text-center"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#E8DFD8] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center text-xs text-gray-600">
                            <div className="flex sm:flex-col items-center justify-center gap-2 sm:gap-1 bg-[#FAF6F0]/60 p-2.5 rounded-xl sm:bg-transparent sm:p-0">
                                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                                <span className="font-semibold text-[11px]">Free Shipping &gt; Rs. 3,000</span>
                            </div>
                            <div className="flex sm:flex-col items-center justify-center gap-2 sm:gap-1 bg-[#FAF6F0]/60 p-2.5 rounded-xl sm:bg-transparent sm:p-0">
                                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                                <span className="font-semibold text-[11px]">100% Authentic Quality</span>
                            </div>
                            <div className="flex sm:flex-col items-center justify-center gap-2 sm:gap-1 bg-[#FAF6F0]/60 p-2.5 rounded-xl sm:bg-transparent sm:p-0">
                                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                                <span className="font-semibold text-[11px]">7-Day Exchange</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Detailed Tabs: Description, Specs/Ingredients, Reviews */}
            <div className="bg-white rounded-2xl border border-[#E8DFD8] p-4 sm:p-8 space-y-6">
                <div className="flex border-b border-[#E8DFD8] gap-4 sm:gap-8 overflow-x-auto whitespace-nowrap scrollbar-none pb-1">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${activeTab === 'description' ? 'border-[#D4AF37] text-[#2C1810]' : 'border-transparent text-gray-400'
                            }`}
                    >
                        Product Description
                    </button>
                    <button
                        onClick={() => setActiveTab('specs')}
                        className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${activeTab === 'specs' ? 'border-[#D4AF37] text-[#2C1810]' : 'border-transparent text-gray-400'
                            }`}
                    >
                        Fabric &amp; Care Details
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${activeTab === 'reviews' ? 'border-[#D4AF37] text-[#2C1810]' : 'border-transparent text-gray-400'
                            }`}
                    >
                        Reviews &amp; Ratings
                    </button>
                </div>

                {activeTab === 'description' && (
                    <div className="space-y-4 text-xs text-gray-700 leading-relaxed max-w-3xl">
                        <p>{product.description}</p>
                        <p>Designed and crafted with royal Pakistani boutique craftsmanship. Every item undergoes rigorous quality checking before dispatch.</p>
                    </div>
                )}

                {activeTab === 'specs' && (
                    <div className="space-y-2 text-xs text-gray-700 max-w-md">
                        <p><strong>Fabric / Material:</strong> {product.fabric || 'Pure Luxury Blend'}</p>
                        <p><strong>Stitching:</strong> {product.stitchedType || 'Unstitched / Stitched Custom'}</p>
                        <p><strong>Care Instructions:</strong> Dry clean recommended for heavy embroidered chiffon, festive organza &amp; royal velvet ensembles.</p>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-8 max-w-3xl">
                        {/* Submit Review Form */}
                        <form onSubmit={handleReviewSubmit} className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E8DFD8] space-y-3">
                            <h4 className="font-serif font-bold text-sm text-[#2C1810]">Write a Customer Review</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    value={reviewName}
                                    onChange={(e) => setReviewName(e.target.value)}
                                    className="bg-white px-3 py-2 border rounded-lg text-xs"
                                />
                                <input
                                    type="text"
                                    placeholder="Your City (e.g. Lahore, Karachi)"
                                    value={reviewCity}
                                    onChange={(e) => setReviewCity(e.target.value)}
                                    className="bg-white px-3 py-2 border rounded-lg text-xs"
                                />
                            </div>
                            <textarea
                                placeholder="Share your feedback about fabric quality, fit, or beauty results..."
                                required
                                rows={3}
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                                className="w-full bg-white p-3 border rounded-lg text-xs"
                            />
                            <button
                                type="submit"
                                className="bg-[#2C1810] text-[#FAF6F0] px-5 py-2 rounded-full text-xs font-bold hover:bg-[#362219]"
                            >
                                Submit Review
                            </button>
                            {reviewSubmitted && <p className="text-xs text-emerald-600 font-semibold">✦ Review submitted successfully!</p>}
                        </form>
                    </div>
                )}
            </div>

        </div>
    );
};
