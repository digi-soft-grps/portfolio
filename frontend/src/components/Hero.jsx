import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Star, Shield, Users } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-bg">
                <div className="glow glow-1"></div>
                <div className="glow glow-2"></div>
            </div>
            
            <div className="container hero-container">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-content"
                >
                    <div className="badge glass">
                        <Zap size={16} className="badge-icon" />
                        <span>Innovating for the Digital Future</span>
                    </div>
                    
                    <h1 className="hero-title">
                        We Build Digital Experiences That Grow Your Business
                    </h1>
                    
                    <p className="hero-desc">
                        From stunning websites to powerful marketing strategies, 
                        we help brands scale faster with cutting-edge software solutions.
                    </p>
                    
                    <div className="hero-actions">
                        <button className="btn btn-primary">
                            View Services <ArrowRight size={20} />
                        </button>
                        <button className="btn btn-outline">
                            Contact Us
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <Star size={24} className="stat-icon" />
                            <div className="stat-info">
                                <span className="stat-value">4.9/5</span>
                                <span className="stat-label">Rating</span>
                            </div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <Users size={24} className="stat-icon" />
                            <div className="stat-info">
                                <span className="stat-value">500+</span>
                                <span className="stat-label">Clients</span>
                            </div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <Shield size={24} className="stat-icon" />
                            <div className="stat-info">
                                <span className="stat-value">100%</span>
                                <span className="stat-label">Secure</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="hero-visual"
                >
                    <div className="visual-card glass">
                        <div className="card-header">
                            <div className="dot red"></div>
                            <div className="dot yellow"></div>
                            <div className="dot green"></div>
                        </div>
                        <div className="card-content">
                            <div className="mockup-row row-1"></div>
                            <div className="mockup-row row-2"></div>
                            <div className="mockup-row row-3"></div>
                            <div className="mockup-grid">
                                <div className="mockup-item"></div>
                                <div className="mockup-item"></div>
                            </div>
                        </div>
                    </div>
                    <div className="visual-aura"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
