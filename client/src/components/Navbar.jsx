import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ShoppingBag,
    Heart,
    User,
    Search,
    Menu,
    X,
    Sparkles,
    Phone,
    ShieldCheck,
    ChevronDown,
    LogOut,
    SlidersHorizontal,
    PackageCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
    const navigate = useNavigate();
    const { cartItemCount, wishlist, setIsCartOpen, searchQuery, setSearchQuery } = useShop();
    const { user, logout, loginAsAdmin, loginAsCustomer, isAdmin } = useAuth();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
        }
    };

    return (
        <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8DFD8]">
            {/* Announcement Bar */}
            <div className="bg-[#2C1810] text-[#FAF6F0] py-2 px-4 text-xs font-medium text-center flex items-center justify-center gap-2 tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                <span>✦ Complimentary Express Shipping on Orders Over Rs. 3,000 Across Pakistan | Festive Lawn Edition Live ✦</span>
            </div>

            {/* Main Header Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Mobile Menu Trigger */}
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-[#2C1810] hover:text-[#D4AF37] transition"
                            aria-label="Toggle Navigation"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Brand Logo */}
                    <div className="flex-1 lg:flex-none text-center lg:text-left">
                        <Link to="/" className="inline-block group">
                            <span className="font-serif text-3xl sm:text-4xl tracking-[0.25em] font-bold text-[#2C1810] group-hover:text-[#9E7B82] transition duration-300">
                                VELLORA
                            </span>
                            <span className="block text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] text-center font-medium mt-0.5">
                                Luxury Pakistani Boutique
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-8 font-medium text-sm tracking-widest uppercase">
                        <Link to="/" className="text-[#2C1810] hover:text-[#D4AF37] transition duration-200 py-1 border-b-2 border-transparent hover:border-[#D4AF37]">
                            Home
                        </Link>
                        <Link to="/shop" className="text-[#2C1810] hover:text-[#D4AF37] transition duration-200 py-1 border-b-2 border-transparent hover:border-[#D4AF37]">
                            All Dresses
                        </Link>
                        <Link to="/shop?category=chiffon-luxury" className="text-[#2C1810] hover:text-[#D4AF37] transition duration-200 py-1 border-b-2 border-transparent hover:border-[#D4AF37]">
                            Chiffon Luxury
                        </Link>
                        <Link to="/shop?category=festive-formal" className="text-[#2C1810] hover:text-[#D4AF37] transition duration-200 py-1 border-b-2 border-transparent hover:border-[#D4AF37]">
                            Festive Formal
                        </Link>
                        <Link to="/shop?category=velvet-edition" className="text-[#2C1810] hover:text-[#D4AF37] transition duration-200 py-1 border-b-2 border-transparent hover:border-[#D4AF37]">
                            Velvet Edition
                        </Link>
                        <Link to="/shop?category=ready-to-wear" className="text-[#2C1810] hover:text-[#D4AF37] transition duration-200 py-1 border-b-2 border-transparent hover:border-[#D4AF37]">
                            Ready-to-Wear
                        </Link>
                        <Link to="/track-order" className="text-[#9E7B82] font-semibold hover:text-[#2C1810] transition duration-200 py-1 flex items-center gap-1">
                            <PackageCheck className="w-4 h-4 text-[#D4AF37]" /> Track Order
                        </Link>
                        {isAdmin && (
                            <Link to="/admin" className="bg-[#2C1810] text-[#D4AF37] px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-[#362219] transition shadow-sm">
                                Admin Panel
                            </Link>
                        )}
                    </nav>

                    {/* Action Icons */}
                    <div className="flex items-center gap-4 sm:gap-6">

                        {/* Search Input Trigger */}
                        <div className="relative">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 text-[#2C1810] hover:text-[#D4AF37] transition"
                                aria-label="Search Store"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Wishlist Link */}
                        <Link to="/wishlist" className="relative p-2 text-[#2C1810] hover:text-[#D4AF37] transition" aria-label="Wishlist">
                            <Heart className="w-5 h-5" />
                            {wishlist.length > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-[#9E7B82] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        {/* Shopping Cart Drawer Trigger */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-[#2C1810] hover:text-[#D4AF37] transition flex items-center gap-1 group"
                            aria-label="Shopping Bag"
                        >
                            <div className="relative">
                                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1.5 -right-2 bg-[#2C1810] text-[#D4AF37] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#D4AF37]">
                                        {cartItemCount}
                                    </span>
                                )}
                            </div>
                        </button>

                        {/* Account Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                                className="flex items-center gap-1 p-2 text-[#2C1810] hover:text-[#D4AF37] transition rounded-full hover:bg-[#F4EBE1]"
                            >
                                <User className="w-5 h-5" />
                                <ChevronDown className="w-3 h-3 text-[#9E7B82]" />
                            </button>

                            {isAccountDropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E8DFD8] py-2 z-50 animate-fade-in"
                                    onMouseLeave={() => setIsAccountDropdownOpen(false)}
                                >
                                    {user ? (
                                        <>
                                            <div className="px-4 py-2 border-b border-[#F4EBE1]">
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">Logged in as</p>
                                                <p className="font-semibold text-sm text-[#2C1810] truncate">{user.name}</p>
                                                <p className="text-xs text-[#9E7B82] font-medium">{user.role === 'admin' ? '👑 Store Administrator' : 'Verified Customer'}</p>
                                            </div>
                                            <Link
                                                to="/account"
                                                onClick={() => setIsAccountDropdownOpen(false)}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FAF6F0] hover:text-[#2C1810]"
                                            >
                                                My Account & Orders
                                            </Link>
                                            {user.role === 'admin' && (
                                                <Link
                                                    to="/admin"
                                                    onClick={() => setIsAccountDropdownOpen(false)}
                                                    className="block px-4 py-2 text-sm text-[#D4AF37] font-semibold hover:bg-[#FAF6F0]"
                                                >
                                                    Admin Management Portal
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsAccountDropdownOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 mt-1 border-t border-[#F4EBE1]"
                                            >
                                                <LogOut className="w-4 h-4" /> Log Out
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="px-4 py-2 text-xs text-gray-500 border-b border-[#F4EBE1]">
                                                Welcome to Vellora Luxury Boutique
                                            </div>
                                            <Link
                                                to="/login"
                                                onClick={() => setIsAccountDropdownOpen(false)}
                                                className="block px-4 py-2 text-sm font-semibold text-[#2C1810] hover:bg-[#FAF6F0]"
                                            >
                                                Sign In / Register
                                            </Link>

                                            {/* One-Click Demo Test Shortcuts */}
                                            <div className="mt-2 pt-2 border-t border-[#F4EBE1] px-4 py-2 bg-[#FAF6F0]/60 rounded-b-xl">
                                                <p className="text-[11px] font-bold text-[#9E7B82] uppercase tracking-wider mb-2">⚡ Quick Demo Login</p>
                                                <button
                                                    onClick={async () => {
                                                        await loginAsCustomer();
                                                        setIsAccountDropdownOpen(false);
                                                    }}
                                                    className="w-full text-left text-xs text-gray-700 hover:text-[#2C1810] py-1 flex items-center justify-between"
                                                >
                                                    <span>Customer Demo</span>
                                                    <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded">1-Click</span>
                                                </button>
                                                <button
                                                    onClick={async () => {
                                                        await loginAsAdmin();
                                                        setIsAccountDropdownOpen(false);
                                                        navigate('/admin');
                                                    }}
                                                    className="w-full text-left text-xs font-semibold text-[#D4AF37] hover:text-[#b8860b] py-1 flex items-center justify-between mt-1"
                                                >
                                                    <span>Admin Demo</span>
                                                    <span className="text-[10px] bg-[#2C1810] text-[#D4AF37] px-1.5 py-0.5 rounded">1-Click</span>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* Live Search Drawer Banner */}
                {isSearchOpen && (
                    <div className="py-4 border-t border-[#E8DFD8] animate-fade-in">
                        <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search chiffon luxury dresses, velvet suits, festive formals, unstitched lawn..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D4AF37]/40 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-[#2C1810] text-[#FAF6F0] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#362219] transition"
                            >
                                Search
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsSearchOpen(false)}
                                className="p-2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Mobile Side Drawer Navigation */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex lg:hidden">
                    <div className="w-4/5 max-w-sm bg-[#FDFBF7] h-full p-6 shadow-2xl flex flex-col justify-between animate-fade-in">
                        <div>
                            <div className="flex items-center justify-between pb-6 border-b border-[#E8DFD8]">
                                <span className="font-serif text-2xl font-bold tracking-widest text-[#2C1810]">VELLORA</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[#2C1810]">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="mt-6 flex flex-col gap-4 font-medium uppercase text-sm tracking-wider">
                                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-[#F4EBE1]">
                                    Home
                                </Link>
                                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-[#F4EBE1]">
                                    All Dresses
                                </Link>
                                <Link to="/shop?category=chiffon-luxury" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-[#F4EBE1]">
                                    Chiffon Luxury
                                </Link>
                                <Link to="/shop?category=festive-formal" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-[#F4EBE1]">
                                    Festive Formal
                                </Link>
                                <Link to="/shop?category=velvet-edition" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-[#F4EBE1]">
                                    Velvet Edition
                                </Link>
                                <Link to="/shop?category=ready-to-wear" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-[#F4EBE1]">
                                    Ready-to-Wear
                                </Link>
                                <Link to="/track-order" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-[#F4EBE1] text-[#9E7B82] font-semibold">
                                    Track Order
                                </Link>
                                {isAdmin && (
                                    <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-[#D4AF37] font-bold">
                                        👑 Admin Management Portal
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-[#E8DFD8] text-xs text-gray-500 flex flex-col gap-2">
                            <p>📞 Customer Support: +92 300 1234567</p>
                            <p>📍 Gulberg III, Lahore, Pakistan</p>
                        </div>
                    </div>
                    <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
                </div>
            )}
        </header>
    );
};
