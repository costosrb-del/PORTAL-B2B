import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';

// Lazy Load Pages for Performance Optimization
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard')); // Updated to use new Dashboard.jsx
const MarketingIndex = lazy(() => import('./pages/marketing/MarketingIndex'));
const ProductDetail = lazy(() => import('./pages/marketing/ProductDetail'));
const Precios = lazy(() => import('./pages/Precios'));
const Contratos = lazy(() => import('./pages/Contratos'));
const Noticias = lazy(() => import('./pages/Noticias'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

// Loading Spinner Component
const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600"></div>
    </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return <LoadingFallback />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

// Public Route Component
const PublicRoute = ({ children }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return <LoadingFallback />;
    }

    if (isAuthenticated) {
        return <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />;
    }

    return children;
};

function AppRoutes() {
    return (
        <Suspense fallback={<LoadingFallback />}>
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
                                <Dashboard />
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
        </Suspense>
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
