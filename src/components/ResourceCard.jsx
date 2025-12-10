const ResourceCard = ({ resource }) => {
    const getIcon = () => {
        switch (resource.type) {
            case 'video':
                return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'pdf':
                return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const getCategoryColor = () => {
        switch (resource.category) {
            case 'Videos':
                return 'from-purple-500 to-pink-500';
            case 'Manuales':
                return 'from-blue-500 to-cyan-500';
            case 'Contratos':
                return 'from-green-500 to-emerald-500';
            default:
                return 'from-gray-500 to-slate-500';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* Header with gradient */}
            <div className={`bg-gradient-to-r ${getCategoryColor()} p-6 text-white`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {getIcon()}
                        <span className="text-sm font-semibold uppercase tracking-wide">{resource.category}</span>
                    </div>
                    <span className="text-xs opacity-90">{resource.date}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {resource.description}
                </p>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>{resource.type === 'video' ? 'Ver Video' : 'Descargar PDF'}</span>
                </button>
            </div>
        </div>
    );
};

export default ResourceCard;
