import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, Users, ArrowUpRight, TrendingUp, Package, Sparkles, Mail, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard = () => {
    const [counts, setCounts] = useState({ services: 0, customers: 0, unreadLeads: 0, totalFeedback: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, customersRes, inquiriesRes, feedbackRes] = await Promise.all([
                    axios.get(`${API}/api/services`),
                    axios.get(`${API}/api/customers`),
                    axios.get(`${API}/api/inquiries`),
                    axios.get(`${API}/api/feedback`)
                ]);
                setCounts({
                    services: Array.isArray(servicesRes.data) ? servicesRes.data.length : 0,
                    customers: Array.isArray(customersRes.data) ? customersRes.data.length : 0,
                    unreadLeads: Array.isArray(inquiriesRes.data) ? inquiriesRes.data.filter(l => l.status === 'unread').length : 0,
                    totalFeedback: Array.isArray(feedbackRes.data) ? feedbackRes.data.length : 0
                });
            } catch (err) {
                console.error('Error fetching dashboard stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const stats = [
        { 
            id: 1, 
            label: 'Total Services', 
            value: loading ? '...' : counts.services.toString(), 
            icon: Briefcase, 
            trend: 'Live',
            color: 'bg-persian-blue-600',
            textColor: 'text-persian-blue-600'
        },
        { 
            id: 2, 
            label: 'Unread Leads', 
            value: loading ? '...' : counts.unreadLeads.toString(), 
            icon: Mail, 
            trend: counts.unreadLeads > 0 ? 'Action Needed' : 'All Clear',
            color: counts.unreadLeads > 0 ? 'bg-amber-600' : 'bg-green-600',
            textColor: counts.unreadLeads > 0 ? 'text-amber-600' : 'text-green-600'
        },
        { 
            id: 3, 
            label: 'Total Feedback', 
            value: loading ? '...' : counts.totalFeedback.toString(), 
            icon: Star, 
            trend: 'Testimonials',
            color: 'bg-indigo-600',
            textColor: 'text-indigo-600'
        }
    ];

    return (
        <div className="flex flex-col gap-10">
            {/* 🟦 TOP STATS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div 
                            key={stat.id}
                            className="bg-white p-7 rounded-[2rem] border border-persian-blue-100 flex flex-col gap-6 shadow-sm hover:shadow-xl hover:shadow-persian-blue-100/50 transition-all duration-500 group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex items-center justify-between">
                                <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-current/20 group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon size={24} />
                                </div>
                                <div className={`flex items-center gap-1.5 text-xs font-bold ${stat.textColor} bg-current/5 px-3 py-1.5 rounded-full`}>
                                    <TrendingUp size={14} />
                                    <span>{stat.trend}</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-persian-blue-400 uppercase tracking-widest mb-1">{stat.label}</span>
                                <h2 className="text-4xl font-bold text-persian-blue-950 tracking-tight">{stat.value}</h2>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
