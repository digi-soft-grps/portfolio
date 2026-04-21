import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, Package, Zap, Shield, Target, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServicesImg from '../assets/Services.png';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ServiceCard = ({ service, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            onClick={onClick}
            className="group rounded-3xl overflow-hidden cursor-pointer shadow-2 shadow-persian-blue-100/30 hover:shadow-2xl hover:shadow-persian-blue-200/40 border border-persian-blue-200/50 transition-all duration-300 bg-linear-to-br from-white/40 via-persian-blue-50/60 to-persian-blue-100/80 backdrop-blur-lg"
        >
            {/* Image top section */}
            <div className="w-full h-52 bg-linear-to-br from-persian-blue-400/20 via-persian-blue-50/30 to-persian-blue-600/20 relative overflow-hidden flex items-center justify-center p-6 border-b border-persian-blue-100/50">
                {service.image ? (
                    <img src={service.image} alt={service.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="text-persian-blue-200">
                        <Package size={56} />
                    </div>
                )}
            </div>

            {/* Content bottom section */}
            <div className="p-6">
                <h3 className="text-lg font-bold text-persian-blue-950 mb-2">{service.title}</h3>
                <p className="text-sm text-persian-blue-600 font-medium flex items-center gap-1.5 group-hover:gap-3 transition-all">
                    View Details <ArrowRight size={14} />
                </p>
            </div>
        </motion.div>
    );
};

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${API}/api/services`);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
        window.scrollTo(0, 0);
    }, []);

    const features = [
        { icon: Zap, title: "Fast Delivery", desc: "We prioritize speed without compromising quality." },
        { icon: Shield, title: "Secure Solutions", desc: "Your data and security are our top priority." },
        { icon: Target, title: "Result Driven", desc: "We focus on outcomes that matter to your business." }
    ];

    return (
        <main className="bg-persian-blue-50/30 min-h-screen">
            <Navbar />
            
            {/* Header */}
            <section className="pt-48 pb-24 bg-persian-blue-900 relative overflow-hidden text-white sm:pt-40">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-persian-blue-500/20 blur-[150px] -mr-96 -mt-96 rounded-full animate-pulse" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-bold text-persian-blue-300 uppercase tracking-[0.3em] mb-10">
                            Expertise & Solutions
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10 leading-[0.9] tracking-tighter">
                            Our Full <span className="text-persian-blue-400">Service</span> Spectrum
                        </h1>
                        <p className="text-xl md:text-2xl text-persian-blue-200/80 max-w-[850px] mx-auto leading-relaxed font-medium">
                            End-to-end digital transformation. Click any service to learn more.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Features Bar */}
            <section className="relative z-20 -mt-12 md:-mt-16 pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white/80 backdrop-blur-2xl p-10 md:p-12 rounded-[3rem] shadow-2xl shadow-persian-blue-900/20 border border-white/50">
                        {features.map((f, i) => (
                            <div key={i} className="flex flex-col items-center text-center gap-4 group">
                                <div className="w-14 h-14 bg-persian-blue-50 rounded-2xl flex items-center justify-center text-persian-blue-600 transition-transform group-hover:scale-110 duration-300 shadow-inner">
                                    <f.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-persian-blue-950 group-hover:text-persian-blue-600 transition-colors">{f.title}</h3>
                                <p className="text-persian-blue-700 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Our Services */}
            <section className="pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left — Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="rounded-3xl overflow-hidden shadow-2xl shadow-persian-blue-200/30"
                        >
                            <img src={ServicesImg} alt="Our Services" className="w-full h-auto object-contain" />
                        </motion.div>

                        {/* Right — Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-6"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-persian-blue-950 leading-tight">
                                What We <span className="text-persian-blue-600">Deliver</span>
                            </h2>
                            <p className="text-persian-blue-700 text-lg leading-relaxed">
                                We provide end-to-end digital solutions that combine creativity, technology, and strategy to help businesses grow and scale. From building high-performance websites and mobile applications to executing result-driven digital and social media marketing, we focus on delivering quality, innovation, and measurable impact in everything we do.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="pb-32">
                <div className="container mx-auto px-4">
                    <div className="mb-20 flex flex-col items-center text-center gap-4">
                        <h3 className="text-2xl md:text-4xl font-bold text-persian-blue-950 tracking-tight">
                            Our Specialized Services
                        </h3>
                        <div className="h-1 w-56 bg-persian-blue-400 rounded-full" />
                    </div>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-6 text-persian-blue-300">
                            <Loader2 className="animate-spin" size={64} />
                            <p className="font-bold uppercase tracking-widest text-sm">Loading our expertise...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                            {services.length > 0 ? (
                                services.map((service, index) => (
                                    <ServiceCard
                                        key={service._id}
                                        service={service}
                                        index={index}
                                        onClick={() => setSelectedService(service)}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full py-32 bg-white rounded-3xl border-2 border-dashed border-persian-blue-100 flex flex-col items-center justify-center text-persian-blue-300 gap-6">
                                    <Package size={64} className="opacity-20" />
                                    <p className="text-xl font-bold">New services are being integrated. Stay tuned!</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* SERVICE DETAIL MODAL */}
            <AnimatePresence>
                {selectedService && (
                    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedService(null)}
                            className="absolute inset-0 bg-persian-blue-950/50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative z-10 bg-white w-full max-w-sm md:max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                        >
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-3 right-3 z-20 p-2 rounded-xl bg-white/80 backdrop-blur-sm text-persian-blue-400 hover:text-persian-blue-900 hover:bg-persian-blue-50 transition-all shadow-md"
                            >
                                <X size={18} />
                            </button>

                            {/* Modal image — fixed, not scrollable */}
                            <div className="w-full h-40 md:h-64 bg-gradient-to-br from-persian-blue-50 to-persian-blue-100 flex items-center justify-center p-4 md:p-6 shrink-0">
                                {selectedService.image ? (
                                    <img src={selectedService.image} alt={selectedService.title} className="max-w-full max-h-full object-contain" />
                                ) : (
                                    <div className="text-persian-blue-200"><Package size={48} /></div>
                                )}
                            </div>

                            {/* Modal content — scrollable */}
                            <div className="p-6 md:p-8 overflow-y-auto flex-1">
                                <h2 className="text-xl md:text-2xl font-bold text-persian-blue-950 mb-3">{selectedService.title}</h2>
                                <p className="text-sm md:text-base text-persian-blue-700 leading-relaxed mb-6">{selectedService.description}</p>
                                <Link
                                    to="/contact"
                                    onClick={() => setSelectedService(null)}
                                    className="inline-flex items-center gap-2 px-6 md:px-8 py-3 bg-persian-blue-600 text-white font-bold text-sm rounded-xl hover:bg-persian-blue-700 transition-all shadow-lg shadow-persian-blue-600/20"
                                >
                                    Get Started <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
};

export default ServicesPage;
