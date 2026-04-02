import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquareQuote } from 'lucide-react';
import './Customers.css';

const testimonials = [
    {
        name: 'Rajesh Kumar',
        role: 'CEO, TechFlow',
        text: 'Huge improvement in our sales! The team at Dual Dreams is exceptionally talented in both web and digital strategy.',
        rating: 5
    },
    {
        name: 'Priya Sharma',
        role: 'Marketing Lead, GreenGrow',
        text: 'Best team for website and marketing. They understood our brand vision perfectly and delivered beyond expectations.',
        rating: 5
    },
    {
        name: 'Amit Patel',
        role: 'Founder, EduPeak',
        text: 'Working with them was a game-changer for our education platform. The UI/UX is world-class.',
        rating: 4
    }
];

const TestimonialCard = ({ testimonial, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="testimonial-card glass"
        >
            <div className="quote-icon glass">
                <MessageSquareQuote size={20} className="quote-svg" />
            </div>
            
            <div className="stars">
                {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        size={16} 
                        fill={i < testimonial.rating ? "var(--primary)" : "transparent"} 
                        stroke={i < testimonial.rating ? "var(--primary)" : "var(--text-muted)"} 
                    />
                ))}
            </div>

            <p className="testimonial-text">"{testimonial.text}"</p>
            
            <div className="testimonial-author">
                <div className="author-avatar glass">
                    {testimonial.name[0]}
                </div>
                <div className="author-info">
                    <span className="author-name">{testimonial.name}</span>
                    <span className="author-role">{testimonial.role}</span>
                </div>
            </div>
        </motion.div>
    );
};

const Customers = () => {
    return (
        <section id="customers" className="customers-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title text-gradient">What Our <span className="highlight">Customers Say</span></h2>
                    <p className="section-desc">
                        Don't just take our word for it — hear from the brands that have grown with us.
                    </p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testi, index) => (
                        <TestimonialCard key={index} testimonial={testi} index={index} />
                    ))}
                </div>

                <div className="clients-slider">
                    <div className="slider-track">
                        {['Google', 'Microsoft', 'Amazon', 'Adobe', 'Shopify', 'Slack'].map((client, index) => (
                            <div key={index} className="client-logo glass">
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
