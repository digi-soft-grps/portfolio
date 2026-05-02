import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  UserPlus, 
  User, 
  Quote,
  CheckCircle,
  X,
  Trash2,
  Edit2,
  Star,
  Loader2,
  Plus,
  Camera,
  Search,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TESTIMONIAL_API = `${API}/api/testimonials`;
const CUSTOMER_API = `${API}/api/customers`;

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        reviewText: '',
        rating: 5,
        profileImage: null,
        customerId: ''
    });

    const [editingId, setEditingId] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [testiRes, custRes] = await Promise.all([
                axios.get(TESTIMONIAL_API),
                axios.get(CUSTOMER_API)
            ]);
            setTestimonials(testiRes.data);
            setCustomers(custRes.data);
        } catch (err) {
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCustomerSelect = (id) => {
        const customer = customers.find(c => c._id === id);
        if (customer) {
            setFormData({
                ...formData,
                customerId: id,
                name: customer.name,
                company: customer.company || '',
                profileImage: customer.profileImage || null
            });
        } else {
            setFormData({ ...formData, customerId: '' });
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profileImage: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.reviewText) {
            toast.warning('Name and review text are required');
            return;
        }

        setIsSubmitting(true);
        try {
            if (editingId) {
                // For editing, we'll use a generic PUT if implemented, but here I'll just handle it as a new one for simplicity or implement it in routes
                // Assuming testimonialRoutes handles PUT /api/testimonials/:id
                await axios.put(`${TESTIMONIAL_API}/${editingId}`, formData);
                toast.success('Testimonial updated');
            } else {
                await axios.post(`${TESTIMONIAL_API}/admin`, formData);
                toast.success('Testimonial added and approved');
            }
            setFormData({ name: '', company: '', reviewText: '', rating: 5, profileImage: null, customerId: '' });
            setEditingId(null);
            fetchData();
        } catch (err) {
            toast.error('Operation failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleApproval = async (id, currentStatus) => {
        try {
            await axios.patch(`${TESTIMONIAL_API}/${id}/approve`, { isApproved: !currentStatus });
            setTestimonials(testimonials.map(t => t._id === id ? { ...t, isApproved: !currentStatus } : t));
            toast.success(!currentStatus ? 'Approved' : 'Disapproved');
        } catch (err) {
            toast.error('Update failed');
        }
    };

    const deleteTestimonial = async (id) => {
        if (!window.confirm('Delete this testimonial?')) return;
        try {
            await axios.delete(`${TESTIMONIAL_API}/${id}`);
            setTestimonials(testimonials.filter(t => t._id !== id));
            toast.success('Deleted');
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                {/* 🟦 FORM SECTION */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-persian-blue-100 shadow-xl">
                    <h2 className="text-2xl font-bold text-persian-blue-950 mb-8 flex items-center gap-3">
                        <Quote className="text-persian-blue-600" /> Add Testimonial
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-persian-blue-900">Select Existing Customer (Optional)</label>
                            <select 
                                className="admin-input"
                                value={formData.customerId}
                                onChange={(e) => handleCustomerSelect(e.target.value)}
                            >
                                <option value="">Manual Entry / New Client</option>
                                {customers.map(c => (
                                    <option key={c._id} value={c._id}>{c.name} ({c.company || 'Private'})</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-persian-blue-900">Author Name</label>
                                <input type="text" name="name" className="admin-input" value={formData.name} onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-persian-blue-900">Company</label>
                                <input type="text" name="company" className="admin-input" value={formData.company} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-persian-blue-900">Review Text</label>
                            <textarea name="reviewText" rows="4" className="admin-input resize-none" value={formData.reviewText} onChange={handleInputChange}></textarea>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-persian-blue-900">Rating ({formData.rating} Stars)</label>
                            <div className="flex gap-2">
                                {[1,2,3,4,5].map(star => (
                                    <Star 
                                        key={star} 
                                        size={24} 
                                        className="cursor-pointer" 
                                        fill={star <= formData.rating ? "#244bdb" : "none"}
                                        color={star <= formData.rating ? "#244bdb" : "#cbd5e1"}
                                        onClick={() => setFormData({...formData, rating: star})}
                                    />
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="admin-btn admin-btn-primary w-full h-14" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Save Testimonial'}
                        </button>
                    </form>
                </div>

                {/* 🟦 PREVIEW SECTION */}
                <div className="bg-persian-blue-50/50 p-10 rounded-[2.5rem] border border-persian-blue-100 flex flex-col items-center justify-center text-center">
                    <Quote size={40} className="text-persian-blue-200 mb-6" />
                    <p className="text-xl italic text-persian-blue-900 mb-8">"{formData.reviewText || 'Review text will appear here...'}"</p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white border flex items-center justify-center overflow-hidden">
                            {formData.profileImage ? <img src={formData.profileImage} className="w-full h-full object-cover" /> : <User />}
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-persian-blue-950">{formData.name || 'Author Name'}</p>
                            <p className="text-sm text-persian-blue-500">{formData.company || 'Company'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🟦 LIST SECTION */}
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold">Manage Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map(testi => (
                        <div key={testi._id} className="bg-white p-8 rounded-3xl border border-persian-blue-100 shadow-sm flex flex-col gap-6">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < testi.rating ? "#244bdb" : "none"} color={i < testi.rating ? "#244bdb" : "#cbd5e1"} />
                                    ))}
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${testi.isApproved ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                    {testi.isApproved ? 'Approved' : 'Pending'}
                                </div>
                            </div>
                            <p className="text-sm text-persian-blue-800 italic leading-relaxed">"{testi.reviewText}"</p>
                            <div className="flex items-center justify-between border-t border-persian-blue-50 pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-persian-blue-50 overflow-hidden flex items-center justify-center text-xs font-bold">
                                        {testi.profileImage ? <img src={testi.profileImage} className="w-full h-full object-cover" /> : testi.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{testi.name}</p>
                                        <p className="text-[10px] text-persian-blue-400">{testi.company}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => toggleApproval(testi._id, testi.isApproved)} className={`p-2 rounded-lg transition-colors ${testi.isApproved ? 'bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white' : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'}`}>
                                        {testi.isApproved ? <ThumbsDown size={16} /> : <ThumbsUp size={16} />}
                                    </button>
                                    <button onClick={() => deleteTestimonial(testi._id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
