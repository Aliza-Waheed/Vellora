import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Truck, CreditCard, ArrowRight, ShoppingBag, Tag, PhoneCall, Copy, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { handleImageError } from '../utils/imageHelper';

export const Checkout = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const {
        cart,
        clearCart,
        cartSubtotal,
        discountAmount,
        shippingFee,
        finalTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon
    } = useShop();

    // Form Fields
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: '',
        city: user?.city || 'Lahore',
        province: 'Punjab',
        notes: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createdOrder, setCreatedOrder] = useState(null);
    const [copiedOrderId, setCopiedOrderId] = useState(false);
    const [couponInput, setCouponInput] = useState('');

    if (cart.length === 0 && !createdOrder) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#2C1810]">Your Bag is Empty</h2>
                <p className="text-xs text-gray-500">Add items to your bag before proceeding to checkout.</p>
                <Link to="/shop" className="inline-block bg-[#2C1810] text-[#FAF6F0] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                    Return to Shop
                </Link>
            </div>
        );
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCouponSubmit = (e) => {
        e.preventDefault();
        if (couponInput.trim()) {
            applyCoupon(couponInput.trim());
            setCouponInput('');
        }
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.address) {
            alert('Please fill in your name, phone number, and delivery address.');
            return;
        }

        setIsSubmitting(true);
        try {
            const orderPayload = {
                customer: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    province: formData.province,
                    notes: formData.notes
                },
                items: cart,
                subtotal: cartSubtotal,
                shippingFee,
                discount: discountAmount,
                couponCode: appliedCoupon?.code || null,
                totalAmount: finalTotal,
                paymentMethod
            };

            const res = await api.createOrder(orderPayload);
            setCreatedOrder(res);
            clearCart();
        } catch (err) {
            alert(err.message || 'Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Order Confirmation View
    if (createdOrder) {
        const waText = encodeURIComponent(
            `Hello Vellora! I just placed order ${createdOrder.id} for Rs. ${createdOrder.totalAmount.toLocaleString()} (${createdOrder.paymentMethod}). Please confirm dispatch.`
        );
        const waUrl = `https://wa.me/923001234567?text=${waText}`;

        return (
            <div className="max-w-3xl mx-auto px-3 sm:px-6 py-8 sm:py-16 space-y-6 sm:space-y-8 animate-fade-in">
                <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8DFD8] shadow-xl text-center space-y-5 sm:space-y-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                        <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>

                    <div>
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Order Confirmed</span>
                        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] mt-1">Thank You For Your Order!</h1>
                        <p className="text-xs text-gray-600 mt-1.5 sm:mt-2">
                            Your order has been received and is being processed by our boutique fulfillment team.
                        </p>
                    </div>

                    {/* Order Reference Box */}
                    <div className="bg-[#FAF6F0] p-3.5 sm:p-4 rounded-2xl border border-[#E8DFD8] max-w-md mx-auto flex items-center justify-between">
                        <div className="text-left">
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Order Reference ID</span>
                            <p className="font-serif font-bold text-base sm:text-lg text-[#2C1810]">{createdOrder.id}</p>
                        </div>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(createdOrder.id);
                                setCopiedOrderId(true);
                                setTimeout(() => setCopiedOrderId(false), 3000);
                            }}
                            className="px-3 py-1.5 bg-white border border-[#E8DFD8] rounded-lg text-xs font-semibold text-[#2C1810] flex items-center gap-1.5 hover:bg-gray-50"
                        >
                            {copiedOrderId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedOrderId ? 'Copied' : 'Copy'}</span>
                        </button>
                    </div>

                    {/* Order Details Breakdown */}
                    <div className="text-left bg-white p-4 sm:p-6 rounded-2xl border border-[#E8DFD8] space-y-4">
                        <h3 className="font-serif font-bold text-base text-[#2C1810]">Order Summary</h3>
                        <div className="space-y-2">
                            {createdOrder.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-xs py-1 border-b border-[#F4EBE1]">
                                    <span className="truncate max-w-[200px] sm:max-w-none">{item.name} ({item.variant}) x {item.quantity}</span>
                                    <span className="font-semibold shrink-0">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 text-xs space-y-1 text-gray-600 border-t border-[#E8DFD8]">
                            <div className="flex justify-between">
                                <span>Payment Method:</span>
                                <span className="font-bold text-[#2C1810]">{createdOrder.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping Address:</span>
                                <span className="font-semibold text-[#2C1810] text-right truncate max-w-[200px] sm:max-w-none">{createdOrder.customer.address}, {createdOrder.customer.city}</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold text-[#2C1810] pt-2 border-t border-[#F4EBE1]">
                                <span>Total Amount:</span>
                                <span className="text-[#BF953F]">Rs. {createdOrder.totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp Notification Shortcut */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
                        <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-md w-full sm:w-auto"
                        >
                            <PhoneCall className="w-4 h-4" /> WhatsApp Dispatch Team
                        </a>
                        <Link
                            to={`/track-order?id=${createdOrder.id}`}
                            className="bg-[#2C1810] text-[#FAF6F0] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#362219] transition flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                            Track Order Status
                        </Link>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">

            {/* Header */}
            <div className="border-b border-[#E8DFD8] pb-4 sm:pb-6">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#9E7B82]">Secure Checkout</span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] mt-0.5">Shipping &amp; Payment Details</h1>
            </div>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">

                {/* Left Column: Contact & Address Form */}
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">

                    {/* Step 1: Customer Info */}
                    <div className="bg-white p-4 sm:p-8 rounded-2xl border border-[#E8DFD8] space-y-4">
                        <h3 className="font-serif font-bold text-lg text-[#2C1810] flex items-center gap-2">
                            <span className="w-6 h-6 bg-[#2C1810] text-[#D4AF37] rounded-full text-xs flex items-center justify-center font-bold">1</span>
                            Customer &amp; Shipping Address
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="e.g. Sana Tariq"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#FAF6F0] border border-[#E8DFD8] px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Mobile Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    placeholder="0300 1234567"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#FAF6F0] border border-[#E8DFD8] px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="sana@gmail.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#FAF6F0] border border-[#E8DFD8] px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Complete Street Address *</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    placeholder="House / Apartment #, Street, Sector / Block"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#FAF6F0] border border-[#E8DFD8] px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">City *</label>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#FAF6F0] border border-[#E8DFD8] px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                                >
                                    <option value="Lahore">Lahore</option>
                                    <option value="Karachi">Karachi</option>
                                    <option value="Islamabad">Islamabad</option>
                                    <option value="Rawalpindi">Rawalpindi</option>
                                    <option value="Faisalabad">Faisalabad</option>
                                    <option value="Multan">Multan</option>
                                    <option value="Peshawar">Peshawar</option>
                                    <option value="Quetta">Quetta</option>
                                    <option value="Sahiwal">Sahiwal</option>
                                    <option value="Gujranwala">Gujranwala</option>
                                    <option value="Sialkot">Sialkot</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Province *</label>
                                <select
                                    name="province"
                                    value={formData.province}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#FAF6F0] border border-[#E8DFD8] px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                                >
                                    <option value="Punjab">Punjab</option>
                                    <option value="Sindh">Sindh</option>
                                    <option value="KPK">Khyber Pakhtunkhwa</option>
                                    <option value="Balochistan">Balochistan</option>
                                    <option value="Gilgit">Gilgit-Baltistan</option>
                                    <option value="AJK">Azad Jammu &amp; Kashmir</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Payment Method */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFD8] space-y-4">
                        <h3 className="font-serif font-bold text-lg text-[#2C1810] flex items-center gap-2">
                            <span className="w-6 h-6 bg-[#2C1810] text-[#D4AF37] rounded-full text-xs flex items-center justify-center font-bold">2</span>
                            Select Payment Method
                        </h3>

                        <div className="space-y-3">
                            <label
                                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${paymentMethod === 'Cash on Delivery'
                                        ? 'border-[#D4AF37] bg-[#FAF6F0]'
                                        : 'border-[#E8DFD8] bg-white hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'Cash on Delivery'}
                                        onChange={() => setPaymentMethod('Cash on Delivery')}
                                        className="accent-[#D4AF37]"
                                    />
                                    <div>
                                        <h4 className="font-serif font-bold text-sm text-[#2C1810]">Cash on Delivery (COD)</h4>
                                        <p className="text-xs text-gray-500">Pay cash directly to courier rider upon delivery</p>
                                    </div>
                                </div>
                                <Truck className="w-5 h-5 text-[#2C1810]" />
                            </label>

                            <label
                                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${paymentMethod === 'EasyPaisa / JazzCash'
                                        ? 'border-[#D4AF37] bg-[#FAF6F0]'
                                        : 'border-[#E8DFD8] bg-white hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'EasyPaisa / JazzCash'}
                                        onChange={() => setPaymentMethod('EasyPaisa / JazzCash')}
                                        className="accent-[#D4AF37]"
                                    />
                                    <div>
                                        <h4 className="font-serif font-bold text-sm text-[#2C1810]">Easypaisa / JazzCash Mobile Wallet</h4>
                                        <p className="text-xs text-gray-500">Transfer payment via mobile app (Details sent via SMS/WhatsApp)</p>
                                    </div>
                                </div>
                                <CreditCard className="w-5 h-5 text-emerald-600" />
                            </label>

                            <label
                                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${paymentMethod === 'Bank Transfer'
                                        ? 'border-[#D4AF37] bg-[#FAF6F0]'
                                        : 'border-[#E8DFD8] bg-white hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'Bank Transfer'}
                                        onChange={() => setPaymentMethod('Bank Transfer')}
                                        className="accent-[#D4AF37]"
                                    />
                                    <div>
                                        <h4 className="font-serif font-bold text-sm text-[#2C1810]">Direct Online Bank Transfer</h4>
                                        <p className="text-xs text-gray-500">Meezan Bank / HBL / Alfalah account details provided upon confirmation</p>
                                    </div>
                                </div>
                                <CreditCard className="w-5 h-5 text-[#2C1810]" />
                            </label>
                        </div>
                    </div>

                </div>

                {/* Right Column: Order Review */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] space-y-4 shadow-sm sticky top-28">
                        <h3 className="font-serif font-bold text-base text-[#2C1810] border-b border-[#F4EBE1] pb-3">
                            Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                        </h3>

                        {/* Cart Items List */}
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                            {cart.map((item) => (
                                <div key={item.key} className="flex items-center gap-3 text-xs border-b border-[#F4EBE1] pb-2">
                                    <img src={item.image} alt="" onError={handleImageError} className="w-12 h-14 object-cover rounded border border-[#E8DFD8]" />
                                    <div className="flex-1">
                                        <h4 className="font-serif font-bold text-[#2C1810] line-clamp-1">{item.name}</h4>
                                        <p className="text-[11px] text-gray-500">{item.variant} x {item.quantity}</p>
                                        <span className="font-bold text-[#2C1810]">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Price Calculations */}
                        <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-[#E8DFD8]">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-semibold text-gray-800">Rs. {cartSubtotal.toLocaleString()}</span>
                            </div>
                            {discountAmount > 0 && (
                                <div className="flex justify-between text-emerald-700 font-medium">
                                    <span>Coupon Discount ({appliedCoupon?.code})</span>
                                    <span>- Rs. {discountAmount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span>Shipping Fee</span>
                                <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `Rs. ${shippingFee}`}</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold text-[#2C1810] pt-3 border-t border-[#F4EBE1]">
                                <span>Total Amount</span>
                                <span className="text-lg text-[#BF953F]">Rs. {finalTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-[#2C1810] to-[#362219] text-[#FAF6F0] py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-95 transition shadow-md flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? 'Placing Order...' : 'Confirm & Place Order'}
                            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                        </button>
                    </div>
                </div>

            </form>

        </div>
    );
};
