import { useState, useEffect } from 'react';
import { Building2, CheckCircle } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const WelcomeModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Simulate checking if it's the first visit
        // In real app, check localStorage or user profile flag
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
        if (!hasSeenWelcome) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsOpen(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('hasSeenWelcome', 'true');
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title=""
            size="lg"
            footer={
                <Button variant="primary" onClick={handleClose} className="w-full">
                    ¡Entendido, Comencemos!
                </Button>
            }
        >
            <div className="text-center px-4 pb-4">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building2 className="w-10 h-10 text-primary-600" />
                </div>

                <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                    Bienvenido a tu Portal B2B
                </h2>

                <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                    Hemos diseñado esta plataforma para facilitarte el acceso a toda la información que necesitas como mayorista.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="bg-neutral-50 p-4 rounded-lg">
                        <div className="font-semibold text-neutral-900 mb-1 flex items-center gap-2">
                            <span className="text-xl">📦</span> Catálogo
                        </div>
                        <p className="text-sm text-neutral-600">
                            Accede a fichas técnicas, fotos en alta calidad y videos de todos nuestros productos.
                        </p>
                    </div>

                    <div className="bg-neutral-50 p-4 rounded-lg">
                        <div className="font-semibold text-neutral-900 mb-1 flex items-center gap-2">
                            <span className="text-xl">💲</span> Precios
                        </div>
                        <p className="text-sm text-neutral-600">
                            Descarga tus listas de precios actualizadas y consulta tus descuentos vigentes.
                        </p>
                    </div>

                    <div className="bg-neutral-50 p-4 rounded-lg">
                        <div className="font-semibold text-neutral-900 mb-1 flex items-center gap-2">
                            <span className="text-xl">⚖️</span> Legal
                        </div>
                        <p className="text-sm text-neutral-600">
                            Mantente al día con tus contratos y documentos legales importantes.
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default WelcomeModal;
