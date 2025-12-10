// Mock Products Data for Marketing Module
export const mockProducts = [
    {
        id: 1,
        name: 'Producto Premium A',
        description: 'Producto de alta calidad para mayoristas',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        category: 'Electrónica',
        videos: [
            { id: 1, title: 'Video Demostrativo', url: 'https://example.com/video1.mp4', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop' },
            { id: 2, title: 'Tutorial de Uso', url: 'https://example.com/video2.mp4', thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=300&h=200&fit=crop' },
        ],
        photos: [
            { id: 1, url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop', alt: 'Vista frontal' },
            { id: 2, url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop', alt: 'Vista lateral' },
            { id: 3, url: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&h=600&fit=crop', alt: 'Detalle' },
            { id: 4, url: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&h=600&fit=crop', alt: 'En uso' },
        ],
        promocionales: [
            { id: 1, title: 'Banner Promocional 2024', url: 'https://example.com/banner1.jpg', format: 'JPG - 1920x1080' },
            { id: 2, title: 'Flyer Digital', url: 'https://example.com/flyer1.pdf', format: 'PDF - A4' },
        ],
        descripcion: 'Este producto premium está diseñado específicamente para satisfacer las necesidades de mayoristas que buscan calidad y confiabilidad. Fabricado con los más altos estándares de la industria.',
        fichaTecnica: {
            dimensiones: '30 x 20 x 10 cm',
            peso: '2.5 kg',
            material: 'Aluminio y plástico ABS',
            garantia: '2 años',
            certificaciones: 'CE, RoHS, FCC',
        },
        manuales: [
            { id: 1, title: 'Manual de Usuario', url: 'https://example.com/manual1.pdf', size: '2.5 MB' },
            { id: 2, title: 'Guía de Instalación', url: 'https://example.com/install.pdf', size: '1.8 MB' },
        ],
        relacionados: [2, 3],
    },
    {
        id: 2,
        name: 'Producto Estándar B',
        description: 'Solución económica y eficiente',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
        category: 'Accesorios',
        videos: [
            { id: 1, title: 'Presentación del Producto', url: 'https://example.com/video3.mp4', thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=300&h=200&fit=crop' },
        ],
        photos: [
            { id: 1, url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop', alt: 'Vista principal' },
            { id: 2, url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop', alt: 'Detalle' },
        ],
        promocionales: [
            { id: 1, title: 'Banner Web', url: 'https://example.com/banner2.jpg', format: 'JPG - 1200x628' },
        ],
        descripcion: 'Producto estándar ideal para distribuidores que buscan una opción económica sin comprometer la calidad.',
        fichaTecnica: {
            dimensiones: '25 x 15 x 8 cm',
            peso: '1.2 kg',
            material: 'Plástico reforzado',
            garantia: '1 año',
            certificaciones: 'CE',
        },
        manuales: [
            { id: 1, title: 'Manual Básico', url: 'https://example.com/manual2.pdf', size: '1.2 MB' },
        ],
        relacionados: [1, 4],
    },
    {
        id: 3,
        name: 'Producto Profesional C',
        description: 'Para uso profesional intensivo',
        image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=300&fit=crop',
        category: 'Herramientas',
        videos: [
            { id: 1, title: 'Demo Profesional', url: 'https://example.com/video4.mp4', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop' },
            { id: 2, title: 'Casos de Uso', url: 'https://example.com/video5.mp4', thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=300&h=200&fit=crop' },
        ],
        photos: [
            { id: 1, url: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&h=600&fit=crop', alt: 'Vista general' },
            { id: 2, url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop', alt: 'En acción' },
            { id: 3, url: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&h=600&fit=crop', alt: 'Componentes' },
        ],
        promocionales: [
            { id: 1, title: 'Catálogo Profesional', url: 'https://example.com/catalog.pdf', format: 'PDF - 8 páginas' },
        ],
        descripcion: 'Herramienta profesional diseñada para uso intensivo en entornos comerciales exigentes.',
        fichaTecnica: {
            dimensiones: '35 x 25 x 12 cm',
            peso: '3.8 kg',
            material: 'Acero inoxidable',
            garantia: '3 años',
            certificaciones: 'CE, ISO 9001',
        },
        manuales: [
            { id: 1, title: 'Manual Profesional', url: 'https://example.com/manual3.pdf', size: '4.2 MB' },
            { id: 2, title: 'Mantenimiento', url: 'https://example.com/maintenance.pdf', size: '2.1 MB' },
        ],
        relacionados: [1, 2],
    },
    {
        id: 4,
        name: 'Producto Compacto D',
        description: 'Diseño compacto y portátil',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
        category: 'Portátiles',
        videos: [
            { id: 1, title: 'Características', url: 'https://example.com/video6.mp4', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop' },
        ],
        photos: [
            { id: 1, url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop', alt: 'Producto' },
            { id: 2, url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop', alt: 'Tamaño' },
        ],
        promocionales: [
            { id: 1, title: 'Banner Compacto', url: 'https://example.com/banner3.jpg', format: 'JPG - 1080x1080' },
        ],
        descripcion: 'Solución compacta perfecta para mayoristas que necesitan productos portátiles y fáciles de almacenar.',
        fichaTecnica: {
            dimensiones: '20 x 15 x 5 cm',
            peso: '0.8 kg',
            material: 'Plástico ligero',
            garantia: '1 año',
            certificaciones: 'CE',
        },
        manuales: [
            { id: 1, title: 'Guía Rápida', url: 'https://example.com/quickguide.pdf', size: '800 KB' },
        ],
        relacionados: [2, 3],
    },
];

export const getProductById = (id) => {
    return mockProducts.find(p => p.id === parseInt(id));
};

export const getRelatedProducts = (productId) => {
    const product = getProductById(productId);
    if (!product || !product.relacionados) return [];
    return mockProducts.filter(p => product.relacionados.includes(p.id));
};
