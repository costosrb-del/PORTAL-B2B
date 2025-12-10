// ============================================
// CONTENIDO DE DEMOSTRACIÓN - ORIGEN BOTÁNICO
// ============================================

export const DEMO_BANNERS = [
    {
        id: 'banner-welcome',
        title: '¡Lanzamiento Línea Capilar!',
        description: 'Descubre nuestra nueva fórmula vegana y orgánica. Resultados de salón en casa.',
        imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80', // Banner wide
        link: '/marketing',
        active: true,
        createdAt: new Date()
    }
];

export const DEMO_PRODUCTS = [
    {
        id: 'kit-keratina-1l',
        name: 'Kit de Keratina Evolución 1 Litro (8 Personas)',
        description: 'Nuestro kit de keratina evolución con 2 métodos de aplicación, orgánica y vegana, transforma tu cabello con un alisado sin formol. Fórmula enriquecida con 12 aceites naturales como coco, karité, argán y macadamia. Ideal para uso profesional, rinde hasta 8 aplicaciones.',
        category: 'Keratinas',
        images: [
            'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
            'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=800&q=80'
        ],
        videos: [
            {
                type: 'youtube',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
                title: 'Tutorial de Aplicación Paso a Paso'
            }
        ],
        manuals: [
            {
                name: 'Protocolo de Aplicación.pdf',
                url: '#',
                size: '2.5 MB'
            }
        ],
        specifications: {
            'Presentación': '1000 ml',
            'Rendimiento': '8 Personas',
            'Tipo': 'Orgánica y Vegana',
            'Libre de Formol': 'Sí',
            'Ingredientes': '12 Aceites Naturales'
        }
    },
    {
        id: 'shampoo-control-grasa',
        name: 'Shampoo Control Grasa (Romero y Equilibrio)',
        description: 'Shampoo especializado para control de grasa con extracto de romero. Equilibra el cuero cabelludo, estimula el crecimiento y previene la caída. Sensación fresca y cabello saludable desde la raíz.',
        category: 'Shampoo',
        images: [
            'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=800&q=80'
        ],
        videos: [],
        manuals: [],
        specifications: {
            'Presentación': '300 ml',
            'Ingrediente Principal': 'Romero',
            'Beneficio': 'Control Grasa y Caída',
            'Tipo de Cabello': 'Graso / Mixto'
        }
    },
    {
        id: 'tratamiento-plex',
        name: 'Tratamiento Intensivo Plex',
        description: 'Sistema de fortalecimiento y reparación profunda. Ideal para cabellos procesados químicamente (decoloraciones, tintes). Reconstruye los enlaces capilares internos para un cabello resistente y brillante.',
        category: 'Tratamientos',
        images: [
            'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80'
        ],
        videos: [],
        manuals: [
            {
                name: 'Ficha Técnica Plex.pdf',
                url: '#',
                size: '1.2 MB'
            }
        ],
        specifications: {
            'Presentación': '250 ml',
            'Uso': 'Profesional',
            'Función': 'Reparación de Enlaces',
            'Tecnología': 'Bond Builder'
        }
    },
    {
        id: 'perfume-termoprotector',
        name: 'Perfume Termoprotector Desenredante',
        description: 'Ritual de seducción para tu cabello. Protege del calor de planchas y secadores, desenreda y deja un aroma irresistible con feromonas. Brillo instantáneo y protección UV.',
        category: 'Termoprotectores',
        images: [
            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'
        ],
        videos: [],
        manuals: [],
        specifications: {
            'Presentación': '120 ml',
            'Beneficio': 'Protección Térmica + Perfume',
            'Aroma': 'Seducción con Feromonas'
        }
    },
    {
        id: 'mascarilla-bomba',
        name: 'Mascarilla Bomba Botánica S.O.S',
        description: 'Bomba de nutrición para cabellos estancados. Acelera el crecimiento y repara puntas abiertas con el poder de la naturaleza. Restauración intensiva en 5 minutos.',
        category: 'Mascarillas',
        images: [
            'https://images.unsplash.com/photo-1571781565023-40f8d4752c53?w=800&q=80'
        ],
        videos: [],
        manuals: [],
        specifications: {
            'Presentación': '300 ml',
            'Función': 'Nutrición Extrema y Crecimiento',
            'Ingredientes': 'Mix Botánico'
        }
    },
    {
        id: 'kit-lina-tejeiro',
        name: 'Kit Edición Especial Lina Tejeiro',
        description: 'La rutina favorita de las estrellas. Incluye Shampoo SOS, Mascarilla Reparadora y Termoprotector. El regalo perfecto para un cabello de celebridad.',
        category: 'Kits',
        images: [
            'https://images.unsplash.com/photo-1556228720-1987ba83dd3c?w=800&q=80'
        ],
        videos: [],
        manuals: [],
        specifications: {
            'Contenido': '3 Productos',
            'Edición': 'Limitada',
            'Beneficio': 'Rutina Completa'
        }
    }
];

