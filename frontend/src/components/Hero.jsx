import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Star, Shield, Users } from 'lucide-react';
import DDLogo from '../assets/DDLogo.png';

const Hero = () => {
    return (
        <section className="relative pt-[160px] pb-[80px] lg:pb-[120px] overflow-hidden bg-persian-blue-900 text-white">
            <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                <div className="absolute top-[-10vh] left-[-10vw] w-[70vh] h-[70vh] rounded-full bg-persian-blue-500 blur-[150px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-[-9vh] right-[-10vw] w-[60vh] h-[50vh] rounded-full bg-persian-blue-400 blur-[150px] opacity-10 animate-pulse"></div>
            </div>
            
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-16">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 max-w-[800px] text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs md:text-sm font-bold text-persian-blue-300 mb-8  tracking-normal">
                        <Zap size={16} className="text-persian-blue-400" />
                        <span>Where your dreams grow digital</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8 tracking-tight">
                        We Build Digital Experiences That <span className="text-persian-blue-400">Grow Your Business</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-persian-blue-200 max-w-[650px] mb-12 leading-relaxed mx-auto lg:mx-0">
                        From stunning websites to powerful marketing strategies, 
                        we help brands scale faster with cutting-edge software solutions.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="hidden lg:flex relative flex-1 justify-center items-center"
                >
                    <div className="relative z-10 w-full max-w-[600px] aspect-square flex items-center justify-center">
                        <motion.img 
                            src={DDLogo} 
                            alt="Dual Dream Digisoft Logo" 
                            width={800}
                            height={800}
                            className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(59,130,246,0.3)] z-20"
                            animate={{ 
                                y: [0, -10, 0] 
                            }}
                            transition={{ 
                                duration: 5, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                        />
                        <div className="absolute w-[120%] h-[120%] bg-persian-blue-500/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
