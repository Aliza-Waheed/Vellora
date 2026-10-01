// Client API service for Vellora E-Commerce REST Endpoints

const API_BASE = '/api';

export const api = {
    // --- AUTH ---
    async login(email, password) {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');
        return data;
    },

    async register(userData) {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Registration failed');
        return data;
    },

    async getMe(token) {
        const res = await fetch(`${API_BASE}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Session invalid');
        return data;
    },

    // --- CATEGORIES ---
    async getCategories() {
        const res = await fetch(`${API_BASE}/categories`);
        return await res.json();
    },

    // --- PRODUCTS ---
    async getProducts(params = {}) {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_BASE}/products?${query}`);
        return await res.json();
    },

    async getProductById(id) {
        const res = await fetch(`${API_BASE}/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Product not found');
        return data;
    },

    async createProduct(token, productData) {
        const res = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to create product');
        return data;
    },

    async updateProduct(token, id, productData) {
        const res = await fetch(`${API_BASE}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to update product');
        return data;
    },

    async deleteProduct(token, id) {
        const res = await fetch(`${API_BASE}/products/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to delete product');
        return data;
    },

    // --- ORDERS ---
    async createOrder(orderPayload) {
        const res = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to create order');
        return data;
    },

    async getOrders(token, email = null) {
        const url = email ? `${API_BASE}/orders?email=${encodeURIComponent(email)}` : `${API_BASE}/orders`;
        const res = await fetch(url, {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        return await res.json();
    },

    async trackOrder(orderId) {
        const res = await fetch(`${API_BASE}/orders/track/${orderId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Order not found');
        return data;
    },

    async updateOrderStatus(token, orderId, status) {
        const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to update order status');
        return data;
    },

    // --- COUPONS ---
    async validateCoupon(code, subtotal) {
        const res = await fetch(`${API_BASE}/coupons/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, subtotal })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Invalid coupon');
        return data;
    },

    async getCoupons() {
        const res = await fetch(`${API_BASE}/coupons`);
        return await res.json();
    },

    async createCoupon(token, couponData) {
        const res = await fetch(`${API_BASE}/coupons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(couponData)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to create coupon');
        return data;
    },

    async deleteCoupon(token, id) {
        const res = await fetch(`${API_BASE}/coupons/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return await res.json();
    },

    // --- REVIEWS ---
    async submitReview(reviewData) {
        const res = await fetch(`${API_BASE}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        });
        return await res.json();
    },

    async getReviews() {
        const res = await fetch(`${API_BASE}/reviews`);
        return await res.json();
    },

    // --- BANNERS ---
    async getBanners() {
        const res = await fetch(`${API_BASE}/banners`);
        return await res.json();
    }
};
