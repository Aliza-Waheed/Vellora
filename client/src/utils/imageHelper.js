// imageHelper.js
// Ensures image paths resolve seamlessly in all environments:
// Vite dev (port 3000/5173), Express server (port 5000), VS Code Live Server (port 5500),
// or standalone static previews.

export const resolveImageUrl = (path) => {
    if (!path) return 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
        return path;
    }
    return path;
};

// Safe image error handler that tries multiple fallback paths before settling on a graceful luxury placeholder
export const handleImageError = (e, fallbackSrc = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80') => {
    const currentSrc = e.currentTarget.src || '';
    const retryCount = Number(e.currentTarget.dataset.retry || 0);

    // If it is already the fallback image or retry limit reached, stop to prevent loops
    if (currentSrc.includes('unsplash.com') || retryCount >= 3) {
        return;
    }

    e.currentTarget.dataset.retry = retryCount + 1;

    if (currentSrc.includes('/images/')) {
        const imagePart = currentSrc.substring(currentSrc.indexOf('/images/'));
        if (retryCount === 0) {
            e.currentTarget.src = `./dist${imagePart}`;
        } else if (retryCount === 1) {
            e.currentTarget.src = `./client/dist${imagePart}`;
        } else {
            e.currentTarget.src = fallbackSrc;
        }
    } else {
        e.currentTarget.src = fallbackSrc;
    }
};
