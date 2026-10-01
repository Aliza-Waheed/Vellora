import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    initialCategories,
    initialProducts,
    initialCoupons,
    initialBanners,
    initialReviews
} from './data/seedData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, '../../client/dist');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'vellora-luxury-secret-key-2026';

app.use(cors());
app.use(express.json());
app.use(express.static(clientDistPath));

// In-Memory & State Persistent Data Stores
let categories = [...initialCategories];
let products = [...initialProducts];
let coupons = [...initialCoupons];
let banners = [...initialBanners];
let reviews = [...initialReviews];
let orders = [
    {
        id: "VEL-89412",
        createdAt: "2026-09-24T14:30:00Z",
        customer: {
            name: "Sana Tariq",
            email: "sana.tariq@gmail.com",
            phone: "+92 300 1234567",
            address: "House 45-B, Block L, Gulberg III",
            city: "Lahore",
            province: "Punjab"
        },
        items: [
            {
                id: "prod-dress-01",
                name: "Noor-e-Zari Hand Embroidered Chiffon 3-Piece",
                variant: "Unstitched",
                price: 18500,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
            }
        ],
        subtotal: 18500,
        shippingFee: 0,
        discount: 1850,
        couponCode: "VELLORA10",
        totalAmount: 16650,
        paymentMethod: "Cash on Delivery",
        paymentStatus: "Pending",
        orderStatus: "Shipped",
        trackingNumber: "TRK-LHR-98412"
    }
];

let users = [
    {
        id: "user-admin",
        name: "Vellora Admin",
        email: "admin@vellora.pk",
        passwordHash: bcrypt.hashSync("admin123", 10),
        role: "admin",
        phone: "+92 300 0000000",
        city: "Lahore"
    },
    {
        id: "user-customer",
        name: "Ayesha Khan",
        email: "ayesha@gmail.com",
        passwordHash: bcrypt.hashSync("ayesha123", 10),
        role: "customer",
        phone: "+92 321 9876543",
        city: "Karachi"
    }
];

// AUTH MIDDLEWARE
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Authentication required' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Administrator access required' });
    }
};

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, phone, city } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }
        const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existing) {
            return res.status(400).json({ message: 'An account with this email already exists' });
        }
        const newUser = {
            id: `user-${Date.now()}`,
            name,
            email: email.toLowerCase(),
            passwordHash: bcrypt.hashSync(password, 10),
            role: 'customer',
            phone: phone || '',
            city: city || 'Lahore'
        };
        users.push(newUser);
        const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            message: 'Account registered successfully',
            token,
            user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, phone: newUser.phone, city: newUser.city }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, city: user.city }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, city: user.city });
});

// --- CATEGORIES ---
app.get('/api/categories', (req, res) => {
    res.json(categories);
});

app.post('/api/categories', authenticateToken, requireAdmin, (req, res) => {
    const { name, slug, description, image, subcategories } = req.body;
    const newCat = {
        id: `cat-${Date.now()}`,
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        description: description || '',
        image: image || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        subcategories: subcategories || []
    };
    categories.push(newCat);
    res.status(201).json(newCat);
});

// --- PRODUCTS ---
app.get('/api/products', (req, res) => {
    const { category, search, minPrice, maxPrice, sort, isNew, isBest, page = 1, limit = 100 } = req.query;
    let result = [...products];

    if (category) {
        result = result.filter(p => p.categoryId === category || p.slug === category);
    }
    if (search) {
        const q = search.toLowerCase();
        result = result.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
    }
    if (minPrice) {
        result = result.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
        result = result.filter(p => p.price <= Number(maxPrice));
    }
    if (isNew === 'true') {
        result = result.filter(p => p.isNewArrival);
    }
    if (isBest === 'true') {
        result = result.filter(p => p.isBestSeller);
    }

    // Sorting
    if (sort === 'price_asc') {
        result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'discount') {
        result.sort((a, b) => b.discountPercent - a.discountPercent);
    } else {
        // Default newest
        result.reverse();
    }

    res.json({
        products: result,
        total: result.length
    });
});