export const DEMO_NEWS = [
    {
        id: 'news-1',
        title: '✨ ¡Lanzamiento Oficial: Línea Capilar Vegana!',
        content: 'Descubre nuestra nueva fórmula revolucionaria sin formol y cruelty-free. Diseñada para dar vida a tu cabello respetando el planeta. Ya disponible en catálogo.',
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
        link: '/marketing',
        isNew: true,
        createdAt: new Date('2024-12-01')
    },
    {
        id: 'news-2',
        title: '📦 Novedades en la Logística de Envíos',
        content: 'Hemos mejorado nuestros tiempos de entrega a nivel nacional. Ahora tus pedidos mayoristas llegan en 24-48 horas a ciudades principales.',
        imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
        link: '',
        isNew: true,
        createdAt: new Date('2024-11-28')
    },
    {
        id: 'news-3',
        title: '🎓 Capacitación: Técnicas de Alisado Orgánico',
        content: 'Accede a nuestro webinar exclusivo para profesionales. Aprende a aplicar correctamente nuestro Kit Evolución 1L para resultados perfectos.',
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
        link: '',
        isNew: false,
        createdAt: new Date('2024-11-20')
    }
];

export const DEMO_CONTRACTS = [
    {
        id: 'contract-1',
        title: 'Contrato Distribución Cosméticos 2025',
        category: 'Distribución',
        fileName: 'Contrato_Distribucion_2025.pdf',
        url: '#',
        isNew: true,
        updatedAt: new Date('2024-12-01'),
        description: 'Términos para distribuidores autorizados Origen Botánico'
    },
    {
        id: 'contract-2',
        title: 'Acuerdo de Confidencialidad (NDA)',
        category: 'Legal',
        fileName: 'NDA_Origen_Botanico.pdf',
        url: '#',
        isNew: false,
        updatedAt: new Date('2024-06-15'),
        description: 'Protección de datos y secretos comerciales'
    }
];

export const DEMO_PRICES = [
    {
        id: 'price-1',
        title: 'Lista de Precios Capilar Mayorista - Dic 2024',
        fileName: 'Precios_Capilar_Dic2024.pdf',
        url: '#',
        updatedAt: new Date('2024-12-01'),
        description: 'Precios vigentes para línea capilar y kits'
    }
];

export const DEMO_USERS = [
    {
        uid: 'demo-user-1',
        email: 'admin@portal.com',
        name: 'Administrador Origen',
        role: 'admin',
        mustChangePassword: false,
        password: 'admin123',
        createdAt: new Date('2024-01-01')
    },
    {
        uid: 'demo-user-2',
        email: 'cliente@portal.com',
        name: 'Cliente Mayorista',
        role: 'wholesaler',
        mustChangePassword: false,
        password: 'cliente123',
        createdAt: new Date('2024-01-01')
    }
];

export const loadDemoData = () => {
    localStorage.setItem('demo_banners', JSON.stringify(DEMO_BANNERS));
    localStorage.setItem('demo_products', JSON.stringify(DEMO_PRODUCTS));
    localStorage.setItem('demo_news', JSON.stringify(DEMO_NEWS));
    localStorage.setItem('demo_contracts', JSON.stringify(DEMO_CONTRACTS));
    localStorage.setItem('demo_prices', JSON.stringify(DEMO_PRICES));

    // Users logic
    const currentUsers = JSON.parse(localStorage.getItem('b2b_users') || '[]');
    const demoEmails = DEMO_USERS.map(u => u.email);
    const filtered = currentUsers.filter(u => !demoEmails.includes(u.email));
    localStorage.setItem('b2b_users', JSON.stringify([...filtered, ...DEMO_USERS]));

    console.log('✅ Datos de Origen Botánico cargados');
};

export const clearDemoData = () => {
    localStorage.removeItem('demo_banners');
    localStorage.removeItem('demo_products');
    localStorage.removeItem('demo_news');
    localStorage.removeItem('demo_contracts');
    localStorage.removeItem('demo_prices');
    console.log('🧹 Datos limpiados');
};
