import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Download, FileText, Loader } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Precios = () => {
    const [latestPriceList, setLatestPriceList] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'prices'));
                const list = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Sort by date desc
                list.sort((a, b) => b.updatedAt?.seconds - a.updatedAt?.seconds);
                if (list.length > 0) {
                    setLatestPriceList(list[0]);
                }
            } catch (error) {
                console.error("Error fetching prices:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    if (loading) {
        return (
            <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-semibold text-neutral-900 mb-3">
                    Escalas de Precios
                </h1>
                <p className="text-neutral-600">
                    Lista de precios actualizada para mayoristas
                </p>
            </div>

            {/* PDF Preview Card */}
            <Card className="p-8 mb-8">
                {latestPriceList ? (
                    <div className="flex flex-col items-center">
                        {/* PDF Icon/Preview */}
                        <div className="w-48 h-64 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg shadow-soft mb-6 flex items-center justify-center">
                            <div className="text-center">
                                <FileText className="w-20 h-20 text-neutral-400 mx-auto mb-4" />
                                <p className="text-sm text-neutral-600 font-medium">
                                    {latestPriceList.fileName}
                                </p>
                                <p className="text-xs text-neutral-500 mt-1">
                                    Última actualización: {latestPriceList.updatedAt?.toDate().toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Document Info */}
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                                {latestPriceList.title}
                            </h2>
                            <p className="text-neutral-600 max-w-md">
                                Descarga la lista completa de precios con descuentos por volumen
                                y condiciones especiales para mayoristas.
                            </p>
                        </div>

                        {/* Download Button (FAB style) */}
                        <a href={latestPriceList.url} target="_blank" rel="noopener noreferrer">
                            <Button
                                variant="primary"
                                size="lg"
                                icon={Download}
                                className="shadow-large px-8"
                            >
                                Descargar Lista Vigente
                            </Button>
                        </a>
                    </div>
                ) : (
                    <div className="text-center py-10 text-neutral-500">
                        No hay listas de precios disponibles.
                    </div>
                )}
            </Card>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Actualizado</h3>
                    <p className="text-sm text-neutral-600">
                        Precios actualizados mensualmente
                    </p>
                </Card>

                <Card className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Descuentos</h3>
                    <p className="text-sm text-neutral-600">
                        Escalas por volumen incluidas
                    </p>
                </Card>

                <Card className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Formato PDF</h3>
                    <p className="text-sm text-neutral-600">
                        Fácil de imprimir y compartir
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default Precios;
