import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, Phone, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
    const navigate = useNavigate();
    const { login, register, loginAsDemoCustomer, loginAsDemoAdmin } = useAuth();

    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: 'Lahore',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegister) {
                if (!formData.name || !formData.email || !formData.password) {
                    setError('Please fill in all required fields');
                    setLoading(false);
                    return;
                }
                await register(formData);
            } else {
                await login(formData.email, formData.password);
            }
            navigate('/account');
        } catch (err) {
            setError(err.message || 'Authentication failed. Please check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-8 sm:py-16 space-y-6 sm:space-y-8 animate-fade-in">

            {/* Header */}
            <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#9E7B82]">Vellora Boutique</span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810]">
                    {isRegister ? 'Create Your Account' : 'Customer Sign In'}
                </h1>
                <p className="text-xs text-gray-500">
                    Access your wishlist, order status history, and private luxury sale invitations.
                </p>
            </div>

            {/* Demo Shortcuts Box */}
            <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#D4AF37]/40 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C1810]">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>1-Click Demo Login Shortcuts</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            loginAsDemoCustomer();
                            navigate('/account');
                        }}
                        className="bg-white border border-[#E8DFD8] text-[#2C1810] py-2 rounded-xl text-xs font-semibold hover:border-[#D4AF37] transition shadow-xs"
                    >
                        👤 Demo Customer
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            loginAsDemoAdmin();
                            navigate('/admin');
                        }}
                        className="bg-[#2C1810] text-[#D4AF37] py-2 rounded-xl text-xs font-semibold hover:bg-[#362219] transition shadow-xs"
                    >
                        👑 Demo Admin
                    </button>
                </div>
            </div>

            {/* Main Form */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8DFD8] shadow-lg space-y-6">

                {/* Tab Switcher */}
                <div className="flex border-b border-[#E8DFD8]">
                    <button
                        onClick={() => { setIsRegister(false); setError(''); }}
                        className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${!isRegister ? 'border-[#D4AF37] text-[#2C1810]' : 'border-transparent text-gray-400'
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => { setIsRegister(true); setError(''); }}
                        className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${isRegister ? 'border-[#D4AF37] text-[#2C1810]' : 'border-transparent text-gray-400'
                            }`}
                    >
                        Register
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs font-medium border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {isRegister && (
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name</label>
                            <div className="relative">
                                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Sana Tariq"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-10 pr-3 py-2.5 bg-[#FAF6F0] border border-[#E8DFD8] rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                required
                                placeholder="customer@vellora.pk"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-10 pr-3 py-2.5 bg-[#FAF6F0] border border-[#E8DFD8] rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                            />
                        </div>
                    </div>

                    {isRegister && (
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="tel"
                                    placeholder="0300 1234567"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full pl-10 pr-3 py-2.5 bg-[#FAF6F0] border border-[#E8DFD8] rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Password</label>
                        <div className="relative">
                            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full pl-10 pr-3 py-2.5 bg-[#FAF6F0] border border-[#E8DFD8] rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2C1810] text-[#FAF6F0] py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#362219] transition shadow-md flex items-center justify-center gap-2 mt-4"
                    >
                        <span>{loading ? 'Processing...' : isRegister ? 'Create Account' : 'Sign In'}</span>
                        <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                    </button>
                </form>

            </div>

        </div>
    );
};
