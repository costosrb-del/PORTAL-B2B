// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, 300));

// --- GETTERS ---

export const getProducts = async () => {
    await delay(200);
    return JSON.parse(localStorage.getItem('demo_products') || '[]');
};

export const getNews = async () => {
    await delay(200);
    return JSON.parse(localStorage.getItem('demo_news') || '[]');
};

export const getContracts = async () => {
    await delay(200);
    return JSON.parse(localStorage.getItem('demo_contracts') || '[]');
};

export const getPrices = async () => {
    await delay(200);
    return JSON.parse(localStorage.getItem('demo_prices') || '[]');
};

export const getBanners = async () => {
    await delay(200);
    return JSON.parse(localStorage.getItem('demo_banners') || '[]');
};

export const getProductsByCategory = async (category) => {
    const products = await getProducts();
    if (category === 'Todos' || !category) return products;
    return products.filter(p => p.category === category);
};

// --- MUTATIONS (DEMO PURPOSES) ---

const updateStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event('storage')); // Notify listeners
};

// BANNERS
export const createBanner = async (banner) => {
    await delay(500);
    const items = await getBanners();
    const newItem = { ...banner, id: `banner-${Date.now()}`, active: true, createdAt: new Date() };
    updateStorage('demo_banners', [newItem, ...items]);
    return newItem;
};

export const deleteBanner = async (id) => {
    await delay(300);
    const items = await getBanners();
    updateStorage('demo_banners', items.filter(i => i.id !== id));
};

// PRODUCTS
export const createProduct = async (product) => {
    await delay(500);
    const items = await getProducts();
    const newItem = { ...product, id: `prod-${Date.now()}` };
    updateStorage('demo_products', [newItem, ...items]);
    return newItem;
};

export const deleteProduct = async (id) => {
    await delay(300);
    const items = await getProducts();
    updateStorage('demo_products', items.filter(i => i.id !== id));
};

export const updateProduct = async (id, data) => {
    await delay(300);
    const items = await getProducts();
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        items[index] = { ...items[index], ...data };
        updateStorage('demo_products', items);
    }
};

// NEWS
export const createNews = async (newsItem) => {
    await delay(500);
    const items = await getNews();
    const newItem = {
        ...newsItem,
        id: `news-${Date.now()}`,
        createdAt: new Date(),
        isNew: true
    };
    updateStorage('demo_news', [newItem, ...items]);
    return newItem;
};

export const deleteNews = async (id) => {
    await delay(300);
    const items = await getNews();
    updateStorage('demo_news', items.filter(i => i.id !== id));
};

export const updateNews = async (id, data) => {
    await delay(300);
    const items = await getNews();
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        items[index] = { ...items[index], ...data };
        updateStorage('demo_news', items);
    }
};
