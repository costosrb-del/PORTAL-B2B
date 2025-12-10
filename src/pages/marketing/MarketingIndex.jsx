import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/dataService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Eye, Loader } from 'lucide-react';

const MarketingIndex = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsList = await getProducts();
                setProducts(productsList);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
                    Recursos de Marketing
                </h1>
                <p className="text-neutral-600">
                    Catálogo completo de productos con materiales promocionales
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card key={product.id} variant="interactive" className="overflow-hidden group">
                        {/* Product Image */}
                        <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                            <img
                                src={product.images?.[0] || 'https://via.placeholder.com/300'}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="p-5">
                            <div className="mb-2">
                                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                                    {product.category}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                {product.name}
                            </h3>
                            <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                                {product.description}
                            </p>

                            {/* Action Button */}
                            <Link to={`/marketing/${product.id}`}>
                                <Button variant="primary" size="sm" icon={Eye} className="w-full">
                                    Ver Detalles
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Empty State (if no products) */}
            {products.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-neutral-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <p className="text-neutral-600">No hay productos disponibles</p>
                </div>
            )}
        </div>
    );
};

export default MarketingIndex;
