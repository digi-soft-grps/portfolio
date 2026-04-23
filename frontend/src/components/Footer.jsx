import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import SocialLinks from './SocialLinks';

const Footer = () => {
    return (
        <footer className="bg-persian-blue-950 text-persian-blue-50 pt-24 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Info */}
                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/" className="text-2xl font-bold mb-6 block tracking-tighter">
                            <span>DUAL <span className="text-persian-blue-500">DREAMS</span></span>
                        </Link>
                        <p className="text-persian-blue-300 text-[1.05rem] leading-relaxed mb-8 max-w-[350px] pl-4 border-l-2 border-persian-blue-600/40 hover:border-persian-blue-400 hover:text-white transition-all duration-300 cursor-default">
                            Where your dreams grow digital
                        </p>
                        <SocialLinks />
                    </div>

                    {/* Services */}
                    <div className="col-span-1">
                        <h4 className="text-lg font-bold mb-8 text-white uppercase tracking-widest text-xs">Services</h4>
                        <ul className="flex flex-col gap-4 text-persian-blue-300">
                            <li><span className="hover:text-persian-blue-400 hover:translate-x-1 transition-all inline-block cursor-default">Digital Marketing</span></li>
                            <li><span className="hover:text-persian-blue-400 hover:translate-x-1 transition-all inline-block cursor-default">Web and App</span></li>
                            <li><span className="hover:text-persian-blue-400 hover:translate-x-1 transition-all inline-block cursor-default">SEO</span></li>
                            <li><span className="hover:text-persian-blue-400 hover:translate-x-1 transition-all inline-block cursor-default">Video and Poster</span></li>
                            <li><span className="hover:text-persian-blue-400 hover:translate-x-1 transition-all inline-block cursor-default">Social Accounts Handling</span></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1">
                        <h4 className="text-lg font-bold mb-8 text-white uppercase tracking-widest text-xs">Contact</h4>
                        <ul className="flex flex-col gap-6 text-persian-blue-300 text-sm">
                            <li className="flex items-center gap-4 group">
                                <Mail size={18} className="text-persian-blue-500 group-hover:scale-110 transition-transform" />
                                <span className="group-hover:text-white transition-colors">hello@dualdreams.com</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <Phone size={18} className="text-persian-blue-500 group-hover:scale-110 transition-transform" />
                                <span className="group-hover:text-white transition-colors">+1 (555) 000-0000</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <MapPin size={18} className="text-persian-blue-500 group-hover:scale-110 transition-transform" />
                                <span className="group-hover:text-white transition-colors">Silicon Valley, CA</span>
                            </li>
                        </ul>
                    </div>

                </div>
                
                <div className="pt-12 border-t border-persian-blue-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-persian-blue-400 text-sm font-medium">
                        © 2024 Dual Dreams. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-persian-blue-400 hover:text-persian-blue-600 text-xs uppercase tracking-widest font-bold transition-colors">Privacy Policy</a>
                        <a href="#" className="text-persian-blue-400 hover:text-persian-blue-600 text-xs uppercase tracking-widest font-bold transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
