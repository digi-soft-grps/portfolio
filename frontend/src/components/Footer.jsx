import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';
import './Footer.css';

const Icons = {
    Facebook: ({ size = 24, ...props }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24 l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
        </svg>
    ),
    Twitter: ({ size = 24, ...props }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
    ),
    Instagram: ({ size = 24, ...props }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
    ),
    Linkedin: ({ size = 24, ...props }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
        </svg>
    )
};

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Info */}
                    <div className="footer-brand">
                        <Link to="/" className="logo">
                            <span className="logo-text">DUAL <span className="logo-accent">DREAMS</span></span>
                        </Link>
                        <p className="brand-desc">
                            Where your dreams grow digital
                        </p>
                        <SocialLinks />
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links-group">
                        <h4 className="footer-title">Company</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div className="footer-links-group">
                        <h4 className="footer-title">Services</h4>
                        <ul className="footer-links">
                            <li><Link to="/services/web-development">Web Development</Link></li>
                            <li><Link to="/services/app-development">App Development</Link></li>
                            <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
                            <li><Link to="/services/ui-ux-design">UI/UX Design</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-contact">
                        <h4 className="footer-title">Contact</h4>
                        <ul className="contact-list">
                            <li>
                                <Mail size={18} className="contact-icon" />
                                <span>hello@dualdreams.com</span>
                            </li>
                            <li>
                                <Phone size={18} className="contact-icon" />
                                <span>+91 (800) 123-4567</span>
                            </li>
                            <li>
                                <MapPin size={18} className="contact-icon" />
                                <span>123 Digital Road, Tech City, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        &copy; {new Date().getFullYear()} Dual Dreams. All rights reserved.
                    </p>
                    <div className="legal-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
