// ============================================
// CONTENIDO DE DEMOSTRACIÓN - ELIMINAR DESPUÉS
// ============================================

export const DEMO_PRODUCTS = [
    {
        id: 'demo-prod-1',
        name: 'Fertilizante Orgánico Premium',
        description: 'Fertilizante 100% orgánico certificado, ideal para cultivos de alto rendimiento. Rico en nutrientes esenciales y microorganismos beneficiosos.',
        category: 'Fertilizantes',
        images: [
            'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
            'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800'
        ],
        videos: [
            {
                type: 'youtube',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                title: 'Cómo aplicar fertilizante orgánico'
            }
        ],
        manuals: [
            {
                name: 'Manual de Aplicación.pdf',
                url: 'https://example.com/manual-fertilizante.pdf',
                size: '2.5 MB'
            }
        ],
        specifications: {
            presentacion: '25kg',
            rendimiento: '1 hectárea',
            certificacion: 'Orgánico USDA'
        }
    },
    {
        id: 'demo-prod-2',
        name: 'Semillas de Maíz Híbrido',
        description: 'Semillas de maíz de alta productividad, resistentes a sequía y plagas. Rendimiento superior garantizado.',
        category: 'Semillas',
        images: [
            'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800',
            'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800'
        ],
        videos: [
            {
                type: 'youtube',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                title: 'Siembra de maíz híbrido'
            }
        ],
        manuals: [
            {
                name: 'Guía de Siembra.pdf',
                url: 'https://example.com/guia-siembra.pdf',
                size: '1.8 MB'
            }
        ],
        specifications: {
            presentacion: '20,000 semillas',
            ciclo: '120 días',
            rendimiento: '12 ton/ha'
        }
    },
    {
        id: 'demo-prod-3',
        name: 'Herbicida Selectivo Avanzado',
        description: 'Control efectivo de malezas de hoja ancha sin afectar el cultivo principal. Fórmula de última generación.',
        category: 'Agroquímicos',
        images: [
            'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800'
        ],
        videos: [],
        manuals: [
            {
                name: 'Ficha Técnica.pdf',
                url: 'https://example.com/ficha-herbicida.pdf',
                size: '1.2 MB'
            },
            {
                name: 'Hoja de Seguridad.pdf',
                url: 'https://example.com/seguridad-herbicida.pdf',
                size: '800 KB'
            }
        ],
        specifications: {
            presentacion: '1 litro',
            dosis: '2-3 L/ha',
            aplicacion: 'Postemergencia'
        }
    },
    {
        id: 'demo-prod-4',
        name: 'Sistema de Riego por Goteo',
        description: 'Kit completo de riego por goteo para 1 hectárea. Incluye cintas, conectores y filtros de alta calidad.',
        category: 'Equipos',
        images: [
            'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
            'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800'
        ],
        videos: [
            {
                type: 'youtube',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                title: 'Instalación de sistema de riego'
            }
        ],
        manuals: [
            {
                name: 'Manual de Instalación.pdf',
                url: 'https://example.com/manual-riego.pdf',
                size: '3.5 MB'
            }
        ],
        specifications: {
            cobertura: '1 hectárea',
            caudal: '4 L/h por gotero',
            garantia: '2 años'
        }
    },
    {
        id: 'demo-prod-5',
        name: 'Bioestimulante Foliar',
        description: 'Potenciador de crecimiento con extractos naturales. Mejora la absorción de nutrientes y resistencia al estrés.',
        category: 'Fertilizantes',
        images: [
            'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'
        ],
        videos: [],
        manuals: [
            {
                name: 'Protocolo de Aplicación.pdf',
                url: 'https://example.com/protocolo-bioestimulante.pdf',
                size: '1.5 MB'
            }
        ],
        specifications: {
            presentacion: '500 ml',
            dosis: '1-2 ml/L',
            frecuencia: 'Cada 15 días'
        }
    },
    {
        id: 'demo-prod-6',
        name: 'Invernadero Modular',
        description: 'Estructura de invernadero de 100m² con cubierta de polietileno UV. Fácil instalación y alta durabilidad.',
        category: 'Equipos',
        images: [
            'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
            'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800'
        ],
        videos: [
            {
                type: 'youtube',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                title: 'Montaje de invernadero modular'
            }
        ],
        manuals: [
            {
                name: 'Guía de Montaje.pdf',
                url: 'https://example.com/montaje-invernadero.pdf',
                size: '4.2 MB'
            }
        ],
        specifications: {
            area: '100 m²',
            altura: '3.5 metros',
            material: 'Acero galvanizado'
        }
    },
    {
        id: 'demo-plex-aguacate',
        name: 'Tratamiento Intensivo Plex de Aguacate',
        description: 'Fórmula revolucionaria enriquecida con aceite de aguacate orgánico de origen botánico y tecnología Plex avanzada. Diseñada específicamente para reparar enlaces disulfuro rotos en la fibra capilar, hidratar profundamente y devolver la elasticidad y brillo natural al cabello procesado químicamente. Ideal para uso post-decoloración o mantenimiento en casa.',
        category: 'Tratamiento Capilar',
        sku: 'AVO-PLEX-500',
        images: [
            'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=800&q=80',
            'https://images.unsplash.com/photo-1571781565023-4d675549704d?w=800&q=80',
            'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80'
        ],
        videos: [
            {
                type: 'youtube',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                title: 'Tutorial de Aplicación Paso a Paso'
            }
        ],
        manuals: [
            {
                name: 'Ficha Técnica Plex.pdf',
                url: 'https://example.com/ficha-tecnica-plex.pdf',
                size: '2.8 MB'
            },
            {
                name: 'Protocolo de Uso Profesional.pdf',
                url: 'https://example.com/protocolo-uso.pdf',
                size: '1.5 MB'
            },
            {
                name: 'Hoja de Seguridad (MSDS).pdf',
                url: 'https://example.com/msds-aguacate.pdf',
                size: '0.8 MB'
            }
        ],
        specifications: {
            'pH': '4.5 - 5.5 (Ácido balanceado)',
            'Ingrediente Activo': 'Aceite de Persea Gratissima y Keratina',
            'Tecnología': 'Bond Builder Nano-Plex',
            'Presentación': '500ml / 250ml',
            'Uso': 'Profesional y Mantenimiento'
        }
    }
];

