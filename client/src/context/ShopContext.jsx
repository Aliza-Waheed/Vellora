import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { initialProducts, initialCategories } from '../../../server/src/data/seedData';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [products, setProducts] = useState(initialProducts);
    const [categories, setCategories] = useState(initialCategories);
    const [loading, setLoading] = useState(true);

    // Cart & Wishlist state
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem('vellora_cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [wishlist, setWishlist] = useState(() => {
        try {
            const saved = localStorage.getItem('vellora_wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // UI state
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');
    const [toastMessage, setToastMessage] = useState(null);

    // Load products and categories from backend API
    const fetchStoreData = async () => {
        setLoading(true);
        try {
            const prodData = await api.getProducts();
            if (prodData && prodData.products) {
                setProducts(prodData.products);
            }
            const catData = await api.getCategories();
            if (catData && catData.length > 0) {
                setCategories(catData);
            }
        } catch (err) {
            console.warn('Backend API connection warning, using seed data:', err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStoreData();
    }, []);

    // Save Cart & Wishlist to localStorage
    useEffect(() => {
        localStorage.setItem('vellora_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('vellora_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Toast notification helper
    const showNotification = (message) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(null);
        }, 3500);
    };

    // Cart Functions
    const addToCart = (product, selectedVariant = null, quantity = 1) => {
        const variantLabel = selectedVariant ? (typeof selectedVariant === 'string' ? selectedVariant : selectedVariant.value) : (product.variants?.[0]?.value || 'Standard');
        const extraPrice = selectedVariant && typeof selectedVariant === 'object' ? (selectedVariant.priceExtra || 0) : 0;
        const finalPrice = product.price + extraPrice;
        const itemKey = `${product.id}-${variantLabel}`;

        setCart(prev => {
            const existingIndex = prev.findIndex(item => item.key === itemKey);
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex].quantity += quantity;
                return updated;
            } else {
                return [...prev, {
                    key: itemKey,
                    id: product.id,
                    name: product.name,
                    brand: product.brand,
                    variant: variantLabel,
                    price: finalPrice,
                    originalPrice: product.originalPrice,
                    image: product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
                    quantity
                }];
            }
        });

        showNotification(`Added "${product.name}" (${variantLabel}) to your bag!`);
        setIsCartOpen(true);
    };

    const updateCartQuantity = (key, newQty) => {
        if (newQty <= 0) {
            removeFromCart(key);
        } else {
            setCart(prev => prev.map(item => item.key === key ? { ...item, quantity: newQty } : item));
        }
    };

    const removeFromCart = (key) => {
        setCart(prev => prev.filter(item => item.key !== key));
    };

    const clearCart = () => {
        setCart([]);
        setAppliedCoupon(null);
    };

    // Wishlist Functions
    const toggleWishlist = (product) => {
        setWishlist(prev => {
            const exists = prev.some(item => item.id === product.id);
            if (exists) {
                showNotification(`Removed "${product.name}" from wishlist.`);
                return prev.filter(item => item.id !== product.id);
            } else {
                showNotification(`Saved "${product.name}" to your wishlist!`);
                return [...prev, product];
            }
        });
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
    };

    const moveToCart = (product) => {
        addToCart(product);
        setWishlist(prev => prev.filter(item => item.id !== product.id));
    };

    // Coupon helper
    const applyCoupon = async (code) => {
        setCouponError('');
        try {
            const sub = cartSubtotal;
            const res = await api.validateCoupon(code, sub);
            setAppliedCoupon({
                code: res.code,
                discountPercent: res.discountPercent
            });
            showNotification(`Coupon ${res.code} applied successfully!`);
        } catch (err) {
            setCouponError(err.message);
            setAppliedCoupon(null);
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
        setCouponError('');
    };

    // Totals calculations
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = appliedCoupon ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100) : 0;
    // Delivery Fee: Free over Rs 3,000, otherwise Rs 200
    const shippingFee = cartSubtotal > 0 ? (cartSubtotal >= 3000 ? 0 : 200) : 0;
    const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

    return (
        <ShopContext.Provider
            value={{
                products,
                categories,
                loading,
                cart,
                wishlist,
                isCartOpen,
                setIsCartOpen,
                quickViewProduct,
                setQuickViewProduct,
                searchQuery,
                setSearchQuery,
                appliedCoupon,
                couponError,
                toastMessage,
                fetchStoreData,
                addToCart,
                updateCartQuantity,
                removeFromCart,
                clearCart,
                toggleWishlist,
                isInWishlist,
                moveToCart,
                applyCoupon,
                removeCoupon,
                cartItemCount,
                cartSubtotal,
                discountAmount,
                shippingFee,
                finalTotal
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);
