import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Smartphone, BarChart, PenTool } from 'lucide-react';
import './ServicesSection.css';

const services = [
    {
        id: 'web-development',
        title: 'Web Development',
        desc: 'Custom, responsive websites built with the latest technologies for maximum performance.',
        icon: <Globe size={40} className="service-icon" />,
        color: '#9b4dff'
    },
    {
        id: 'app-development',
        title: 'App Development',
        desc: 'Native and cross-platform mobile apps that provide seamless experiences across all devices.',
        icon: <Smartphone size={40} className="service-icon" />,
        color: '#00d2ff'
    },
    {
        id: 'digital-marketing',
        title: 'Digital Marketing',
        desc: 'Strategies that drive traffic, increase conversions, and grow your brand presence online.',
        icon: <BarChart size={40} className="service-icon" />,
        color: '#ff4d9b'
    },
    {
        id: 'ui-ux-design',
        title: 'UI/UX Design',
        desc: 'User-centric designs that are visually stunning and intuitive to use, enhancing user satisfaction.',
        icon: <PenTool size={40} className="service-icon" />,
        color: '#4dff9b'
    }
];

const ServiceCard = ({ service, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="service-card glass"
        >
            <div className="service-glow" style={{ backgroundColor: service.color }}></div>
            <div className="service-header">
                {service.icon}
                <div className="service-index">0{index + 1}</div>
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.desc}</p>
            <Link to={`/services/${service.id}`} className="service-link">
                Learn More <span>&rarr;</span>
            </Link>
        </motion.div>
    );
};

const ServicesSection = () => {
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
                
                <div className="services-grid">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
export { services };