export const DEMO_NEWS = [
    {
        id: 'demo-news-1',
        title: '🎉 Nuevos Productos Disponibles para la Temporada 2024',
        content: 'Nos complace anunciar el lanzamiento de nuestra nueva línea de fertilizantes orgánicos certificados. Estos productos han sido desarrollados con tecnología de punta para maximizar el rendimiento de tus cultivos mientras cuidas el medio ambiente.',
        imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200',
        link: '',
        isNew: true,
        createdAt: new Date('2024-11-28')
    },
    {
        id: 'demo-news-2',
        title: '📊 Actualización de Lista de Precios - Diciembre 2024',
        content: 'Hemos actualizado nuestra lista de precios con ofertas especiales para mayoristas. Consulta la sección de Precios para ver los nuevos descuentos por volumen y promociones de fin de año.',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200',
        link: '/precios',
        isNew: true,
        createdAt: new Date('2024-11-25')
    },
    {
        id: 'demo-news-3',
        title: '🌱 Capacitación Gratuita: Agricultura Sostenible',
        content: 'Únete a nuestro webinar gratuito sobre técnicas de agricultura sostenible. Aprende de expertos sobre rotación de cultivos, manejo integrado de plagas y conservación de suelos. Fecha: 15 de Diciembre, 10:00 AM.',
        imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200',
        link: '',
        isNew: false,
        createdAt: new Date('2024-11-20')
    },
    {
        id: 'demo-news-4',
        title: '🚚 Mejoras en Logística y Tiempos de Entrega',
        content: 'Hemos optimizado nuestra red de distribución para garantizar entregas más rápidas. Ahora ofrecemos envío express en pedidos mayores a $500 USD sin costo adicional.',
        imageUrl: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1200',
        link: '',
        isNew: false,
        createdAt: new Date('2024-11-15')
    }
];

