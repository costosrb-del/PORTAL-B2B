// Simulate API delay (reduced for demo)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, 50));

/**
 * Get all products from demo data
 * @returns {Promise<Array>}
 */
export const getProducts = async () => {
    await delay(300);
    const products = JSON.parse(localStorage.getItem('demo_products') || '[]');
    return products;
};

/**
 * Get all news from demo data
 * @returns {Promise<Array>}
 */
export const getNews = async () => {
    await delay(300);
    const news = JSON.parse(localStorage.getItem('demo_news') || '[]');
    return news;
};

/**
 * Get all contracts from demo data
 * @returns {Promise<Array>}
 */
export const getContracts = async () => {
    await delay(300);
    const contracts = JSON.parse(localStorage.getItem('demo_contracts') || '[]');
    return contracts;
};

/**
 * Get all prices from demo data
 * @returns {Promise<Array>}
 */
export const getPrices = async () => {
    await delay(300);
    const prices = JSON.parse(localStorage.getItem('demo_prices') || '[]');
    return prices;
};

/**
 * Legacy function for compatibility
 * @returns {Promise<Array>}
 */
export const getResources = async () => {
    await delay(300);
    // Return empty array for now, as we're using products instead
    return [];
};

/**
 * Filter products by category
 * @param {string} category 
 * @returns {Promise<Array>}
 */
export const getProductsByCategory = async (category) => {
    await delay(200);
    const products = await getProducts();

    if (category === 'Todos' || !category) {
        return products;
    }

    return products.filter(p => p.category === category);
};
