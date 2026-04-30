import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2, CheckCircle, ArrowDown, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    const [status, setStatus] = useState('idle'); // idle, loading, success
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: [],
        otherService: '',
        subject: '',
        message: ''
    });

    const [feedbackData, setFeedbackData] = useState({
        name: '',
        rating: 5,
        comment: ''
    });

    const [feedbackStatus, setFeedbackStatus] = useState('idle'); // idle, loading, success

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const API = import.meta.env.VITE_API_URL;
            // Handle "Other" service selection
            const submissionData = {
                ...formData,
                service: formData.service.map(s => s === 'Other' ? `Other: ${formData.otherService}` : s)
            };

            const response = await fetch(`${API}/api/inquiries`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
            });
            
            if (!response.ok) throw new Error('Failed to send inquiry');
            
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', service: [], otherService: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus('idle');
            alert('Failed to send inquiry. Please try again later.');
        }
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        setFeedbackStatus('loading');
        try {
            const API = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API}/api/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedbackData)
            });

            if (!response.ok) throw new Error('Failed to submit feedback');

            setFeedbackStatus('success');
            setFeedbackData({ name: '', rating: 5, comment: '' });
            setTimeout(() => setFeedbackStatus('idle'), 5000);
        } catch (error) {
            console.error('Feedback error:', error);
            setFeedbackStatus('idle');
            alert('Failed to submit feedback. Please try again.');
        }
    };

    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'dualdreamdigisoft@gmail.com', color: 'bg-blue-50 text-blue-600' },

        { icon: Phone, label: 'Phone', value: '+91 9360178929', color: 'bg-green-50 text-green-600' },
    ];

    return (
        <main className="bg-persian-blue-50/20 min-h-screen">
            <Navbar />

            {/* Header Section */}
            <section className="pt-60 pb-44 bg-persian-blue-900 relative overflow-hidden text-white">
                <div className="absolute top-0 left-0 w-[800px] h-[1000px] bg-persian-blue-500/20 blur-[150px] -ml-64 -mt-64 rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[800px] bg-persian-blue-400/10 blur-[100px] -mr-32 -mb-32 rounded-full animate-pulse"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-bold text-persian-blue-300 uppercase tracking-[0.3em] mb-10">
                            Get In Touch
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10 leading-[0.9] tracking-tighter">
                            Let's Build <br /> <span className="text-persian-blue-400">Something Great</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-persian-blue-200/80 leading-relaxed font-medium">
                            Have a project in mind or just want to say hi? Reach out and our team will get back to you within 24 hours.
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-persian-blue-400/60 z-10"
                >
                    <ArrowDown size={32} strokeWidth={1.5} />
                </motion.div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* 🟦 LEFT: Contact Info (4 cols) */}
                        <div className="lg:col-span-5">
                            <div className="bg-linear-to-br from-white/20 via-persian-blue-50/40 to-persian-blue-100/60 backdrop-blur-lg p-10 rounded-[3rem] shadow-xl shadow-persian-blue-100/30 border border-persian-blue-200/50 relative overflow-hidden group">
                                {/* Glossy Accent */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-persian-blue-400/10 blur-3xl group-hover:bg-persian-blue-400/20 transition-colors duration-500 rounded-full"></div>
                                
                                <h2 className="text-2xl font-bold text-persian-blue-950 mb-10 relative z-10">Contact Information</h2>
                                                <div className="space-y-10 relative z-10">
                                                    {contactInfo.map((info, i) => (
                                                        <div key={i} className="flex items-start gap-6 group">
                                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${info.color}`}>
                                                                <info.icon size={28} />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-persian-blue-400 uppercase tracking-widest mb-1">{info.label}</p>
                                                                <p className="text-lg font-bold text-persian-blue-950">{info.value}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                            </div>
                        </div>

                        {/* 🟦 RIGHT: Contact Form (7 cols) */}
                        <div className="lg:col-span-7">
                            <div className="bg-linear-to-br from-white/20 via-persian-blue-50/40 to-persian-blue-100/60 backdrop-blur-lg p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-persian-blue-100/30 border border-persian-blue-200/50 relative overflow-hidden group">
                                {/* Glossy Accent */}
                                <div className="absolute -top-10 -right-10 w-48 h-48 bg-persian-blue-400/10 blur-3xl group-hover:bg-persian-blue-400/20 transition-colors duration-500 rounded-full"></div>
                                <AnimatePresence mode="wait">
                                    {status === 'success' ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex flex-col items-center justify-center py-20 text-center relative z-10"
                                        >
                                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
                                                <CheckCircle size={48} />
                                            </div>
                                            <h2 className="text-3xl font-bold text-persian-blue-950 mb-4">Message Sent!</h2>
                                            <p className="text-persian-blue-700 max-w-sm">We've received your inquiry and will be in touch shortly.</p>
                                            <button
                                                onClick={() => setStatus('idle')}
                                                className="mt-10 text-persian-blue-600 font-bold hover:underline"
                                            >
                                                Send another message
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            onSubmit={handleSubmit}
                                            className="space-y-8 relative z-10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-sm font-bold text-persian-blue-900 ml-1">Full Name</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="John Doe"
                                                        className="w-full bg-persian-blue-50/50 border border-persian-blue-100 rounded-2xl px-6 py-4 text-persian-blue-950 focus:ring-2 focus:ring-persian-blue-500 focus:border-transparent outline-none transition-all"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-sm font-bold text-persian-blue-900 ml-1">Email Address</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        placeholder="john@example.com"
                                                        className="w-full bg-persian-blue-50/50 border border-persian-blue-100 rounded-2xl px-6 py-4 text-persian-blue-950 focus:ring-2 focus:ring-persian-blue-500 focus:border-transparent outline-none transition-all"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-sm font-bold text-persian-blue-900 ml-1">Phone Number</label>
                                                    <input 
                                                        type="tel" 
                                                        placeholder="+91 1234567890"
                                                        className="w-full bg-persian-blue-50/50 border border-persian-blue-100 rounded-2xl px-6 py-4 text-persian-blue-950 focus:ring-2 focus:ring-persian-blue-500 focus:border-transparent outline-none transition-all"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="text-sm font-bold text-persian-blue-900 ml-1 block text-left">What service do you need? (Select all that apply)</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {['Web & App Development', 'Video & Poster', 'Digital Marketing', 'Social Media Handling', 'Other'].map((svc) => {
                                                        const isSelected = formData.service.includes(svc);
                                                        return (
                                                            <label key={svc} className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${isSelected ? 'bg-persian-blue-600 border-persian-blue-600 text-white shadow-lg shadow-persian-blue-200' : 'bg-persian-blue-50/50 border-persian-blue-100 text-persian-blue-900 hover:border-persian-blue-300'}`}>
                                                                <input 
                                                                    type="checkbox" 
                                                                    className="hidden"
                                                                    checked={isSelected}
                                                                    onChange={() => {
                                                                        const newServices = isSelected 
                                                                            ? formData.service.filter(s => s !== svc)
                                                                            : [...formData.service, svc];
                                                                        setFormData({...formData, service: newServices});
                                                                    }}
                                                                />
                                                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-white bg-white/20' : 'border-persian-blue-200'}`}>
                                                                    {isSelected && (
                                                                        <motion.div
                                                                            initial={{ scale: 0 }}
                                                                            animate={{ scale: 1 }}
                                                                            className="w-2.5 h-2.5 bg-white rounded-sm"
                                                                        />
                                                                    )}
                                                                </div>
                                                                <span className="font-bold text-sm text-left">{svc}</span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                                <AnimatePresence>
                                                    {formData.service.includes('Other') && (
                                                        <motion.div 
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="pt-2 space-y-3">
                                                                <label className="text-sm font-bold text-persian-blue-900 ml-1 block text-left">Specify Service</label>
                                                                <input 
                                                                    type="text" 
                                                                    required
                                                                    placeholder="Tell us what you need..."
                                                                    className="w-full bg-persian-blue-50/50 border border-persian-blue-100 rounded-2xl px-6 py-4 text-persian-blue-950 outline-none transition-all"
                                                                    value={formData.otherService}
                                                                    onChange={(e) => setFormData({...formData, otherService: e.target.value})}
                                                                />
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-persian-blue-900 ml-1">Subject</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="How can we help?"
                                                    className="w-full bg-persian-blue-50/50 border border-persian-blue-100 rounded-2xl px-6 py-4 text-persian-blue-950 focus:ring-2 focus:ring-persian-blue-500 focus:border-transparent outline-none transition-all"
                                                    value={formData.subject}
                                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-persian-blue-900 ml-1">Message</label>
                                                <textarea
                                                    required
                                                    placeholder="Tell us about your project..."
                                                    rows="6"
                                                    className="w-full bg-persian-blue-50/50 border border-persian-blue-100 rounded-2xl px-6 py-4 text-persian-blue-950 focus:ring-2 focus:ring-persian-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                ></textarea>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={status === 'loading'}
                                                className="w-full bg-persian-blue-600 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-persian-blue-700 transition-all shadow-xl shadow-persian-blue-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                                            >
                                                {status === 'loading' ? (
                                                    <Loader2 className="animate-spin" size={24} />
                                                ) : (
                                                    <>
                                                        Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 🟦 FEEDBACK SECTION */}
            <section className="py-24 bg-persian-blue-50/30 overflow-hidden relative">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-persian-blue-200/20 blur-[120px] rounded-full -translate-y-1/2 -ml-48"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                        {/* 🟦 LEFT: Feedback Form Box */}
                        <div className="lg:col-span-7 order-2 lg:order-1">
                            <div className="bg-linear-to-br from-white via-persian-blue-50/50 to-persian-blue-100/40 backdrop-blur-xl p-10 md:p-16 rounded-[3.5rem] border border-persian-blue-200 shadow-2xl shadow-persian-blue-100/50 relative overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {feedbackStatus === 'success' ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex flex-col items-center justify-center py-10"
                                        >
                                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
                                                <CheckCircle size={40} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-persian-blue-950 mb-3 text-center">Thank You!</h3>
                                            <p className="text-persian-blue-700 text-center">Your review has been successfully stored in our database.</p>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="feedback-form"
                                            onSubmit={handleFeedbackSubmit}
                                            className="space-y-10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <div className="space-y-4">
                                                <label className="text-sm font-bold text-persian-blue-900 uppercase tracking-widest block text-center lg:text-left">Rate our service</label>
                                                <div className="flex justify-center lg:justify-start gap-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setFeedbackData({ ...feedbackData, rating: star })}
                                                            className="hover:scale-125 transition-transform duration-300"
                                                        >
                                                            <Star
                                                                size={44}
                                                                fill={star <= feedbackData.rating ? "#244bdb" : "none"}
                                                                className={star <= feedbackData.rating ? "text-persian-blue-600" : "text-persian-blue-200"}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                                <div className="space-y-3">
                                                    <label className="text-sm font-bold text-persian-blue-900 ml-1">Your Name</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        className="w-full bg-white border border-persian-blue-100 rounded-2xl px-6 py-4 text-persian-blue-950 focus:ring-2 focus:ring-persian-blue-500 outline-none transition-all"
                                                        value={feedbackData.name}
                                                        onChange={(e) => setFeedbackData({ ...feedbackData, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-sm font-bold text-persian-blue-900 ml-1">Your Review</label>
                                                    <textarea
                                                        required
                                                        rows="1"
                                                        className="w-full bg-white border border-persian-blue-100 rounded-2xl px-6 py-4 text-persian-blue-950 focus:ring-2 focus:ring-persian-blue-500 outline-none transition-all resize-none"
                                                        value={feedbackData.comment}
                                                        onChange={(e) => setFeedbackData({ ...feedbackData, comment: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={feedbackStatus === 'loading'}
                                                className="w-full lg:w-auto px-12 py-5 bg-persian-blue-600 text-white font-bold rounded-2xl hover:bg-persian-blue-700 transition-all shadow-xl shadow-persian-blue-200 disabled:opacity-50"
                                            >
                                                {feedbackStatus === 'loading' ? <Loader2 className="animate-spin px-4" /> : 'Submit Review'}
                                            </button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* 🟦 RIGHT: Content Text */}
                        <div className="lg:col-span-5 order-1 lg:order-2 space-y-8">
                            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-persian-blue-100 text-[10px] font-bold text-persian-blue-600 uppercase tracking-widest">
                                Share Your Experience
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-persian-blue-950 leading-[1.1] tracking-tighter">
                                How Did <br /> <span className="text-persian-blue-600">We Do?</span>
                            </h2>
                            <p className="text-xl text-persian-blue-800 leading-relaxed font-medium">
                                Your feedback helps us evolve. Whether it's a project outcome or our collaboration style, we value your honest perspective.
                            </p>
                            <div className="flex items-center gap-4 pt-6 text-persian-blue-300">
                                <div className="w-12 h-px bg-persian-blue-100"></div>
                                <span className="text-xs uppercase tracking-[0.3em] font-bold">Dual Dreams Digisoft</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Contact;
