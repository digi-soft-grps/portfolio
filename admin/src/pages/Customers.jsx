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

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE_URL = `${API}/api/customers`;

const Customers = () => {
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
        profileImage: null
    });
    const [customFields, setCustomFields] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    // Existing Customers State
    const [customers, setCustomers] = useState([]);
    const [editingId, setEditingId] = useState(null);

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
            if (file.size > 2 * 1024 * 1024) {
                toast.warning('Image size should be less than 2MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profileImage: reader.result }));
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

            if (editingId) {
                const res = await axios.put(`${API_BASE_URL}/${editingId}`, dataToSave);
                setCustomers(customers.map(c => c._id === editingId ? res.data : c));
                toast.success('Customer updated successfully');
            } else {
                const res = await axios.post(API_BASE_URL, dataToSave);
                setCustomers([res.data, ...customers]);
                toast.success('Customer added successfully');
            }
            
            // Reset Form
            setEditingId(null);
            setFormData({
                name: '', email: '', phone: '', company: '', notes: '', profileImage: null
            });
            setCustomFields([]);
        } catch (err) {
            toast.error(editingId ? 'Failed to update customer' : 'Failed to save customer');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (customer) => {
        setEditingId(customer._id);
        setFormData({
            name: customer.name || '',
            email: customer.email || '',
            phone: customer.phone || '',
            company: customer.company || '',
            notes: customer.notes || '',
            profileImage: customer.profileImage || null
        });
        setCustomFields(customer.customFields ? customer.customFields.map((f, i) => ({ ...f, id: i })) : []);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="flex flex-col gap-8 md:gap-12">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* 🟦 LEFT SIDE: ADD CUSTOMER FORM */}
                <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-persian-blue-100 shadow-xl shadow-persian-blue-100/20">
                    <div className="flex items-center gap-4 mb-8 md:mb-10">
                        <div className="p-3 bg-persian-blue-100 rounded-2xl text-persian-blue-600">
                            <UserPlus size={22} />
                        </div>
                        <h2 className="text-2xl font-bold text-persian-blue-950">Add New Customer</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
                        {/* Profile Image Section */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-persian-blue-50/50 rounded-3xl border border-persian-blue-100">
                            <div className="relative group">
                                <div className="w-20 h-20 rounded-2xl bg-white border border-persian-blue-100 overflow-hidden flex items-center justify-center text-persian-blue-300">
                                    {formData.profileImage ? (
                                        <img src={formData.profileImage} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={32} />
                                    )}
                                </div>
                                <label htmlFor="avatar-input" className="absolute inset-0 bg-persian-blue-600/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded-2xl text-white">
                                    <Camera size={20} />
                                    <input 
                                        type="file" 
                                        id="avatar-input" 
                                        accept="image/*" 
                                        onChange={handleImageUpload} 
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <div className="flex flex-col text-center sm:text-left">
                                <span className="font-bold text-persian-blue-900">Profile Picture</span>
                                <p className="text-sm text-persian-blue-500">Recommended: Square 200x200</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-persian-blue-900 ml-1">Customer Name</label>
                                <div className="relative group">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-persian-blue-300 group-focus-within:text-persian-blue-600 transition-colors" />
                                    <input 
                                        type="text" 
                                        name="name"
                                        placeholder="e.g. Alexander Pierce"
                                        className="admin-input pl-12"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-persian-blue-900 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-persian-blue-300 group-focus-within:text-persian-blue-600 transition-colors" />
                                    <input 
                                        type="email" 
                                        name="email"
                                        placeholder="alexander@example.com"
                                        className="admin-input pl-12"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-persian-blue-900 ml-1">Phone Number</label>
                                <div className="relative group">
                                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-persian-blue-300 group-focus-within:text-persian-blue-600 transition-colors" />
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        placeholder="+1 (555) 000-0000"
                                        className="admin-input pl-12"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-persian-blue-900 ml-1">Company Name</label>
                                <div className="relative group">
                                    <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-persian-blue-300 group-focus-within:text-persian-blue-600 transition-colors" />
                                    <input 
                                        type="text" 
                                        name="company"
                                        placeholder="Acme Corp"
                                        className="admin-input pl-12"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-persian-blue-900 ml-1">Notes / Description</label>
                            <div className="relative group">
                                <FileText size={18} className="absolute left-4 top-4 text-persian-blue-300 group-focus-within:text-persian-blue-600 transition-colors" />
                                <textarea 
                                    name="notes"
                                    placeholder="Add any specific requirements or background information here..."
                                    className="admin-input pl-12 resize-none"
                                    rows="4"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Custom Fields Section */}
                        <div className="flex flex-col gap-5 p-6 bg-persian-blue-50/50 rounded-3xl border border-persian-blue-100">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="font-bold text-persian-blue-900">Custom Fields</h3>
                                <button type="button" className="text-sm font-bold text-persian-blue-600 flex items-center gap-1 hover:text-persian-blue-800 transition-colors" onClick={addCustomField}>
                                    <Plus size={16} /> Add Field
                                </button>
                            </div>
                            <AnimatePresence>
                                {customFields.map(field => (
                                    <motion.div 
                                        key={field.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="flex gap-3"
                                    >
                                        <input 
                                            type="text" 
                                            placeholder="Label" 
                                            className="grow bg-white border border-persian-blue-100 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-persian-blue-500 focus:outline-none transition-all"
                                            value={field.label}
                                            onChange={(e) => updateCustomField(field.id, 'label', e.target.value)}
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="Value" 
                                            className="grow bg-white border border-persian-blue-100 rounded-xl px-4 py-1.5 text-sm font-medium focus:border-persian-blue-500 focus:outline-none transition-all"
                                            value={field.value}
                                            onChange={(e) => updateCustomField(field.id, 'value', e.target.value)}
                                        />
                                        <button type="button" className="p-2 text-persian-blue-300 hover:text-red-500 transition-colors" onClick={() => removeCustomField(field.id)}>
                                            <X size={18} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <button 
                            type="submit" 
                            className="admin-btn admin-btn-primary w-full text-lg h-14"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>Save Customer <CheckCircle size={20} /></>
                            )}
                        </button>
                    </form>
                </div>

                {/* 🟦 RIGHT SIDE: CUSTOMER PREVIEW */}
                <div className="hidden xl:flex flex-col gap-8 sticky top-8">
                    <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-orange-100 shadow-xl shadow-orange-100/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 blur-3xl -mr-16 -mt-16 rounded-full"></div>
                        <div className="flex items-center gap-4 mb-8 relative z-10">
                            <div className="p-3 bg-orange-100 rounded-2xl text-orange-600">
                                <HelpCircle size={22} />
                            </div>
                            <h2 className="text-2xl font-bold text-persian-blue-950">Customer Preview</h2>
                        </div>

                        <div className="relative z-10 flex items-center justify-center">
                            {formData.name || formData.email || formData.phone || formData.company || formData.notes ? (
                                <div className="w-full bg-persian-blue-50/50 border border-persian-blue-100 rounded-4xl p-6 md:p-8 text-persian-blue-900 shadow-xl relative overflow-hidden">
                                     <div className="absolute top-0 right-0 p-8 text-persian-blue-200/20">
                                        <Quote size={80} fill="currentColor" />
                                    </div>
                                    <div className="relative z-20">
                                        <div className="flex items-center gap-5 mb-8">
                                            <div className="w-16 h-16 rounded-2xl bg-white border border-persian-blue-100 overflow-hidden flex items-center justify-center text-persian-blue-300 shadow-sm">
                                                {formData.profileImage ? (
                                                    <img src={formData.profileImage} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <User size={32} />
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="text-xl font-bold">{formData.name || 'New Customer'}</h3>
                                                <p className="text-persian-blue-600 font-bold uppercase tracking-widest text-[10px] px-2.5 py-1 bg-persian-blue-100 rounded-full border border-persian-blue-200/50 w-fit mt-1.5">{formData.company || 'No Company Added'}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-persian-blue-400">Email</label>
                                                <span className="text-sm font-medium truncate">{formData.email || '—'}</span>
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-persian-blue-400">Phone</label>
                                                <span className="text-sm font-medium">{formData.phone || '—'}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 mb-8 p-5 bg-white rounded-2xl border border-persian-blue-100 shadow-sm">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-persian-blue-400">Notes / About</label>
                                            <p className="text-sm leading-relaxed italic text-persian-blue-600">"{formData.notes || 'Start typing to see the auto-preview...'}"</p>
                                        </div>

                                        {customFields.length > 0 && (
                                            <div className="flex flex-col gap-3">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-persian-blue-400">Metrics</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {customFields.map(field => (
                                                        field.label && (
                                                            <div key={field.id} className="text-[11px] bg-white border border-persian-blue-100 px-3 py-1.5 rounded-xl flex gap-2 shadow-sm">
                                                                <span className="text-persian-blue-400 font-bold">{field.label}:</span>
                                                                <span className="font-bold text-persian-blue-900">{field.value || 'N/A'}</span>
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center gap-6 py-12 px-6">
                                    <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-200 relative mb-2">
                                        <Users size={48} className="relative z-10" />
                                        <div className="absolute inset-0 bg-orange-200/20 rounded-full animate-ping"></div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <p className="text-xl font-bold text-persian-blue-950 tracking-tight">Empty Preview</p>
                                        <span className="text-persian-blue-400 text-sm font-medium">Add details to see the card real-time</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-6 bg-persian-blue-50 rounded-4xl text-persian-blue-900 shadow-xl shadow-persian-blue-100/50 border border-persian-blue-100">
                        <div className="p-2.5 bg-persian-blue-600 rounded-xl text-white shrink-0 shadow-lg shadow-persian-blue-600/20">
                             <HelpCircle size={20} />
                        </div>
                        <p className="text-sm font-bold leading-relaxed text-persian-blue-800"><strong>Pro Tip:</strong> Use the "Custom Fields" feature to track specific attributes like client timezone or social links.</p>
                    </div>
                </div>
            </div>

            {/* 🟦 BOTTOM SECTION: EXISTING CUSTOMERS */}
            <div className="flex flex-col gap-8 md:gap-10 mt-6 lg:mt-12">
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-4">
                        <h2 className="text-3xl font-bold text-persian-blue-950 tracking-tight">Active Clients</h2>
                        <span className="px-3.5 py-1.5 bg-persian-blue-100/80 text-persian-blue-600 rounded-full text-[10px] font-bold tracking-widest uppercase">{loading ? '...' : customers.length} Registered</span>
                    </div>
                    {/* View Toggle or Filter could go here */}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-persian-blue-100 shadow-sm gap-6 text-persian-blue-400">
                        <Loader2 className="animate-spin" size={48} />
                        <p className="font-bold uppercase tracking-widest text-sm">Synchronizing Data...</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <AnimatePresence mode="popLayout">
                            {customers.length > 0 ? (
                                customers.map((customer) => (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={customer._id} 
                                        className="group relative"
                                    >
                                        <div className="p-6 md:p-8 rounded-[2.5rem] bg-white border border-persian-blue-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition-all duration-500 hover:shadow-2xl hover:shadow-persian-blue-100/40 hover:border-persian-blue-300 relative overflow-hidden">
                                            {/* Profile & Identity */}
                                            <div className="flex items-center gap-6 lg:w-[25%] min-w-0">
                                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-persian-blue-50 border border-persian-blue-100 overflow-hidden flex items-center justify-center text-persian-blue-600 font-bold text-xl shadow-md shrink-0 ring-4 ring-white group-hover:scale-105 transition-transform duration-500">
                                                    {customer.profileImage ? (
                                                        <img src={customer.profileImage} alt={customer.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span>{customer.name && customer.name.charAt(0).toUpperCase()}</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col min-w-0 flex-1">
                                                    <h4 className="font-bold text-lg md:text-xl text-persian-blue-950 leading-tight group-hover:text-persian-blue-600 transition-colors truncate">{customer.name}</h4>
                                                    <p className="text-[10px] font-bold text-persian-blue-400 uppercase tracking-widest mt-1.5 flex items-center gap-2 truncate">
                                                        <Briefcase size={10} />
                                                        {customer.company || 'Private Client'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Contact Info */}
                                            <div className="flex flex-wrap items-center gap-4 lg:w-[35%]">
                                                <div className="flex items-center gap-3 px-3 py-1.5 bg-persian-blue-50 rounded-xl border border-persian-blue-100/50 min-w-[160px] max-w-[220px]">
                                                    <Mail size={12} className="text-persian-blue-400 shrink-0" />
                                                    <span className="text-sm font-bold text-persian-blue-900 truncate">{customer.email || 'No Email'}</span>
                                                </div>
                                                <div className="flex items-center gap-3 px-3 py-1.5 bg-persian-blue-50 rounded-xl border border-persian-blue-100/50">
                                                    <Phone size={12} className="text-persian-blue-400 shrink-0" />
                                                    <span className="text-sm font-bold text-persian-blue-900 whitespace-nowrap">{customer.phone || 'No Phone'}</span>
                                                </div>
                                            </div>

                                            {/* Metrics / Status */}
                                            <div className="flex items-center gap-6 lg:w-[20%] lg:justify-center">
                                                {/* Removed rating display */}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 shrink-0 lg:justify-end border-t lg:border-t-0 border-persian-blue-50 pt-5 lg:pt-0">
                                                <button 
                                                    onClick={() => handleEdit(customer)}
                                                    className="p-2.5 bg-persian-blue-50 text-persian-blue-600 rounded-xl hover:bg-persian-blue-600 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 font-bold text-sm h-10 w-10 lg:h-11 lg:w-11"
                                                    title="Edit Customer"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => deleteCustomer(customer._id)}
                                                    className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 font-bold text-sm h-10 w-10 lg:h-11 lg:w-11"
                                                    title="Delete Customer"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                             {/* Visual Decorative Element */}
                                             <div className="absolute top-0 right-0 p-4 text-persian-blue-50 opacity-10 pointer-events-none">
                                                <Quote size={80} fill="currentColor" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="py-24 bg-white/50 rounded-[3rem] border-2 border-dashed border-persian-blue-100 flex flex-col items-center justify-center text-persian-blue-300 gap-6">
                                    <div className="w-20 h-20 bg-persian-blue-50 rounded-full flex items-center justify-center">
                                        <Users size={48} className="opacity-20" />
                                    </div>
                                    <p className="text-xl font-bold">Your client list is currently empty.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Customers;
