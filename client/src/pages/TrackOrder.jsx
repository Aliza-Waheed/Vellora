import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, PackageCheck, Clock, Truck, CheckCircle2, MapPin, Phone, ShieldCheck, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export const TrackOrder = () => {
    const [searchParams] = useSearchParams();
    const initialOrderId = searchParams.get('id') || '';

    const [orderId, setOrderId] = useState(initialOrderId);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchOrder = async (idToSearch) => {
        if (!idToSearch) return;
        setLoading(true);
        setError('');
        try {
            const data = await api.trackOrder(idToSearch.trim());
            setOrder(data);
        } catch (err) {
            setError(err.message || 'No order found with provided Order ID');
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (initialOrderId) {
            fetchOrder(initialOrderId);
        }
    }, [initialOrderId]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchOrder(orderId);
    };

    // Order status timeline steps mapper
    const getStepState = (currentStatus, targetStatus) => {
        const statuses = ['Order Placed', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
        const currentIndex = statuses.indexOf(currentStatus);
        const targetIndex = statuses.indexOf(targetStatus);

        if (currentIndex === -1) {
            // Default fallback
            if (currentStatus === 'Shipped' && (targetStatus === 'Order Placed' || targetStatus === 'Confirmed' || targetStatus === 'Processing' || targetStatus === 'Shipped')) {
                return 'completed';
            }
        }

        if (targetIndex < currentIndex) return 'completed';
        if (targetIndex === currentIndex) return 'current';
        return 'upcoming';
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

            {/* Page Title */}
            <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#9E7B82]">Real-Time Logistics</span>
                <h1 className="font-serif text-3xl font-bold text-[#2C1810]">Track Your Order</h1>
                <p className="text-xs text-gray-500">
                    Enter your unique Vellora Order ID (e.g. VEL-89412) to view dispatch updates and courier delivery timeline.
                </p>
            </div>

            {/* Search Bar Form */}
            <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-3">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        required
                        placeholder="Enter Order Reference ID (e.g. VEL-89412)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-[#E8DFD8] rounded-full text-xs font-semibold focus:outline-none focus:border-[#D4AF37] shadow-xs"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#2C1810] text-[#FAF6F0] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#362219] transition shadow-md"
                >
                    {loading ? 'Searching...' : 'Track'}
                </button>
            </form>

            {error && (
                <div className="max-w-lg mx-auto bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Order Status Display Card */}
            {order && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFD8] shadow-lg space-y-8 animate-fade-in">

                    {/* Header Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F4EBE1] gap-4">
                        <div>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Order ID</span>
                            <h2 className="font-serif text-2xl font-bold text-[#2C1810]">{order.id}</h2>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                            </p>
                        </div>
                        <div className="text-left sm:text-right">
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Current Status</span>
                            <div className="mt-1">
                                <span className="inline-block bg-[#2C1810] text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {order.orderStatus}
                                </span>
                            </div>
                            <p className="text-[11px] text-[#9E7B82] font-semibold mt-1">Courier Tracking: {order.trackingNumber}</p>
                        </div>
                    </div>

                    {/* Visual Timeline Tracker */}
                    <div className="space-y-4">
                        <h3 className="font-serif font-bold text-base text-[#2C1810]">Delivery Status Progress</h3>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                            {[
                                { title: 'Order Placed', desc: 'Received by system', icon: Clock },
                                { title: 'Confirmed', desc: 'Inventory allocated', icon: CheckCircle2 },
                                { title: 'Shipped', desc: 'In courier transit', icon: Truck },
                                { title: 'Delivered', desc: 'Delivered to door', icon: MapPin }
                            ].map((step, idx) => {
                                const Icon = step.icon;
                                const state = getStepState(order.orderStatus, step.title);
                                const isCompleted = state === 'completed' || order.orderStatus === step.title;

                                return (
                                    <div
                                        key={idx}
                                        className={`p-4 rounded-2xl border text-center transition ${isCompleted
                                                ? 'bg-[#FAF6F0] border-[#D4AF37] text-[#2C1810]'
                                                : 'bg-gray-50 border-gray-200 text-gray-400'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${isCompleted ? 'bg-[#2C1810] text-[#D4AF37]' : 'bg-gray-200 text-gray-400'
                                            }`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-serif font-bold text-xs">{step.title}</h4>
                                        <p className="text-[10px] text-gray-500 mt-0.5">{step.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Order Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#F4EBE1]">
                        <div>
                            <h4 className="font-serif font-bold text-sm text-[#2C1810] mb-3">Items Ordered</h4>
                            <div className="space-y-2">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-xs py-1 border-b border-[#F4EBE1]">
                                        <span>{item.name} ({item.variant}) x {item.quantity}</span>
                                        <span className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-serif font-bold text-sm text-[#2C1810] mb-3">Delivery &amp; Payment</h4>
                            <div className="space-y-1.5 text-xs text-gray-600">
                                <p><strong>Customer:</strong> {order.customer.name}</p>
                                <p><strong>Phone:</strong> {order.customer.phone}</p>
                                <p><strong>Address:</strong> {order.customer.address}, {order.customer.city}</p>
                                <p><strong>Payment Method:</strong> {order.paymentMethod} ({order.paymentStatus})</p>
                                <p className="text-sm font-bold text-[#2C1810] pt-2 border-t border-[#F4EBE1]">
                                    Total: Rs. {order.totalAmount.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
};
