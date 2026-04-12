import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  UserPlus, 
  User, 
  Users,
  Mail, 
  Phone, 
  Briefcase, 
  FileText, 
  Plus, 
  Camera,
  CheckCircle,
  HelpCircle,
  X,
  Trash2,
  Edit2,
  Quote,
  Star,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Customers.css';

const API = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${API}/api/customers`;

const Customers = () => {
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
        avatar: null,
        rating: 5
    });
    const [customFields, setCustomFields] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    // Existing Customers State
    const [customers, setCustomers] = useState([]);

    // 🔄 Fetch customers
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_BASE_URL);
            setCustomers(res.data);
        } catch (err) {
            toast.error('Failed to load customers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addCustomField = () => {
        setCustomFields([...customFields, { id: Date.now(), label: '', value: '' }]);
    };

    const removeCustomField = (id) => {
        setCustomFields(customFields.filter(field => field.id !== id));
    };

    const updateCustomField = (id, key, value) => {
        setCustomFields(customFields.map(field => 
            field.id === id ? { ...field, [key]: value } : field
        ));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name) {
            toast.warning('Customer name is required');
            return;
        }
        
        setIsSubmitting(true);
        try {
            const dataToSave = {
                ...formData,
                customFields: customFields.map(({ label, value }) => ({ label, value }))
            };

            const res = await axios.post(API_BASE_URL, dataToSave);
            setCustomers([res.data, ...customers]);
            toast.success('Customer added successfully');
            
            // Reset Form (Keeping avatar/rating logic clean)
            setFormData({
                name: '', email: '', phone: '', company: '', notes: '', avatar: null, rating: 5
            });
            setCustomFields([]);
        } catch (err) {
            toast.error('Failed to save customer');
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteCustomer = async (id) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) return;
        
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            setCustomers(customers.filter(c => c._id !== id));
            toast.success('Customer deleted');
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="customers-view">
            <div className="split-layout">
                {/* 🟦 LEFT SIDE: ADD CUSTOMER FORM */}
                <div className="column form-column">
                    <div className="glass-card">
                        <div className="card-header">
                            <div className="header-icon-box">
                                <UserPlus size={22} />
                            </div>
                            <h2>Add New Customer</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="customer-form">
                            {/* Profile Image Section */}
                            <div className="avatar-upload-section">
                                <div className="avatar-preview-box">
                                    {formData.avatar ? (
                                        <img src={formData.avatar} alt="Avatar" className="uploaded-img" />
                                    ) : (
                                        <User size={32} className="placeholder-icon" />
                                    )}
                                    <label htmlFor="avatar-input" className="upload-overlay">
                                        <Camera size={18} />
                                        <input 
                                            type="file" 
                                            id="avatar-input" 
                                            accept="image/*" 
                                            onChange={handleImageUpload} 
                                            style={{ display: 'none' }} 
                                        />
                                    </label>
                                </div>
                                <div className="avatar-info">
                                    <span>Profile Picture</span>
                                    <p>Recommended: Square 200x200</p>
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="input-field">
                                    <label>Customer Name</label>
                                    <div className="input-wrapper">
                                        <User size={18} className="field-icon" />
                                        <input 
                                            type="text" 
                                            name="name"
                                            placeholder="e.g. Alexander Pierce"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="input-field">
                                    <label>Email Address</label>
                                    <div className="input-wrapper">
                                        <Mail size={18} className="field-icon" />
                                        <input 
                                            type="email" 
                                            name="email"
                                            placeholder="alexander@example.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="input-field">
                                    <label>Phone Number</label>
                                    <div className="input-wrapper">
                                        <Phone size={18} className="field-icon" />
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="input-field">
                                    <label>Company Name</label>
                                    <div className="input-wrapper">
                                        <Briefcase size={18} className="field-icon" />
                                        <input 
                                            type="text" 
                                            name="company"
                                            placeholder="Acme Corp"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="input-field full-width">
                                <label>Notes / Description</label>
                                <div className="input-wrapper area">
                                    <FileText size={18} className="field-icon" />
                                    <textarea 
                                        name="notes"
                                        placeholder="Add any specific requirements or background information here..."
                                        rows="4"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* Custom Fields Section */}
                            <div className="custom-fields-area">
                                <div className="section-title">
                                    <h3>Custom Fields</h3>
                                    <button type="button" className="text-btn" onClick={addCustomField}>
                                        <Plus size={16} /> Add Field
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {customFields.map(field => (
                                        <motion.div 
                                            key={field.id}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="custom-field-row"
                                        >
                                            <input 
                                                type="text" 
                                                placeholder="Label" 
                                                value={field.label}
                                                onChange={(e) => updateCustomField(field.id, 'label', e.target.value)}
                                            />
                                            <input 
                                                type="text" 
                                                placeholder="Value" 
                                                value={field.value}
                                                onChange={(e) => updateCustomField(field.id, 'value', e.target.value)}
                                            />
                                            <button type="button" className="remove-btn" onClick={() => removeCustomField(field.id)}>
                                                <X size={16} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <button 
                                type="submit" 
                                className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : <>Save Customer <CheckCircle size={18} /></>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* 🟦 RIGHT SIDE: CUSTOMER PREVIEW */}
                <div className="column preview-column">
                    <div className="glass-card preview-card">
                        <div className="card-header">
                            <div className="header-icon-box orange">
                                <HelpCircle size={22} />
                            </div>
                            <h2>Customer Preview</h2>
                        </div>

                        <div className="preview-content">
                            {formData.name || formData.email || formData.phone || formData.company || formData.notes ? (
                                <div className="live-data">
                                    <div className="main-info">
                                        <div className="preview-avatar">
                                            {formData.avatar ? (
                                                <img src={formData.avatar} alt="Preview" />
                                            ) : (
                                                <User size={48} />
                                            )}
                                        </div>
                                        <div className="main-text">
                                            <h3>{formData.name || 'New Customer'}</h3>
                                            <p className="company-tag">{formData.company || 'No Company Added'}</p>
                                        </div>
                                    </div>

                                    <div className="details-grid">
                                        <div className="detail-item">
                                            <label>Email</label>
                                            <span>{formData.email || '—'}</span>
                                        </div>
                                        <div className="detail-item">
                                            <label>Phone</label>
                                            <span>{formData.phone || '—'}</span>
                                        </div>
                                    </div>

                                    <div className="preview-notes">
                                        <label>Notes</label>
                                        <p>{formData.notes || 'No notes added yet...'}</p>
                                    </div>

                                    {customFields.length > 0 && (
                                        <div className="preview-custom-section">
                                            <label>Additional Information</label>
                                            <div className="custom-tags">
                                                {customFields.map(field => (
                                                    field.label && (
                                                        <div key={field.id} className="custom-tag">
                                                            <strong>{field.label}:</strong> {field.value || 'N/A'}
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="status-badge">
                                        <div className="dot animate"></div>
                                        Live Editing Mode
                                    </div>
                                </div>
                            ) : (
                                <div className="empty-preview">
                                    <div className="empty-illustration">
                                        <Users size={64} className="muted-icon" />
                                        <div className="pulse-ring"></div>
                                    </div>
                                    <p>Start typing to see customer preview</p>
                                    <span>Your changes will appear here in real-time</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pro-tip">
                        <HelpCircle size={18} />
                        <p><strong>Pro Tip:</strong> You can add multiple custom fields to track specific customer attributes.</p>
                    </div>
                </div>
            </div>

            {/* 🟦 BOTTOM SECTION: EXISTING CUSTOMERS */}
            <div className="existing-customers-section">
                <div className="section-header-row">
                    <h2 className="section-title-large">Existing Customers</h2>
                    <div className="count-pill">{customers.length} total</div>
                </div>

                <div className="customers-list-grid">
                    <AnimatePresence>
                        {customers.map((customer) => (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={customer._id} 
                                className="existing-customer-card"
                            >
                                <div className="card-glass-glow"></div>
                                
                                {/* 🛠️ Subtle Admin Actions (Floating) */}
                                <div className="admin-quick-actions">
                                    <button className="mini-action edit" onClick={() => {/* handle edit */}} title="Edit">
                                        <Edit2 size={12} />
                                    </button>
                                    <button className="mini-action delete" onClick={() => deleteCustomer(customer._id)} title="Delete">
                                        <Trash2 size={12} />
                                    </button>
                                </div>

                                {/* Floating Quote Badge (Top Right Overlap) */}
                                <div className="floating-quote-icon">
                                    <Quote size={16} fill="#a855f7" stroke="none" />
                                </div>

                                {/* Dynamic Rating Section */}
                                <div className="card-rating-top">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            size={14} 
                                            fill={i < (customer.rating || 5) ? "#a855f7" : "transparent"} 
                                            stroke={i < (customer.rating || 5) ? "none" : "#334155"} 
                                        />
                                    ))}
                                </div>

                                {/* Main Quote Content */}
                                <div className="testimonial-text-content">
                                    <p>"{customer.notes || "This client has been exceptionally satisfied with our delivery and strategy. The project was completed with top-tier quality and attention to detail."}"</p>
                                </div>

                                {/* Footer: Avatar + Name + Role */}
                                <div className="testimonial-footer-row">
                                    <div className="author-avatar-box">
                                        {customer.avatar ? (
                                            <img src={customer.avatar} alt={customer.name} />
                                        ) : (
                                            <span>{customer.name && customer.name.charAt(0).toUpperCase()}</span>
                                        )}
                                    </div>
                                    <div className="author-meta-box">
                                        <h4 className="author-name">{customer.name}</h4>
                                        <p className="author-role">{customer.company || 'Professional Client'}</p>
                                    </div>
                                </div>

                                {/* Subtle Contact Info (Bottom Edge) */}
                                <div className="card-contact-hint">
                                    <span>{customer.email || 'no-email'}</span>
                                    <span className="dot-sep">•</span>
                                    <span>{customer.phone || 'no-phone'}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Customers;
