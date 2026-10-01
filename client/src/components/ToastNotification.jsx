import React from 'react';
import { Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastNotification = () => {
    const { toastMessage } = useShop();

    if (!toastMessage) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#2C1810] text-[#FAF6F0] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D4AF37] flex items-center gap-3 animate-fade-in">
            <div className="p-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full">
                <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
                <p className="font-serif font-bold text-xs tracking-wider uppercase text-[#D4AF37]">Vellora Boutique</p>
                <p className="text-xs text-white mt-0.5 font-medium">{toastMessage}</p>
            </div>
        </div>
    );
};
