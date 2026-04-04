import React, { useState } from 'react';
import { 
    Plus, Trash2, Edit2, Package, Layout, CheckCircle, 
    Globe, Smartphone, BarChart, PenTool, Code, Rocket, 
    Settings, Target, Briefcase, Zap, Shield, Mail, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ServiceManager.css';

// 🔹 CURATED PROFESSIONAL ICONS
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
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('globe'); // Default
    const [customFields, setCustomFields] = useState([]);
    const [services, setServices] = useState([
        { id: 1, name: 'Web Development', description: 'Custom full-stack solutions', fieldsCount: 4, icon: 'globe' },
        { id: 2, name: 'Mobile Apps', description: 'iOS and Android applications', fieldsCount: 2, icon: 'smartphone' }
    ]);

    const addField = () => {
        setCustomFields([...customFields, { id: Date.now(), name: '', type: 'text' }]);
    };

    const removeField = (id) => {
        setCustomFields(customFields.filter(f => f.id !== id));
    };

    const updateField = (id, key, value) => {
        setCustomFields(customFields.map(f => f.id === id ? { ...f, [key]: value } : f));
    };

    const handleAddService = (e) => {
        e.preventDefault();
        if (!serviceName) return;
        const newService = {
            id: Date.now(),
            name: serviceName,
            description: description,
            fieldsCount: customFields.length,
            icon: selectedIcon
        };
        setServices([newService, ...services]);
        setServiceName('');
        setDescription('');
        setCustomFields([]);
        setSelectedIcon('globe');
    };

    const PreviewIcon = ICON_MAP[selectedIcon] || Package;

    return (
        <div className="service-manager">
            {/* TOP SECTION: FORM & PREVIEW */}
            <div className="top-layout">
                {/* LEFT: ADD SERVICE FORM */}
                <div className="form-card card">
                    <div className="card-header">
                        <Plus className="icon-purple" size={24} />
                        <h2>Add New Service</h2>
                    </div>
                    <form onSubmit={handleAddService}>
                        {/* 🔹 NEW ICON SELECTOR UI */}
                        <div className="icon-selector-container">
                            <label>Select Service Icon</label>
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
                                            <IconNode size={20} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Service Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Branding & Design" 
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Description</label>
                            <textarea 
                                placeholder="What is this service about?" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="3"
                            />
                        </div>

                        <div className="custom-fields-section">
                            <div className="section-header">
                                <h3>Custom Fields</h3>
                                <button type="button" className="btn-add-field" onClick={addField}>
                                    <Plus size={16} /> Add Field
                                </button>
                            </div>
                            
                            <AnimatePresence>
                                {customFields.map((field) => (
                                    <motion.div 
                                        key={field.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="field-row"
                                    >
                                        <input 
                                            type="text" 
                                            placeholder="Field Name" 
                                            value={field.name}
                                            onChange={(e) => updateField(field.id, 'name', e.target.value)}
                                        />
                                        <select 
                                            value={field.type}
                                            onChange={(e) => updateField(field.id, 'type', e.target.value)}
                                        >
                                            <option value="text">Text</option>
                                            <option value="number">Number</option>
                                            <option value="file">File</option>
                                            <option value="date">Date</option>
                                        </select>
                                        <button type="button" className="btn-remove" onClick={() => removeField(field.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <button type="submit" className="btn-primary">
                            Add Service <CheckCircle size={18} />
                        </button>
                    </form>
                </div>

                {/* RIGHT: LIVE PREVIEW */}
                <div className="preview-card card">
                    <div className="card-header">
                        <Layout className="icon-purple" size={24} />
                        <h2>Service Preview</h2>
                    </div>
                    <div className="preview-canvas">
                        {serviceName || description || customFields.length > 0 ? (
                            <div className="preview-content">
                                <div className="full-preview-icon-box">
                                    <PreviewIcon size={48} strokeWidth={1.5} className="preview-main-icon" />
                                </div>
                                <h1>{serviceName || 'Your Service Name'}</h1>
                                <p className="preview-desc">{description || 'Your service description will appear here...'}</p>
                                
                                <div className="preview-fields-grid">
                                    {customFields.map(field => (
                                        <div key={field.id} className="preview-field-box">
                                            <label>{field.name || 'Field Label'}</label>
                                            <div className="placeholder-input">{field.type.toUpperCase()} INPUT</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="preview-empty">
                                <Package size={48} className="muted-icon" />
                                <p>Start typing to see a live preview of your new service</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION: EXISTING SERVICES */}
            <div className="bottom-layout">
                <div className="section-header">
                    <h2>Existing Services</h2>
                    <span className="count-badge">{services.length} Total</span>
                </div>
                <div className="services-grid">
                    {services.map(service => {
                        const ServiceIcon = ICON_MAP[service.icon] || Package;
                        return (
                            <div key={service.id} className="service-item-card">
                                <div className="service-icon-mini">
                                    <ServiceIcon className="icon-purple" size={24} />
                                </div>
                                <div className="service-info">
                                    <h3>{service.name}</h3>
                                    <p>{service.description}</p>
                                    <div className="field-pill">
                                        {service.fieldsCount} Fields
                                    </div>
                                </div>
                                <div className="service-actions">
                                    <button className="action-btn edit"><Edit2 size={16} /></button>
                                    <button className="action-btn delete"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ServiceManager;
