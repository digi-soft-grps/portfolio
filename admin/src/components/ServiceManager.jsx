import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
    Plus, Trash2, Edit2, Package, CheckCircle, 
    X, HelpCircle, Loader2, ArrowRight, Camera, Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE_URL = `${API}/api/services`;

const ServiceManager = () => {
    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [serviceImage, setServiceImage] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // 🔄 Fetch services from API
    const fetchServices = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_BASE_URL);
            setServices(res.data);
        } catch (err) {
            console.error('Fetch error:', err);
            toast.error('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.warning('Image size should be less than 2MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setServiceImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        if (!serviceName || !description) {
            toast.warning('Please fill in both title and description');
            return;
        }
        if (!serviceImage) {
            toast.warning('Please upload a service image');
            return;
        }

        setSubmitting(true);
        try {
            const data = { 
                title: serviceName, 
                description, 
                image: serviceImage, 
                order: services.length + 1 
            };

            if (editingId) {
                const res = await axios.put(`${API_BASE_URL}/${editingId}`, data);
                setServices(services.map(s => s._id === editingId ? res.data : s));
                toast.success('Service updated successfully');
                setEditingId(null);
            } else {
                const res = await axios.post(API_BASE_URL, data);
                setServices([...services, res.data]);
                toast.success('New service created');
            }
            
            setServiceName('');
            setDescription('');
            setServiceImage(null);
        } catch (err) {
            console.error('Error saving service:', err);
            toast.error(err.response?.data?.error || 'Operation failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (service) => {
        setEditingId(service._id);
        setServiceName(service.title);
        setDescription(service.description);
        setServiceImage(service.image);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await axios.delete(`${API_BASE_URL}/${id}`);
                setServices(services.filter(s => s._id !== id));
                toast.success('Service deleted');
            } catch (err) {
                console.error('Delete error:', err);
                toast.error('Delete failed');
            }
        }
    };

    return (
        <div className="flex flex-col gap-8 md:gap-12">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* 🟦 LEFT: FORM CARD */}
                <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-persian-blue-100 shadow-xl shadow-persian-blue-100/20">
                    <div className="flex items-center gap-4 mb-8 md:mb-10">
                        <div className="p-3 bg-persian-blue-100 rounded-2xl text-persian-blue-600">
                            {editingId ? <Edit2 size={24} /> : <Plus size={24} />}
                        </div>
                        <h2 className="text-2xl font-bold text-persian-blue-950">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
                    </div>
                    
                    <form onSubmit={handleAddOrUpdate} className="flex flex-col gap-6 md:gap-8">
                        {/* Image Upload Area */}
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-bold text-persian-blue-900 ml-1">Service Illustration / Image</label>
                            <div className="relative group">
                                <div className={`w-full aspect-square max-w-[280px] mx-auto rounded-4xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 overflow-hidden ${serviceImage ? 'border-persian-blue-500 bg-persian-blue-50' : 'border-persian-blue-100 bg-persian-blue-50/50 hover:bg-persian-blue-50 hover:border-persian-blue-300'}`}>
                                    {serviceImage ? (
                                        <>
                                            <img src={serviceImage} alt="Service Preview" className="w-full h-full object-cover" />
                                            <button 
                                                type="button" 
                                                className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md text-red-500 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => setServiceImage(null)}
                                            >
                                                <X size={18} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="p-4 bg-white rounded-2xl text-persian-blue-200 shadow-sm">
                                                <ImageIcon size={32} />
                                            </div>
                                            <div className="text-center px-4">
                                                <p className="text-persian-blue-950 font-bold">Click or drop image</p>
                                                <p className="text-xs text-persian-blue-400 mt-1">Recommended: Square 400x400 (Max 2MB)</p>
                                            </div>
                                        </>
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="absolute inset-0 opacity-0 cursor-pointer" 
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-persian-blue-900 ml-1">Service Title</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Graphic Design" 
                                className="admin-input"
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-persian-blue-900 ml-1">Service Description</label>
                            <textarea 
                                placeholder="Briefly describe what this service offers..." 
                                className="admin-input resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                            <button type="submit" className="admin-btn admin-btn-primary w-full h-14" disabled={submitting}>
                                {submitting ? <Loader2 className="animate-spin" /> : (editingId ? 'Update Service' : 'Save Service')}
                                {!submitting && <CheckCircle size={20} />}
                            </button>
                            {editingId && (
                                <button type="button" className="admin-btn bg-white border border-persian-blue-100 text-persian-blue-600 hover:bg-persian-blue-50 w-full sm:w-auto px-10" onClick={() => {
                                    setEditingId(null);
                                    setServiceName('');
                                    setDescription('');
                                    setServiceImage(null);
                                }}>Cancel</button>
                            )}
                        </div>
                    </form>
                </div>

                {/* 🟦 RIGHT: LIVE PREVIEW */}
                <div className="hidden xl:flex flex-col gap-6 sticky top-8">
                    <div className="flex items-center gap-3 text-persian-blue-400 font-bold text-sm uppercase tracking-widest px-1">
                        <HelpCircle size={18} />
                        <span>Real-time Preview</span>
                    </div>
                    
                    <div className="bg-persian-blue-50/50 p-8 md:p-12 rounded-4xl flex items-center justify-center min-h-[400px] border border-persian-blue-100">
                        <div className={`p-8 md:p-10 rounded-4xl bg-white border border-persian-blue-100 relative overflow-hidden group max-w-sm w-full transition-all duration-500 shadow-xl shadow-persian-blue-100/50 hover:border-persian-blue-300 ${!serviceName ? 'opacity-50 grayscale scale-95' : ''}`}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-persian-blue-100/50 blur-3xl -mr-16 -mt-16 rounded-full pointer-events-none"></div>
                             <div className="flex flex-col items-center text-center gap-6 mb-8 relative z-10">
                                <div className="w-32 h-32 bg-persian-blue-50 border border-persian-blue-100 rounded-3xl overflow-hidden flex items-center justify-center shadow-md">
                                    {serviceImage ? (
                                        <img src={serviceImage} alt="Icon" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-persian-blue-300"><ImageIcon size={28} /></div>
                                    )}
                                </div>
                                 <div className="text-5xl font-bold text-persian-blue-50/50 select-none leading-none absolute top-4 right-4">0{services.length + (editingId ? 0 : 1)}</div>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <h3 className="text-2xl font-bold text-persian-blue-950 mb-4 relative z-10 tracking-tight">{serviceName || 'Service Title'}</h3>
                                <p className="text-persian-blue-600 leading-relaxed mb-8 relative z-10 text-sm font-medium">
                                    {description || 'Fill in the details to see how it looks on the frontend...'}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-persian-blue-600 font-bold group-hover:text-persian-blue-800 transition-colors cursor-pointer relative z-10 text-[15px]">
                                Learn More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🟦 BOTTOM: ALL SERVICES LIST (PREMIUM LIST) */}
            <div className="mt-6 md:mt-12">
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div className="flex items-baseline gap-4">
                        <h2 className="text-3xl font-bold text-persian-blue-950 tracking-tight">Service Inventory</h2>
                        <span className="px-4 py-1.5 bg-persian-blue-100 text-persian-blue-600 rounded-full text-[10px] font-bold tracking-widest uppercase">{loading ? '...' : services.length} Active</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-persian-blue-100 shadow-sm gap-6 text-persian-blue-400">
                        <Loader2 className="animate-spin" size={48} />
                        <p className="font-bold uppercase tracking-widest text-sm">Organizing Services...</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <AnimatePresence mode="popLayout">
                            {services.length > 0 ? (
                                services.map((service, index) => (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={service._id} 
                                        className="group relative"
                                    >
                                        <div className="p-6 md:p-8 rounded-[2.5rem] bg-white border border-persian-blue-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition-all duration-500 hover:shadow-2xl hover:shadow-persian-blue-100/40 hover:border-persian-blue-300 relative overflow-hidden">
                                            {/* Preview & Info */}
                                            <div className="flex items-center gap-6 lg:w-[35%] min-w-0">
                                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-persian-blue-50 border border-persian-blue-100 overflow-hidden flex items-center justify-center text-persian-blue-600 font-bold text-xl shadow-md shrink-0 ring-4 ring-white group-hover:scale-105 transition-transform duration-500">
                                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col min-w-0 flex-1">
                                                    <div className="text-[10px] font-bold text-persian-blue-200 uppercase tracking-[4px] mb-1.5">0{index + 1}</div>
                                                    <h3 className="text-xl font-bold text-persian-blue-950 tracking-tight group-hover:text-persian-blue-600 transition-colors truncate">{service.title}</h3>
                                                </div>
                                            </div>

                                            {/* Description Segment */}
                                            <div className="lg:w-[45%]">
                                                <p className="text-sm text-persian-blue-500 font-medium line-clamp-2 leading-relaxed">
                                                    {service.description}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 shrink-0 lg:justify-end border-t lg:border-t-0 border-persian-blue-50 pt-5 lg:pt-0">
                                                <button 
                                                    onClick={() => handleEdit(service)}
                                                    className="p-2.5 bg-persian-blue-50 text-persian-blue-600 rounded-xl hover:bg-persian-blue-600 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 font-bold text-sm h-10 w-10 lg:h-11 lg:w-11"
                                                    title="Modify Service"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(service._id)}
                                                    className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 font-bold text-sm h-10 w-10 lg:h-11 lg:w-11"
                                                    title="Remove Service"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            
                                            {/* Accent Element */}
                                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-persian-blue-50/20 rounded-tl-full pointer-events-none"></div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="py-24 bg-white/50 rounded-[3rem] border-2 border-dashed border-persian-blue-100 flex flex-col items-center justify-center text-persian-blue-300 gap-6">
                                    <div className="w-20 h-20 bg-persian-blue-50 rounded-full flex items-center justify-center">
                                        <Package size={48} className="opacity-20" />
                                    </div>
                                    <p className="text-xl font-bold">No services found in inventory.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceManager;
