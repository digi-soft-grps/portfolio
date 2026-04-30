import React from 'react';
import { motion } from 'framer-motion';

const Icons = {
    Instagram: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <defs>
                <linearGradient id="ig-gradient-simple" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433" />
                    <stop offset="50%" stopColor="#dc2743" />
                    <stop offset="100%" stopColor="#bc1888" />
                </linearGradient>
            </defs>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-gradient-simple)"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#ig-gradient-simple)"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#ig-gradient-simple)"></line>
        </svg>
    ),
    Youtube: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
    ),
    Whatsapp: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M12.012 2c-5.508 0-9.987 4.479-9.987 9.987 0 1.763.463 3.421 1.262 4.853l-1.287 4.68 4.783-1.256c1.403.766 3.003 1.209 4.704 1.209 5.508 0 9.988-4.479 9.988-9.987S17.52 2 12.012 2zm3.846 14.19c-.167.466-.867.897-1.185.92-.312.024-.694.029-1.295-.17-.469-.153-1.049-.365-1.707-.7a8.282 8.282 0 01-3.273-3.273c-.335-.658-.547-1.238-.7-1.707-.199-.601-.194-.983-.17-1.295.023-.318.454-1.018.92-1.185.101-.038.204-.055.304-.055.205 0 .399.106.518.284.177.265.599 1.488.653 1.597.101.206.101.378-.034.56-.045.061-.106.136-.174.22-.068.083-.143.174-.212.242-.14.14-.303.311-.132.6.216.365.462.693.731.98.269.287.56.541.867.761.289.206.467.043.608-.097.068-.069.159-.144.242-.212.084-.068.159-.129.22-.174.182-.135.354-.135.56-.034.11.054 1.332.476 1.597.653.178.119.284.313.284.518 0 .1-.017.203-.055.304z"/>
        </svg>
    )
};

const socialData = [
    { 
        id: 'instagram', 
        name: 'Instagram', 
        handle: '@dualdreamdigisoft', 
        icon: Icons.Instagram, 
        path: 'https://instagram.com/dualdreamdigisoft', 
        brandColor: 'text-[#e1306c]', 
        glow: 'group-hover:drop-shadow-[0_0_10px_rgba(225,48,108,0.5)]' 
    },
    { 
        id: 'whatsapp', 
        name: 'WhatsApp', 
        handle: '+91 93601 78929', 
        icon: Icons.Whatsapp, 
        path: 'https://wa.me/919360178929', 
        brandColor: 'text-[#25d366]', 
        glow: 'group-hover:drop-shadow-[0_0_10px_rgba(37,211,102,0.5)]' 
    },
    { 
        id: 'youtube', 
        name: 'YouTube', 
        handle: '@DualDreamDigisoft', 
        icon: Icons.Youtube, 
        path: 'https://youtube.com/@DualDreamDigisoft', 
        brandColor: 'text-[#ff0000]', 
        glow: 'group-hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]' 
    }
];

const SocialLinks = () => {
    return (
        <div className="flex flex-col gap-5 mt-8 select-none">
            {socialData.map((social) => {
                const Icon = social.icon;
                return (
                    <motion.a 
                        key={social.id}
                        href={social.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="flex items-center gap-3 group no-underline"
                        aria-label={social.name}
                    >
                        <div className={`transition-all duration-300 ${social.brandColor} ${social.glow}`}>
                            <Icon className="w-5 h-5 transition-colors" />
                        </div>
                        <span className="text-[13px] font-medium tracking-wide text-persian-blue-300 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                            {social.handle}
                        </span>
                    </motion.a>
                );
            })}
        </div>
    );
};

export default SocialLinks;
