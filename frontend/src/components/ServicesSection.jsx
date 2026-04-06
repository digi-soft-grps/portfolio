import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Globe, Smartphone, BarChart, PenTool, Code, Rocket, 
    Settings, Target, Briefcase, Zap, Shield, Mail, Package, Loader2
} from 'lucide-react';
import './ServicesSection.css';

const ICON_MAP = {
    globe: Globe,
    smartphone: Smartphone,
    barchart: BarChart,
    pentool: PenTool,
    code: Code,
    rocket: Rocket,
    settings: Settings,
    target: Target,
    briefcase: Briefcase,
    zap: Zap,
    shield: Shield,
    mail: Mail
};

const ServiceCard = ({ service, index }) => {
    const IconComponent = ICON_MAP[service.icon] || Package;
    const formattedIndex = (index + 1).toString().padStart(2, '0');

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="service-card glass"
        >
            <div className="service-glow" style={{ backgroundColor: '#9b4dff' }}></div>
            <div className="service-header">
                <IconComponent size={40} className="service-icon" />
                <div className="service-index">{formattedIndex}</div>
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
            <div className="service-link">
                Learn More <span>&rarr;</span>
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
                const response = await fetch('http://localhost:5000/api/services');
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

    return (
        <section id="services" className="services-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title text-gradient">Our Expert <span className="highlight">Services</span></h2>
                    <p className="section-desc">
                        We offer a wide range of digital services to help your business 
                        succeed in today's digital landscape.
                    </p>
                </div>
                
                {loading ? (
                    <div className="loading-container">
                        <Loader2 className="spinner" size={48} color="#9b4dff" />
                        <p>Loading our expertise...</p>
                    </div>
                ) : (
                    <div className="services-grid">
                        {services.length > 0 ? (
                            services.map((service, index) => (
                                <ServiceCard key={service._id} service={service} index={index} />
                            ))
                        ) : (
                            <div className="empty-services">
                                <p>Our team is preparing something new. Stay tuned!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServicesSection;
