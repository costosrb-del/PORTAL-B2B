import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
// import { getProduct } from '../../services/dataService';

const ProductDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const fetchProductData = async () => {
            // Try fetching from dataService first (simulated/demo logic handles localStorage)
            try {
                // Since dataService.getProduct might not be exported or fully implemented for individual fetch in my previous steps, 
                // I'll use the logic: if ID starts with 'demo-', look in localStorage. Else firestore.
                // Actually, I'll check if getProduct exists in dataService. 
                // To be safe, I'll implement the dual logic here same as MarketingIndex used loop.

                // Check Demo Data in LocalStorage
                const demoProducts = JSON.parse(localStorage.getItem('demo_products') || '[]');
                const demoProduct = demoProducts.find(p => p.id === id);

                if (demoProduct) {
                    setProduct(demoProduct);
                    setLoading(false);
                    return;
                }

                // If not demo, try Firestore
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error("Product not found");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">inventory_2</span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Producto no encontrado</h2>
                <Link to="/marketing" className="mt-4 text-primary hover:underline">Volver al catálogo</Link>
            </div>
        );
    }

    // Helper for main image (fallback if empty)
    const mainImage = product.images && product.images.length > 0 ? product.images[selectedImageIndex] : 'https://via.placeholder.com/800';

    // Helper to get specs as array
    const specsArray = product.specifications
        ? Object.entries(product.specifications).map(([key, value]) => ({ key, value }))
        : (product.specs || []); // Fallback to old structure if exists

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm font-medium mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
                <Link className="text-secondary dark:text-gray-400 hover:text-primary transition-colors" to="/dashboard">Dashboard</Link>
                <span className="mx-2 text-gray-400">/</span>
                <Link className="text-secondary dark:text-gray-400 hover:text-primary transition-colors" to="/marketing">Recursos</Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-400">{product.category || 'Producto'}</span>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-900 dark:text-white font-semibold">{product.name}</span>
            </nav>

            {/* Product Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                {/* Gallery */}
                <div className="flex flex-col gap-4">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white dark:bg-[#1a2e26] border border-gray-100 dark:border-gray-800 shadow-sm group">
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary ring-1 ring-inset ring-primary/20 backdrop-blur-sm">
                                En Stock
                            </span>
                            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 ring-1 ring-inset ring-blue-500/20 backdrop-blur-sm dark:text-blue-400">
                                Nuevo
                            </span>
                        </div>
                        <img
                            alt={product.name}
                            className="h-full w-full object-contain p-4 lg:p-8 transition-transform duration-500 group-hover:scale-105"
                            src={mainImage}
                        />
                    </div>

                    {/* Thumbnails */}
                    {product.images && product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImageIndex(idx)}
                                    className={`relative aspect-square overflow-hidden rounded-xl border-2 ${selectedImageIndex === idx ? 'border-primary' : 'border-transparent hover:border-gray-200'} bg-white dark:bg-[#1a2e26] p-1 transition-colors`}
                                >
                                    <img alt={`Thumbnail ${idx}`} className="h-full w-full rounded-lg object-cover" src={img} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-semibold text-secondary dark:text-gray-400">SKU: {product.id.split('-').pop().toUpperCase()}</span>
                        <div className="flex items-center gap-1 text-yellow-500">
                            <span className="material-symbols-outlined text-lg fill-current">star</span>
                            <span className="material-symbols-outlined text-lg fill-current">star</span>
                            <span className="material-symbols-outlined text-lg fill-current">star</span>
                            <span className="material-symbols-outlined text-lg fill-current">star</span>
                            <span className="material-symbols-outlined text-lg fill-current">star</span>
                            <span className="text-sm text-secondary dark:text-gray-400 ml-1">(5.0)</span>
                        </div>
                    </div>

                    <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
                        {product.name}
                    </h1>

                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Key Features Icons (Static Placeholder Logic or Mapped) */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {/* We create some generic feature cards based on category or random for demo */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#1a2e26] border border-gray-100 dark:border-gray-800">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                                <span className="material-symbols-outlined">eco</span>
                            </div>
                            <div>
                                <p className="text-xs text-secondary dark:text-gray-400 font-medium">Categoría</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{product.category}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#1a2e26] border border-gray-100 dark:border-gray-800">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <span className="material-symbols-outlined">verified</span>
                            </div>
                            <div>
                                <p className="text-xs text-secondary dark:text-gray-400 font-medium">Calidad</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">Certificada</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#1a2e26] border border-gray-100 dark:border-gray-800">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                                <span className="material-symbols-outlined">local_shipping</span>
                            </div>
                            <div>
                                <p className="text-xs text-secondary dark:text-gray-400 font-medium">Envío</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">Nacional</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#1a2e26] border border-gray-100 dark:border-gray-800">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                <span className="material-symbols-outlined">support_agent</span>
                            </div>
                            <div>
                                <p className="text-xs text-secondary dark:text-gray-400 font-medium">Soporte</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">24/7</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto flex flex-col gap-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-secondary dark:text-gray-400">Precio Distribuidor</span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {user ? 'Consultar Lista de Precios' : 'Iniciar sesión para ver'}
                                </span>
                            </div>
                            <span className="material-symbols-outlined text-secondary dark:text-gray-400">lock</span>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex-1 rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-200 dark:shadow-none hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">request_quote</span>
                                Solicitar Cotización
                            </button>
                            <button className="rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a2e26] px-6 py-4 text-base font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined">favorite</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Technical Specifications */}
            <div className="mb-16 rounded-2xl bg-white dark:bg-[#1a2e26] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-white/5">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">tune</span>
                        Especificaciones Técnicas
                    </h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {specsArray.length > 0 ? specsArray.map((spec, i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-dashed border-gray-200 dark:border-gray-700">
                            <span className="text-secondary dark:text-gray-400 font-medium capitalize">{spec.key}</span>
                            <span className="text-gray-900 dark:text-gray-200 font-semibold">{spec.value}</span>
                        </div>
                    )) : (
                        <p className="text-gray-500">No hay especificaciones detalladas disponibles.</p>
                    )}
                </div>
            </div>

            {/* Downloads & Multimedia Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                {/* Downloads Section */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <span className="material-symbols-outlined">folder_open</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Descargas</h2>
                    </div>

                    <div className="flex flex-col gap-3">
                        {product.manuals && product.manuals.length > 0 ? product.manuals.map((manual, i) => (
                            <a
                                key={i}
                                href={manual.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-[#1a2e26] border border-gray-100 dark:border-gray-800 hover:border-primary hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">picture_as_pdf</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{manual.name || `Documento ${i + 1}`}</span>
                                        <span className="text-xs text-secondary dark:text-gray-400">PDF • {manual.size || 'Unknown'}</span>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">download</span>
                            </a>
                        )) : (
                            <div className="p-4 rounded-xl bg-white border border-gray-100 text-center text-gray-500 italic">No hay descargas disponibles</div>
                        )}
                    </div>
                </div>

                {/* Multimedia Section */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <span className="material-symbols-outlined">play_circle</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Multimedia</h2>
                    </div>

                    {product.videos && product.videos.length > 0 ? (
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg group cursor-pointer border border-gray-800">
                            {/* Simplification: Just allow playing in new tab or mock play, as embedding assumes platform specific logic. 
                                For demo, we can show thumbnail and link to URL if it's external, or generic thumbnail.
                            */}
                            <div
                                className="w-full h-full bg-cover bg-center opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                                style={{ backgroundImage: `url(${mainImage})` }}
                            ></div>

                            <a href={product.videos[0].url} target="_blank" rel="noreferrer" className="absolute inset-0 flex items-center justify-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                                        <span className="material-symbols-outlined text-3xl ml-1">play_arrow</span>
                                    </div>
                                </div>
                            </a>

                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                <h3 className="text-lg font-bold text-white mb-1">{product.videos[0].title || 'Video del Producto'}</h3>
                                <p className="text-sm text-gray-300">Ver demostración completa</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full aspect-video rounded-2xl bg-gray-100 dark:bg-[#1a2e26] border border-gray-200 dark:border-gray-800 flex items-center justify-center flex-col gap-2 text-gray-400">
                            <span className="material-symbols-outlined text-4xl">videocam_off</span>
                            <span>No hay video disponible</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
