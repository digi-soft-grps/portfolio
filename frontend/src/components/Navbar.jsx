import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

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
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 flex items-center ${scrolled ? 'h-[70px] bg-white/80 backdrop-blur-lg shadow-lg shadow-persian-blue-100/20 border-b border-persian-blue-100' : 'h-[90px] bg-transparent'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center w-full">
                <Link to="/" className={`text-2xl font-bold tracking-tighter transition-colors duration-500 ${scrolled ? 'text-persian-blue-950' : 'text-white'}`}>
                    <span>Dual Dream <span className={scrolled ? 'text-persian-blue-600' : 'text-persian-blue-400'}>Digisoft</span></span>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden lg:flex gap-10">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link to={link.path} className={`font-bold text-sm transition-all duration-500 relative group ${scrolled ? 'text-persian-blue-800 hover:text-persian-blue-600' : 'text-white/90 hover:text-white'}`}>
                                {link.name}
                                <span className={`absolute bottom-[-4px] left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-persian-blue-600' : 'bg-white'}`}></span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Toggle */}
                <div className={`lg:hidden cursor-pointer transition-colors duration-500 ${scrolled || isOpen ? 'text-persian-blue-900' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>

            {/* Mobile Nav */}
            <div className={`fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] transition-all duration-300 flex flex-col z-[999] bg-persian-blue-50 border-t border-persian-blue-100 lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <ul className="container mx-auto px-4 pt-8 flex flex-col gap-8 items-center">
                    {navLinks.map((link) => (
                        <li key={link.name} onClick={() => setIsOpen(false)}>
                            <Link to={link.path} className="text-lg font-medium text-persian-blue-800 hover:text-persian-blue-600">{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
