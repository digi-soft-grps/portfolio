import React from 'react';
const Icons = {
    Instagram: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <defs>
                <linearGradient id="ig-gradient-pure" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433" />
                    <stop offset="25%" stopColor="#e6683c" />
                    <stop offset="50%" stopColor="#dc2743" />
                    <stop offset="75%" stopColor="#cc2366" />
                    <stop offset="100%" stopColor="#bc1888" />
                </linearGradient>
            </defs>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-gradient-pure)"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#ig-gradient-pure)"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#ig-gradient-pure)"></line>
        </svg>
    ),
    Youtube: (props) => (
        <svg viewBox="0 0 24 24" fill="#ff0000" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
    ),
    Linkedin: (props) => (
        <svg viewBox="0 0 24 24" fill="#0077b5" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
        </svg>
    ),
    X: (props) => (
        <svg viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 3.239H4.293L17.607 20.65z"/>
        </svg>
    ),
    Whatsapp: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-12.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path>
        </svg>
    ),
    Facebook: (props) => (
        <svg viewBox="0 0 24 24" fill="#1877f2" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M14 10.25h2.625l-.375 3h-2.25V24h-3.75V13.25h-2.25v-3h2.25V8.188c0-3.031 1.844-4.688 4.5-4.688 1.281 0 2.406.094 2.719.125V6.75h-1.813c-1.469 0-1.75.719-1.75 1.719V10.25z"/>
        </svg>
    )
};

const socialData = [
    { id: 'instagram', name: 'Instagram', icon: Icons.Instagram, path: '#' },
    { id: 'youtube', name: 'YouTube', icon: Icons.Youtube, path: '#' },
    { id: 'linkedin', name: 'LinkedIn', icon: Icons.Linkedin, path: '#' },
    { id: 'whatsapp', name: 'WhatsApp', icon: Icons.Whatsapp, path: '#' }
];

const SocialLinks = () => {
    return (
        <div className="flex gap-7 items-center justify-center py-5">
            {socialData.map((social) => {
                const Icon = social.icon;
                return (
                    <a 
                        key={social.id}
                        href={social.path}
                        className="flex items-center justify-center no-underline transition-all duration-300 hover:-translate-y-1.5 hover:scale-110 active:scale-95 group"
                        aria-label={social.name}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon className="w-8 h-8 transition-all duration-300 group-hover:drop-shadow-[0_8px_15px_rgba(0,0,0,0.3)]" />
                    </a>
                );
            })}
        </div>
    );
};

export default SocialLinks;
