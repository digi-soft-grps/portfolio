import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Loader2 } from 'lucide-react';
import './Customers.css';

const API_URL = 'http://localhost:5000/api/customers';

const TestimonialCard = ({ customer, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="testimonial-card"
        >
            <div className="quote-icon">
                <Quote size={20} fill="#0066ff" stroke="none" />
            </div>
            
            <div className="stars">
                {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        size={16} 
                        fill={i < (customer.rating || 5) ? "#0066ff" : "#cce0ff"} 
                        stroke="none" 
                    />
                ))}
            </div>

            <p className="testimonial-text">"{customer.notes || "This client has been exceptionally satisfied with our delivery and strategy. The project was completed with top-tier quality and attention to detail."}"</p>
            
            <div className="testimonial-author">
                <div className="author-avatar">
                    {customer.avatar ? (
                        <img src={customer.avatar} alt={customer.name} className="avatar-img" />
                    ) : (
                        customer.name && customer.name.charAt(0).toUpperCase()
                    )}
                </div>
                <div className="author-info">
                    <span className="author-name">{customer.name}</span>
                    <span className="author-role">{customer.company || 'Professional Client'}</span>
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
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setTestimonials(data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <section id="customers" className="customers-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title text-gradient">What Our <span className="highlight">Customers Say</span></h2>
                    <p className="section-desc">
                        Don't just take our word for it — hear from the brands that have grown with us.
                    </p>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <Loader2 className="spinner" size={48} color="#0066ff" />
                        <p>Loading testimonial reviews...</p>
                    </div>
                ) : (
                    <div className="testimonials-grid">
                        {testimonials.length > 0 ? (
                            testimonials.map((testi, index) => (
                                <TestimonialCard key={testi._id} customer={testi} index={index} />
                            ))
                        ) : (
                            <div className="empty-testimonials">
                                <Quote size={40} className="muted-icon" />
                                <p>We're currently gathering reviews from our recent clients. Check back soon!</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="clients-slider">
                    <div className="slider-track">
                        {['Google', 'Microsoft', 'Amazon', 'Adobe', 'Shopify', 'Slack'].map((client, index) => (
                            <div key={index} className="client-logo">
                                {client}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Customers;
