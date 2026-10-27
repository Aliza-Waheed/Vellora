// Clean Seed Data for Vellora E-Commerce Store with Real Luxury & Chiffon Pakistani Dresses

export const initialCategories = [
    {
        id: "cat-chiffon",
        name: "Chiffon Luxury",
        slug: "chiffon-luxury",
        description: "Exquisite pure georgette & chiffon dresses featuring intricate scalloped lace, tilla, and floral embroidery.",
        image: "/images/chiffon-luxury-dresses/chiffon-01.jpg",
        subcategories: ["Chiffon Luxury Dress"]
    },
    {
        id: "cat-festive",
        name: "Festive Formal",
        slug: "festive-formal",
        description: "Opulent wedding & celebration ensembles adorned with hand-placed pearls, tilla, and sequins.",
        image: "/images/festive-formal/festive-01.jpg",
        subcategories: ["Festive Formal"]
    },
    {
        id: "cat-velvet",
        name: "Velvet Edition",
        slug: "velvet-edition",
        description: "Regal micro-velvet kurtas, angrakhas, and heavily embroidered dupattas in rich royal jewel tones.",
        image: "/images/velvet-edition/velvet-01.jpg",
        subcategories: ["Velvet Edition"]
    },
    {
        id: "cat-ready",
        name: "Ready-to-Wear",
        slug: "ready-to-wear",
        description: "Designer pret-a-porter stitched 3-piece and 2-piece ensembles tailored to perfection.",
        image: "/images/ready-to-wear/ready-to-wear-01.jpg",
        subcategories: ["Ready-to-Wear Stitched"]
    },
    {
        id: "cat-luxury",
        name: "Luxury Dresses",
        slug: "luxury-dresses",
        description: "Signature raw silk, metallic tissue, and pastel embroidered luxury master pieces.",
        image: "/images/luxury-dresses/dress-01.jpg",
        subcategories: ["Luxury Dresses"]
    }
];

