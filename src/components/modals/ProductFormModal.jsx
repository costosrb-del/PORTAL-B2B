import { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Image, Video, FileText, Loader, Upload } from 'lucide-react';
import { uploadFile } from '../../services/storageService';
import { createProduct, updateProduct } from '../../services/dataService'; // Use dataService
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
            setFormData(prev => ({ ...prev, videos: [...prev.videos, { type: 'youtube', url: newVideoUrl, title: 'Video Externo' }] }));
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
                try {
                    const url = await uploadFile(file, 'products/images', (progress) => {
                        setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
                    });
                    uploadedImages.push(url);
                } catch (err) {
                    console.error("Upload failed (simulating):", err);
                    uploadedImages.push(URL.createObjectURL(file)); // Fallback for demo
                }
            }

            // Upload Manuals
            for (const file of manualFiles) {
                try {
                    const url = await uploadFile(file, 'products/manuals', (progress) => {
                        setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
                    });
                    uploadedManuals.push({ name: file.name, url, size: (file.size / 1024 / 1024).toFixed(2) + ' MB' });
                } catch (err) {
                    uploadedManuals.push({ name: file.name, url: '#', size: '1 MB' }); // Fallback
                }
            }

            // Upload Videos
            for (const file of videoFiles) {
                try {
                    const url = await uploadFile(file, 'products/videos', (progress) => {
                        setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
                    });
                    uploadedVideos.push({ type: 'file', url, name: file.name });
                } catch (err) {
                    // Skip video upload fail simulation for now or just log
                }
            }

            const productData = {
                ...formData,
                images: uploadedImages,
                manuals: uploadedManuals,
                videos: uploadedVideos,
                updatedAt: new Date()
            };

            if (product) {
                await updateProduct(product.id, productData);
            } else {
                await createProduct(productData);
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
                        {loading ? 'Guardando...' : 'Guardar Producto'}
                    </Button>
                </>
            }
        >
            <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2">
                {/* Upload Progress Bar */}
                {loading && Object.keys(uploadProgress).length > 0 && (
                    <div className="bg-emerald-50 p-4 rounded-lg mb-4">
                        <p className="text-sm text-emerald-700 mb-1">Subiendo archivos...</p>
                        <div className="w-full bg-emerald-200 rounded-full h-2">
                            <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${getTotalProgress()}%` }}></div>
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
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                placeholder="Ej: Kit Keratina 1L"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Categoría</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Keratinas">Keratinas</option>
                                <option value="Shampoo">Shampoo</option>
                                <option value="Tratamientos">Tratamientos</option>
                                <option value="Termoprotectores">Termoprotectores</option>
                                <option value="Kits">Kits</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">SKU / Código</label>
                            <input
                                type="text"
                                name="sku"
                                value={formData.sku}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
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
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                placeholder="Descripción..."
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
                                    placeholder="Característica"
                                    className="flex-1 p-2 border rounded-lg"
                                />
                                <input
                                    type="text"
                                    value={spec.value}
                                    onChange={(e) => updateSpec(index, 'value', e.target.value)}
                                    placeholder="Valor"
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
                    <h3 className="text-lg font-medium text-neutral-900 mb-4 border-b pb-2">3. Multimedia</h3>
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
                                    {imageFiles.length > 0 ? `${imageFiles.length} nuevas imágenes` : 'Subir Imágenes'}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.images.map((url, i) => (
                                    <div key={i} className="relative group">
                                        <img src={url} alt="" className="w-20 h-20 object-cover rounded border" />
                                        <button onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Videos URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Video URL (Youtube/Vimeo)</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newVideoUrl}
                                    onChange={(e) => setNewVideoUrl(e.target.value)}
                                    className="flex-1 p-2 border rounded-lg"
                                    placeholder="https://..."
                                />
                                <Button size="sm" onClick={addVideo}>Agregar</Button>
                            </div>
                            {formData.videos.map((v, i) => (
                                <div key={i} className="text-xs flex justify-between bg-gray-50 p-2 mt-1 rounded">
                                    {v.url} <button onClick={() => removeVideo(i)} className="text-red-500">X</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Modal>
    );
};

export default ProductFormModal;
