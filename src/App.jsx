import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import MarketingIndex from './pages/marketing/MarketingIndex';
import ProductDetail from './pages/marketing/ProductDetail';
import Precios from './pages/Precios';
import Contratos from './pages/Contratos';
import Noticias from './pages/Noticias';
import AdminPanel from './pages/AdminPanel';

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

// Public Route Component (redirects if already logged in)
const PublicRoute = ({ children }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />;
    }

    return children;
};

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            {/* Protected Routes with MainLayout */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/marketing"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <MarketingIndex />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/marketing/:id"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <ProductDetail />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/precios"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Precios />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/contratos"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Contratos />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/noticias"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Noticias />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin"
                element={
                    <ProtectedRoute requireAdmin={true}>
                        <MainLayout>
                            <AdminPanel />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
