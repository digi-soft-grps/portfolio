import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Loader2 } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const CUSTOMER_API_URL = `${API}/api/customers`;

const OurClients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(CUSTOMER_API_URL);
                if (response.ok) {
                    const data = await response.json();
                    setClients(data);
                }
            } catch (error) {
                console.error('Error fetching clients:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-persian-blue-600" size={32} />
            </div>
        );
    }

    if (clients.length === 0) return null;

    return (
        <section id="clients" className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-persian-blue-50 text-persian-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
                            Global Reach
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-persian-blue-950 tracking-tight">
                            Trusted by <span className="text-persian-blue-600">Industry Leaders</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 text-persian-blue-400">
                        <div className="h-px w-12 bg-persian-blue-100"></div>
                        <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                            <Users size={16} /> {clients.length}+ Partners
                        </span>
                    </div>
                </div>
            </div>

            {/* Clients List */}
            <div className="relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {clients.map((client, index) => (
                            <motion.div
                                key={client._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-white border border-persian-blue-100 rounded-[2.5rem] p-10 flex flex-col gap-8 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(36,75,219,0.12)] hover:-translate-y-2 hover:border-persian-blue-300"
                            >
                                {/* Top Badge & Icon */}
                                <div className="flex justify-between items-start">
                                    <div className="w-20 h-20 rounded-[2rem] bg-persian-blue-50 border border-persian-blue-100/50 overflow-hidden flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                                        {client.profileImage ? (
                                            <img src={client.profileImage} alt={client.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-3xl font-black text-persian-blue-600">
                                                {client.name.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="px-4 py-1.5 rounded-full bg-persian-blue-50 border border-persian-blue-100 text-[10px] font-bold text-persian-blue-500 uppercase tracking-widest">
                                        Verified Partner
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-2xl font-bold text-persian-blue-950 group-hover:text-persian-blue-600 transition-colors">
                                        {client.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-persian-blue-400"></div>
                                        <p className="text-sm font-bold text-persian-blue-500 uppercase tracking-[0.2em]">
                                            {client.company || 'Strategic Partner'}
                                        </p>
                                    </div>
                                </div>

                                {/* Description / Quote Placeholder */}
                                <div className="p-6 bg-persian-blue-50/50 rounded-3xl border border-persian-blue-100/50 relative">
                                    <p className="text-sm text-persian-blue-800 leading-relaxed italic">
                                        "{client.notes || 'Collaborating with Dual Dream Digisoft for cutting-edge digital transformation and strategic growth.'}"
                                    </p>
                                </div>

                                {/* Bottom Decorative Bar */}
                                <div className="absolute bottom-0 left-10 right-10 h-1 bg-linear-to-r from-transparent via-persian-blue-400/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurClients;
