import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
    Plus, Trash2, Edit2, Package, CheckCircle, 
    Globe, Smartphone, BarChart, PenTool, Code, Rocket, 
    Settings, Target, Briefcase, Zap, Shield, Mail, X, HelpCircle,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ServiceManager.css';

const API = import.meta.env.VITE_API_URL || '';
const API_BASE_URL = `${API.replace(/\\/$/, '')}/api/services`;

const ICON_MAP = {
    globe: Globe,
    smartphone: Smartphone,
    barchart: BarChart,
    pentool: PenTool,
    code: Code,
    rocket: Rocket,
    settings: Settings,
    target: Target,
    briefcase: Briefcase,
    zap: Zap,
    shield: Shield,
    mail: Mail
};

const ServiceManager = () => {
    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('globe');
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
            toast.error('Failed to fetch services. Check console.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        if (!serviceName || !description) {
            toast.warning('Please fill in both title and description');
            return;
        }

        setSubmitting(true);
        try {
            const data = { 
                title: serviceName, 
                description, 
                icon: selectedIcon, 
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
            setSelectedIcon('globe');
        } catch (err) {
            console.error('Error saving service:', err);
            toast.error(err.response?.data?.error || 'Operation failed. Check console.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (service) => {
        setEditingId(service._id);
        setServiceName(service.title);
        setDescription(service.description);
        setSelectedIcon(service.icon);
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
                toast.error('Delete failed. Check console.');
            }
        }
    };

    const PreviewIcon = ICON_MAP[selectedIcon] || Package;

    return (
        <div className="service-manager-container">
            <div className="top-layout">
                {/* LEFT: FORM CARD */}
                <div className="form-card admin-glass-card">
                    <div className="card-header">
                        <Plus className="accent-purple" size={24} />
                        <h2>{editingId ? 'Edit Service' : 'Add New Service'}</h2>
                    </div>
                    <form onSubmit={handleAddOrUpdate}>
                        <div className="icon-selector">
                            <label>Service Icon</label>
                            <div className="icon-grid">
                                {Object.keys(ICON_MAP).map((key) => {
                                    const IconNode = ICON_MAP[key];
                                    return (
                                        <button 
                                            key={key}
                                            type="button" 
                                            className={`icon-choice ${selectedIcon === key ? 'active' : ''}`}
                                            onClick={() => setSelectedIcon(key)}
                                        >
                                            <IconNode size={18} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Service Title</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Graphic Design" 
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Service Description</label>
                            <textarea 
                                placeholder="Briefly describe what this service offers..." 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-save" disabled={submitting}>
                                {submitting ? <Loader2 className="spinner" /> : (editingId ? 'Update Service' : 'Save Service')}
                                {!submitting && <CheckCircle size={18} />}
                            </button>
                            {editingId && (
                                <button type="button" className="btn-cancel" onClick={() => {
                                    setEditingId(null);
                                    setServiceName('');
                                    setDescription('');
                                }}>Cancel</button>
                            )}
                        </div>
                    </form>
                </div>

                {/* RIGHT: LIVE PREVIEW */}
                <div className="preview-card-column">
                    <div className="preview-label-row">
                        <HelpCircle size={18} />
                        <span>Live Frontend Preview</span>
                    </div>
                    
                    <div className="frontend-style-canvas">
                        <div className={`service-card frontend-design ${!serviceName ? 'placeholder' : ''}`}>
                            <div className="service-glow" style={{ backgroundColor: '#9b4dff' }}></div>
                            <div className="service-header">
                                <PreviewIcon size={40} className="service-icon" />
                                <div className="service-index">0{services.length + (editingId ? 0 : 1)}</div>
                            </div>
                            <h3 className="service-title">{serviceName || 'Your Service Title'}</h3>
                            <p className="service-desc">
                                {description || 'Start typing to see how your service description will appear to your customers on the live website...'}
                            </p>
                            <div className="service-link">
                                Learn More <span>&rarr;</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM: ALL SERVICES LIST (GRID) */}
            <div className="all-services-section">
                <div className="section-header-row">
                    <h2 className="section-title-large">All Services</h2>
                    <span className="count-pill">{loading ? '...' : services.length} Total</span>
                </div>

                <div className="dark-grid-wrapper">
                    {loading ? (
                        <div className="loading-state">
                            <Loader2 className="spinner" size={40} color="white" />
                            <p>Loading your services...</p>
                        </div>
                    ) : (
                        <div className="frontend-services-grid">
                            <AnimatePresence mode="popLayout">
                                {services.length > 0 ? (
                                    services.map((service, index) => {
                                        const CardIcon = ICON_MAP[service.icon] || Package;
                                        return (
                                            <motion.div 
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                key={service._id} 
                                                className="service-card-wrapper"
                                            >
                                                <div className="service-card frontend-design admin-active">
                                                    <div className="card-actions-top">
                                                        <button onClick={() => handleEdit(service)} title="Edit" className="card-btn-action edit">
                                                            <Edit2 size={14} />
                                                        </button>
                                                        <button onClick={() => handleDelete(service._id)} title="Delete" className="card-btn-action delete">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>

                                                    <div className="service-glow" style={{ backgroundColor: '#9b4dff' }}></div>
                                                    <div className="service-header">
                                                        <CardIcon size={40} className="service-icon" />
                                                        <div className="service-index">0{index + 1}</div>
                                                    </div>
                                                    <h3 className="service-title">{service.title}</h3>
                                                    <p className="service-desc">{service.description}</p>
                                                    <div className="service-link">
                                                        Learn More <span>&rarr;</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })
                                ) : (
                                    <div className="no-services">
                                        <Package size={40} color="#a0a0a0" />
                                        <p>No services found. Create your first one!</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceManager;
