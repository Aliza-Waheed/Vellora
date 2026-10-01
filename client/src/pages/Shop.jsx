import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, Star, Heart, ShoppingBag, Eye, X, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Shop = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { products, categories, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();

    // Query Params
    const activeCategorySlug = searchParams.get('category') || '';
    const activeSubcategory = searchParams.get('sub') || '';
    const searchKeyword = searchParams.get('search') || '';
    const isNewQuery = searchParams.get('isNew') === 'true';

    // State Filters
    const [selectedCategory, setSelectedCategory] = useState(activeCategorySlug);
    const [selectedSubcategory, setSelectedSubcategory] = useState(activeSubcategory);
    const [priceRange, setPriceRange] = useState([0, 30000]);
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [sortBy, setSortBy] = useState('newest');
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [onlyInStock, setOnlyInStock] = useState(false);

    // Sync state if URL changes
    React.useEffect(() => {
        setSelectedCategory(activeCategorySlug);
        setSelectedSubcategory(activeSubcategory);
    }, [activeCategorySlug, activeSubcategory]);

    // Active Category Object & Subcategories
    const currentCategoryObj = useMemo(() => {
        return categories.find(c => c.slug === selectedCategory || c.id === selectedCategory);
    }, [categories, selectedCategory]);

    const availableSubcategories = currentCategoryObj?.subcategories || [];

    // Extract unique brands
    const allBrands = useMemo(() => {
        const brands = new Set(products.map(p => p.brand).filter(Boolean));
        return ['All', ...Array.from(brands)];
    }, [products]);

    // Filtered & Sorted Products calculation
    const filteredProducts = useMemo(() => {
        return products.filter((prod) => {
            // Category Filter
            if (selectedCategory && selectedCategory !== 'all') {
                const catObj = categories.find(c => c.slug === selectedCategory || c.id === selectedCategory);
                if (catObj && prod.categoryId !== catObj.id && prod.categoryId !== selectedCategory) {
                    return false;
                }
            }

            // Subcategory Filter
            if (selectedSubcategory) {
                if (prod.subcategory && prod.subcategory.toLowerCase() !== selectedSubcategory.toLowerCase()) {
                    return false;
                }
            }

            // Keyword Search
            if (searchKeyword) {
                const q = searchKeyword.toLowerCase();
                const matches = prod.name.toLowerCase().includes(q) ||
                    prod.brand.toLowerCase().includes(q) ||
                    (prod.subcategory && prod.subcategory.toLowerCase().includes(q)) ||
                    prod.description.toLowerCase().includes(q);
                if (!matches) return false;
            }

            // New Arrivals Filter
            if (isNewQuery && !prod.isNewArrival) return false;

            // Price Range Filter
            if (prod.price < priceRange[0] || prod.price > priceRange[1]) return false;

            // Brand Filter
            if (selectedBrand !== 'All' && prod.brand !== selectedBrand) return false;

            // Stock Filter
            if (onlyInStock && prod.stock <= 0) return false;

            return true;
        }).sort((a, b) => {
            if (sortBy === 'price_asc') return a.price - b.price;
            if (sortBy === 'price_desc') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
            return 0; // default newest
        });
    }, [products, categories, selectedCategory, selectedSubcategory, searchKeyword, isNewQuery, priceRange, selectedBrand, onlyInStock, sortBy]);

    const clearAllFilters = () => {
        setSelectedCategory('');
        setSelectedSubcategory('');
        setPriceRange([0, 30000]);
        setSelectedBrand('All');
        setSortBy('newest');
        setOnlyInStock(false);
        setSearchParams({});
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

            {/* Page Title & Breadcrumb */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DFD8] pb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#9E7B82]">Vellora Boutique</span>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810] mt-0.5">
                        {selectedSubcategory
                            ? selectedSubcategory
                            : selectedCategory
                                ? (categories.find(c => c.slug === selectedCategory)?.name || 'Collection')
                                : searchKeyword
                                    ? `Search Results for "${searchKeyword}"`
                                    : 'All Luxury Products'}
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">
                        Showing {filteredProducts.length} of {products.length} handcrafted items
                    </p>
                </div>

                {/* Mobile Filter Trigger & Sort Selector */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsFilterDrawerOpen(true)}
                        className="lg:hidden flex items-center gap-2 bg-white border border-[#E8DFD8] px-4 py-2.5 rounded-full text-xs font-semibold text-[#2C1810]"
                    >
                        <Filter className="w-4 h-4 text-[#D4AF37]" /> Filter & Refine
                    </button>

                    <div className="flex items-center gap-2 bg-white border border-[#E8DFD8] px-4 py-2 rounded-full text-xs font-medium">
                        <span className="text-gray-400 font-normal">Sort:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent focus:outline-none font-semibold text-[#2C1810]"
                        >
                            <option value="newest">Newest Arrivals</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="rating">Customer Rating</option>
                            <option value="discount">Biggest Discount</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Category Pills Navigation */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    <button
                        onClick={() => {
                            setSelectedCategory('');
                            setSelectedSubcategory('');
                            setSearchParams({});
                        }}
                        className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${!selectedCategory
                                ? 'bg-[#2C1810] text-[#D4AF37]'
                                : 'bg-white text-gray-700 border border-[#E8DFD8] hover:border-[#D4AF37]'
                            }`}
                    >
                        All Items
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setSelectedCategory(cat.slug);
                                setSelectedSubcategory('');
                                setSearchParams({ category: cat.slug });
                            }}
                            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${selectedCategory === cat.slug
                                    ? 'bg-[#2C1810] text-[#D4AF37]'
                                    : 'bg-white text-gray-700 border border-[#E8DFD8] hover:border-[#D4AF37]'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Subcategories Filter Pills Bar */}
                {availableSubcategories.length > 0 && (
                    <div className="bg-[#FAF6F0] p-3 rounded-2xl border border-[#E8DFD8] flex items-center gap-2 overflow-x-auto">
                        <span className="text-[11px] font-bold text-[#9E7B82] uppercase tracking-wider flex items-center gap-1 shrink-0 px-2">
                            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Sub-sections:
                        </span>
                        <button
                            onClick={() => {
                                setSelectedSubcategory('');
                                setSearchParams({ category: selectedCategory });
                            }}
                            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition shrink-0 ${!selectedSubcategory
                                    ? 'bg-[#D4AF37] text-[#2C1810]'
                                    : 'bg-white text-gray-600 border border-[#E8DFD8] hover:border-[#D4AF37]'
                                }`}
                        >
                            All {currentCategoryObj?.name}
                        </button>
                        {availableSubcategories.map((sub) => (
                            <button
                                key={sub}
                                onClick={() => {
                                    setSelectedSubcategory(sub);
                                    setSearchParams({ category: selectedCategory, sub });
                                }}
                                className={`px-3.5 py-1 rounded-full text-[11px] font-semibold transition shrink-0 ${selectedSubcategory === sub
                                        ? 'bg-[#2C1810] text-[#D4AF37]'
                                        : 'bg-white text-gray-700 border border-[#E8DFD8] hover:border-[#D4AF37]'
                                    }`}
                            >
                                {sub}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Desktop Sidebar Filter */}
                <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-[#E8DFD8] h-fit sticky top-28">
                    <div className="flex items-center justify-between pb-4 border-b border-[#F4EBE1]">
                        <h3 className="font-serif font-bold text-base text-[#2C1810] flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" /> Refine Search
                        </h3>
                        <button
                            onClick={clearAllFilters}
                            className="text-[11px] text-[#9E7B82] font-semibold hover:text-[#2C1810] underline"
                        >
                            Reset All
                        </button>
                    </div>

                    {/* Price Range Slider */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#2C1810] block">
                            Max Price: Rs. {priceRange[1].toLocaleString()}
                        </label>
                        <input
                            type="range"
                            min="1000"
                            max="30000"
                            step="500"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="w-full accent-[#D4AF37]"
                        />
                        <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                            <span>Rs. 1,000</span>
                            <span>Rs. 30,000</span>
                        </div>
                    </div>

                    {/* Brand Filter */}
                    <div className="space-y-2 pt-4 border-t border-[#F4EBE1]">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#2C1810] block">Brand</label>
                        <div className="space-y-1.5 max-h-40 overflow-y-auto">
                            {allBrands.map((b) => (
                                <label key={b} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-[#2C1810]">
                                    <input
                                        type="radio"
                                        name="brand"
                                        checked={selectedBrand === b}
                                        onChange={() => setSelectedBrand(b)}
                                        className="accent-[#D4AF37]"
                                    />
                                    <span>{b}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Stock Toggle */}
                    <div className="pt-4 border-t border-[#F4EBE1]">
                        <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={onlyInStock}
                                onChange={(e) => setOnlyInStock(e.target.checked)}
                                className="accent-[#D4AF37] rounded"
                            />
                            <span>In Stock Items Only</span>
                        </label>
                    </div>
                </aside>

                {/* Product Grid Area */}
                <div className="lg:col-span-3">
                    {filteredProducts.length === 0 ? (
                        <div className="bg-white p-12 rounded-2xl border border-[#E8DFD8] text-center space-y-4">
                            <div className="w-16 h-16 bg-[#FAF6F0] rounded-full flex items-center justify-center mx-auto text-gray-400">
                                <Search className="w-8 h-8 text-[#9E7B82]" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-[#2C1810]">No products match your filters</h3>
                            <p className="text-xs text-gray-500 max-w-sm mx-auto">
                                Try adjusting your price range, clearing keyword search queries or resetting category filters.
                            </p>
                            <button
                                onClick={clearAllFilters}
                                className="bg-[#2C1810] text-[#FAF6F0] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#362219] transition"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((prod) => {
                                const inWishlist = isInWishlist(prod.id);
                                return (
                                    <div
                                        key={prod.id}
                                        className="bg-white rounded-2xl border border-[#E8DFD8] overflow-hidden shadow-xs hover:shadow-xl transition duration-300 flex flex-col justify-between group"
                                    >
                                        <div className="relative h-72 overflow-hidden bg-[#FAF6F0]">
                                            <img
                                                src={prod.images?.[0]}
                                                alt={prod.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                                                {prod.subcategory && (
                                                    <span className="bg-[#2C1810] text-[#D4AF37] text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-xs">
                                                        {prod.subcategory}
                                                    </span>
                                                )}
                                                {prod.discountPercent > 0 && (
                                                    <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shadow-xs">
                                                        {prod.discountPercent}% OFF
                                                    </span>
                                                )}
                                            </div>

                                            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition duration-300">
                                                <button
                                                    onClick={() => toggleWishlist(prod)}
                                                    className={`p-2.5 rounded-full shadow-md backdrop-blur-xs transition ${inWishlist ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-700 hover:text-black'
                                                        }`}
                                                >
                                                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500' : ''}`} />
                                                </button>
                                                <button
                                                    onClick={() => setQuickViewProduct(prod)}
                                                    className="p-2.5 bg-white/90 text-gray-700 hover:text-black rounded-full shadow-md backdrop-blur-xs transition"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-4 flex-1 flex flex-col justify-between">
                                            <div>
                                                <span className="text-[10px] font-semibold text-[#9E7B82] uppercase tracking-wider">{prod.brand}</span>
                                                <h3
                                                    onClick={() => navigate(`/product/${prod.id}`)}
                                                    className="font-serif font-bold text-sm text-[#2C1810] mt-0.5 hover:text-[#D4AF37] cursor-pointer line-clamp-1 transition"
                                                >
                                                    {prod.name}
                                                </h3>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                    <span className="text-xs font-semibold">{prod.rating}</span>
                                                    <span className="text-[11px] text-gray-400">({prod.reviewCount})</span>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-3 border-t border-[#F4EBE1] flex items-center justify-between">
                                                <div>
                                                    <span className="text-sm font-bold text-[#2C1810]">
                                                        Rs. {prod.price.toLocaleString()}
                                                    </span>
                                                    {prod.originalPrice > prod.price && (
                                                        <span className="text-xs text-gray-400 line-through block text-[11px]">
                                                            Rs. {prod.originalPrice.toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => addToCart(prod)}
                                                    className="bg-[#FAF6F0] border border-[#E8DFD8] text-[#2C1810] hover:bg-[#2C1810] hover:text-[#FAF6F0] p-2.5 rounded-full transition shadow-xs"
                                                >
                                                    <ShoppingBag className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>

        </div>
    );
};
