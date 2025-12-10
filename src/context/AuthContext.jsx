import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

// Default users for initialization
const DEFAULT_USERS = [
    {
        uid: 'admin-123',
        email: 'admin@portal.com',
        password: 'admin123', // In a real app, this would be hashed
        name: 'Administrador Principal',
        role: 'admin',
        mustChangePassword: false
    },
    {
        uid: 'user-456',
        email: 'cliente@portal.com',
        password: 'cliente123',
        name: 'Distribuidora Los Andes',
        role: 'wholesaler',
        mustChangePassword: false
    }
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize users in localStorage if not present
    useEffect(() => {
        const storedUsers = localStorage.getItem('b2b_users');
        if (!storedUsers) {
            localStorage.setItem('b2b_users', JSON.stringify(DEFAULT_USERS));
        }

        // Check for active session
        const storedSession = localStorage.getItem('b2b_session');
        if (storedSession) {
            setUser(JSON.parse(storedSession));
        }
        setLoading(false);
    }, []);

    const getUsers = () => {
        const users = localStorage.getItem('b2b_users');
        return users ? JSON.parse(users) : DEFAULT_USERS;
    };

    const saveUsers = (users) => {
        localStorage.setItem('b2b_users', JSON.stringify(users));
    };

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        // Reduced delay for better UX (50ms)
        await new Promise(resolve => setTimeout(resolve, 50));

        try {
            const users = getUsers();
            const foundUser = users.find(u => u.email === email && u.password === password);

            if (foundUser) {
                // Don't store password in session
                const { password: _, ...userSession } = foundUser;
                setUser(userSession);
                localStorage.setItem('b2b_session', JSON.stringify(userSession));
                return { success: true, user: userSession };
            }

            return { success: false, error: 'Credenciales inválidas. Verifique correo y contraseña.' };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: 'Error de conexión' };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setUser(null);
        localStorage.removeItem('b2b_session');
    };

    // Admin: Create new user
    const registerUser = async (userData) => {
        await new Promise(resolve => setTimeout(resolve, 50));
        const users = getUsers();

        if (users.find(u => u.email === userData.email)) {
            return { success: false, error: 'El correo ya está registrado.' };
        }

        const newUser = {
            uid: 'user-' + Date.now(),
            ...userData,
            role: 'wholesaler', // Default to wholesaler for created clients
            mustChangePassword: true // Force password change
        };

        users.push(newUser);
        saveUsers(users);
        return { success: true, user: newUser };
    };

    // Change Password
    const changePassword = async (uid, newPassword) => {
        await new Promise(resolve => setTimeout(resolve, 50));
        const users = getUsers();
        const userIndex = users.findIndex(u => u.uid === uid);

        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            users[userIndex].mustChangePassword = false;
            saveUsers(users);

            // Update current session if it's the logged in user
            if (user?.uid === uid) {
                const updatedSession = { ...user, mustChangePassword: false };
                setUser(updatedSession);
                localStorage.setItem('b2b_session', JSON.stringify(updatedSession));
            }
            return { success: true };
        }
        return { success: false, error: 'Usuario no encontrado' };
    };

    // Get all users (for Admin Panel)
    const getAllUsers = () => {
        return getUsers().map(({ password, ...u }) => u); // Return without passwords
    };

    const value = {
        user,
        login,
        logout,
        registerUser,
        changePassword,
        getAllUsers,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isWholesaler: user?.role === 'wholesaler'
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
