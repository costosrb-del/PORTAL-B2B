// Mock Contracts Data
export const mockContracts = [
    {
        id: 1,
        title: 'Contrato de Distribución 2024',
        description: 'Términos y condiciones actualizados para el año fiscal 2024',
        lastUpdate: '2024-03-15',
        isNew: true,
        url: 'https://example.com/contrato-distribucion-2024.pdf',
        category: 'Distribución',
    },
    {
        id: 2,
        title: 'Acuerdo de Confidencialidad',
        description: 'Protección de información comercial y datos sensibles',
        lastUpdate: '2024-01-10',
        isNew: false,
        url: 'https://example.com/nda.pdf',
        category: 'Legal',
    },
    {
        id: 3,
        title: 'Política de Precios y Descuentos',
        description: 'Estructura de precios para mayoristas y descuentos por volumen',
        lastUpdate: '2024-02-20',
        isNew: false,
        url: 'https://example.com/politica-precios.pdf',
        category: 'Comercial',
    },
    {
        id: 4,
        title: 'Términos de Garantía',
        description: 'Condiciones de garantía y devoluciones para productos',
        lastUpdate: '2023-12-05',
        isNew: false,
        url: 'https://example.com/garantia.pdf',
        category: 'Servicio',
    },
];

export const getNewContracts = () => {
    return mockContracts.filter(c => c.isNew);
};

export const getContractById = (id) => {
    return mockContracts.find(c => c.id === parseInt(id));
};
