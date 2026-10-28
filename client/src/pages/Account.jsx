import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Package, MapPin, LogOut, Clock, Eye, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const Account = () => {
    const navigate = useNavigate();
    const { user, logout, isAdmin } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchCustomerOrders = async () => {
            try {
                const data = await api.getOrders(null, user.email);
                setOrders(data);
            } catch (err) {
                console.error('Failed to load orders:', err);
            } finally {
                setLoadingOrders(false);
            }
        };

        fetchCustomerOrders();
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFD8] pb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#9E7B82]">Customer Portal</span>
                    <h1 className="font-serif text-3xl font-bold text-[#2C1810] mt-0.5">Welcome, {user.name}</h1>
                    <p className="text-xs text-gray-500 mt-1">{user.email} • {user.role === 'admin' ? '👑 Administrator' : 'Verified Customer'}</p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="bg-[#D4AF37] text-[#2C1810] px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#b8860b] transition shadow-xs text-center"
                        >
                            Admin Portal
                        </Link>
                    )}
                    <button
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }}
                        className="bg-white border border-[#E8DFD8] text-red-600 px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-red-50 transition flex items-center justify-center gap-1.5"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Profile Card */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] space-y-4">
                        <h3 className="font-serif font-bold text-base text-[#2C1810] flex items-center gap-2 border-b border-[#F4EBE1] pb-3">
                            <User className="w-4 h-4 text-[#D4AF37]" /> Account Profile
                        </h3>
                        <div className="space-y-2 text-xs text-gray-600">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
                            <p><strong>Default City:</strong> {user.city || 'Lahore'}</p>
                        </div>
                    </div>

                    <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#E8DFD8] space-y-2">
                        <h4 className="font-serif font-bold text-sm text-[#2C1810] flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Need Support?
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Our customer care team is available 10:00 AM – 8:00 PM (PKT).
                        </p>
                        <p className="text-xs font-bold text-[#2C1810]">📞 +92 300 1234567</p>
                    </div>
                </div>

                {/* Right Order History Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFD8] space-y-4">
                        <h3 className="font-serif font-bold text-lg text-[#2C1810] flex items-center gap-2 border-b border-[#F4EBE1] pb-3">
                            <Package className="w-5 h-5 text-[#D4AF37]" /> My Orders History
                        </h3>

                        {loadingOrders ? (
                            <p className="text-xs text-gray-500 py-6 text-center">Loading your orders...</p>
                        ) : orders.length === 0 ? (
                            <div className="py-8 text-center space-y-3">
                                <p className="text-xs text-gray-500">You haven't placed any orders yet.</p>
                                <Link
                                    to="/shop"
                                    className="inline-block bg-[#2C1810] text-[#FAF6F0] px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((ord) => (
                                    <div key={ord.id} className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E8DFD8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-serif font-bold text-sm text-[#2C1810]">{ord.id}</span>
                                                <span className="bg-[#2C1810] text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                                    {ord.orderStatus}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(ord.createdAt).toLocaleDateString()} • {ord.items.length} items • Rs. {ord.totalAmount.toLocaleString()} ({ord.paymentMethod})
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap sm:flex-nowrap gap-2">
                                            <Link
                                                to={`/track-order?id=${ord.id}`}
                                                className="flex-1 sm:flex-none text-center bg-white border border-[#E8DFD8] text-[#2C1810] px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:border-[#D4AF37] transition"
                                            >
                                                Track Status
                                            </Link>
                                            <button
                                                onClick={() => setSelectedOrder(ord)}
                                                className="flex-1 sm:flex-none justify-center bg-[#2C1810] text-[#FAF6F0] px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#362219] transition flex items-center gap-1"
                                            >
                                                <Eye className="w-3.5 h-3.5" /> Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="bg-white w-full max-w-xl rounded-2xl p-6 border border-[#E8DFD8] space-y-4 animate-fade-in">
                        <div className="flex justify-between items-center pb-3 border-b border-[#E8DFD8]">
                            <h3 className="font-serif font-bold text-lg text-[#2C1810]">Order Details ({selectedOrder.id})</h3>
                            <button onClick={() => setSelectedOrder(null)} className="text-gray-400 font-bold hover:text-black text-sm">✕</button>
                        </div>

                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {selectedOrder.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-xs py-1.5 border-b border-[#F4EBE1]">
                                    <span>{item.name} ({item.variant}) x {item.quantity}</span>
                                    <span className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="text-xs text-gray-600 space-y-1 pt-2 border-t border-[#E8DFD8]">
                            <p><strong>Recipient:</strong> {selectedOrder.customer.name} ({selectedOrder.customer.phone})</p>
                            <p><strong>Address:</strong> {selectedOrder.customer.address}, {selectedOrder.customer.city}</p>
                            <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                            <p className="text-sm font-bold text-[#2C1810] pt-2 border-t border-[#F4EBE1]">
                                Total Amount: Rs. {selectedOrder.totalAmount.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
