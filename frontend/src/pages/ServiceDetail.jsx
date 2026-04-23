import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, CheckCircle } from 'lucide-react';
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
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                <h2 className="text-3xl font-bold text-persian-blue-950">Service Not Found</h2>
                <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            
            {/* Header Section */}
            <section className="pt-48 pb-24 bg-persian-blue-900 relative overflow-hidden text-white">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-persian-blue-500/10 blur-[150px] -ml-64 -mt-64 rounded-full"></div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link to="/services" className="inline-flex items-center gap-2 text-persian-blue-300 hover:text-white font-bold mb-12 transition-all hover:-translate-x-2 group">
                            <ArrowLeft size={18} className="transition-transform" /> Back to Services
                        </Link>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10 leading-[0.9] tracking-tighter">{detail.title}</h1>
                        <p className="text-xl md:text-2xl text-persian-blue-200/80 max-w-[850px] mx-auto leading-relaxed font-medium">{detail.fullDesc}</p>
                    </motion.div>
                </div>
            </section>

            <div className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Benefits */}
                        <div className="col-span-1">
                            <h3 className="text-2xl font-bold mb-8 text-persian-blue-950">Why Choose Us?</h3>
                            <ul className="flex flex-col gap-5 mb-12">
                                {detail.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-4 text-persian-blue-800 font-medium">
                                        <CheckCircle size={20} className="text-persian-blue-600" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="p-10 rounded-[3rem] text-center bg-persian-blue-50 border border-persian-blue-100 shadow-xl shadow-persian-blue-100/50">
                                <h4 className="text-2xl font-bold mb-4 text-persian-blue-950">Ready to start?</h4>
                                <p className="text-persian-blue-700 mb-8 leading-relaxed">Get a custom quote for your project today.</p>
                                <button className="bg-persian-blue-600 text-white font-bold w-full py-4 rounded-xl hover:bg-persian-blue-700 transition-all">Contact Us Now</button>
                            </div>
                        </div>

                        {/* Plans Grid */}
                        <div className="col-span-1 lg:col-span-2">
                            <h3 className="text-2xl font-bold mb-8 text-persian-blue-950">Service Packages</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {detail.plans.map((plan, i) => (
                                    <motion.div 
                                        key={i} 
                                        className="p-10 rounded-[2.5rem] flex flex-col h-full bg-white border border-persian-blue-100 transition-all duration-300 hover:border-persian-blue-500 hover:shadow-2xl hover:shadow-persian-blue-100 group"
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <h4 className="text-xl font-black text-persian-blue-950 max-w-[150px]">{plan.name}</h4>
                                            <span className="text-sm font-black text-persian-blue-600 bg-persian-blue-50 px-4 py-1.5 rounded-full border border-persian-blue-100">{plan.price}</span>
                                        </div>
                                        <p className="text-persian-blue-700 text-sm leading-relaxed mb-8 flex-grow">{plan.desc}</p>
                                        <button className="flex items-center gap-2 font-bold text-sm text-persian-blue-900 hover:text-persian-blue-600 transition-colors">
                                            Choose Plan <ArrowRight size={16} />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ServiceDetail;