app.get('/api/products/:id', (req, res) => {
    const prod = products.find(p => p.id === req.params.id || p.slug === req.params.id);
    if (!prod) return res.status(404).json({ message: 'Product not found' });

    const productReviews = reviews.filter(r => r.productId === prod.id && r.status === 'Approved');
    res.json({ ...prod, reviewsList: productReviews });
});

app.post('/api/products', authenticateToken, requireAdmin, (req, res) => {
    const { name, categoryId, brand, price, originalPrice, stock, description, images, fabric, variants, colors, sizes } = req.body;
    if (!name || !categoryId || !price) {
        return res.status(400).json({ message: 'Product name, category, and price are required' });
    }
    const discountPercent = originalPrice && originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    const newProd = {
        id: `prod-${Date.now()}`,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        categoryId,
        brand: brand || 'Vellora Luxury',
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : Number(price),
        discountPercent,
        stock: Number(stock || 10),
        rating: 5.0,
        reviewCount: 0,
        isNewArrival: true,
        isBestSeller: false,
        isFeatured: true,
        description: description || '',
        fabric: fabric || 'Premium Craft',
        images: images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'],
        variants: variants || [{ id: `v-${Date.now()}`, type: 'Standard', value: 'Default', priceExtra: 0, stock: stock || 10 }],
        colors: colors || ['Default'],
        sizes: sizes || ['Standard']
    };
    products.unshift(newProd);
    res.status(201).json(newProd);
});

app.put('/api/products/:id', authenticateToken, requireAdmin, (req, res) => {
    const idx = products.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'Product not found' });

    const updated = { ...products[idx], ...req.body };
    if (req.body.originalPrice && req.body.price) {
        updated.discountPercent = Math.round(((req.body.originalPrice - req.body.price) / req.body.originalPrice) * 100);
    }
    products[idx] = updated;
    res.json(updated);
});

app.delete('/api/products/:id', authenticateToken, requireAdmin, (req, res) => {
    products = products.filter(p => p.id !== req.params.id);
    res.json({ message: 'Product deleted successfully' });
});

