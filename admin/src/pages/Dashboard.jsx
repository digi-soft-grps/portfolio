import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceManager from '../components/ServiceManager';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [adminInfo, setAdminInfo] = useState(null);

    // ✅ FIX 2: PREVENT UI FLASH/SHIFT
    useLayoutEffect(() => {
        document.body.style.opacity = "1";
    }, []);

    useEffect(() => {
        const info = localStorage.getItem('adminInfo');
        if (info) {
            setAdminInfo(JSON.parse(info));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        navigate('/login');
    };

    if (!adminInfo) return null;

    return (
        <motion.div 
            className="dashboard-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-circle-small">DD</div>
                    <span>Dual Dreams</span>
                </div>
                <nav className="sidebar-nav">
                    <button className="nav-item active">
                        <LayoutGrid size={20} /> Add Service
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={20} /> Sign Out
                    </button>
                </div>
            </aside>
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h1>Portal Dashboard</h1>
                </header>
                <div className="dashboard-content">
                    <ServiceManager />
                </div>
            </main>
        </motion.div>
    );
};

export default Dashboard;
