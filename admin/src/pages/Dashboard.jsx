import React from 'react';
import { Briefcase, Users, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Dashboard.css';

const Dashboard = () => {
    // Mock Data (In a real app, these would come from an API)
    const stats = [
        { 
            id: 1, 
            label: 'Total Services', 
            value: '12', 
            icon: Briefcase, 
            trend: '+2 this month',
            color: 'purple' 
        },
        { 
            id: 2, 
            label: 'Total Customers', 
            value: '45', 
            icon: Users, 
            trend: '+12% increase',
            color: 'blue' 
        }
    ];

    return (
        <div className="dashboard-home">
            <div className="stats-grid">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div 
                            key={stat.id}
                            className="stat-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                        >
                            <div className={`icon-box ${stat.color}`}>
                                <Icon size={24} />
                            </div>
                            <div className="stat-info">
                                <span className="stat-label">{stat.label}</span>
                                <div className="stat-value-row">
                                    <h2 className="stat-number">{stat.value}</h2>
                                    <div className="stat-trend">
                                        <ArrowUpRight size={14} />
                                        <span>{stat.trend}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Placeholder for future expansion - Keeping it minimal for now */}
            <motion.div 
                className="welcome-banner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <div className="banner-content">
                    <h3>Ready to grow?</h3>
                    <p>Manage your business services and customer base from one central location.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
