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
            <div className="bg-[#2C1810] text-[#FAF6F0] py-1.5 sm:py-2 px-3 sm:px-4 text-[10px] sm:text-xs font-medium text-center flex items-center justify-center gap-1.5 sm:gap-2 tracking-wide overflow-hidden">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] animate-pulse shrink-0" />
                <span className="truncate sm:whitespace-normal">✦ Complimentary Express Shipping on Orders Over Rs. 3,000 Across Pakistan | Festive Lawn Edition ✦</span>
            </div>

            {/* Main Header Container */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">

                    {/* Mobile Menu Trigger */}
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-1.5 sm:p-2 text-[#2C1810] hover:text-[#D4AF37] transition -ml-1"
                            aria-label="Toggle Navigation"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Brand Logo */}
                    <div className="flex-1 lg:flex-none text-center lg:text-left px-1 sm:px-0">
                        <Link to="/" className="inline-block group">
                            <span className="font-serif text-xl sm:text-3xl lg:text-4xl tracking-[0.15em] sm:tracking-[0.25em] font-bold text-[#2C1810] group-hover:text-[#9E7B82] transition duration-300">
                                VELLORA
                            </span>
                            <span className="block text-[7.5px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[#D4AF37] text-center font-medium -mt-0.5 sm:mt-0.5">
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
                    <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-5">

                        {/* Search Input Trigger */}
                        <div className="relative">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-1.5 sm:p-2 text-[#2C1810] hover:text-[#D4AF37] transition"
                                aria-label="Search Store"
                            >
                                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>

                        {/* Wishlist Link */}
                        <Link to="/wishlist" className="relative p-1.5 sm:p-2 text-[#2C1810] hover:text-[#D4AF37] transition" aria-label="Wishlist">
                            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                            {wishlist.length > 0 && (
                                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#9E7B82] text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        {/* Shopping Cart Drawer Trigger */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-1.5 sm:p-2 text-[#2C1810] hover:text-[#D4AF37] transition flex items-center gap-1 group"
                            aria-label="Shopping Bag"
                        >
                            <div className="relative">
                                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1.5 -right-2 bg-[#2C1810] text-[#D4AF37] text-[9px] sm:text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#D4AF37]">
                                        {cartItemCount}
                                    </span>
                                )}
                            </div>
                        </button>

                        {/* Account Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                                className="flex items-center gap-0.5 sm:gap-1 p-1.5 sm:p-2 text-[#2C1810] hover:text-[#D4AF37] transition rounded-full hover:bg-[#F4EBE1]"
                                aria-label="User Account"
                            >
                                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#9E7B82]" />
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
                    <div className="py-3 sm:py-4 border-t border-[#E8DFD8] animate-fade-in">
                        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 sm:gap-3">
                            <div className="relative flex-1">
                                <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search luxury lawn, chiffon, velvet..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-white border border-[#D4AF37]/40 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-[#2C1810] text-[#FAF6F0] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#362219] transition shrink-0"
                            >
                                Search
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsSearchOpen(false)}
                                className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 shrink-0"
                                aria-label="Close Search"
                            >
                                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Mobile Side Drawer Navigation */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex lg:hidden">
                    <div className="w-[85vw] max-w-sm bg-[#FDFBF7] h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-fade-in">
                        <div className="p-5 sm:p-6 space-y-5">
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD8]">
                                <div>
                                    <span className="font-serif text-2xl font-bold tracking-[0.15em] text-[#2C1810] block">VELLORA</span>
                                    <span className="text-[8px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">Luxury Pakistani Boutique</span>
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-1.5 text-[#2C1810] hover:text-[#D4AF37] rounded-full hover:bg-gray-100 transition"
                                    aria-label="Close Menu"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* User Authentication Status Box */}
                            <div className="p-3 bg-white rounded-xl border border-[#E8DFD8]">
                                {user ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Signed in as</p>
                                                <p className="font-semibold text-xs text-[#2C1810] truncate">{user.name}</p>
                                            </div>
                                            <span className="text-[9px] bg-[#FAF6F0] text-[#9E7B82] font-bold px-2 py-0.5 rounded-full border border-[#E8DFD8]">
                                                {user.role === 'admin' ? '👑 Admin' : 'Customer'}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 pt-2 border-t border-[#F4EBE1]">
                                            <Link
                                                to="/account"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex-1 bg-[#FAF6F0] text-[#2C1810] text-center py-1.5 rounded-lg text-xs font-semibold hover:border-[#D4AF37] transition border border-[#E8DFD8]"
                                            >
                                                My Account
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <Link
                                                to="/login"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex-1 bg-[#2C1810] text-[#FAF6F0] text-center py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#362219] transition"
                                            >
                                                Sign In / Register
                                            </Link>
                                        </div>
                                        <div className="pt-2 border-t border-[#F4EBE1] flex items-center justify-between text-[11px] text-gray-500">
                                            <span>Quick Demo:</span>
                                            <div className="flex gap-1.5">
                                                <button
                                                    onClick={async () => {
                                                        await loginAsCustomer();
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                    className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded text-[#2C1810] font-medium"
                                                >
                                                    Customer
                                                </button>
                                                <button
                                                    onClick={async () => {
                                                        await loginAsAdmin();
                                                        setIsMobileMenuOpen(false);
                                                        navigate('/admin');
                                                    }}
                                                    className="px-2 py-0.5 bg-[#2C1810] text-[#D4AF37] rounded font-medium"
                                                >
                                                    Admin
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Category Navigation Links */}
                            <div className="flex flex-col gap-1 font-medium uppercase text-xs tracking-wider">
                                <Link
                                    to="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-2.5 px-3 rounded-lg hover:bg-white text-[#2C1810] flex items-center justify-between transition"
                                >
                                    <span>Home</span>
                                </Link>
                                <Link
                                    to="/shop"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-2.5 px-3 rounded-lg hover:bg-white text-[#2C1810] flex items-center justify-between transition"
                                >
                                    <span>All Dresses</span>
                                    <span className="text-[10px] text-[#9E7B82] font-semibold">Catalogue</span>
                                </Link>
                                <Link
                                    to="/shop?category=chiffon-luxury"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-2.5 px-3 rounded-lg hover:bg-white text-[#2C1810] flex items-center justify-between transition"
                                >
                                    <span>Chiffon Luxury</span>
                                </Link>
                                <Link
                                    to="/shop?category=festive-formal"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-2.5 px-3 rounded-lg hover:bg-white text-[#2C1810] flex items-center justify-between transition"
                                >
                                    <span>Festive Formal</span>
                                </Link>
                                <Link
                                    to="/shop?category=velvet-edition"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-2.5 px-3 rounded-lg hover:bg-white text-[#2C1810] flex items-center justify-between transition"
                                >
                                    <span>Velvet Edition</span>
                                </Link>
                                <Link
                                    to="/shop?category=ready-to-wear"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-2.5 px-3 rounded-lg hover:bg-white text-[#2C1810] flex items-center justify-between transition"
                                >
                                    <span>Ready-to-Wear</span>
                                </Link>
                                <Link
                                    to="/track-order"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-2.5 px-3 rounded-lg hover:bg-white text-[#9E7B82] font-bold flex items-center justify-between transition border border-[#D4AF37]/30 bg-[#FAF6F0]"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <PackageCheck className="w-4 h-4 text-[#D4AF37]" /> Track Order
                                    </span>
                                </Link>
                                {isAdmin && (
                                    <Link
                                        to="/admin"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="py-2.5 px-3 rounded-lg bg-[#2C1810] text-[#D4AF37] font-bold flex items-center justify-between transition mt-1"
                                    >
                                        <span>👑 Admin Portal</span>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Drawer Footer Contact */}
                        <div className="p-5 sm:p-6 border-t border-[#E8DFD8] bg-[#FAF6F0]/80 text-[11px] text-gray-600 space-y-1.5">
                            <p className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> +92 300 1234567
                            </p>
                            <p className="text-[10px] text-gray-400">Gulberg III, Main Boulevard, Lahore, Pakistan</p>
                        </div>
                    </div>
                    <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
                </div>
            )}
        </header>
    );
};
