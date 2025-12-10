import { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Image, Video, FileText, Loader, Upload } from 'lucide-react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { uploadFile } from '../../services/storageService';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const ProductFormModal = ({ isOpen, onClose, product = null, onSaveSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        sku: '',
        description: '',
        specs: [{ key: '', value: '' }],
        images: [],
        videos: [],
        manuals: []
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [manualFiles, setManualFiles] = useState([]);
    const [videoFiles, setVideoFiles] = useState([]);
    const [newVideoUrl, setNewVideoUrl] = useState('');

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                category: product.category || '',
                sku: product.sku || '',
                description: product.description || '',
                specs: product.specs || [{ key: '', value: '' }],
                images: product.images || [],
                videos: product.videos || [],
                manuals: product.manuals || []
            });
        } else {
            setFormData({
                name: '',
                category: '',
                sku: '',
                description: '',
                specs: [{ key: '', value: '' }],
                images: [],
                videos: [],
                manuals: []
            });
        }
        setImageFiles([]);
        setManualFiles([]);
        setVideoFiles([]);
        setNewVideoUrl('');
        setUploadProgress({});
    }, [product, isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addSpec = () => {
        setFormData({ ...formData, specs: [...formData.specs, { key: '', value: '' }] });
    };

    const updateSpec = (index, field, value) => {
        const newSpecs = [...formData.specs];
        newSpecs[index][field] = value;
        setFormData({ ...formData, specs: newSpecs });
    };

    const removeSpec = (index) => {
        const newSpecs = formData.specs.filter((_, i) => i !== index);
        setFormData({ ...formData, specs: newSpecs });
    };

    const handleFileSelect = (e, type) => {
        const files = Array.from(e.target.files);
        if (type === 'image') {
            setImageFiles(prev => [...prev, ...files]);
        } else if (type === 'manual') {
            setManualFiles(prev => [...prev, ...files]);
        } else if (type === 'video') {
            setVideoFiles(prev => [...prev, ...files]);
        }
    };

    const addVideo = () => {
        if (newVideoUrl) {
            setFormData(prev => ({ ...prev, videos: [...prev.videos, { type: 'url', url: newVideoUrl }] }));
            setNewVideoUrl('');
        }
    };

    const removeVideo = (index) => {
        setFormData(prev => ({ ...prev, videos: prev.videos.filter((_, i) => i !== index) }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const uploadedImages = [...formData.images];
            const uploadedManuals = [...formData.manuals];
            const uploadedVideos = [...formData.videos];

            // Upload Images
            for (const file of imageFiles) {
                const url = await uploadFile(file, 'products/images', (progress) => {
                    setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
                });
                uploadedImages.push(url);
            }

            // Upload Manuals
            for (const file of manualFiles) {
                const url = await uploadFile(file, 'products/manuals', (progress) => {
                    setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
                });
                uploadedManuals.push({ name: file.name, url, size: (file.size / 1024 / 1024).toFixed(2) + ' MB' });
            }

            // Upload Videos
            for (const file of videoFiles) {
                const url = await uploadFile(file, 'products/videos', (progress) => {
                    setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
                });
                uploadedVideos.push({ type: 'file', url, name: file.name });
            }

            const productData = {
                ...formData,
                images: uploadedImages,
                manuals: uploadedManuals,
                videos: uploadedVideos,
                updatedAt: new Date()
            };

            if (product) {
                await updateDoc(doc(db, 'products', product.id), productData);
            } else {
                await addDoc(collection(db, 'products'), {
                    ...productData,
                    createdAt: new Date()
                });
            }

            onSaveSuccess();
            onClose();
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Error al guardar el producto");
        } finally {
            setLoading(false);
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    const getTotalProgress = () => {
        const values = Object.values(uploadProgress);
        if (values.length === 0) return 0;
        return values.reduce((a, b) => a + b, 0) / values.length;
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={product ? 'Editar Producto' : 'Nuevo Producto'}
            size="xl"
            footer={
                <>
                    <Button variant="ghost" onClick={onClose} disabled={loading}>Cancelar</Button>
                    <Button
                        variant="primary"
                        icon={loading ? Loader : Save}
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? `Guardando... ${Math.round(getTotalProgress())}%` : 'Guardar Producto'}
                    </Button>
                </>
            }
        >
            <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2">

                {/* Upload Progress Bar */}
                {loading && Object.keys(uploadProgress).length > 0 && (
                    <div className="bg-secondary-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Upload className="w-4 h-4 text-secondary-600 animate-pulse" />
                            <span className="text-sm font-medium text-secondary-900">
                                Subiendo archivos... {Math.round(getTotalProgress())}%
                            </span>
                        </div>
                        <div className="w-full bg-secondary-200 rounded-full h-2">
                            <div
                                className="bg-secondary-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${getTotalProgress()}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* 1. Información Básica */}
                <section>
                    <h3 className="text-lg font-medium text-neutral-900 mb-4 border-b pb-2">1. Información Básica</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Nombre del Producto</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-secondary-500"
                                placeholder="Ej: Taladro Industrial X200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Categoría</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-secondary-500"
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Herramientas">Herramientas</option>
                                <option value="Electrónica">Electrónica</option>
                                <option value="Accesorios">Accesorios</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">SKU / Código</label>
                            <input
                                type="text"
                                name="sku"
                                value={formData.sku}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-secondary-500"
                                placeholder="PROD-001"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Descripción Detallada</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-secondary-500"
                                placeholder="Descripción completa para el catálogo..."
                            />
                        </div>
                    </div>
                </section>

                {/* 2. Ficha Técnica */}
                <section>
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                        <h3 className="text-lg font-medium text-neutral-900">2. Ficha Técnica</h3>
                        <Button size="sm" variant="secondary" icon={Plus} onClick={addSpec}>Agregar Campo</Button>
                    </div>
                    <div className="space-y-3 bg-neutral-50 p-4 rounded-lg">
                        {formData.specs.map((spec, index) => (
                            <div key={index} className="flex gap-3">
                                <input
                                    type="text"
                                    value={spec.key}
                                    onChange={(e) => updateSpec(index, 'key', e.target.value)}
                                    placeholder="Característica (Ej: Peso)"
                                    className="flex-1 p-2 border rounded-lg"
                                />
                                <input
                                    type="text"
                                    value={spec.value}
                                    onChange={(e) => updateSpec(index, 'value', e.target.value)}
                                    placeholder="Valor (Ej: 2.5 kg)"
                                    className="flex-1 p-2 border rounded-lg"
                                />
                                <button onClick={() => removeSpec(index)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Multimedia */}
                <section>
                    <h3 className="text-lg font-medium text-neutral-900 mb-4 border-b pb-2">3. Multimedia y Recursos</h3>

                    <div className="space-y-6">
                        {/* Imágenes */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 flex items-center gap-2 mb-2">
                                <Image className="w-4 h-4" /> Galería de Fotos
                            </label>
                            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-4 text-center hover:bg-neutral-50 cursor-pointer relative">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => handleFileSelect(e, 'image')}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <span className="text-sm text-neutral-500">
                                    {imageFiles.length > 0 ? `${imageFiles.length} nuevas imágenes` : 'Arrastrar imágenes aquí'}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.images.map((url, i) => (
                                    <div key={i} className="relative group">
                                        <img src={url} alt="" className="w-20 h-20 object-cover rounded border" />
                                        <button
                                            onClick={() => removeImage(i)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Videos */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 flex items-center gap-2 mb-2">
                                <Video className="w-4 h-4" /> Videos (Archivos MP4 o URLs)
                            </label>

                            <div className="space-y-3">
                                {/* URL Input */}
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newVideoUrl}
                                        onChange={(e) => setNewVideoUrl(e.target.value)}
                                        placeholder="URL de YouTube/Vimeo"
                                        className="flex-1 p-2 border rounded-lg text-sm"
                                    />
                                    <Button size="sm" variant="secondary" icon={Plus} onClick={addVideo}>Agregar</Button>
                                </div>

                                {/* File Upload */}
                                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-4 text-center hover:bg-neutral-50 cursor-pointer relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept="video/*"
                                        onChange={(e) => handleFileSelect(e, 'video')}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <Video className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                                    <span className="text-sm text-neutral-500 block">
                                        {videoFiles.length > 0 ? `${videoFiles.length} videos seleccionados` : 'Subir videos MP4'}
                                    </span>
                                    <span className="text-xs text-neutral-400">Soporta archivos grandes</span>
                                </div>

                                {/* Video List */}
                                <div className="space-y-1">
                                    {formData.videos.map((url, i) => (
                                        <div key={i} className="flex justify-between items-center text-xs bg-neutral-100 p-2 rounded">
                                            <span className="truncate max-w-[300px]">{url}</span>
                                            <button onClick={() => removeVideo(i)} className="text-red-500 ml-2">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Manuales */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 flex items-center gap-2 mb-2">
                                <FileText className="w-4 h-4" /> Manuales PDF
                            </label>
                            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-4 text-center hover:bg-neutral-50 cursor-pointer relative">
                                <input
                                    type="file"
                                    multiple
                                    accept="application/pdf"
                                    onChange={(e) => handleFileSelect(e, 'manual')}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <FileText className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                                <span className="text-sm text-neutral-500">
                                    {manualFiles.length > 0 ? `${manualFiles.length} PDFs seleccionados` : 'Subir PDFs'}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </Modal>
    );
};

export default ProductFormModal;
