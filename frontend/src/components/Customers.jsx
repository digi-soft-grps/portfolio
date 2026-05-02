import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Loader2 } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TESTIMONIAL_API_URL = `${API}/api/testimonials/public`;

const TestimonialCard = ({ customer, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative rounded-3xl overflow-hidden max-w-[420px] w-full mx-auto min-h-[280px] bg-gradient-to-br from-white via-persian-blue-50/60 to-persian-blue-100/80 border border-persian-blue-200/50 hover:border-persian-blue-400 hover:shadow-xl hover:shadow-persian-blue-200/30 transition-all duration-300"
        >

            <div className="relative z-10 p-10 flex flex-col h-full">
                {/* Quote icon */}
                <div className="absolute top-8 right-10 text-persian-blue-200/30">
                    <Quote size={24} fill="currentColor" stroke="none" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                        <Star 
                            key={i} 
                            size={16} 
                            fill={i < (customer.rating || 5) ? "#244bdb" : "#d3dbf8"} 
                            stroke="none"
                            className="group-hover:drop-shadow-sm transition-all duration-500"
                            style={{ fill: i < (customer.rating || 5) ? undefined : undefined }}
                        />
                    ))}
                </div>

                {/* Review text */}
                <p className="text-lg italic text-persian-blue-950 leading-relaxed mb-8 flex-grow">
                    "{customer.reviewText || "Exceptionally satisfied with the delivery and strategy."}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-persian-blue-100 flex items-center justify-center font-black text-persian-blue-600 text-xl border border-persian-blue-200/50">
                        {customer.profileImage ? (
                            <img src={customer.profileImage} alt={customer.name} className="w-full h-full object-cover" />
                        ) : (
                            customer.name && customer.name.charAt(0).toUpperCase()
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-persian-blue-950">{customer.name}</span>
                        <span className="text-sm text-persian-blue-700">{customer.company || 'Professional Client'}</span>
                    </div>
                </div>
            </div>


        </motion.div>
    );
};

const Customers = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch(TESTIMONIAL_API_URL);
                if (response.ok) {
                    const data = await response.json();
                    setTestimonials(data);
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <section id="customers" className="relative py-24">
            <div className="container mx-auto px-4">
                <div className="text-center  mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-persian-blue-950">
                        What Our <span className="text-persian-blue-600">Customers Say</span>
                    </h2>
                    <p className="text-lg text-persian-blue-800 max-w-[600px] mx-auto leading-relaxed">
                        Don't just take our word for it — hear from the brands that have grown with us.
                    </p>
                    <div className="h-1 w-56 mx-auto mt-4 bg-persian-blue-400 rounded-full" />
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center gap-6 py-24 text-persian-blue-700 text-center">
                        <Loader2 className="animate-spin" size={48} />
                        <p className="font-medium">Loading testimonial reviews...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
                        {testimonials.length > 0 ? (
                            testimonials.map((testi, index) => (
                                <TestimonialCard key={testi._id} customer={testi} index={index} />
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center gap-6 py-24 text-persian-blue-700 text-center">
                                <Quote size={40} className="opacity-20" />
                                <p className="text-lg">We're currently gathering reviews. Check back soon!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Customers;
