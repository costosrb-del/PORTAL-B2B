import { users } from '../mocks/data';

const STORAGE_KEY = 'portal_b2b_user';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Login service - validates credentials and stores user in localStorage
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export const login = async (email, password) => {
    // Simulate network delay
    await delay(500);

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Don't store password in localStorage
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
    }

    return { success: false, error: 'Credenciales inválidas' };
};

/**
 * Logout service - clears user from localStorage
 */
export const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
};

/**
 * Get current user from localStorage
 * @returns {object|null}
 */
export const getCurrentUser = () => {
    const userStr = localStorage.getItem(STORAGE_KEY);
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (e) {
            return null;
        }
    }
    return null;
};
