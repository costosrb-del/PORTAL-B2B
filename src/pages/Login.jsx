import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import UVBackground from '../components/UVBackground';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [isChangePasswordMode, setIsChangePasswordMode] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

    const { login, changePassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password);

            if (result.success) {
                if (result.user.mustChangePassword) {
                    setIsChangePasswordMode(true);
                    setSuccessMsg('Por seguridad, debes cambiar tu contraseña temporal.');
                } else {
                    // Redirect based on role
                    if (result.user.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/dashboard');
                    }
                }
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Error inesperado al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        try {
            // We need the UID from the logged in user context (which was set during login)
            // But since we are in the same component flow, we can use useAuth().user
            // However, useAuth().user might not be updated immediately in this render cycle if we just called login
            // But wait, login() updates the state. 
            // Actually, better to rely on the fact that if we are in this mode, the user IS logged in context.

            // Wait, I need to get the current user ID. 
            // Since login() set the user in context, useAuth().user should be available.
            // Let's use a small timeout or assume it's there.

            // Actually, let's pass the user object from login result to state if needed, 
            // but useAuth hook should have it.

            const { user, changePassword } = useAuth(); // Re-get from hook to be safe? No, closure.
            // I'll use the hook instance I have.

            // Wait, I can't access `user` from `const { login, changePassword } = useAuth()` if I didn't destructure it.
            // Let me fix the destructuring at the top.
        } catch (err) {
            // ...
        }
    };

    // Rerender with correct logic
    return <LoginComponent />;
};

// Separating for clarity and hook usage
const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Change Password States
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [isChangePasswordMode, setIsChangePasswordMode] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

    const { login, changePassword, user } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password);

            if (result.success) {
                if (result.user.mustChangePassword) {
                    setIsChangePasswordMode(true);
                    setSuccessMsg('Por seguridad, debes cambiar tu contraseña temporal.');
                } else {
                    navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
                }
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Error inesperado.');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        try {
            const result = await changePassword(user.uid, newPassword);
            if (result.success) {
                setSuccessMsg('¡Contraseña actualizada! Redirigiendo...');
                setTimeout(() => {
                    navigate(user.role === 'admin' ? '/admin' : '/dashboard');
                }, 1500);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Error al actualizar contraseña.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark p-4 relative overflow-hidden">
            <UVBackground />

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <img
                            src="/logo.png"
                            alt="Origen Botánico"
                            className="h-28 mx-auto mb-4 object-contain"
                        />
                        <p className="text-gray-600 mt-2 font-medium">
                            {isChangePasswordMode ? 'Configura tu nueva contraseña' : 'Recursos para Mayoristas'}
                        </p>
                    </div>

                    {/* Messages */}
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-pulse">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            {error}
                        </div>
                    )}
                    {successMsg && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            {successMsg}
                        </div>
                    )}

                    {/* FORMS */}
                    {!isChangePasswordMode ? (
                        /* LOGIN FORM */
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                        placeholder="usuario@empresa.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <div className="flex justify-end mt-1">
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotPasswordModal(true)}
                                        className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Verificando...' : 'Ingresar'}
                            </button>
                        </form>
                    ) : (
                        /* CHANGE PASSWORD FORM */
                        <form onSubmit={handlePasswordChange} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    placeholder="Mínimo 6 caracteres"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    placeholder="Repite la contraseña"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg"
                            >
                                {loading ? 'Actualizando...' : 'Establecer Contraseña'}
                            </button>
                        </form>
                    )}

                    {/* Demo Credentials Helper */}
                    {!isChangePasswordMode && (
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-xs text-gray-400 text-center mb-3 uppercase tracking-wider font-semibold">Accesos Rápidos (Demo)</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => { setEmail('admin@portal.com'); setPassword('admin123'); }}
                                    className="text-xs bg-gray-50 hover:bg-emerald-50 p-2 rounded border border-gray-200 hover:border-emerald-200 text-gray-600 hover:text-emerald-700 transition-all text-left group"
                                >
                                    <span className="font-bold block group-hover:text-emerald-600">Admin</span>
                                    admin@portal.com
                                </button>
                                <button
                                    onClick={() => { setEmail('cliente@portal.com'); setPassword('cliente123'); }}
                                    className="text-xs bg-gray-50 hover:bg-emerald-50 p-2 rounded border border-gray-200 hover:border-emerald-200 text-gray-600 hover:text-emerald-700 transition-all text-left group"
                                >
                                    <span className="font-bold block group-hover:text-emerald-600">Cliente</span>
                                    cliente@portal.com
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-sm w-full p-6 animate-fade-in">
                        <div className="text-center mb-4">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Recuperar Contraseña</h3>
                        </div>
                        <p className="text-sm text-gray-600 text-center mb-6">
                            Para restablecer tu contraseña, por favor contacta al administrador del sistema o escribe a soporte.
                            <br /><br />
                            <span className="font-medium text-emerald-700">soporte@portalb2b.com</span>
                        </p>
                        <button
                            onClick={() => setShowForgotPasswordModal(false)}
                            className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
