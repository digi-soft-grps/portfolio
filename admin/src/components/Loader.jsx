import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const Loader = () => {
    return (
        <motion.div 
            className="loader-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <motion.div 
                className="loader-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* 🔹 LOGO */}
                <div className="loader-logo">DD</div>

                {/* 🔹 SPINNER */}
                <div className="loader-spinner"></div>

                {/* 🔹 TEXT */}
                <p className="loader-text">Loading Dashboard...</p>
            </motion.div>
        </motion.div>
    );
};

export default Loader;
