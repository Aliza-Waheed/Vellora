import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer = () => {
    const navigate = useNavigate();
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        updateCartQuantity,
        removeFromCart,
        cartSubtotal,
        discountAmount,
        shippingFee,
        finalTotal,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon
    } = useShop();

    const [couponInput, setCouponInput] = React.useState('');

    if (!isCartOpen) return null;

    const freeShippingThreshold = 3000;
    const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
    const amountLeftForFreeShipping = freeShippingThreshold - cartSubtotal;

    const handleCouponSubmit = (e) => {
        e.preventDefault();
        if (couponInput.trim()) {
            applyCoupon(couponInput.trim());
            setCouponInput('');
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col justify-between border-l border-[#E8DFD8] animate-fade-in">

                    {/* Header */}
                    <div className="p-6 border-b border-[#E8DFD8] flex items-center justify-between bg-white">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-[#2C1810]" />
                            <h2 className="font-serif text-xl font-bold tracking-wide text-[#2C1810]">Your Shopping Bag</h2>
                            <span className="text-xs bg-[#FAF6F0] text-[#9E7B82] px-2 py-0.5 rounded-full border border-[#E8DFD8]">
                                {cart.length} {cart.length === 1 ? 'item' : 'items'}
                            </span>
                        </div>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Free Shipping Progress Indicator */}
                    <div className="bg-[#FAF6F0] px-6 py-3 border-b border-[#E8DFD8]">
                        {shippingFee === 0 ? (
                            <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                Congratulations! You qualified for FREE Express Shipping across Pakistan!
                            </p>
                        ) : (
                            <div>
                                <p className="text-xs text-[#2C1810] font-medium mb-1.5 flex items-center justify-between">
                                    <span>Add <strong className="text-[#9E7B82]">Rs. {amountLeftForFreeShipping.toLocaleString()}</strong> more for FREE Shipping!</span>
                                    <span className="text-[10px] text-gray-400">{progressPercent}%</span>
                                </p>
                                <div className="w-full h-1.5 bg-[#E8DFD8] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#BF953F] to-[#D4AF37] transition-all duration-500 rounded-full"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Cart Item List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="w-20 h-20 bg-[#FAF6F0] rounded-full flex items-center justify-center text-gray-300 mb-4 border border-[#E8DFD8]">
                                    <ShoppingBag className="w-10 h-10 text-[#9E7B82]" />
                                </div>
                                <h3 className="font-serif text-lg font-bold text-[#2C1810]">Your bag is empty</h3>
                                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                                    Discover our festive Pakistani dresses, glowing skincare, couture cosmetics & handcrafted jewelry.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsCartOpen(false);
                                        navigate('/shop');
                                    }}
                                    className="mt-6 bg-[#2C1810] text-[#FAF6F0] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#362219] transition"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.key} className="flex gap-4 p-3 bg-white rounded-xl border border-[#E8DFD8] shadow-xs">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-24 object-cover rounded-lg border border-[#E8DFD8]"
                                    />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start gap-1">
                                                <h4 className="font-serif font-bold text-sm text-[#2C1810] line-clamp-1">{item.name}</h4>
                                                <button
                                                    onClick={() => removeFromCart(item.key)}
                                                    className="text-gray-400 hover:text-red-500 transition p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-[#9E7B82] font-medium mt-0.5">Variant: {item.variant}</p>
                                            <p className="text-xs font-bold text-[#2C1810] mt-1">
                                                Rs. {item.price.toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F4EBE1]">
                                            <div className="flex items-center border border-[#E8DFD8] rounded-full bg-[#FAF6F0]">
                                                <button
                                                    onClick={() => updateCartQuantity(item.key, item.quantity - 1)}
                                                    className="p-1 text-gray-600 hover:text-black"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateCartQuantity(item.key, item.quantity + 1)}
                                                    className="p-1 text-gray-600 hover:text-black"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <span className="text-xs font-bold text-[#2C1810]">
                                                Rs. {(item.price * item.quantity).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer & Checkout Summary */}
                    {cart.length > 0 && (
                        <div className="p-6 border-t border-[#E8DFD8] bg-white space-y-4">

                            {/* Coupon Form */}
                            {appliedCoupon ? (
                                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg text-xs">
                                    <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                                        <Tag className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)</span>
                                    </div>
                                    <button onClick={removeCoupon} className="text-emerald-700 underline text-[11px]">Remove</button>
                                </div>
                            ) : (
                                <form onSubmit={handleCouponSubmit} className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Coupon Code (e.g. VELLORA10)"
                                            value={couponInput}
                                            onChange={(e) => setCouponInput(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 bg-[#FAF6F0] border border-[#E8DFD8] rounded-lg text-xs focus:outline-none focus:border-[#D4AF37]"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-[#2C1810] text-[#FAF6F0] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#362219] transition"
                                    >
                                        Apply
                                    </button>
                                </form>
                            )}
                            {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}

                            {/* Summary Calculation */}
                            <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-[#F4EBE1]">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-800">Rs. {cartSubtotal.toLocaleString()}</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-emerald-700 font-medium">
                                        <span>Discount</span>
                                        <span>- Rs. {discountAmount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span>Estimated Shipping</span>
                                    <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `Rs. ${shippingFee}`}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold text-[#2C1810] pt-2 border-t border-[#F4EBE1]">
                                    <span>Total Amount</span>
                                    <span className="text-[#BF953F]">Rs. {finalTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Checkout Action */}
                            <button
                                onClick={() => {
                                    setIsCartOpen(false);
                                    navigate('/checkout');
                                }}
                                className="w-full bg-gradient-to-r from-[#2C1810] to-[#362219] text-[#FAF6F0] py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-95 transition shadow-md flex items-center justify-center gap-2 group"
                            >
                                <span>Proceed to Checkout</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};
