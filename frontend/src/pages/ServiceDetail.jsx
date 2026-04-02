import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../components/ServicesSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import './ServiceDetail.css';

const serviceDetails = {
    'web-development': {
        icon: 'Globe',
        title: 'Web Development',
        fullDesc: 'We build high-performance, SEO-optimized, and responsive websites using modern frameworks like React, Next.js, and Node.js.',
        plans: [
            { name: 'Business Website', price: '₹25,000+', desc: 'Perfect for startups and small businesses.' },
            { name: 'E-commerce Website', price: '₹50,000+', desc: 'Robust online stores with secure payments.' },
            { name: 'Portfolio Website', price: '₹15,000+', desc: 'Showcase your work with style and elegance.' },
            { name: 'Custom Web Apps', price: 'Custom Quote', desc: 'Complex systems built for your unique needs.' }
        ],
        benefits: ['Fast Loading Speed', 'Mobile-First Design', 'SEO Strategy Included', 'Secure Architecture']
    },
    'app-development': {
        icon: 'Smartphone',
        title: 'App Development',
        fullDesc: 'Creating seamless mobile experiences for iOS and Android with Flutter and React Native.',
        plans: [
            { name: 'Native iOS App', price: '₹80,000+', desc: 'Premium apps for Apple devices.' },
            { name: 'Native Android App', price: '₹70,000+', desc: 'High-quality apps for the Play Store.' },
            { name: 'Hybrid Mobile App', price: '₹1,00,000+', desc: 'One codebase for both platforms.' },
            { name: 'PWA Development', price: '₹40,000+', desc: 'Installable web apps for all devices.' }
        ],
        benefits: ['Smooth Performance', 'Intuitive UI', 'Push Notifications', 'Offline Functionality']
    },
    'digital-marketing': {
        icon: 'BarChart',
        title: 'Digital Marketing',
        fullDesc: 'We help brands grow their online presence with data-driven marketing strategies.',
        plans: [
            { name: 'SEO Optimization', price: '₹15,000/mo', desc: 'Rank higher on Google and Bing.' },
            { name: 'Social Media Management', price: '₹20,000/mo', desc: 'Engage your audience across platforms.' },
            { name: 'PPC Advertising', price: 'Custom Quote', desc: 'Targeted ads that convert instantly.' },
            { name: 'Content Marketing', price: '₹10,000/mo', desc: 'Value-driven content that builds trust.' }
        ],
        benefits: ['Increased Traffic', 'Higher Conversion Rate', 'Brand Identity Growth', 'Real-time Analytics']
    },
    'ui-ux-design': {
        icon: 'PenTool',
        title: 'UI/UX Design',
        fullDesc: 'Crafting visually stunning and user-centric designs that solve problems.',
        plans: [
            { name: 'Landing Page Design', price: '₹10,000+', desc: 'High-converting single-page designs.' },
            { name: 'Complete Website Redesign', price: '₹40,000+', desc: 'Modernize your existing digital presence.' },
            { name: 'Mobile App UI', price: '₹30,000+', desc: 'Beautiful interfaces for your apps.' },
            { name: 'Brand Identity', price: '₹20,000+', desc: 'Logos, color palettes, and more.' }
        ],
        benefits: ['User-Centered Approach', 'Modern Aesthetics', 'Interactive Prototypes', 'Design Systems']
    }
};

const ServiceDetail = () => {
    const { id } = useParams();
    const detail = serviceDetails[id];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!detail) {
        return (
            <div className="not-found">
                <h2>Service Not Found</h2>
                <Link to="/">Back to Home</Link>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="service-detail-page">
                <section className="container detail-hero">
                    <Link to="/services" className="back-link">
                        <ArrowLeft size={16} /> Back to Services
                    </Link>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="detail-header"
                    >
                        <h1 className="detail-title text-gradient">{detail.title}</h1>
                        <p className="detail-desc">{detail.fullDesc}</p>
                    </motion.div>

                    <div className="detail-grid">
                        {/* Benefits */}
                        <div className="detail-sidebar">
                            <h3 className="section-subtitle">Why Choose Us?</h3>
                            <ul className="benefits-list">
                                {detail.benefits.map((benefit, i) => (
                                    <li key={i} className="benefit-item">
                                        <CheckCircle size={18} className="check-icon" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="sidebar-cta glass">
                                <h4>Ready to start?</h4>
                                <p>Get a custom quote for your project today.</p>
                                <button className="btn btn-primary full-width">Contact Us Now</button>
                            </div>
                        </div>

                        {/* Plans Grid */}
                        <div className="plans-content">
                            <h3 className="section-subtitle">Service Packages</h3>
                            <div className="plans-grid">
                                {detail.plans.map((plan, i) => (
                                    <motion.div 
                                        key={i} 
                                        className="plan-card glass"
                                        whileHover={{ scale: 1.02, borderColor: 'var(--primary)' }}
                                    >
                                        <div className="plan-header">
                                            <h4 className="plan-name">{plan.name}</h4>
                                            <span className="plan-price">{plan.price}</span>
                                        </div>
                                        <p className="plan-desc">{plan.desc}</p>
                                        <button className="plan-btn">Choose Plan &rarr;</button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ServiceDetail;
