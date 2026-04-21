import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Mail, 
  Trash2, 
  Eye, 
  EyeOff,
  MessageSquare, 
  Clock, 
  Briefcase,
  Loader2,
  Check,
  ChevronDown,
  User,
  Phone,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE_URL = `${API}/api/inquiries`;

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [expandedId, setExpandedId] = useState(null);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_BASE_URL);
            setLeads(res.data);
        } catch (err) {
            toast.error('Failed to load leads');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLeads(); }, []);

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
        try {
            const res = await axios.patch(`${API_BASE_URL}/${id}/status`, { status: newStatus });
            setLeads(leads.map(l => l._id === id ? res.data : l));
            toast.success(`Marked as ${newStatus}`);
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    const deleteLead = async (id) => {
        if (!window.confirm('Delete this inquiry permanently?')) return;
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            setLeads(leads.filter(l => l._id !== id));
            if (expandedId === id) setExpandedId(null);
            toast.success('Lead deleted');
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    const filteredLeads = leads.filter(l => {
        if (filter === 'unread') return l.status === 'unread';
        if (filter === 'read') return l.status === 'read';
        return true;
    });

    const unreadCount = leads.filter(l => l.status === 'unread').length;

    return (
        <div className="flex flex-col gap-8">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white p-6 md:p-8 rounded-3xl border border-persian-blue-100 shadow-xl shadow-persian-blue-100/20">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-persian-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-persian-blue-600/20">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-persian-blue-950 tracking-tight">Contact Leads</h2>
                        <p className="text-xs font-bold text-persian-blue-400 uppercase tracking-widest mt-0.5">Manage inquiries</p>
                    </div>
                </div>
                <div className="flex items-center bg-persian-blue-50 p-1 rounded-xl border border-persian-blue-100">
                    {['all', 'unread', 'read'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-persian-blue-600 shadow-md ring-1 ring-persian-blue-100' : 'text-persian-blue-400 hover:text-persian-blue-600'}`}
                        >
                            {f} {f === 'unread' && unreadCount > 0 && `(${unreadCount})`}
                        </button>
                    ))}
                </div>
            </div>

            {/* LEADS LIST */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-persian-blue-100 shadow-sm gap-4 text-persian-blue-400">
                    <Loader2 className="animate-spin" size={40} />
                    <p className="font-bold uppercase tracking-widest text-xs">Loading Leads...</p>
                </div>
            ) : filteredLeads.length === 0 ? (
                <div className="py-20 bg-white/50 rounded-3xl border-2 border-dashed border-persian-blue-100 flex flex-col items-center justify-center text-persian-blue-300 gap-4">
                    <Mail size={40} className="opacity-20" />
                    <p className="text-lg font-bold">No leads found.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    <AnimatePresence mode="popLayout">
                        {filteredLeads.map((lead) => {
                            const isExpanded = expandedId === lead._id;
                            const isUnread = lead.status === 'unread';
                            return (
                                <motion.div
                                    key={lead._id}
                                    layout
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${isUnread ? 'border-persian-blue-300 shadow-lg shadow-persian-blue-100/40' : 'border-persian-blue-100 shadow-sm'}`}
                                >
                                    {/* COLLAPSED ROW */}
                                    <div
                                        onClick={() => toggleExpand(lead._id)}
                                        className="flex items-center gap-3 md:gap-5 p-4 md:p-5 cursor-pointer hover:bg-persian-blue-50/30 transition-colors"
                                    >
                                        {/* Avatar */}
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${isUnread ? 'bg-persian-blue-600 text-white' : 'bg-persian-blue-50 text-persian-blue-400'}`}>
                                            {lead.name.charAt(0).toUpperCase()}
                                        </div>

                                        {/* Name + Date */}
                                        <div className="flex flex-col min-w-0 flex-1">
                                            <h4 className={`text-sm font-bold truncate ${isUnread ? 'text-persian-blue-950' : 'text-persian-blue-700'}`}>{lead.name}</h4>
                                            <p className="text-[10px] text-persian-blue-400 flex items-center gap-1 mt-0.5">
                                                <Clock size={9} />
                                                {new Date(lead.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>

                                        {/* Service badge - hidden on mobile */}
                                        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-persian-blue-50 rounded-lg">
                                            <Briefcase size={12} className="text-persian-blue-500" />
                                            <span className="text-[10px] font-bold text-persian-blue-700 uppercase tracking-wider truncate max-w-[140px]">{lead.service}</span>
                                        </div>

                                        {/* Subject - hidden on small screens */}
                                        <p className="hidden lg:block text-xs text-persian-blue-600 truncate max-w-[200px] font-medium">{lead.subject}</p>

                                        {/* Status dot */}
                                        {isUnread && (
                                            <div className="w-2.5 h-2.5 bg-persian-blue-600 rounded-full animate-pulse shrink-0" />
                                        )}

                                        {/* Chevron */}
                                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-persian-blue-300 shrink-0">
                                            <ChevronDown size={18} />
                                        </motion.div>
                                    </div>

                                    {/* EXPANDED DETAIL */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-4 md:px-5 pb-5 pt-1 border-t border-persian-blue-50">
                                                    {/* Info grid */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                                                        <div className="flex items-center gap-3 p-3 bg-persian-blue-50/50 rounded-xl">
                                                            <Mail size={16} className="text-persian-blue-500 shrink-0" />
                                                            <div className="min-w-0">
                                                                <p className="text-[9px] font-bold text-persian-blue-400 uppercase tracking-widest">Email</p>
                                                                <p className="text-xs font-bold text-persian-blue-900 truncate">{lead.email}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 p-3 bg-persian-blue-50/50 rounded-xl">
                                                            <Phone size={16} className="text-persian-blue-500 shrink-0" />
                                                            <div className="min-w-0">
                                                                <p className="text-[9px] font-bold text-persian-blue-400 uppercase tracking-widest">Phone</p>
                                                                <p className="text-xs font-bold text-persian-blue-900">{lead.phone || 'N/A'}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 p-3 bg-persian-blue-50/50 rounded-xl">
                                                            <Briefcase size={16} className="text-persian-blue-500 shrink-0" />
                                                            <div className="min-w-0">
                                                                <p className="text-[9px] font-bold text-persian-blue-400 uppercase tracking-widest">Service</p>
                                                                <p className="text-xs font-bold text-persian-blue-900 truncate">{lead.service}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 p-3 bg-persian-blue-50/50 rounded-xl">
                                                            <Clock size={16} className="text-persian-blue-500 shrink-0" />
                                                            <div className="min-w-0">
                                                                <p className="text-[9px] font-bold text-persian-blue-400 uppercase tracking-widest">Date</p>
                                                                <p className="text-xs font-bold text-persian-blue-900">{new Date(lead.createdAt).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Subject */}
                                                    <div className="mt-4">
                                                        <p className="text-[9px] font-bold text-persian-blue-400 uppercase tracking-widest mb-1.5">Subject</p>
                                                        <p className="text-sm font-semibold text-persian-blue-950">{lead.subject}</p>
                                                    </div>

                                                    {/* Message */}
                                                    <div className="mt-4">
                                                        <p className="text-[9px] font-bold text-persian-blue-400 uppercase tracking-widest mb-1.5">Message</p>
                                                        <div className="p-4 bg-persian-blue-50/50 rounded-xl border border-persian-blue-100 relative">
                                                            <MessageSquare size={60} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-persian-blue-100/50 pointer-events-none" />
                                                            <p className="text-sm text-persian-blue-800 leading-relaxed relative italic font-medium">"{lead.message}"</p>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex flex-wrap items-center gap-2 mt-5">
                                                        <a
                                                            href={`mailto:${lead.email}?subject=Re: ${lead.subject}`}
                                                            className="flex items-center gap-2 px-4 py-2.5 bg-persian-blue-600 text-white text-xs font-bold rounded-xl hover:bg-persian-blue-700 transition-all shadow-md shadow-persian-blue-600/20"
                                                        >
                                                            <Mail size={14} /> Reply
                                                        </a>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); toggleStatus(lead._id, lead.status); }}
                                                            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${isUnread ? 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white' : 'bg-persian-blue-50 text-persian-blue-500 hover:bg-persian-blue-600 hover:text-white'}`}
                                                        >
                                                            {isUnread ? <><Eye size={14} /> Mark Read</> : <><EyeOff size={14} /> Mark Unread</>}
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); deleteLead(lead._id); }}
                                                            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-500 text-xs font-bold rounded-xl hover:bg-red-600 hover:text-white transition-all ml-auto"
                                                        >
                                                            <Trash2 size={14} /> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default Leads;
