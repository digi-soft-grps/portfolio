import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import { 
  LayoutGrid, 
  Settings, 
  Users, 
  LogOut, 
  Briefcase,
  Bell,
  Search,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Layout.css';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
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
      { id: 'settings', label: 'Settings', path: '/settings', icon: Settings },
    ];

    const currentPageTitle = menuItems.find(item => item.path === location.pathname)?.label || 'Portal Dashboard';

    return (
        <div className="portal-layout">
            {/* 🟦 LEFT SIDEBAR */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-box">
                        <span className="logo-icon">DD</span>
                    </div>
                    <span className="brand-name">Dual Dreams</span>
                </div>

                <nav className="sidebar-menu">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link 
                                to={item.path} 
                                key={item.id} 
                                className={`menu-item ${isActive ? 'active' : ''}`}
                            >
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                <span>{item.label}</span>
                                {isActive && <motion.div layoutId="active-pill" className="active-pill" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* 🟦 MAIN CONTENT */}
            <main className="main-stage">
                <header className="stage-header">
                    <div className="header-left">
                        <h1>{currentPageTitle}</h1>
                        <p className="subtitle">Welcome back, {adminInfo.name || 'Admin'}</p>
                    </div>
                    
                    <div className="header-right">
                        <div className="header-actions">
                            <button className="icon-btn"><Search size={18} /></button>
                            <button className="icon-btn"><Bell size={18} /></button>
                        </div>
                        <div className="admin-pill">
                            <div className="avatar-small"><User size={16} /></div>
                            <span>{adminInfo.name || 'Admin'}</span>
                        </div>
                    </div>
                </header>

                <div className="content-viewport">
                    {/* Consistent and smooth page entry animation without forcing a full re-render cycle gap */}
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="page-container"
                    >
                        <Outlet />
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Layout;
