import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Star, 
  Trash2, 
  CheckCircle, 
  Eye, 
  EyeOff,
  Quote, 
  Clock, 
  Loader2,
  Check,
  User,
  MessageCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE_URL = `${API}/api/feedback`;

const FeedbackManager = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, unread, read, high-rated

    const fetchFeedbacks = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_BASE_URL);
            setFeedbacks(res.data);
        } catch (err) {
            toast.error('Failed to load feedback');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
        try {
            const res = await axios.patch(`${API_BASE_URL}/${id}/status`, { status: newStatus });
            setFeedbacks(feedbacks.map(f => f._id === id ? res.data : f));
            toast.success(`Marked as ${newStatus}`);
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    const deleteFeedback = async (id) => {
        if (!window.confirm('Delete this feedback permanently?')) return;
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            setFeedbacks(feedbacks.filter(f => f._id !== id));
            toast.success('Feedback deleted');
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    const filteredFeedbacks = feedbacks.filter(f => {
        if (filter === 'unread') return f.status === 'unread';
        if (filter === 'read') return f.status === 'read';
        if (filter === 'high-rated') return f.rating >= 4;
        return true;
    });

    return (
        <div className="flex flex-col gap-10">
            {/* 🟦 HEADER & STATS */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-persian-blue-100 shadow-xl shadow-persian-blue-100/20">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                            <Star size={28} fill="currentColor" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-persian-blue-950 tracking-tight">User Feedback</h2>
                            <p className="text-sm font-bold text-persian-blue-400 uppercase tracking-widest mt-1">Client testimonials</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-persian-blue-100 flex items-center gap-5 shadow-sm">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                        <TRENDUP size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-persian-blue-400 uppercase tracking-widest">Avg Rating</p>
                        <p className="text-xl font-black text-persian-blue-950">
                            {feedbacks.length > 0 ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1) : '0.0'}
                            <span className="text-amber-500 ml-1 text-sm">/ 5.0</span>
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-persian-blue-100 flex items-center gap-5 shadow-sm">
                    <div className="w-12 h-12 bg-persian-blue-50 rounded-xl flex items-center justify-center text-persian-blue-600">
                        <AWARD size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-persian-blue-400 uppercase tracking-widest">Total Reviews</p>
                        <p className="text-xl font-black text-persian-blue-950">{feedbacks.length}</p>
                    </div>
                </div>
            </div>

            {/* 🟦 FILTERS */}
            <div className="flex items-center bg-white p-2 rounded-2xl border border-persian-blue-100 w-fit">
                {['all', 'unread', 'read', 'high-rated'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-persian-blue-600 text-white shadow-lg' : 'text-persian-blue-400 hover:text-persian-blue-600'}`}
                    >
                        {f.replace('-', ' ')}
                    </button>
                ))}
            </div>

            {/* 🟦 FEEDBACK LIST */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-persian-blue-100 shadow-sm gap-6 text-persian-blue-400">
                    <Loader2 className="animate-spin" size={48} />
                    <p className="font-bold uppercase tracking-widest text-sm">Gathering Testimonials...</p>
                </div>
            ) : filteredFeedbacks.length === 0 ? (
                <div className="py-24 bg-white/50 rounded-[3rem] border-2 border-dashed border-persian-blue-100 flex flex-col items-center justify-center text-persian-blue-300 gap-6">
                    <div className="w-20 h-20 bg-persian-blue-50 rounded-full flex items-center justify-center">
                        <Star size={48} className="opacity-20" />
                    </div>
                    <p className="text-xl font-bold">No feedback matching this filter.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredFeedbacks.map((f) => (
                            <motion.div
                                key={f._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`group p-8 rounded-[3rem] bg-white border ${f.status === 'unread' ? 'border-amber-200 ring-1 ring-amber-100 shadow-xl shadow-amber-100' : 'border-persian-blue-100 shadow-sm'} transition-all hover:shadow-2xl hover:shadow-persian-blue-100 relative`}
                            >
                                <div className="absolute top-8 right-8 text-persian-blue-50/20 pointer-events-none">
                                    <Quote size={60} fill="currentColor" />
                                </div>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-persian-blue-50 rounded-2xl flex items-center justify-center text-persian-blue-600 font-bold text-lg">
                                        {f.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-persian-blue-950 leading-none mb-1.5">{f.name}</h4>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={10} fill={i < f.rating ? "#f59e0b" : "#e9edfb"} className={i < f.rating ? "text-amber-500" : "text-persian-blue-100"} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-persian-blue-50/50 rounded-3xl mb-8 min-h-[120px]">
                                    <p className="text-sm font-medium text-persian-blue-800 italic leading-relaxed">"{f.comment}"</p>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-persian-blue-50">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-persian-blue-300 uppercase tracking-widest">
                                        <Clock size={12} /> {new Date(f.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => toggleStatus(f._id, f.status)}
                                            className={`p-2.5 rounded-xl transition-all ${f.status === 'unread' ? 'bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white' : 'bg-persian-blue-50 text-persian-blue-400 hover:bg-persian-blue-600 hover:text-white'}`}
                                            title={f.status === 'unread' ? 'Mark Reviewed' : 'Mark New'}
                                        >
                                            {f.status === 'unread' ? <Eye size={16} /> : <EyeOff size={16} />}
                                        </button>
                                        <button 
                                            onClick={() => deleteFeedback(f._id)}
                                            className="p-2.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {f.status === 'unread' && (
                                    <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-amber-500/30">New</div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

// Internal utility to keep icons consistent if they aren't available in local context
const TRENDUP = ({size}) => <TrendingUp size={size} />;
const AWARD = ({size}) => <Award size={size} />;

export default FeedbackManager;
