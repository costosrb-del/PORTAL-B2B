import { useState } from 'react';
import { Save, Upload, FileText, Loader } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { uploadFile } from '../../services/storageService';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const DocumentUploadModal = ({ isOpen, onClose, type, onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleFileSelect = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setProgress(0);
        }
    };

    const handleUpload = async () => {
        if (!file || !title) return;
        setLoading(true);
        try {
            const collectionName = type === 'contract' ? 'contracts' : 'prices';
            const storagePath = `${collectionName}`;

            const url = await uploadFile(file, storagePath, (p) => setProgress(p));

            await addDoc(collection(db, collectionName), {
                title,
                category: type === 'contract' ? category : 'General',
                url,
                fileName: file.name,
                updatedAt: new Date(),
                isNew: true
            });

            if (onUploadSuccess) onUploadSuccess();
            onClose();
            setFile(null);
            setTitle('');
            setCategory('');
            setProgress(0);
        } catch (error) {
            console.error("Error uploading document:", error);
            alert("Error al subir el documento");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={type === 'contract' ? 'Subir Contrato' : 'Subir Lista de Precios'}
            size="md"
            footer={
                <>
                    <Button variant="ghost" onClick={onClose} disabled={loading}>Cancelar</Button>
                    <Button
                        variant="primary"
                        icon={loading ? Loader : Upload}
                        onClick={handleUpload}
                        disabled={loading || !file || !title}
                    >
                        {loading ? 'Subiendo...' : 'Subir Documento'}
                    </Button>
                </>
            }
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Título del Documento</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder={type === 'contract' ? "Ej: Contrato Marco 2024" : "Ej: Lista Precios Mayo"}
                    />
                </div>

                {type === 'contract' && (
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Categoría</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">Seleccionar...</option>
                            <option value="Comercial">Comercial</option>
                            <option value="Legal">Legal</option>
                            <option value="Operativo">Operativo</option>
                        </select>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Archivo PDF</label>
                    <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:bg-neutral-50 cursor-pointer relative">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileSelect}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center">
                            <FileText className="w-8 h-8 text-neutral-400 mb-2" />
                            <span className="text-sm text-neutral-600">
                                {file ? file.name : 'Seleccionar archivo PDF'}
                            </span>
                        </div>
                    </div>
                    {/* Progress Bar */}
                    {loading && (
                        <div className="mt-2">
                            <div className="flex justify-between text-xs text-neutral-500 mb-1">
                                <span>Subiendo...</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-neutral-200 rounded-full h-2">
                                <div
                                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default DocumentUploadModal;
