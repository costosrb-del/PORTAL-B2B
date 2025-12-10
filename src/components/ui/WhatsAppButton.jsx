import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
    const handleClick = () => {
        // En el futuro, esto abrirá el link real de WhatsApp
        window.open('https://wa.me/1234567890', '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
            {/* Tooltip / Call to Action */}
            <div className="bg-white px-4 py-2 rounded-lg shadow-medium mb-1 animate-in slide-in-from-bottom-2 fade-in duration-300">
                <p className="text-sm font-medium text-neutral-900">¿Necesitas ayuda? Habla con tu asesora</p>
                <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
            </div>

            {/* Button */}
            <button
                onClick={handleClick}
                className="group relative flex items-center justify-center w-14 h-14 bg-secondary-500 hover:bg-secondary-600 text-white rounded-full shadow-large transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-secondary-200"
                aria-label="Contactar por WhatsApp"
            >
                <MessageCircle className="w-8 h-8" />

                {/* Ping Animation */}
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                </span>
            </button>
        </div>
    );
};

export default WhatsAppButton;
