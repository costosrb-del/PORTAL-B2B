import { useState, useEffect } from 'react';
import { Save, Upload, Loader } from 'lucide-react';
import { uploadFile } from '../../services/storageService';
import { createNews, updateNews } from '../../services/dataService'; // Use dataService
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const NewsFormModal = ({ isOpen, onClose, news = null, onSaveSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        link: '',
        imageUrl: '',
        isNew: true
    });

    useEffect(() => {
        if (news) {
            setFormData({
                title: news.title || '',
                content: news.content || '',
                link: news.link || '',
                imageUrl: news.imageUrl || '',
                isNew: news.isNew || false
            });
        } else {
            setFormData({
                title: '',
                content: '',
                link: '',
                imageUrl: '',
                isNew: true
            });
        }
        setImageFile(null);
    }, [news, isOpen]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileSelect = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSave = async () => {
        if (!formData.title || !formData.content) {
            alert('Por favor completa los campos requeridos');
            return;
        }

        setLoading(true);
        try {
            let imageUrl = formData.imageUrl;

            // Upload new image if selected
            if (imageFile) {
                try {
                    imageUrl = await uploadFile(imageFile, 'news');
                } catch (error) {
                    console.error("Upload failed (simulating):", error);
                    imageUrl = URL.createObjectURL(imageFile); // Fallback for demo
                }
            }

            const newsData = {
                ...formData,
                imageUrl,
                updatedAt: new Date()
            };

            if (news) {
                await updateNews(news.id, newsData);
            } else {
                // createNews handles ID and createdAt
                await createNews(newsData);
            }

            if (onSaveSuccess) onSaveSuccess();
            onClose();
        } catch (error) {
            console.error("Error saving news:", error);
            alert("Error al guardar la noticia");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={news ? 'Editar Noticia' : 'Nueva Noticia'}
            size="lg"
            footer={
                <>
                    <Button variant="ghost" onClick={onClose} disabled={loading}>Cancelar</Button>
                    <Button
                        variant="primary"
                        icon={loading ? Loader : Save}
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar Noticia'}
                    </Button>
                </>
            }
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Título <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="Título de la noticia"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Contenido <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="Contenido de la noticia..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Enlace (opcional)
                    </label>
                    <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="https://..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Imagen
                    </label>
                    <div className="border-2 border-dashed border-neutral-300 rounded-lg p-4 text-center hover:bg-neutral-50 cursor-pointer relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                        <span className="text-sm text-neutral-500">
                            {imageFile ? imageFile.name : formData.imageUrl ? 'Cambiar imagen' : 'Seleccionar imagen'}
                        </span>
                    </div>
                    {formData.imageUrl && !imageFile && (
                        <img src={formData.imageUrl} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-lg" />
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="isNew"
                        name="isNew"
                        checked={formData.isNew}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <label htmlFor="isNew" className="text-sm text-neutral-700">
                        Marcar como "Nuevo"
                    </label>
                </div>
            </div>
        </Modal>
    );
};

export default NewsFormModal;
