import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Customers', path: '#customers' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <span className="logo-text">DUAL <span className="logo-accent">DREAMS</span></span>
                </Link>

                {/* Desktop Nav */}
                <ul className="nav-links">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link to={link.path} className="nav-link">{link.name}</Link>
                        </li>
                    ))}
                </ul>

                <button className="btn btn-primary cta-btn">
                    Get a Quote <ArrowRight size={18} />
                </button>

                {/* Mobile Menu Toggle */}
                <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>

            {/* Mobile Nav */}
            <div className={`mobile-nav ${isOpen ? 'active glass' : ''}`}>
                <ul className="container">
                    {navLinks.map((link) => (
                        <li key={link.name} onClick={() => setIsOpen(false)}>
                            <Link to={link.path} className="nav-link">{link.name}</Link>
                        </li>
                    ))}
                    <li className="mobile-cta">
                        <button className="btn btn-primary cta-btn">Get a Quote</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
