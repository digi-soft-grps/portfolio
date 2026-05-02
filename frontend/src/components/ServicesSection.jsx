import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import StrategyImg from '../assets/strategy.jpg';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ServiceCard = ({ service, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group rounded-3xl overflow-hidden shadow-2 shadow-persian-blue-100/30 hover:shadow-2xl hover:shadow-persian-blue-200/40 border border-persian-blue-200/50 transition-all duration-300 bg-linear-to-br from-white/40 via-persian-blue-50/60 to-persian-blue-100/80 backdrop-blur-lg"
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
                <h3 className="text-lg font-bold text-persian-blue-950 mb-1">{service.title}</h3>
            </div>
        </motion.div>
    );
};

const ServicesSection = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

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
    }, []);

    const displayedServices = services.slice(0, 3);

    return (
        <section id="services" className="relative z-10 py-32 bg-persian-blue-50/30">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
                    {/* Left - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="rounded-3xl overflow-hidden shadow-2xl shadow-persian-blue-200/40 border border-persian-blue-100"
                    >
                        <img src={StrategyImg} alt="Strategic Growth" className="w-full h-auto object-cover" />
                    </motion.div>

                    {/* Right - Text */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-4xl md:text-6xl font-black text-persian-blue-950 leading-[1.1] tracking-tight">
                            Strategic Services for <br /> <span className="text-persian-blue-600">Exponential Growth</span>
                        </h2>
                        <p className="text-xl text-persian-blue-800 leading-relaxed font-medium">
                            At Dual Dream Digisoft, we turn ideas into powerful digital experiences.
                            From development to marketing, we blend strategy and technology to create solutions that perform, scale, and grow with your business.
                            We don’t just build—we build for impact.
                        </p>
                    </div>
                </div>

                <div className="mb-16 flex flex-col items-center text-center gap-4">
                    <h3 className="text-2xl md:text-4xl font-bold text-persian-blue-950 tracking-tight">
                        Our Specialized Services
                    </h3>
                    <div className="h-1 w-56 bg-persian-blue-400 rounded-full" />
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center gap-6 py-32 text-persian-blue-300 text-center">
                        <Loader2 className="animate-spin" size={64} />
                        <p className="font-bold uppercase tracking-widest text-sm">Synchronizing Portfolio...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                            {displayedServices.length > 0 ? (
                                displayedServices.map((service, index) => (
                                    <ServiceCard key={service._id} service={service} index={index} />
                                ))
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center gap-6 py-32 text-persian-blue-300 text-center bg-white rounded-3xl border-2 border-dashed border-persian-blue-100">
                                    <Package size={64} className="opacity-20" />
                                    <p className="text-xl font-bold">Discovering new horizons. Keep an eye out!</p>
                                </div>
                            )}
                        </div>

                        {services.length > 3 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex justify-center mt-14"
                            >
                                <Link
                                    to="/services"
                                    className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-persian-blue-600 text-white font-bold text-lg shadow-xl shadow-persian-blue-600/30 hover:shadow-2xl hover:shadow-persian-blue-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
                                >
                                    View All Services
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default ServicesSection;
