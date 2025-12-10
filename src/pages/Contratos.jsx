import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FileText, Download, AlertCircle, Loader } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const Contratos = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newContracts, setNewContracts] = useState([]);

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'contracts'));
                const list = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setContracts(list);

                // Check for new contracts (logic: isNew === true)
                const newItems = list.filter(c => c.isNew);
                setNewContracts(newItems);
                if (newItems.length > 0) {
                    setTimeout(() => setShowModal(true), 1000);
                }
            } catch (error) {
                console.error("Error fetching contracts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContracts();
    }, []);

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Distribución': 'bg-blue-100 text-blue-700',
            'Legal': 'bg-purple-100 text-purple-700',
            'Comercial': 'bg-green-100 text-green-700',
            'Servicio': 'bg-orange-100 text-orange-700',
        };
        return colors[category] || 'bg-neutral-100 text-neutral-700';
    };

    if (loading) {
        return (
            <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
                    Contratos & Legal
                </h1>
                <p className="text-neutral-600">
                    Documentos legales y acuerdos comerciales
                </p>
            </div>

            {/* New Contracts Alert */}
            {newContracts.length > 0 && (
                <Card className="p-4 mb-6 border-l-4 border-primary-500 bg-primary-50">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <h3 className="font-medium text-primary-900 mb-1">
                                Hay {newContracts.length} contrato(s) actualizado(s)
                            </h3>
                            <p className="text-sm text-primary-700">
                                Te recomendamos revisar los cambios antes de continuar
                            </p>
                        </div>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setShowModal(true)}
                        >
                            Revisar
                        </Button>
                    </div>
                </Card>
            )}

            {/* Contracts List */}
            <div className="space-y-4">
                {contracts.length === 0 ? (
                    <p className="text-center text-neutral-500 py-10">No hay contratos disponibles.</p>
                ) : (
                    contracts.map((contract) => (
                        <Card key={contract.id} className="p-6 hover:shadow-medium transition-shadow">
                            <div className="flex items-start justify-between gap-4">
                                {/* Contract Icon & Info */}
                                <div className="flex gap-4 flex-1">
                                    <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-6 h-6 text-neutral-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-semibold text-neutral-900">
                                                {contract.title}
                                            </h3>
                                            {contract.isNew && (
                                                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                                                    Nuevo
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-neutral-600 mb-3">
                                            {contract.description || 'Sin descripción'}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(contract.category)}`}>
                                                {contract.category}
                                            </span>
                                            <span className="text-neutral-500">
                                                Actualizado: {formatDate(contract.updatedAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <a href={contract.url} target="_blank" rel="noopener noreferrer">
                                        <Button variant="secondary" size="sm" icon={Download}>
                                            Descargar
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Contract Update Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Actualización Importante"
                size="md"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setShowModal(false)}>
                            Omitir por ahora
                        </Button>
                        <Button variant="primary" onClick={() => setShowModal(false)}>
                            Entendido
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-primary-900 mb-1">
                                Contrato Actualizado
                            </h4>
                            <p className="text-sm text-primary-700">
                                Se han actualizado los siguientes documentos:
                            </p>
                        </div>
                    </div>

                    {newContracts.map((contract) => (
                        <Card key={contract.id} className="p-4">
                            <div className="flex items-start gap-3">
                                <FileText className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <h4 className="font-medium text-neutral-900 mb-1">
                                        {contract.title}
                                    </h4>
                                    <p className="text-xs text-neutral-500">
                                        Actualizado: {formatDate(contract.updatedAt)}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}

                    <p className="text-sm text-neutral-600">
                        Es importante que revises los cambios en el contrato antes de continuar
                        operando.
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default Contratos;