// --- ORDERS ---
app.post('/api/orders', (req, res) => {
    const { customer, items, subtotal, shippingFee, discount, couponCode, totalAmount, paymentMethod } = req.body;
    if (!customer || !items || items.length === 0) {
        return res.status(400).json({ message: 'Order customer details and items are required' });
    }

    // Stock Validation & Reduction
    for (const item of items) {
        const prod = products.find(p => p.id === item.id);
        if (prod) {
            prod.stock = Math.max(0, prod.stock - item.quantity);
        }
    }

    const orderId = `VEL-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
        id: orderId,
        createdAt: new Date().toISOString(),
        customer,
        items,
        subtotal: Number(subtotal),
        shippingFee: Number(shippingFee || 0),
        discount: Number(discount || 0),
        couponCode: couponCode || null,
        totalAmount: Number(totalAmount),
        paymentMethod: paymentMethod || 'Cash on Delivery',
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        orderStatus: 'Confirmed',
        trackingNumber: `TRK-PK-${Math.floor(100000 + Math.random() * 900000)}`
    };

    orders.unshift(newOrder);
    res.status(201).json(newOrder);
});

app.get('/api/orders', (req, res) => {
    // If email parameter provided, filter for customer
    const { email } = req.query;
    if (email) {
        const userOrders = orders.filter(o => o.customer.email.toLowerCase() === email.toLowerCase());
        return res.json(userOrders);
    }
    res.json(orders);
});

app.get('/api/orders/track/:orderId', (req, res) => {
    const order = orders.find(o => o.id.toLowerCase() === req.params.orderId.toLowerCase());
    if (!order) return res.status(404).json({ message: 'Order not found with provided Order ID' });
    res.json(order);
});

app.put('/api/orders/:id/status', authenticateToken, requireAdmin, (req, res) => {
    const { status } = req.body;
    const order = orders.find(o => o.id === req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.orderStatus = status;
    res.json(order);
});

// --- COUPONS ---
app.post('/api/coupons/validate', (req, res) => {
    const { code, subtotal } = req.body;
    if (!code) return res.status(400).json({ message: 'Coupon code is required' });

    const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.status === 'Active');
    if (!coupon) {
        return res.status(404).json({ message: 'Invalid or inactive coupon code' });
    }

    if (subtotal && subtotal < coupon.minOrderValue) {
        return res.status(400).json({ message: `Minimum order value of Rs. ${coupon.minOrderValue.toLocaleString()} required for code ${coupon.code}` });
    }

    res.json({
        valid: true,
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        message: `Coupon ${coupon.code} applied! You get ${coupon.discountPercent}% OFF.`
    });
});

app.get('/api/coupons', (req, res) => {
    res.json(coupons);
});

app.post('/api/coupons', authenticateToken, requireAdmin, (req, res) => {
    const { code, discountPercent, minOrderValue, expiresAt } = req.body;
    const newCoup = {
        id: `coup-${Date.now()}`,
        code: code.toUpperCase(),
        discountPercent: Number(discountPercent),
        minOrderValue: Number(minOrderValue || 0),
        expiresAt: expiresAt || '2027-12-31',
        status: 'Active'
    };
    coupons.push(newCoup);
    res.status(201).json(newCoup);
});

app.delete('/api/coupons/:id', authenticateToken, requireAdmin, (req, res) => {
    coupons = coupons.filter(c => c.id !== req.params.id);
    res.json({ message: 'Coupon removed' });
});

// --- REVIEWS ---
app.get('/api/reviews', (req, res) => {
    res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
    const { productId, customerName, customerCity, rating, comment } = req.body;
    const newRev = {
        id: `rev-${Date.now()}`,
        productId,
        customerName: customerName || 'Verified Buyer',
        customerCity: customerCity || 'Pakistan',
        rating: Number(rating || 5),
        comment,
        date: new Date().toISOString().split('T')[0],
        status: 'Approved' // auto-approve for seamless test experience
    };
    reviews.unshift(newRev);

    // Recalculate Product Rating
    const prod = products.find(p => p.id === productId);
    if (prod) {
        const prodRevs = reviews.filter(r => r.productId === productId && r.status === 'Approved');
        const totalScore = prodRevs.reduce((acc, r) => acc + r.rating, 0);
        prod.reviewCount = prodRevs.length;
        prod.rating = Number((totalScore / prodRevs.length).toFixed(1));
    }

    res.status(201).json(newRev);
});

app.put('/api/reviews/:id/status', authenticateToken, requireAdmin, (req, res) => {
    const { status } = req.body;
    const rev = reviews.find(r => r.id === req.params.id);
    if (!rev) return res.status(404).json({ message: 'Review not found' });
    rev.status = status;
    res.json(rev);
});

// --- BANNERS ---
app.get('/api/banners', (req, res) => {
    res.json(banners);
});

app.post('/api/banners', authenticateToken, requireAdmin, (req, res) => {
    const { title, subtitle, buttonText, link, imageUrl } = req.body;
    const newBan = {
        id: `ban-${Date.now()}`,
        title,
        subtitle: subtitle || '',
        buttonText: buttonText || 'Shop Now',
        link: link || '/shop',
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=80',
        status: 'Active'
    };
    banners.push(newBan);
    res.status(201).json(newBan);
});

app.delete('/api/banners/:id', authenticateToken, requireAdmin, (req, res) => {
    banners = banners.filter(b => b.id !== req.params.id);
    res.json({ message: 'Banner removed' });
});

// SPA Fallback Route for non-API requests
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`✨ VELLORA REST API & Web Store running on http://localhost:${PORT}`);
});
