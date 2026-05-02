import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import { 
  LayoutGrid, 
  Settings, 
  Users, 
  LogOut, 
  Briefcase,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) setIsMobileMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const [adminInfo, setAdminInfo] = useState(() => {
        const info = localStorage.getItem('adminInfo');
        return info ? JSON.parse(info) : null;
    });

    useLayoutEffect(() => {
        document.body.style.opacity = "1";
    }, []);

    useEffect(() => {
        if (!adminInfo) {
            navigate('/login');
        }
    }, [adminInfo, navigate]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        navigate('/login');
    };

    if (!adminInfo) return null;

    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutGrid },
      { id: 'services', label: 'Services', path: '/services', icon: Briefcase },
      { id: 'customers', label: 'Customers', path: '/customers', icon: Users },
      { id: 'leads', label: 'Leads', path: '/leads', icon: Mail },
      { id: 'testimonials', label: 'Testimonials', path: '/testimonials', icon: Star },
    ];

    const currentPageTitle = menuItems.find(item => item.path === location.pathname)?.label || 'Portal';

    const sidebarVariants = {
        expanded: { width: 280, transition: { type: 'spring', stiffness: 300, damping: 30 } },
        collapsed: { width: 90, transition: { type: 'spring', stiffness: 300, damping: 30 } },
        mobileOpen: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
        mobileClosed: { x: -300, transition: { type: 'spring', stiffness: 300, damping: 30 } }
    };

    return (
        <div className="flex w-full h-screen bg-persian-blue-50 text-persian-blue-950 font-outfit overflow-hidden">
            {/* 🟦 MOBILE HEADER */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-persian-blue-900 text-white flex items-center justify-between px-6 z-60 shadow-xl">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-persian-blue-500 rounded-lg flex items-center justify-center font-bold text-sm text-white">DD</div>
                    <span className="font-bold tracking-tight">Dual Dream Digisoft</span>
                </div>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* 🟦 SIDEBAR */}
            <AnimatePresence mode="wait">
                {/* Mobile Overlay */}
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-70 lg:hidden"
                    />
                )}
            </AnimatePresence>
            
            <motion.aside 
                variants={sidebarVariants}
                animate={isMobile 
                    ? (isMobileMenuOpen ? 'mobileOpen' : 'mobileClosed')
                    : (isSidebarCollapsed ? 'collapsed' : 'expanded')
                }
                className={`fixed lg:sticky top-0 left-0 h-full bg-persian-blue-900 text-white flex flex-col z-80 lg:z-50 shadow-2xl lg:shadow-none overflow-hidden ${isMobile && !isMobileMenuOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}
            >
                <div className={`p-8 lg:p-10 flex items-center gap-4 ${isSidebarCollapsed ? 'justify-center lg:px-0' : ''}`}>
                    <div className="w-10 h-10 bg-persian-blue-500 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-persian-blue-500/30 shrink-0">
                        DD
                    </div>
                    {!isSidebarCollapsed && (
                        <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xl font-bold tracking-tight whitespace-nowrap"
                        >
                            Dual Dream Digisoft
                        </motion.span>
                    )}
                </div>

                <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 mt-4">
                    <div className={`px-5 mb-4 ${isSidebarCollapsed ? 'flex justify-center px-0' : ''}`}>
                        <p className={`text-[10px] font-bold uppercase tracking-[2px] text-persian-blue-400 opacity-60 whitespace-nowrap ${isSidebarCollapsed ? 'hidden' : ''}`}>Main Menu</p>
                        {isSidebarCollapsed && <div className="w-4 h-px bg-persian-blue-400/30" />}
                    </div>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link 
                                to={item.path} 
                                key={item.id} 
                                title={isSidebarCollapsed ? item.label : ''}
                                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 relative group truncate ${isActive ? 'bg-persian-blue-800 text-white shadow-lg shadow-black/20' : 'text-persian-blue-300/80 hover:bg-white/5 hover:text-white'} ${isSidebarCollapsed ? 'justify-center px-0 mx-2' : ''}`}
                            >
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
                                {!isSidebarCollapsed && (
                                    <motion.span 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="font-bold text-[15px]"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                                {isActive && !isSidebarCollapsed && <motion.div layoutId="active-pill" className="absolute right-3 w-1.5 h-1.5 bg-persian-blue-400 rounded-full shadow-[0_0_10px_rgba(79,111,226,0.8)]" />}
                                {isActive && isSidebarCollapsed && <div className="absolute right-0 w-1 h-6 bg-persian-blue-400 rounded-l-full shadow-[0_0_10px_rgba(79,111,226,0.8)]" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className={`p-6 lg:p-8 mt-auto border-t border-white/5 ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
                    <button 
                        className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-persian-blue-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 font-bold group ${isSidebarCollapsed ? 'justify-center px-0' : ''}`} 
                        onClick={handleLogout}
                        title={isSidebarCollapsed ? 'Sign Out' : ''}
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform shrink-0" />
                        {!isSidebarCollapsed && <span>Sign Out</span>}
                    </button>
                    {/* Collapse Toggle for Desktop only in sidebar bottom or header */}
                </div>
            </motion.aside>

            {/* 🟦 MAIN CONTENT */}
            <main className="flex-1 w-full h-screen flex flex-col pt-16 lg:pt-0 overflow-y-auto overflow-x-hidden scroll-smooth">
                <header className="sticky top-0 bg-persian-blue-50/90 backdrop-blur-md z-40 px-6 md:px-10 py-6 md:py-8 flex items-center justify-between gap-6 w-full border-b border-persian-blue-100/50">
                    <div className="flex items-center gap-6">
                        {/* Desktop Sidebar Toggle */}
                        <button 
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className="hidden lg:flex w-10 h-10 rounded-xl bg-white border border-persian-blue-100 text-persian-blue-600 items-center justify-center hover:bg-persian-blue-600 hover:text-white transition-all shadow-sm group"
                        >
                            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </button>
                        
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-persian-blue-400 uppercase tracking-widest mb-1.5">
                                <LayoutGrid size={12} />
                                <span>Portal</span>
                                <span className="opacity-30">/</span>
                                <span className="text-persian-blue-600">{currentPageTitle}</span>
                            </div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-persian-blue-950">{currentPageTitle}</h1>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="flex items-center gap-3 bg-white border border-persian-blue-100 pl-2 pr-4 py-1.5 rounded-2xl shadow-sm hover:border-persian-blue-300 transition-all cursor-pointer group hover:shadow-md">
                            <div className="w-9 h-9 bg-persian-blue-100 rounded-xl flex items-center justify-center text-persian-blue-600 group-hover:bg-persian-blue-600 group-hover:text-white transition-all"><User size={18} /></div>
                            <div className="hidden sm:flex flex-col">
                                <span className="font-bold text-xs leading-none mb-0.5">{adminInfo.name || 'Admin'}</span>
                                <span className="text-[10px] text-persian-blue-400 font-bold uppercase tracking-wider">{adminInfo.role || 'Super Admin'}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 px-6 md:px-10 pb-12 w-full mx-auto max-w-[1600px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="w-full mt-8 md:mt-10"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Layout;
