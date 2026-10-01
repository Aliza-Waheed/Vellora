import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, Tag, Star, Image, Plus, Edit, Trash2, CheckCircle2, TrendingUp, AlertTriangle, RefreshCw, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user, isAdmin } = useAuth();
    const { products, categories, fetchProducts } = useShop();

    const [activeTab, setActiveTab] = useState('products');
    const [orders, setOrders] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [banners, setBanners] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    // New Product Modal State
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [newProd, setNewProd] = useState({
        name: '',
        brand: 'Vellora Festive',
        categoryId: 'cat-dresses',
        price: 4950,
        originalPrice: 6500,
        discountPercent: 24,
        fabric: 'Unstitched Lawn 3PC',
        description: '',
        images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80'],
        stock: 15,
        isNewArrival: true,
        isBestSeller: false
    });

    // New Coupon Modal State
    const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
    const [newCoupon, setNewCoupon] = useState({
        code: 'FESTIVE20',
        discountPercent: 20,
        minSpend: 4000,
        expiryDate: '2026-12-31'
    });

    useEffect(() => {
        if (!user || !isAdmin) {
            navigate('/login');
            return;
        }

        loadAdminData();
    }, [user, isAdmin, navigate]);

    const loadAdminData = async () => {
        try {
            const [ordData, coupData, banData] = await Promise.all([
                api.getOrders(),
                api.getCoupons(),
                api.getBanners()
            ]);
            setOrders(ordData);
            setCoupons(coupData);
            setBanners(banData);
        } catch (err) {
            console.error('Error loading admin data:', err);
        } finally {
            setLoadingOrders(false);
        }
    };

    // Metrics Calculations
    const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
    const pendingOrdersCount = orders.filter(o => o.orderStatus === 'Order Placed' || o.orderStatus === 'Pending').length;
    const lowStockCount = products.filter(p => p.stock <= 5).length;

    // Handlers
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            await api.createProduct(newProd);
            setIsAddProductOpen(false);
            fetchProducts();
            alert('Product created successfully!');
        } catch (err) {
            alert('Failed to create product: ' + err.message);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await api.deleteProduct(id);
                fetchProducts();
            } catch (err) {
                alert('Failed to delete product.');
            }
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await api.updateOrderStatus(orderId, newStatus);
            loadAdminData();
        } catch (err) {
            alert('Failed to update status.');
        }
    };

    const handleCreateCoupon = async (e) => {
        e.preventDefault();
        try {
            await api.createCoupon(newCoupon);
            setIsAddCouponOpen(false);
            loadAdminData();
            alert('Coupon created!');
        } catch (err) {
            alert('Failed to create coupon.');
        }
    };

    if (!user || !isAdmin) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

            {/* Executive Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DFD8] pb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Management Portal</span>
                    <h1 className="font-serif text-3xl font-bold text-[#2C1810] mt-0.5">Storefront Admin Dashboard</h1>
                    <p className="text-xs text-gray-500 mt-1">Manage product catalog, order dispatches, stock, coupons, &amp; banners.</p>
                </div>
                <button
                    onClick={loadAdminData}
                    className="bg-white border border-[#E8DFD8] text-[#2C1810] px-4 py-2 rounded-full text-xs font-semibold hover:border-[#D4AF37] transition flex items-center gap-1.5 w-fit"
                >
                    <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37]" /> Refresh Live Data
                </button>
            </div>

            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-xs flex items-center justify-between">
                    <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Sales Revenue</span>
                        <h3 className="font-serif text-2xl font-bold text-[#2C1810] mt-0.5">Rs. {totalRevenue.toLocaleString()}</h3>
                        <span className="text-[11px] text-emerald-600 font-semibold">✦ {orders.length} Total Orders</span>
                    </div>
                    <div className="p-3 bg-amber-50 text-[#D4AF37] rounded-2xl border border-amber-200">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-xs flex items-center justify-between">
                    <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Pending Dispatches</span>
                        <h3 className="font-serif text-2xl font-bold text-amber-700 mt-0.5">{pendingOrdersCount}</h3>
                        <span className="text-[11px] text-amber-600 font-semibold">Requires courier booking</span>
                    </div>
                    <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl border border-amber-200">
                        <ShoppingCart className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-xs flex items-center justify-between">
                    <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Active Catalog</span>
                        <h3 className="font-serif text-2xl font-bold text-[#2C1810] mt-0.5">{products.length} Items</h3>
                        <span className="text-[11px] text-gray-500 font-medium">{categories.length} Categories</span>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200">
                        <Package className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-xs flex items-center justify-between">
                    <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Low Stock Warning</span>
                        <h3 className="font-serif text-2xl font-bold text-red-600 mt-0.5">{lowStockCount} Products</h3>
                        <span className="text-[11px] text-red-500 font-semibold">Stock &lt; 5 units</span>
                    </div>
                    <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-200">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                </div>

            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl border border-[#E8DFD8] p-2 flex overflow-x-auto gap-2">
                {[
                    { id: 'products', label: 'Products', icon: Package },
                    { id: 'orders', label: 'Orders & Dispatches', icon: ShoppingCart },
                    { id: 'categories', label: 'Categories', icon: Layers },
                    { id: 'coupons', label: 'Coupons & Promos', icon: Tag },
                    { id: 'banners', label: 'Homepage Banners', icon: Image }
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-[#2C1810] text-[#D4AF37] shadow-xs'
                                : 'text-gray-600 hover:bg-[#FAF6F0]'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Tab 1: Products Management */}
            {activeTab === 'products' && (
                <div className="bg-white rounded-2xl border border-[#E8DFD8] p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F4EBE1] pb-4">
                        <h3 className="font-serif font-bold text-lg text-[#2C1810]">All Store Products ({products.length})</h3>
                        <button
                            onClick={() => setIsAddProductOpen(true)}
                            className="bg-[#2C1810] text-[#FAF6F0] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#362219] transition flex items-center gap-2 w-fit shadow-md"
                        >
                            <Plus className="w-4 h-4 text-[#D4AF37]" /> Add New Product
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-gray-700">
                            <thead className="bg-[#FAF6F0] text-[#2C1810] font-serif font-bold uppercase text-[10px] tracking-wider border-b border-[#E8DFD8]">
                                <tr>
                                    <th className="p-3">Product</th>
                                    <th className="p-3">Category</th>
                                    <th className="p-3">Price</th>
                                    <th className="p-3">Discount</th>
                                    <th className="p-3">Stock Units</th>
                                    <th className="p-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F4EBE1]">
                                {products.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50">
                                        <td className="p-3 flex items-center gap-3">
                                            <img src={p.images?.[0]} alt="" className="w-10 h-12 object-cover rounded border border-[#E8DFD8]" />
                                            <div>
                                                <span className="font-bold text-[#2C1810] block line-clamp-1">{p.name}</span>
                                                <span className="text-[10px] text-gray-400">{p.brand}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 font-medium">{p.categoryId}</td>
                                        <td className="p-3 font-bold text-[#2C1810]">Rs. {p.price.toLocaleString()}</td>
                                        <td className="p-3 font-semibold text-red-600">{p.discountPercent}% OFF</td>
                                        <td className="p-3 font-semibold">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] ${p.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                                                }`}>
                                                {p.stock} units
                                            </span>
                                        </td>
                                        <td className="p-3 text-right">
                                            <button
                                                onClick={() => handleDeleteProduct(p.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                title="Delete Product"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Tab 2: Orders Management */}
            {activeTab === 'orders' && (
                <div className="bg-white rounded-2xl border border-[#E8DFD8] p-6 space-y-6">
                    <div className="flex justify-between items-center border-b border-[#F4EBE1] pb-4">
                        <h3 className="font-serif font-bold text-lg text-[#2C1810]">Customer Orders ({orders.length})</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-gray-700">
                            <thead className="bg-[#FAF6F0] text-[#2C1810] font-serif font-bold uppercase text-[10px] tracking-wider border-b border-[#E8DFD8]">
                                <tr>
                                    <th className="p-3">Order ID</th>
                                    <th className="p-3">Customer</th>
                                    <th className="p-3">City</th>
                                    <th className="p-3">Total Amount</th>
                                    <th className="p-3">Payment Method</th>
                                    <th className="p-3">Order Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F4EBE1]">
                                {orders.map((o) => (
                                    <tr key={o.id} className="hover:bg-gray-50">
                                        <td className="p-3 font-bold font-serif text-[#2C1810]">{o.id}</td>
                                        <td className="p-3">
                                            <span className="font-semibold block">{o.customer?.name}</span>
                                            <span className="text-[10px] text-gray-400">{o.customer?.phone}</span>
                                        </td>
                                        <td className="p-3 font-medium">{o.customer?.city}</td>
                                        <td className="p-3 font-bold text-[#2C1810]">Rs. {o.totalAmount?.toLocaleString()}</td>
                                        <td className="p-3 font-medium">{o.paymentMethod}</td>
                                        <td className="p-3">
                                            <select
                                                value={o.orderStatus}
                                                onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                                                className="bg-white border border-[#E8DFD8] text-xs font-semibold px-2 py-1 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                                            >
                                                <option value="Order Placed">Order Placed</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Out for Delivery">Out for Delivery</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Tab 3: Categories */}
            {activeTab === 'categories' && (
                <div className="bg-white rounded-2xl border border-[#E8DFD8] p-6 space-y-6">
                    <h3 className="font-serif font-bold text-lg text-[#2C1810] border-b border-[#F4EBE1] pb-4">Boutique Categories</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {categories.map((c) => (
                            <div key={c.id} className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E8DFD8] flex items-center gap-4">
                                <img src={c.image} alt="" className="w-16 h-16 object-cover rounded-lg border border-[#E8DFD8]" />
                                <div>
                                    <h4 className="font-serif font-bold text-sm text-[#2C1810]">{c.name}</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">{c.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tab 4: Coupons */}
            {activeTab === 'coupons' && (
                <div className="bg-white rounded-2xl border border-[#E8DFD8] p-6 space-y-6">
                    <div className="flex justify-between items-center border-b border-[#F4EBE1] pb-4">
                        <h3 className="font-serif font-bold text-lg text-[#2C1810]">Discount Coupons</h3>
                        <button
                            onClick={() => setIsAddCouponOpen(true)}
                            className="bg-[#2C1810] text-[#FAF6F0] px-4 py-2 rounded-full text-xs font-bold uppercase"
                        >
                            + Create Coupon
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {coupons.map((coup) => (
                            <div key={coup.code} className="bg-[#FAF6F0] p-4 rounded-xl border border-[#D4AF37]/30">
                                <span className="font-serif font-bold text-base text-[#2C1810] block">{coup.code}</span>
                                <p className="text-xs text-emerald-700 font-bold mt-1">{coup.discountPercent}% Discount</p>
                                <p className="text-[11px] text-gray-500">Min Spend: Rs. {coup.minSpend}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tab 5: Banners */}
            {activeTab === 'banners' && (
                <div className="bg-white rounded-2xl border border-[#E8DFD8] p-6 space-y-6">
                    <h3 className="font-serif font-bold text-lg text-[#2C1810] border-b border-[#F4EBE1] pb-4">Homepage Hero Banners</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {banners.map((ban) => (
                            <div key={ban.id} className="relative h-48 rounded-xl overflow-hidden border border-[#E8DFD8]">
                                <img src={ban.imageUrl} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-end text-white">
                                    <h4 className="font-serif font-bold text-base">{ban.title}</h4>
                                    <p className="text-xs text-gray-200">{ban.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Add Product Modal */}
            {isAddProductOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <form onSubmit={handleCreateProduct} className="bg-white w-full max-w-xl rounded-2xl p-6 border border-[#E8DFD8] space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center pb-3 border-b border-[#E8DFD8]">
                            <h3 className="font-serif font-bold text-lg text-[#2C1810]">Add New Store Product</h3>
                            <button type="button" onClick={() => setIsAddProductOpen(false)} className="text-gray-400 font-bold text-sm">✕</button>
                        </div>

                        <div className="space-y-3 text-xs">
                            <div>
                                <label className="block font-bold mb-1">Product Title</label>
                                <input
                                    type="text"
                                    required
                                    value={newProd.name}
                                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                                    className="w-full p-2.5 border rounded-lg"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold mb-1">Category</label>
                                    <select
                                        value={newProd.categoryId}
                                        onChange={(e) => setNewProd({ ...newProd, categoryId: e.target.value })}
                                        className="w-full p-2.5 border rounded-lg font-semibold"
                                    >
                                        <option value="cat-dresses">Pakistani Dresses</option>
                                        <option value="cat-skincare">Organic Skincare</option>
                                        <option value="cat-cosmetics">Cosmetics</option>
                                        <option value="cat-jewelry">Royal Jewelry</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-bold mb-1">Brand Name</label>
                                    <input
                                        type="text"
                                        value={newProd.brand}
                                        onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                                        className="w-full p-2.5 border rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block font-bold mb-1">Price (Rs.)</label>
                                    <input
                                        type="number"
                                        required
                                        value={newProd.price}
                                        onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                                        className="w-full p-2.5 border rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block font-bold mb-1">Original Price</label>
                                    <input
                                        type="number"
                                        value={newProd.originalPrice}
                                        onChange={(e) => setNewProd({ ...newProd, originalPrice: Number(e.target.value) })}
                                        className="w-full p-2.5 border rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block font-bold mb-1">Stock Units</label>
                                    <input
                                        type="number"
                                        value={newProd.stock}
                                        onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                                        className="w-full p-2.5 border rounded-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold mb-1">Image URL</label>
                                <input
                                    type="text"
                                    value={newProd.images[0]}
                                    onChange={(e) => setNewProd({ ...newProd, images: [e.target.value] })}
                                    className="w-full p-2.5 border rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block font-bold mb-1">Description</label>
                                <textarea
                                    rows={3}
                                    value={newProd.description}
                                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                                    className="w-full p-2.5 border rounded-lg"
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-[#2C1810] text-[#FAF6F0] py-3 rounded-full font-bold text-xs uppercase">
                            Save Product to Catalogue
                        </button>
                    </form>
                </div>
            )}

            {/* Add Coupon Modal */}
            {isAddCouponOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <form onSubmit={handleCreateCoupon} className="bg-white w-full max-w-sm rounded-2xl p-6 border border-[#E8DFD8] space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-[#E8DFD8]">
                            <h3 className="font-serif font-bold text-base text-[#2C1810]">Create Discount Coupon</h3>
                            <button type="button" onClick={() => setIsAddCouponOpen(false)} className="text-gray-400 font-bold text-sm">✕</button>
                        </div>

                        <div className="space-y-3 text-xs">
                            <div>
                                <label className="block font-bold mb-1">Coupon Code</label>
                                <input
                                    type="text"
                                    required
                                    value={newCoupon.code}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                                    className="w-full p-2.5 border rounded-lg font-bold uppercase"
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-1">Discount %</label>
                                <input
                                    type="number"
                                    required
                                    value={newCoupon.discountPercent}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, discountPercent: Number(e.target.value) })}
                                    className="w-full p-2.5 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-1">Min Order Spend (Rs.)</label>
                                <input
                                    type="number"
                                    value={newCoupon.minSpend}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, minSpend: Number(e.target.value) })}
                                    className="w-full p-2.5 border rounded-lg"
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-[#2C1810] text-[#FAF6F0] py-3 rounded-full font-bold text-xs uppercase">
                            Activate Coupon
                        </button>
                    </form>
                </div>
            )}

        </div>
    );
};
