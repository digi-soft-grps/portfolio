import React from 'react';
import { motion } from 'framer-motion';
const Loader = () => {
    return (
        <motion.div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-persian-blue-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <motion.div 
                className="flex flex-col items-center gap-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* 🔹 LOGO */}
                <div className="w-20 h-20 bg-persian-blue-600 rounded-3xl flex items-center justify-center font-black text-3xl text-white shadow-2xl shadow-persian-blue-500/20 rotate-12">
                    DD
                </div>

                {/* 🔹 SPINNER */}
                <div className="w-12 h-12 border-4 border-persian-blue-500/20 border-t-persian-blue-500 rounded-full animate-spin"></div>

                {/* 🔹 TEXT */}
                <p className="text-persian-blue-400 font-black uppercase tracking-[0.3em] text-sm ml-[0.3em]">Loading Dashboard...</p>
            </motion.div>
        </motion.div>
    );
};

export default Loader;