export const DEMO_CONTRACTS = [
    {
        id: 'demo-contract-1',
        title: 'Contrato Marco de Distribución 2024',
        category: 'Distribución',
        fileName: 'Contrato_Distribucion_2024.pdf',
        url: 'https://example.com/contrato-distribucion.pdf',
        isNew: true,
        updatedAt: new Date('2024-11-01'),
        description: 'Términos y condiciones generales para distribuidores mayoristas'
    },
    {
        id: 'demo-contract-2',
        title: 'Acuerdo de Confidencialidad',
        category: 'Legal',
        fileName: 'NDA_2024.pdf',
        url: 'https://example.com/nda.pdf',
        isNew: false,
        updatedAt: new Date('2024-01-15'),
        description: 'Acuerdo de no divulgación de información comercial'
    },
    {
        id: 'demo-contract-3',
        title: 'Política de Devoluciones y Garantías',
        category: 'Comercial',
        fileName: 'Politica_Devoluciones.pdf',
        url: 'https://example.com/devoluciones.pdf',
        isNew: false,
        updatedAt: new Date('2024-06-10'),
        description: 'Procedimientos para devoluciones y reclamos de garantía'
    }
];

export const DEMO_PRICES = [
    {
        id: 'demo-price-1',
        title: 'Lista de Precios Diciembre 2024',
        fileName: 'Precios_Diciembre_2024.pdf',
        url: 'https://example.com/precios-diciembre.pdf',
        updatedAt: new Date('2024-12-01'),
        description: 'Precios vigentes con descuentos especiales de fin de año'
    },
    {
        id: 'demo-price-2',
        title: 'Lista de Precios Noviembre 2024',
        fileName: 'Precios_Noviembre_2024.pdf',
        url: 'https://example.com/precios-noviembre.pdf',
        updatedAt: new Date('2024-11-01'),
        description: 'Precios del mes anterior'
    }
];

export const DEMO_USERS = [
    {
        uid: 'demo-user-1',
        email: 'distribuidora.norte@example.com',
        name: 'Distribuidora Norte S.A.',
        role: 'wholesaler',
        mustChangePassword: false,
        password: 'demo123',
        createdAt: new Date('2024-01-15')
    },
    {
        uid: 'demo-user-2',
        email: 'agrosur@example.com',
        name: 'Agrosur Mayorista',
        role: 'wholesaler',
        mustChangePassword: false,
        password: 'demo123',
        createdAt: new Date('2024-03-20')
    },
    {
        uid: 'demo-user-3',
        email: 'campo.verde@example.com',
        name: 'Campo Verde Distribuciones',
        role: 'wholesaler',
        mustChangePassword: true,
        password: 'temporal123',
        createdAt: new Date('2024-11-28')
    }
];

// Función para cargar datos de demo
export const loadDemoData = () => {
    // Forzar recarga de productos
    localStorage.setItem('demo_products', JSON.stringify(DEMO_PRODUCTS));

    // Cargar noticias (Forzar recarga)
    localStorage.setItem('demo_news', JSON.stringify(DEMO_NEWS));

    // Cargar contratos (Forzar recarga)
    localStorage.setItem('demo_contracts', JSON.stringify(DEMO_CONTRACTS));

    // Cargar precios (Forzar recarga)
    localStorage.setItem('demo_prices', JSON.stringify(DEMO_PRICES));

    // Agregar usuarios demo
    const users = JSON.parse(localStorage.getItem('b2b_users') || '[]');
    const demoEmails = DEMO_USERS.map(u => u.email);
    const filteredUsers = users.filter(u => !demoEmails.includes(u.email));
    const updatedUsers = [...filteredUsers, ...DEMO_USERS];
    localStorage.setItem('b2b_users', JSON.stringify(updatedUsers));

    console.log('✅ Datos de demostración (incluido Plex Aguacate) cargados exitosamente');
};

// Función para limpiar datos de demo
export const clearDemoData = () => {
    localStorage.removeItem('demo_products');
    localStorage.removeItem('demo_news');
    localStorage.removeItem('demo_contracts');
    localStorage.removeItem('demo_prices');

    const users = JSON.parse(localStorage.getItem('b2b_users') || '[]');
    const demoEmails = DEMO_USERS.map(u => u.email);
    const cleanedUsers = users.filter(u => !demoEmails.includes(u.email));
    localStorage.setItem('b2b_users', JSON.stringify(cleanedUsers));

    console.log('🧹 Datos de demostración eliminados');
};
