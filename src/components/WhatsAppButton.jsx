import { useState } from 'react';

const WhatsAppButton = () => {
    const handleClick = () => {
        const phoneNumber = '573006618704';
        const message = encodeURIComponent('Hola, soy mayorista y necesito información sobre los productos');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <button
                onClick={handleClick}
                className="group relative flex items-center justify-center h-16 w-16 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
                aria-label="Chat con Soporte"
            >
                {/* Pulse Animation */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping"></span>
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-100"></span>

                {/* Icon (Material Symbol) */}
                <span className="material-symbols-outlined relative z-10 text-3xl">chat</span>

                {/* Tooltip */}
                <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-medium py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Hablar con Asesor
                </span>
            </button>
        </div>
    );
};

export default WhatsAppButton;
