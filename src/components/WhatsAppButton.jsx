const WhatsAppButton = () => {
    const handleClick = () => {
        const phoneNumber = '573001234567';
        const message = encodeURIComponent('Hola, necesito información sobre los productos');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <div className="absolute bottom-8 right-8 z-50">
            <button
                onClick={handleClick}
                className="group relative flex items-center justify-center h-14 w-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30"
                aria-label="Chat con Soporte"
            >
                {/* Pulse Animation */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-pulse-slow"></span>

                {/* Icon */}
                <span className="material-symbols-outlined relative z-10 text-2xl">chat</span>

                {/* Tooltip */}
                <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-medium py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Chat con Soporte
                </span>
            </button>
        </div>
    );
};

export default WhatsAppButton;