export const initialProducts = [
    // --- LUXURY DRESSES SUB-SECTION ---
    {
        id: "prod-lux-01",
        name: "Noor-e-Bahar Pastel Yellow Chiffon 3-Piece",
        slug: "noor-e-bahar-pastel-yellow-chiffon",
        categoryId: "cat-dresses",
        subcategory: "Luxury Dresses",
        brand: "Vellora Luxury",
        price: 14500,
        originalPrice: 17000,
        discountPercent: 15,
        stock: 20,
        rating: 4.9,
        reviewCount: 24,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "An ethereal pastel butter-yellow 3-piece designer chiffon suite featuring intricate floral scalloped lace borders along the neckline, sleeve cuffs, and full dupatta borders. Paired with sleek silk wide-leg trousers.",
        fabric: "Pure Georgette Chiffon & Raw Silk Trousers",
        stitchedType: "Ready-to-Wear / Custom Stitched",
        images: [
            "/images/luxury-dresses/dress-01.jpg"
        ],
        variants: [
            { id: "v101", type: "Size", value: "Small", priceExtra: 0, stock: 5 },
            { id: "v102", type: "Size", value: "Medium", priceExtra: 0, stock: 10 },
            { id: "v103", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Pastel Butter Yellow"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-lux-02",
        name: "Chandni Shimmer Metallic Tissue Suit",
        slug: "chandni-shimmer-metallic-tissue-suit",
        categoryId: "cat-dresses",
        subcategory: "Luxury Dresses",
        brand: "Vellora Signature",
        price: 18900,
        originalPrice: 22500,
        discountPercent: 16,
        stock: 15,
        rating: 5.0,
        reviewCount: 31,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Royal silver-grey shimmery metallic tissue kameez encrusted with subtle hand-stitched mirror work and silver sequins, paired with a soft lavender organza dupatta featuring shimmering borders.",
        fabric: "Metallic Tissue Silk & Organza Dupatta",
        stitchedType: "Stitched Festive Edition",
        images: [
            "/images/luxury-dresses/dress-02.jpg"
        ],
        variants: [
            { id: "v104", type: "Size", value: "Small", priceExtra: 0, stock: 5 },
            { id: "v105", type: "Size", value: "Medium", priceExtra: 0, stock: 7 },
            { id: "v106", type: "Size", value: "Large", priceExtra: 0, stock: 3 }
        ],
        colors: ["Silver Grey & Soft Lavender"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-lux-03",
        name: "Gul-e-Rana Dusty Rose Pearl Dupatta Set",
        slug: "gul-e-rana-dusty-rose-pearl-set",
        categoryId: "cat-dresses",
        subcategory: "Luxury Dresses",
        brand: "Vellora Royale",
        price: 16800,
        originalPrice: 19500,
        discountPercent: 14,
        stock: 25,
        rating: 4.8,
        reviewCount: 19,
        isNewArrival: true,
        isBestSeller: false,
        isFeatured: true,
        description: "Enchanting dusty rose mauve 3-piece chiffon outfit crafted with hand-sewn pearl trim and cutwork scalloped lace edging that cascades gracefully down the full-length dupatta and neckline.",
        fabric: "Premium Pure Chiffon & Silk Linings",
        stitchedType: "Stitched Festive",
        images: [
            "/images/luxury-dresses/dress-03.jpg"
        ],
        variants: [
            { id: "v107", type: "Size", value: "Small", priceExtra: 0, stock: 8 },
            { id: "v108", type: "Size", value: "Medium", priceExtra: 0, stock: 12 },
            { id: "v109", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Dusty Rose Mauve"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-lux-04",
        name: "Shahzadi Antique Gold Side-Slit Silk Ensemble",
        slug: "shahzadi-antique-gold-side-slit-ensemble",
        categoryId: "cat-dresses",
        subcategory: "Luxury Dresses",
        brand: "Vellora Heritage",
        price: 21500,
        originalPrice: 25000,
        discountPercent: 14,
        stock: 12,
        rating: 4.9,
        reviewCount: 42,
        isNewArrival: false,
        isBestSeller: true,
        isFeatured: true,
        description: "A showstopping antique gold-bronze raw silk long kameez featuring high side slits highlighted with elaborate silver & gold tilla zari border work, paired with matching cigarette pants.",
        fabric: "Pure Raw Silk 80-Grams",
        stitchedType: "Ready-to-Wear Couture",
        images: [
            "/images/luxury-dresses/dress-04.jpg"
        ],
        variants: [
            { id: "v110", type: "Size", value: "Small", priceExtra: 0, stock: 4 },
            { id: "v111", type: "Size", value: "Medium", priceExtra: 0, stock: 5 },
            { id: "v112", type: "Size", value: "Large", priceExtra: 0, stock: 3 }
        ],
        colors: ["Antique Gold Bronze"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-lux-05",
        name: "Mehrunisa Beaded Lavender Chiffon Maxi Suite",
        slug: "mehrunisa-beaded-lavender-chiffon-maxi",
        categoryId: "cat-dresses",
        subcategory: "Luxury Dresses",
        brand: "Vellora Couture",
        price: 23000,
        originalPrice: 27000,
        discountPercent: 15,
        stock: 18,
        rating: 5.0,
        reviewCount: 38,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Stunning royal lavender floor-length flared gown with heavily embellished translucent net long sleeves adorned with crystal beads, silver sequins, and pearls. Includes matching sheer dupatta.",
        fabric: "Pure Chiffon & Hand-Beaded Net",
        stitchedType: "Bridal / Evening Luxury Stitched",
        images: [
            "/images/luxury-dresses/dress-05.jpg"
        ],
        variants: [
            { id: "v113", type: "Size", value: "Small", priceExtra: 0, stock: 6 },
            { id: "v114", type: "Size", value: "Medium", priceExtra: 0, stock: 8 },
            { id: "v115", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Soft Lavender Lilac"],
        sizes: ["Small", "Medium", "Large"]
    },

    // --- CHIFFON LUXURY DRESS SUB-SECTION ---
    {
        id: "prod-chiffon-01",
        name: "Aayat Dusty Rose Pleated Chiffon Maxi Gown",
        slug: "aayat-dusty-rose-pleated-chiffon-maxi",
        categoryId: "cat-dresses",
        subcategory: "Chiffon Luxury Dress",
        brand: "Vellora Luxury",
        price: 15900,
        originalPrice: 18500,
        discountPercent: 14,
        stock: 25,
        rating: 5.0,
        reviewCount: 29,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "An ethereal dusty rose mauve floor-length pleated chiffon maxi dress featuring a structured wrap-over V-neckline bodice, sheer bishop sleeves with elastic cuffs, and a voluminous flared skirt.",
        fabric: "Pure Georgette Chiffon & Silk Linings",
        stitchedType: "Stitched Festive Maxi",
        images: [
            "/images/chiffon-luxury-dresses/chiffon-01.jpg"
        ],
        variants: [
            { id: "v201", type: "Size", value: "Small", priceExtra: 0, stock: 8 },
            { id: "v202", type: "Size", value: "Medium", priceExtra: 0, stock: 12 },
            { id: "v203", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Dusty Rose Mauve"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-chiffon-02",
        name: "Sulaimani Royal Purple Ruffled Chiffon Maxi",
        slug: "sulaimani-royal-purple-ruffled-chiffon-maxi",
        categoryId: "cat-dresses",
        subcategory: "Chiffon Luxury Dress",
        brand: "Vellora Signature",
        price: 17500,
        originalPrice: 20000,
        discountPercent: 12,
        stock: 18,
        rating: 4.9,
        reviewCount: 34,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Deep royal purple flared chiffon gown styled with delicate frill ruffled neckline detail, long puff sleeves with gathered frilled wrist cuffs, cinched waistline, and a tiered ruffled bottom hem.",
        fabric: "Premium Sheer Chiffon & Soft Lining",
        stitchedType: "Stitched Ready-to-Wear",
        images: [
            "/images/chiffon-luxury-dresses/chiffon-02.jpg"
        ],
        variants: [
            { id: "v204", type: "Size", value: "Small", priceExtra: 0, stock: 6 },
            { id: "v205", type: "Size", value: "Medium", priceExtra: 0, stock: 8 },
            { id: "v206", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Deep Royal Purple"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-chiffon-03",
        name: "Kashish Mulberry Purple Anarkali Chiffon Frock",
        slug: "kashish-mulberry-purple-anarkali-frock",
        categoryId: "cat-dresses",
        subcategory: "Chiffon Luxury Dress",
        brand: "Vellora Royale",
        price: 16200,
        originalPrice: 19000,
        discountPercent: 15,
        stock: 20,
        rating: 4.8,
        reviewCount: 22,
        isNewArrival: false,
        isBestSeller: true,
        isFeatured: true,
        description: "Regal mulberry purple twirling Anarkali chiffon frock featuring subtle lace edging around the neck and wrist, paired with a matching lightweight flowing chiffon dupatta.",
        fabric: "Pure Chiffon & Silk Under-Layer",
        stitchedType: "Stitched Anarkali",
        images: [
            "/images/chiffon-luxury-dresses/chiffon-03.jpg"
        ],
        variants: [
            { id: "v207", type: "Size", value: "Small", priceExtra: 0, stock: 5 },
            { id: "v208", type: "Size", value: "Medium", priceExtra: 0, stock: 10 },
            { id: "v209", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Mulberry Deep Purple"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-chiffon-04",
        name: "Shab-e-Noor Jet Black Flared Chiffon Maxi",
        slug: "shab-e-noor-jet-black-flared-chiffon-maxi",
        categoryId: "cat-dresses",
        subcategory: "Chiffon Luxury Dress",
        brand: "Vellora Heritage",
        price: 18000,
        originalPrice: 21500,
        discountPercent: 16,
        stock: 15,
        rating: 5.0,
        reviewCount: 45,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Elegant jet black floor-length chiffon maxi dress with high neck keyhole collar design, long sheer translucent sleeves, and intricate scalloped lace border trim along the skirt hem.",
        fabric: "Pure Micro-Chiffon & Cutwork Net",
        stitchedType: "Evening Stitched Maxi",
        images: [
            "/images/chiffon-luxury-dresses/chiffon-04.jpg"
        ],
        variants: [
            { id: "v210", type: "Size", value: "Small", priceExtra: 0, stock: 5 },
            { id: "v211", type: "Size", value: "Medium", priceExtra: 0, stock: 6 },
            { id: "v212", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Jet Black"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-chiffon-05",
        name: "Dilkash Magenta Angrakha Chiffon Flared Suite",
        slug: "dilkash-magenta-angrakha-chiffon-suite",
        categoryId: "cat-dresses",
        subcategory: "Chiffon Luxury Dress",
        brand: "Vellora Couture",
        price: 19500,
        originalPrice: 23000,
        discountPercent: 15,
        stock: 22,
        rating: 4.9,
        reviewCount: 31,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Breathtaking deep magenta purple wrap-style angrakha chiffon flared maxi featuring delicate braided cord neckline accent, fitted long sleeves, and a draped sheer dupatta.",
        fabric: "Pure Chiffon & Silk Lining",
        stitchedType: "Angrakha Stitched Suite",
        images: [
            "/images/chiffon-luxury-dresses/chiffon-05.jpg"
        ],
        variants: [
            { id: "v213", type: "Size", value: "Small", priceExtra: 0, stock: 7 },
            { id: "v214", type: "Size", value: "Medium", priceExtra: 0, stock: 10 },
            { id: "v215", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Deep Magenta Purple"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-chiffon-06",
        name: "Meher Soft Peach Ruffled Chiffon Maxi",
        slug: "meher-soft-peach-ruffled-chiffon-maxi",
        categoryId: "cat-dresses",
        subcategory: "Chiffon Luxury Dress",
        brand: "Vellora Luxury",
        price: 16500,
        originalPrice: 19500,
        discountPercent: 15,
        stock: 20,
        rating: 4.9,
        reviewCount: 18,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "A serene pastel peach long flowy chiffon maxi dress featuring delicate gathering at the high waistline, long sleeves, a wide flared skirt with lower tier ruffle detailing, and a matching sheer dupatta.",
        fabric: "Pure Georgette Chiffon & Silk Under-slip",
        stitchedType: "Stitched Festive Maxi",
        images: [
            "/images/chiffon-luxury-dresses/chiffon-06.jpg"
        ],
        variants: [
            { id: "v216", type: "Size", value: "Small", priceExtra: 0, stock: 6 },
            { id: "v217", type: "Size", value: "Medium", priceExtra: 0, stock: 9 },
            { id: "v218", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Soft Peach Pink"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-chiffon-07",
        name: "Ruhi Crimson Maroon Loop-Button Chiffon Maxi",
        slug: "ruhi-crimson-maroon-loop-button-chiffon-maxi",
        categoryId: "cat-dresses",
        subcategory: "Chiffon Luxury Dress",
        brand: "Vellora Signature",
        price: 17900,
        originalPrice: 21000,
        discountPercent: 15,
        stock: 16,
        rating: 5.0,
        reviewCount: 27,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "An exquisite deep crimson maroon sheer chiffon gown styled with handcrafted fabric loop buttons along the front bodice, translucent long sleeves, waist pleats, and a floor-sweeping flare paired with a matching dupatta.",
        fabric: "Pure Sheer Chiffon & Inner Lining",
        stitchedType: "Ready-to-Wear Festive",
        images: [
            "/images/chiffon-luxury-dresses/chiffon-07.jpg"
        ],
        variants: [
            { id: "v219", type: "Size", value: "Small", priceExtra: 0, stock: 5 },
            { id: "v220", type: "Size", value: "Medium", priceExtra: 0, stock: 7 },
            { id: "v221", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Deep Crimson Maroon"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-chiffon-08",
        name: "Inayat Sky Blue Pleated Lace Chiffon Suite",
        slug: "inayat-sky-blue-pleated-lace-chiffon-suite",
        categoryId: "cat-dresses",
        subcategory: "Chiffon Luxury Dress",
        brand: "Vellora Royale",
        price: 18500,
        originalPrice: 22000,
        discountPercent: 16,
        stock: 22,
        rating: 4.9,
        reviewCount: 35,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Graceful sky blue pleated chiffon long gown with band collar, full-length front loop button placket, fine vertical pin-pleat textures, heavy scalloped lace embroidery along the hem, and matching lace dupatta.",
        fabric: "Micro-Pleated Chiffon & Cutwork Lace",
        stitchedType: "Luxury Stitched Edition",
        images: [
            "/images/chiffon-luxury-dresses/chiffon-08.jpg"
        ],
        variants: [
            { id: "v222", type: "Size", value: "Small", priceExtra: 0, stock: 7 },
            { id: "v223", type: "Size", value: "Medium", priceExtra: 0, stock: 10 },
            { id: "v224", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Sky Blue / Powder Blue"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-chiffon-09",
        name: "Zoya Emerald Green Empire Flare Chiffon Maxi",
        slug: "zoya-emerald-green-empire-flare-chiffon-maxi",
        categoryId: "cat-dresses",
        subcategory: "Chiffon Luxury Dress",
        brand: "Vellora Heritage",
        price: 17200,
        originalPrice: 20000,
        discountPercent: 14,
        stock: 19,
        rating: 4.8,
        reviewCount: 21,
        isNewArrival: true,
        isBestSeller: false,
        isFeatured: true,
        description: "Sophisticated deep bottle green flared chiffon maxi dress with high scoop neck, fitted empire-waist seams, translucent long sleeves, voluminous skirt drape, and a matching chiffon scarf dupatta.",
        fabric: "Pure Chiffon & Breathable Silk Lining",
        stitchedType: "Stitched Maxi Suite",
        images: [
            "/images/chiffon-luxury-dresses/chiffon-09.jpg"
        ],
        variants: [
            { id: "v225", type: "Size", value: "Small", priceExtra: 0, stock: 6 },
            { id: "v226", type: "Size", value: "Medium", priceExtra: 0, stock: 8 },
            { id: "v227", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Dark Bottle Green"],
        sizes: ["Small", "Medium", "Large"]
    },

    // --- VELVET EDITION SUB-SECTION ---
    {
        id: "prod-velvet-01",
        name: "Emerald Queen Sweetheart Velvet Floor Gown",
        slug: "emerald-queen-sweetheart-velvet-floor-gown",
        categoryId: "cat-dresses",
        subcategory: "Velvet Edition",
        brand: "Vellora Royale",
        price: 21500,
        originalPrice: 25000,
        discountPercent: 14,
        stock: 15,
        rating: 5.0,
        reviewCount: 32,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "A regal deep emerald green floor-length velvet maxi gown featuring a structured sweetheart neckline, fitted full-length sleeves, tailored bodice darting, and a dramatic voluminous skirt flare.",
        fabric: "Royal Micro-Velvet 9000 & Silk Lining",
        stitchedType: "Stitched Evening Gown",
        images: [
            "/images/velvet-edition/velvet-01.jpg"
        ],
        variants: [
            { id: "v301", type: "Size", value: "Small", priceExtra: 0, stock: 5 },
            { id: "v302", type: "Size", value: "Medium", priceExtra: 0, stock: 6 },
            { id: "v303", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Deep Emerald Green"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-velvet-02",
        name: "Shab-e-Zari Jet Black Embellished Velvet Gown",
        slug: "shab-e-zari-jet-black-embellished-velvet-gown",
        categoryId: "cat-dresses",
        subcategory: "Velvet Edition",
        brand: "Vellora Heritage",
        price: 23900,
        originalPrice: 28000,
        discountPercent: 15,
        stock: 18,
        rating: 4.9,
        reviewCount: 29,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Glamorous jet black velvet flared maxi dress with romantic puff sleeves, sweetheart neck accent adorned with hand-embroidered silver crystals & sequin motif, and a wide flowing hem flare.",
        fabric: "Plush Micro-Velvet & Crystal Beadwork",
        stitchedType: "Stitched Festive Edition",
        images: [
            "/images/velvet-edition/velvet-02.jpg"
        ],
        variants: [
            { id: "v304", type: "Size", value: "Small", priceExtra: 0, stock: 6 },
            { id: "v305", type: "Size", value: "Medium", priceExtra: 0, stock: 8 },
            { id: "v306", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Jet Black & Silver Shimmer"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-velvet-03",
        name: "Gul-e-Nihar Crushed Rose Velvet Straight Suite",
        slug: "gul-e-nihar-crushed-rose-velvet-straight-suite",
        categoryId: "cat-dresses",
        subcategory: "Velvet Edition",
        brand: "Vellora Luxury",
        price: 18500,
        originalPrice: 22000,
        discountPercent: 16,
        stock: 22,
        rating: 4.8,
        reviewCount: 20,
        isNewArrival: true,
        isBestSeller: false,
        isFeatured: true,
        description: "Effortlessly elegant dusty rose mauve crushed velvet straight-fit long maxi suit styled with classic round neck, gathered frill wrist cuffs, and a soft subtle sheen finish for winter festivities.",
        fabric: "Crushed Sheen Velvet & Silk Lining",
        stitchedType: "Stitched Straight Maxi",
        images: [
            "/images/velvet-edition/velvet-03.jpg"
        ],
        variants: [
            { id: "v307", type: "Size", value: "Small", priceExtra: 0, stock: 7 },
            { id: "v308", type: "Size", value: "Medium", priceExtra: 0, stock: 10 },
            { id: "v309", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Dusty Rose Mauve"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-velvet-04",
        name: "Royalty Magenta Shimmer Silk Velvet Maxi",
        slug: "royalty-magenta-shimmer-silk-velvet-maxi",
        categoryId: "cat-dresses",
        subcategory: "Velvet Edition",
        brand: "Vellora Couture",
        price: 22000,
        originalPrice: 26000,
        discountPercent: 15,
        stock: 14,
        rating: 5.0,
        reviewCount: 41,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "A showstopping deep magenta berry silk-velvet flared maxi gown with voluminous bishop sleeves, fitted buttoned cuffs, high round neckline, and a gleaming high-luster finish.",
        fabric: "Silk Velvet Shimmer & Satin Under-layer",
        stitchedType: "Stitched Royal Maxi",
        images: [
            "/images/velvet-edition/velvet-04.jpg"
        ],
        variants: [
            { id: "v310", type: "Size", value: "Small", priceExtra: 0, stock: 4 },
            { id: "v311", type: "Size", value: "Medium", priceExtra: 0, stock: 6 },
            { id: "v312", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Deep Magenta Berry"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-velvet-05",
        name: "Sultana Royal Purple Square-Neck Velvet Gown",
        slug: "sultana-royal-purple-square-neck-velvet-gown",
        categoryId: "cat-dresses",
        subcategory: "Velvet Edition",
        brand: "Vellora Signature",
        price: 20500,
        originalPrice: 24000,
        discountPercent: 15,
        stock: 20,
        rating: 4.9,
        reviewCount: 36,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Opulent deep royal purple velvet flared maxi gown boasting a clean square-cut neckline, tailored full-length fitted sleeves, gathers at the waistline, and an effortless floor-touch silhouette.",
        fabric: "Premium Pure Velvet 9000",
        stitchedType: "Stitched Velvet Couture",
        images: [
            "/images/velvet-edition/velvet-05.jpg"
        ],
        variants: [
            { id: "v313", type: "Size", value: "Small", priceExtra: 0, stock: 6 },
            { id: "v314", type: "Size", value: "Medium", priceExtra: 0, stock: 9 },
            { id: "v315", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Royal Deep Purple"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-velvet-06",
        name: "Shabnam Deep Mulberry Velvet Zari 3-Piece",
        slug: "shabnam-deep-mulberry-velvet-zari-3-piece",
        categoryId: "cat-dresses",
        subcategory: "Velvet Edition",
        brand: "Vellora Heritage",
        price: 19800,
        originalPrice: 23500,
        discountPercent: 16,
        stock: 20,
        rating: 4.9,
        reviewCount: 25,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Opulent deep mulberry purple velvet long straight kurti paired with sleek velvet trousers and a sheer organza dupatta highlighted with heavy gold tilla zari border trim and delicate sequin spangles.",
        fabric: "Pure Micro-Velvet & Tilla Zari Sheer Dupatta",
        stitchedType: "Stitched 3-Piece Suite",
        images: [
            "/images/velvet-edition/velvet-06.jpg"
        ],
        variants: [
            { id: "v316", type: "Size", value: "Small", priceExtra: 0, stock: 6 },
            { id: "v317", type: "Size", value: "Medium", priceExtra: 0, stock: 9 },
            { id: "v318", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Deep Mulberry Purple & Gold Zari"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-velvet-07",
        name: "Maison Wine Maroon Velvet Zari Border Kameez Set",
        slug: "maison-wine-maroon-velvet-zari-border-kameez-set",
        categoryId: "cat-dresses",
        subcategory: "Velvet Edition",
        brand: "Vellora Couture",
        price: 22500,
        originalPrice: 26000,
        discountPercent: 13,
        stock: 15,
        rating: 5.0,
        reviewCount: 38,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Sophisticated deep wine maroon velvet long kameez embellished with intricate antique silver zari lace borders extending along the neckline, front side panel seams, sleeve cuffs, and hem, paired with straight trousers.",
        fabric: "Plush Velvet 9000 & Antique Silver Zari",
        stitchedType: "Ready-to-Wear Designer Set",
        images: [
            "/images/velvet-edition/velvet-07.jpg"
        ],
        variants: [
            { id: "v319", type: "Size", value: "Small", priceExtra: 0, stock: 5 },
            { id: "v320", type: "Size", value: "Medium", priceExtra: 0, stock: 6 },
            { id: "v321", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Wine Maroon & Antique Silver"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-velvet-08",
        name: "Nayaab Navy Velvet Organza Cuff Set with Shawl",
        slug: "nayaab-navy-velvet-organza-cuff-set-with-shawl",
        categoryId: "cat-dresses",
        subcategory: "Velvet Edition",
        brand: "Vellora Royale",
        price: 24000,
        originalPrice: 28000,
        discountPercent: 14,
        stock: 18,
        rating: 4.9,
        reviewCount: 31,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Regal navy blue velvet long kurti with unique translucent organza striped sleeve cuffs and hem details, paired with matching wide-leg velvet trousers and a cozy warm beige cashmere wool shawl.",
        fabric: "Pure Velvet, Organza Sheer Inserts & Warm Wool Shawl",
        stitchedType: "Winter Couture 3-Piece",
        images: [
            "/images/velvet-edition/velvet-08.jpg"
        ],
        variants: [
            { id: "v322", type: "Size", value: "Small", priceExtra: 0, stock: 5 },
            { id: "v323", type: "Size", value: "Medium", priceExtra: 0, stock: 8 },
            { id: "v324", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Royal Navy Blue & Warm Beige"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-velvet-09",
        name: "Dilruba Crimson V-Neck Wrap Velvet Maxi Gown",
        slug: "dilruba-crimson-v-neck-wrap-velvet-maxi-gown",
        categoryId: "cat-dresses",
        subcategory: "Velvet Edition",
        brand: "Vellora Luxury",
        price: 21900,
        originalPrice: 25500,
        discountPercent: 14,
        stock: 16,
        rating: 5.0,
        reviewCount: 22,
        isNewArrival: true,
        isBestSeller: false,
        isFeatured: true,
        description: "Captivating deep crimson red velvet flared maxi gown featuring a faux-surplice V-neckline wrap bodice, fitted waist seam, long slim sleeves, and a floor-length sweeping skirt drape.",
        fabric: "Plush Velvet & Breathable Silk Lining",
        stitchedType: "Stitched Evening Gown",
        images: [
            "/images/velvet-edition/velvet-09.jpg"
        ],
        variants: [
            { id: "v325", type: "Size", value: "Small", priceExtra: 0, stock: 5 },
            { id: "v326", type: "Size", value: "Medium", priceExtra: 0, stock: 7 },
            { id: "v327", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Crimson Wine Red"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-velvet-10",
        name: "Midnight Queen Square-Neck Velvet Flared Gown",
        slug: "midnight-queen-square-neck-velvet-flared-gown",
        categoryId: "cat-dresses",
        subcategory: "Velvet Edition",
        brand: "Vellora Signature",
        price: 23000,
        originalPrice: 27000,
        discountPercent: 15,
        stock: 17,
        rating: 4.9,
        reviewCount: 44,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Stunning midnight navy blue floor-length velvet maxi gown designed with a structured square-cut neck collar, form-fitting long sleeves, and a plush flared skirt with natural heavy drape.",
        fabric: "Royal Micro-Velvet 9000 & Satin Lining",
        stitchedType: "Stitched Velvet Maxi",
        images: [
            "/images/velvet-edition/velvet-10.jpg"
        ],
        variants: [
            { id: "v328", type: "Size", value: "Small", priceExtra: 0, stock: 5 },
            { id: "v329", type: "Size", value: "Medium", priceExtra: 0, stock: 8 },
            { id: "v330", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Midnight Navy Blue"],
        sizes: ["Small", "Medium", "Large"]
    },

    // --- FESTIVE FORMAL SUB-SECTION ---
    {
        id: "prod-festive-01",
        name: "Gul-e-Zari Plum Maroon Scalloped Silk Suite",
        slug: "gul-e-zari-plum-maroon-scalloped-silk-suite",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Heritage",
        price: 26500,
        originalPrice: 31000,
        discountPercent: 15,
        stock: 15,
        rating: 5.0,
        reviewCount: 37,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Exquisite deep plum maroon raw silk long kameez featuring elaborate antique gold tilla zari scalloped neck & hem borders, paired with flared silk trousers and a shimmering gold sequin organza dupatta.",
        fabric: "Pure Raw Silk & Embroidered Organza Dupatta",
        stitchedType: "Bridal Festive 3-Piece",
        images: [
            "/images/festive-formal/festive-01.jpg"
        ],
        variants: [
            { id: "v401", type: "Size", value: "Small", priceExtra: 0, stock: 5 },
            { id: "v402", type: "Size", value: "Medium", priceExtra: 0, stock: 6 },
            { id: "v403", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Plum Maroon & Antique Gold"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-festive-02",
        name: "Zamurrad Emerald Green Hand-Beaded Festive Suite",
        slug: "zamurrad-emerald-green-hand-beaded-festive-suite",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Royale",
        price: 28900,
        originalPrice: 34000,
        discountPercent: 15,
        stock: 12,
        rating: 4.9,
        reviewCount: 42,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Breathtaking emerald green silk short shirt adorned with hand-beaded crystal bodice motifs, sheer embroidered net sleeves, paired with silk tulip shalwar pants and a scalloped organza dupatta.",
        fabric: "Pure Silk Satin, Net Sleeves & Silk Linings",
        stitchedType: "Stitched Festive Formal",
        images: [
            "/images/festive-formal/festive-02.jpg"
        ],
        variants: [
            { id: "v404", type: "Size", value: "Small", priceExtra: 0, stock: 4 },
            { id: "v405", type: "Size", value: "Medium", priceExtra: 0, stock: 5 },
            { id: "v406", type: "Size", value: "Large", priceExtra: 0, stock: 3 }
        ],
        colors: ["Emerald Green"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-festive-03",
        name: "Mehr-un-Nisa Olive Sage Raw Silk Ensemble",
        slug: "mehr-un-nisa-olive-sage-raw-silk-ensemble",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Luxury",
        price: 24500,
        originalPrice: 29000,
        discountPercent: 16,
        stock: 18,
        rating: 4.8,
        reviewCount: 28,
        isNewArrival: true,
        isBestSeller: false,
        isFeatured: true,
        description: "Understated luxury olive sage green raw silk long kameez with delicate crystal beadwork along the collar, sheer embroidered sleeve accents, straight-leg trousers, and a fluid draped chiffon dupatta.",
        fabric: "80-Gram Pure Raw Silk & Sheer Sleeves",
        stitchedType: "Ready-to-Wear Festive",
        images: [
            "/images/festive-formal/festive-03.jpg"
        ],
        variants: [
            { id: "v407", type: "Size", value: "Small", priceExtra: 0, stock: 6 },
            { id: "v408", type: "Size", value: "Medium", priceExtra: 0, stock: 8 },
            { id: "v409", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Olive Sage Green"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-festive-04",
        name: "Shahkar Bronze Chocolate Mirror-Work Silk Suite",
        slug: "shahkar-bronze-chocolate-mirror-work-silk-suite",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Couture",
        price: 25800,
        originalPrice: 30000,
        discountPercent: 14,
        stock: 14,
        rating: 5.0,
        reviewCount: 31,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Opulent rich chocolate bronze raw silk 3-piece suit showcasing dense mirror-work cuff sleeves, metallic gold beaded border trim along the dupatta, and classic cigarette silk pants.",
        fabric: "Pure Silk Satin & Mirror Embellished Sleeves",
        stitchedType: "Formal Festive Edition",
        images: [
            "/images/festive-formal/festive-04.jpg"
        ],
        variants: [
            { id: "v410", type: "Size", value: "Small", priceExtra: 0, stock: 4 },
            { id: "v411", type: "Size", value: "Medium", priceExtra: 0, stock: 6 },
            { id: "v412", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Deep Chocolate Bronze & Gold"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-festive-05",
        name: "Bandhani Pearl Beige Silk Suite with Heart Tassels",
        slug: "bandhani-pearl-beige-silk-suite-with-heart-tassels",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Signature",
        price: 23500,
        originalPrice: 27500,
        discountPercent: 15,
        stock: 20,
        rating: 4.9,
        reviewCount: 26,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Charming muted pearl beige silk straight kurti featuring keyhole neck detail with velvet heart tassel cords, paired with straight trousers and a traditional dual-tone tan & burgundy bandhani organza dupatta.",
        fabric: "Soft Silk Kurti & Hand-Dyed Bandhani Organza Dupatta",
        stitchedType: "Stitched Festive 3-Piece",
        images: [
            "/images/festive-formal/festive-05.jpg"
        ],
        variants: [
            { id: "v413", type: "Size", value: "Small", priceExtra: 0, stock: 6 },
            { id: "v414", type: "Size", value: "Medium", priceExtra: 0, stock: 9 },
            { id: "v415", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Pearl Beige & Tan Burgundy Bandhani"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-festive-06",
        name: "Silver Sheen Organza Zardozi Scalloped Suite",
        slug: "silver-sheen-organza-zardozi-scalloped-suite",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Royale",
        price: 29500,
        originalPrice: 35000,
        discountPercent: 15,
        stock: 14,
        rating: 5.0,
        reviewCount: 39,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Luminous champagne silver grey tissue organza short kurti heavily embellished with intricate silver zardozi & pearl neckline motifs, scalloped hemline, paired with flared silk trousers and a fluid organza dupatta.",
        fabric: "Pure Organza & Silver Zardozi Embroidery",
        stitchedType: "Designer Festive 3-Piece",
        images: [
            "/images/festive-formal/festive-06.jpg"
        ],
        variants: [
            { id: "v416", type: "Size", value: "Small", priceExtra: 0, stock: 4 },
            { id: "v417", type: "Size", value: "Medium", priceExtra: 0, stock: 6 },
            { id: "v418", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Champagne Silver Grey"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-festive-07",
        name: "Royal Navy Pearl & Tilla Border Silk Ensemble",
        slug: "royal-navy-pearl-tilla-border-silk-ensemble",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Heritage",
        price: 27000,
        originalPrice: 32000,
        discountPercent: 15,
        stock: 16,
        rating: 4.9,
        reviewCount: 33,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Regal midnight navy blue raw silk short shirt featuring handcrafted pearl & gold tilla border trims along the collar and sleeves, paired with wide-leg silk palazzo trousers and a dramatic border-trimmed organza dupatta.",
        fabric: "Pure Raw Silk & Embroidered Organza Dupatta",
        stitchedType: "Stitched Festive Edition",
        images: [
            "/images/festive-formal/festive-07.jpg"
        ],
        variants: [
            { id: "v419", type: "Size", value: "Small", priceExtra: 0, stock: 5 },
            { id: "v420", type: "Size", value: "Medium", priceExtra: 0, stock: 7 },
            { id: "v421", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Midnight Navy Blue & Pearl Gold"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-festive-08",
        name: "Sultana Black Velvet Lapel & Gold Jamawar Lehnga",
        slug: "sultana-black-velvet-lapel-gold-jamawar-lehnga",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Couture",
        price: 32000,
        originalPrice: 38000,
        discountPercent: 15,
        stock: 10,
        rating: 5.0,
        reviewCount: 47,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Showstopping jet black velvet lapel-neck crop blouse adorned with antique gold marori embroidered lapel collar, paired with a voluminous woven antique gold brocade jamawar flared lehnga skirt.",
        fabric: "Micro-Velvet Blouse & Metallic Brocade Jamawar Lehnga",
        stitchedType: "Bridal Festive Lehnga Set",
        images: [
            "/images/festive-formal/festive-08.jpg"
        ],
        variants: [
            { id: "v422", type: "Size", value: "Small", priceExtra: 0, stock: 3 },
            { id: "v423", type: "Size", value: "Medium", priceExtra: 0, stock: 4 },
            { id: "v424", type: "Size", value: "Large", priceExtra: 0, stock: 3 }
        ],
        colors: ["Jet Black & Metallic Antique Gold"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-festive-09",
        name: "Noor-e-Sahar Powder Pink Embroidered Jacket Cape Set",
        slug: "noor-e-sahar-powder-pink-embroidered-jacket-cape-set",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Luxury",
        price: 31500,
        originalPrice: 36000,
        discountPercent: 12,
        stock: 12,
        rating: 4.9,
        reviewCount: 24,
        isNewArrival: true,
        isBestSeller: false,
        isFeatured: true,
        description: "Ethereal powder pink silk 3-piece formal set showcasing a full-length floor-touch sheer organza jacket cape heavily encrusted with sequin floral hand embroidery, worn over a sleek crop inner & wide flared trousers.",
        fabric: "Raw Silk Underlayer & Sheer Embroidered Net Jacket",
        stitchedType: "Ready-to-Wear 3-Piece Cape Set",
        images: [
            "/images/festive-formal/festive-09.jpg"
        ],
        variants: [
            { id: "v425", type: "Size", value: "Small", priceExtra: 0, stock: 4 },
            { id: "v426", type: "Size", value: "Medium", priceExtra: 0, stock: 5 },
            { id: "v427", type: "Size", value: "Large", priceExtra: 0, stock: 3 }
        ],
        colors: ["Powder Pink & Champagne Gold"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-festive-10",
        name: "Shehzadi Deep Wine Gown with Gold Crystal Net Coat",
        slug: "shehzadi-deep-wine-gown-with-gold-crystal-net-coat",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Signature",
        price: 34000,
        originalPrice: 40000,
        discountPercent: 15,
        stock: 11,
        rating: 5.0,
        reviewCount: 52,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Majestic deep wine burgundy silk floor-length inner gown paired with a separate floor-sweeping open-front metallic gold net coat encrusted with dense crystal beadwork and lace scalloped borders.",
        fabric: "Pure Silk Satin Inner Gown & Crystal Net Coat",
        stitchedType: "Royal Bridal Formal 2-Piece",
        images: [
            "/images/festive-formal/festive-10.jpg"
        ],
        variants: [
            { id: "v428", type: "Size", value: "Small", priceExtra: 0, stock: 3 },
            { id: "v429", type: "Size", value: "Medium", priceExtra: 0, stock: 5 },
            { id: "v430", type: "Size", value: "Large", priceExtra: 0, stock: 3 }
        ],
        colors: ["Deep Wine Burgundy & Metallic Gold"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-festive-11",
        name: "Shehnai Deep Burgundy Sequin Chiffon Saree",
        slug: "shehnai-deep-burgundy-sequin-chiffon-saree",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Heritage",
        price: 26000,
        originalPrice: 30000,
        discountPercent: 13,
        stock: 15,
        rating: 5.0,
        reviewCount: 36,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Opulent deep burgundy wine chiffon formal saree styled with a full-sleeve sequin encrusted blouse, elegant pleating, and a shimmering sequin border trim extending along the entire drape.",
        fabric: "Pure Chiffon & Sequin Encrusted Blouse",
        stitchedType: "Stitched Designer Saree Set",
        images: [
            "/images/festive-formal/festive-11.jpg"
        ],
        variants: [
            { id: "v431", type: "Size", value: "Small", priceExtra: 0, stock: 5 },
            { id: "v432", type: "Size", value: "Medium", priceExtra: 0, stock: 6 },
            { id: "v433", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Deep Burgundy Wine"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-festive-12",
        name: "Afreen Lavender Mauve Net Saree with Scalloped Gold Trim",
        slug: "afreen-lavender-mauve-net-saree-scalloped-gold-trim",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Royale",
        price: 28500,
        originalPrice: 33000,
        discountPercent: 14,
        stock: 12,
        rating: 4.9,
        reviewCount: 41,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Dreamy dusty lavender mauve soft net saree featuring heavy antique gold embroidered scalloped border trims and sequin sprigs, paired with a rich dark purple velvet sweetheart neck blouse.",
        fabric: "Soft French Net & Velvet Sweetheart Blouse",
        stitchedType: "Stitched Festive Saree",
        images: [
            "/images/festive-formal/festive-12.jpg"
        ],
        variants: [
            { id: "v434", type: "Size", value: "Small", priceExtra: 0, stock: 4 },
            { id: "v435", type: "Size", value: "Medium", priceExtra: 0, stock: 5 },
            { id: "v436", type: "Size", value: "Large", priceExtra: 0, stock: 3 }
        ],
        colors: ["Dusty Lavender Mauve & Antique Gold"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-festive-13",
        name: "Shab-e-Sitara Midnight Navy Chiffon Saree",
        slug: "shab-e-sitara-midnight-navy-chiffon-saree",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Luxury",
        price: 25500,
        originalPrice: 29500,
        discountPercent: 14,
        stock: 18,
        rating: 5.0,
        reviewCount: 29,
        isNewArrival: true,
        isBestSeller: false,
        isFeatured: true,
        description: "Glamorous midnight navy blue chiffon saree with delicate handcrafted pearl and gold bead scalloped border trims and glittering sequin highlights across the pallu drape.",
        fabric: "Flowy Georgette Chiffon & Pearl Border Trim",
        stitchedType: "Ready-to-Wear Saree",
        images: [
            "/images/festive-formal/festive-13.jpg"
        ],
        variants: [
            { id: "v437", type: "Size", value: "Small", priceExtra: 0, stock: 6 },
            { id: "v438", type: "Size", value: "Medium", priceExtra: 0, stock: 8 },
            { id: "v439", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Midnight Navy Blue & Pearl Gold"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-festive-14",
        name: "Night Glamour Jet Black Sequin Saree",
        slug: "night-glamour-jet-black-sequin-saree",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Couture",
        price: 29000,
        originalPrice: 34000,
        discountPercent: 15,
        stock: 14,
        rating: 5.0,
        reviewCount: 48,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Red-carpet worthy jet black chiffon saree showcasing a full-sleeve micro-sequin blouse, V-neckline, and a sweeping fluid black saree drape lined with shimmering sequin borders.",
        fabric: "High-Luster Satin Chiffon & Full Sequin Blouse",
        stitchedType: "Stitched Evening Cocktail Saree",
        images: [
            "/images/festive-formal/festive-14.jpg"
        ],
        variants: [
            { id: "v440", type: "Size", value: "Small", priceExtra: 0, stock: 4 },
            { id: "v441", type: "Size", value: "Medium", priceExtra: 0, stock: 6 },
            { id: "v442", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Jet Black & Shimmer Sequins"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-festive-15",
        name: "Shimmering Ombre Silver Teal Sequin Cocktail Saree",
        slug: "shimmering-ombre-silver-teal-sequin-cocktail-saree",
        categoryId: "cat-dresses",
        subcategory: "Festive Formal",
        brand: "Vellora Signature",
        price: 31000,
        originalPrice: 36000,
        discountPercent: 14,
        stock: 11,
        rating: 4.9,
        reviewCount: 55,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Breathtaking dual-tone ombre saree transitioning from shimmering silver to slate teal green, fully encrusted with light-reflecting micro-sequins and paired with a fitted full-sleeve silver sequin blouse.",
        fabric: "Full Micro-Sequin Georgette & Satin Lining",
        stitchedType: "Ready-to-Wear Ombre Saree",
        images: [
            "/images/festive-formal/festive-15.jpg"
        ],
        variants: [
            { id: "v443", type: "Size", value: "Small", priceExtra: 0, stock: 3 },
            { id: "v444", type: "Size", value: "Medium", priceExtra: 0, stock: 5 },
            { id: "v445", type: "Size", value: "Large", priceExtra: 0, stock: 3 }
        ],
        colors: ["Ombre Silver & Slate Teal"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-ready-01",
        name: "Pistachio Sage Green Linen Scalloped 2-Piece Set",
        slug: "pistachio-sage-green-linen-scalloped-2-piece-set",
        categoryId: "cat-dresses",
        subcategory: "Ready-to-Wear Stitched",
        brand: "Vellora Pret",
        price: 9500,
        originalPrice: 11500,
        discountPercent: 17,
        stock: 22,
        rating: 4.9,
        reviewCount: 38,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Effortlessly chic pistachio sage green cotton linen 2-piece co-ord set featuring a tunic shirt with scalloped hem & sleeve cuffs, split V-neckline, paired with wide-leg flowing palazzo pants.",
        fabric: "Breathable Organic Cotton Linen",
        stitchedType: "Stitched 2-Piece Co-Ord Set",
        images: [
            "/images/ready-to-wear/ready-to-wear-01.jpg"
        ],
        variants: [
            { id: "v446", type: "Size", value: "Small", priceExtra: 0, stock: 8 },
            { id: "v447", type: "Size", value: "Medium", priceExtra: 0, stock: 9 },
            { id: "v448", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Pistachio Sage Green"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-ready-02",
        name: "Dark Chocolate Brown Soft Crepe Relaxed Co-Ord",
        slug: "dark-chocolate-brown-soft-crepe-relaxed-co-ord",
        categoryId: "cat-dresses",
        subcategory: "Ready-to-Wear Stitched",
        brand: "Vellora Minimal",
        price: 10800,
        originalPrice: 13000,
        discountPercent: 16,
        stock: 18,
        rating: 5.0,
        reviewCount: 42,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Ultra-sleek rich dark chocolate brown matte crepe 2-piece set with a band-collar slit kurti, wide bell sleeves, and matching full-length straight wide-leg trousers.",
        fabric: "High-Grade Wrinkle-Free Matte Crepe",
        stitchedType: "Stitched 2-Piece Lounge / Workwear Set",
        images: [
            "/images/ready-to-wear/ready-to-wear-02.jpg"
        ],
        variants: [
            { id: "v449", type: "Size", value: "Small", priceExtra: 0, stock: 6 },
            { id: "v450", type: "Size", value: "Medium", priceExtra: 0, stock: 7 },
            { id: "v451", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Rich Dark Chocolate Brown"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-ready-03",
        name: "Royal Slate Blue Slit V-Neck Tunic & Palazzo Set",
        slug: "royal-slate-blue-slit-v-neck-tunic-palazzo-set",
        categoryId: "cat-dresses",
        subcategory: "Ready-to-Wear Stitched",
        brand: "Vellora Pret",
        price: 10200,
        originalPrice: 12500,
        discountPercent: 18,
        stock: 20,
        rating: 4.8,
        reviewCount: 27,
        isNewArrival: true,
        isBestSeller: false,
        isFeatured: true,
        description: "Sophisticated royal slate blue 2-piece ensemble showcasing a clean V-neckline tunic shirt with relaxed dropped shoulder sleeves and matching fluid wide palazzo trousers.",
        fabric: "Premium Soft Viscose Crepe",
        stitchedType: "Stitched 2-Piece Co-Ord",
        images: [
            "/images/ready-to-wear/ready-to-wear-03.jpg"
        ],
        variants: [
            { id: "v452", type: "Size", value: "Small", priceExtra: 0, stock: 7 },
            { id: "v453", type: "Size", value: "Medium", priceExtra: 0, stock: 8 },
            { id: "v454", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Royal Slate Dusty Blue"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-ready-04",
        name: "Dust Olive Linen Button-Up Tunic & Trouser Suite",
        slug: "dust-olive-linen-button-up-tunic-trouser-suite",
        categoryId: "cat-dresses",
        subcategory: "Ready-to-Wear Stitched",
        brand: "Vellora Everyday",
        price: 8900,
        originalPrice: 10800,
        discountPercent: 17,
        stock: 25,
        rating: 4.9,
        reviewCount: 31,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Chic dust olive slub linen tunic featuring a split henley button collar, roll-up button sleeve cuffs, functional side pockets, paired with wide-leg linen trousers.",
        fabric: "Pure Slub Linen & Wood-Style Buttons",
        stitchedType: "Stitched 2-Piece Everyday Set",
        images: [
            "/images/ready-to-wear/ready-to-wear-04.jpg"
        ],
        variants: [
            { id: "v455", type: "Size", value: "Small", priceExtra: 0, stock: 9 },
            { id: "v456", type: "Size", value: "Medium", priceExtra: 0, stock: 10 },
            { id: "v457", type: "Size", value: "Large", priceExtra: 0, stock: 6 }
        ],
        colors: ["Dusty Olive Sage"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-ready-05",
        name: "Onyx Jet Black Notch Collar Minimalist Crepe Co-Ord",
        slug: "onyx-jet-black-notch-collar-minimalist-crepe-co-ord",
        categoryId: "cat-dresses",
        subcategory: "Ready-to-Wear Stitched",
        brand: "Vellora Minimal",
        price: 11500,
        originalPrice: 14000,
        discountPercent: 17,
        stock: 15,
        rating: 5.0,
        reviewCount: 50,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Modern classic onyx jet black crepe 2-piece power set featuring a relaxed notch collar lapel top with side slit pockets and fluid wide-leg tailored trousers.",
        fabric: "Heavyweight Double Crepe",
        stitchedType: "Stitched 2-Piece Power Co-Ord",
        images: [
            "/images/ready-to-wear/ready-to-wear-05.jpg"
        ],
        variants: [
            { id: "v458", type: "Size", value: "Small", priceExtra: 0, stock: 5 },
            { id: "v459", type: "Size", value: "Medium", priceExtra: 0, stock: 6 },
            { id: "v460", type: "Size", value: "Large", priceExtra: 0, stock: 4 }
        ],
        colors: ["Onyx Jet Black"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-ready-06",
        name: "Terracotta Rust Crinkled Crepe Slit Tunic & Flared Pants Co-Ord",
        slug: "terracotta-rust-crinkled-crepe-slit-tunic-flared-pants-co-ord",
        categoryId: "cat-dresses",
        subcategory: "Ready-to-Wear Stitched",
        brand: "Vellora Pret",
        price: 11200,
        originalPrice: 13500,
        discountPercent: 17,
        stock: 18,
        rating: 4.9,
        reviewCount: 34,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Vibrant terracotta rust orange crinkled moss crepe 2-piece set featuring a relaxed V-collar tunic with bell sleeves and high side slits, paired with matching wide-leg trousers.",
        fabric: "Textured Crinkled Moss Crepe",
        stitchedType: "Stitched 2-Piece Resort / Pret Set",
        images: [
            "/images/ready-to-wear/ready-to-wear-06.jpg"
        ],
        variants: [
            { id: "v461", type: "Size", value: "Small", priceExtra: 0, stock: 6 },
            { id: "v462", type: "Size", value: "Medium", priceExtra: 0, stock: 7 },
            { id: "v463", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Terracotta Rust Orange"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-ready-07",
        name: "Midnight Navy Silky Satin-Crepe V-Neck Tunic & Flared Palazzo Set",
        slug: "midnight-navy-silky-satin-crepe-v-neck-tunic-flared-palazzo-set",
        categoryId: "cat-dresses",
        subcategory: "Ready-to-Wear Stitched",
        brand: "Vellora Minimal",
        price: 12000,
        originalPrice: 14500,
        discountPercent: 17,
        stock: 20,
        rating: 5.0,
        reviewCount: 45,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Deep midnight navy blue silky satin-crepe 2-piece set featuring a wide V-neck tunic with turn-up cuff sleeves and oversized fluid flared palazzo pants.",
        fabric: "Luxurious Silky Satin-Crepe Blend",
        stitchedType: "Stitched 2-Piece Evening Pret Set",
        images: [
            "/images/ready-to-wear/ready-to-wear-07.jpg"
        ],
        variants: [
            { id: "v464", type: "Size", value: "Small", priceExtra: 0, stock: 7 },
            { id: "v465", type: "Size", value: "Medium", priceExtra: 0, stock: 8 },
            { id: "v466", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Midnight Navy Blue"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-ready-08",
        name: "Terracotta Rust Sweetheart Scalloped Tunic & Cream Palazzo Set",
        slug: "terracotta-rust-sweetheart-scalloped-tunic-cream-palazzo-set",
        categoryId: "cat-dresses",
        subcategory: "Ready-to-Wear Stitched",
        brand: "Vellora Pret",
        price: 9800,
        originalPrice: 11800,
        discountPercent: 17,
        stock: 22,
        rating: 4.8,
        reviewCount: 29,
        isNewArrival: true,
        isBestSeller: false,
        isFeatured: true,
        description: "Warm terracotta rust tunic shirt with a scalloped neckline and scalloped hemline, paired contrastingly with off-white cream wide-leg palazzo pants.",
        fabric: "Breathable Soft Viscose Linen",
        stitchedType: "Stitched 2-Piece Contrast Set",
        images: [
            "/images/ready-to-wear/ready-to-wear-08.jpg"
        ],
        variants: [
            { id: "v467", type: "Size", value: "Small", priceExtra: 0, stock: 8 },
            { id: "v468", type: "Size", value: "Medium", priceExtra: 0, stock: 9 },
            { id: "v469", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Terracotta Rust Red & Cream"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-ready-09",
        name: "Dusty Lilac Mauve Satin Crepe High-Low Slit Tunic & Trouser Set",
        slug: "dusty-lilac-mauve-satin-crepe-high-low-slit-tunic-trouser-set",
        categoryId: "cat-dresses",
        subcategory: "Ready-to-Wear Stitched",
        brand: "Vellora Pret",
        price: 10500,
        originalPrice: 12800,
        discountPercent: 18,
        stock: 19,
        rating: 4.9,
        reviewCount: 36,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Elegantly muted dusty lilac mauve satin crepe 2-piece suite featuring a band-collar tunic shirt with buttoned shirt cuffs and matching tailored wide-leg trousers.",
        fabric: "Soft Pearl Satin Crepe",
        stitchedType: "Stitched 2-Piece Designer Pret",
        images: [
            "/images/ready-to-wear/ready-to-wear-09.jpg"
        ],
        variants: [
            { id: "v470", type: "Size", value: "Small", priceExtra: 0, stock: 6 },
            { id: "v471", type: "Size", value: "Medium", priceExtra: 0, stock: 8 },
            { id: "v472", type: "Size", value: "Large", priceExtra: 0, stock: 5 }
        ],
        colors: ["Dusty Lilac Mauve"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: "prod-ready-10",
        name: "Cocoa Brown Linen Empire Waist Gathered Anarkali Frock Kurti & Trouser Set",
        slug: "cocoa-brown-linen-empire-waist-gathered-anarkali-frock-kurti-trouser-set",
        categoryId: "cat-dresses",
        subcategory: "Ready-to-Wear Stitched",
        brand: "Vellora Everyday",
        price: 9900,
        originalPrice: 12000,
        discountPercent: 17.5,
        stock: 24,
        rating: 5.0,
        reviewCount: 48,
        isNewArrival: true,
        isBestSeller: true,
        isFeatured: true,
        description: "Graceful rich cocoa brown slub linen 2-piece set with an empire-waist gathered flare kurti tunic, notched V-neckline, paired with matching linen straight trousers.",
        fabric: "Natural Slub Linen Blend",
        stitchedType: "Stitched 2-Piece Gathered Frock Set",
        images: [
            "/images/ready-to-wear/ready-to-wear-10.jpg"
        ],
        variants: [
            { id: "v473", type: "Size", value: "Small", priceExtra: 0, stock: 8 },
            { id: "v474", type: "Size", value: "Medium", priceExtra: 0, stock: 10 },
            { id: "v475", type: "Size", value: "Large", priceExtra: 0, stock: 6 }
        ],
        colors: ["Rich Cocoa Brown"],
        sizes: ["Small", "Medium", "Large"]
    }
];

export const initialCoupons = [
    {
        id: "coup-1",
        code: "CHIFFON15",
        discountPercent: 15,
        minOrderValue: 5000,
        expiresAt: "2027-12-31",
        status: "Active"
    }
];

export const initialBanners = [
    {
        id: "ban-lux-1",
        title: "Chiffon Luxury Pakistani Dresses 2026",
        subtitle: "Pure georgette chiffon pleated maxis, royal ruffled gowns & wrap angrakha flared suits.",
        buttonText: "Shop Chiffon Luxury",
        link: "/shop?category=dresses&sub=Chiffon%20Luxury%20Dress",
        imageUrl: "/images/chiffon-luxury-dresses/chiffon-01.jpg",
        status: "Active"
    }
];

export const initialReviews = [
    {
        id: "rev-chiffon-1",
        productId: "prod-chiffon-01",
        customerName: "Ayesha Malik",
        customerCity: "Lahore",
        rating: 5,
        comment: "The dusty rose pleated chiffon maxi is pure royalty! Flawless stitching and premium drape.",
        date: "2026-09-27",
        status: "Approved"
    },
    {
        id: "rev-chiffon-2",
        productId: "prod-chiffon-04",
        customerName: "Zainab Ahmed",
        customerCity: "Islamabad",
        rating: 5,
        comment: "The jet black chiffon gown with keyhole collar fits like a dream. Absolutely in love!",
        date: "2026-09-28",
        status: "Approved"
    }
];
