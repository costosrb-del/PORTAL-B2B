import { useState, useEffect } from 'react';
import { getNews } from '../services/dataService';
import { Calendar, Loader } from 'lucide-react';
import Card from '../components/ui/Card';

const Noticias = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const newsList = await getNews();
            // Sort by date desc
            newsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setNews(newsList);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateValue) => {
        if (!dateValue) return 'N/A';
        const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-secondary-600" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
                    Noticias y Actualizaciones
                </h1>
                <p className="text-neutral-600">
                    Mantente informado sobre las últimas novedades
                </p>
            </div>

            {/* News Grid */}
            <div className="space-y-6">
                {news.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-neutral-500">No hay noticias disponibles.</p>
                    </div>
                ) : (
                    news.map((item) => (
                        <Card key={item.id} className="p-6 hover:shadow-medium transition-shadow">
                            <div className="flex gap-6">
                                {/* Image */}
                                {item.imageUrl && (
                                    <div className="w-48 h-32 flex-shrink-0">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-semibold text-neutral-900">
                                            {item.title}
                                        </h3>
                                        {item.isNew && (
                                            <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-full">
                                                Nuevo
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                                        <Calendar className="w-4 h-4" />
                                        <span>{formatDate(item.createdAt)}</span>
                                    </div>

                                    <p className="text-neutral-700 mb-4">
                                        {item.content}
                                    </p>

                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-secondary-600 hover:text-secondary-700 font-medium text-sm"
                                        >
                                            Leer más →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Noticias;
