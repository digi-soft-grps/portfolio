import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, Award, CheckCircle2, ArrowRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OurClients from '../components/OurClients';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const values = [
    {
      icon: Rocket,
      title: "Innovation First",
      description: "We constantly push the boundaries of what is possible in the digital realm."
    },
    {
      icon: Target,
      title: "Client-Centric",
      description: "Your business goals are the heartbeat of our strategic decisions."
    },
    {
      icon: Users,
      title: "Collaborative Spirit",
      description: "We work as an extension of your team to ensure mutual success."
    },
    {
      icon: Award,
      title: "Quality Obsessed",
      description: "Excellence is not an act, but a habit in everything we build."
    }
  ];

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-52 pb-52 bg-persian-blue-900 relative overflow-hidden text-white">
        <div className="absolute top-0 left-0 w-[600px] h-[1000px] bg-persian-blue-500/20 blur-[150px] -ml-64 -mt-64 rounded-full animate-pulse"></div>                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-persian-blue-600/10 blur-[120px] -ml-64 -mb-64 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[800px] bg-persian-blue-400/10 blur-[100px] -mr-32 -mb-32 rounded-full animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-bold text-persian-blue-300 uppercase tracking-[0.3em] mb-10">
              The Visionaries
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10 leading-[0.9] tracking-tighter">
              Pioneering the <br /> <span className="text-persian-blue-400">Digital Frontier</span>
            </h1>
            <p className="text-xl md:text-2xl text-persian-blue-200/80 max-w-[850px] mx-auto leading-relaxed font-medium">
              A collective of designers, developers, and strategists dedicated to transforming visionary ideas into market-leading digital realities.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-persian-blue-400/60 z-10"
        >
          <ArrowDown size={32} strokeWidth={1.5} />
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-persian-blue-950 mb-8 leading-tight">
                Transforming Ideas into <br /> <span className="text-persian-blue-600">Impactful Experiences</span>
              </h2>
              <p className="text-lg text-persian-blue-800 leading-relaxed mb-8">
                Dual Dream Digisoft is a forward-thinking digital solutions company dedicated to transforming ideas into impactful digital experiences. We specialize in Search Engine Optimisation, Social Media Management, Content Creation, Performance Marketing, Web Development, and App Development.
              </p>
              <p className="text-lg text-persian-blue-800 leading-relaxed mb-8">
                Our approach blends creativity, technology, and strategy to help businesses grow their online presence and reach the right audience effectively. At Dual Dream Digisoft, we work closely with our clients to understand their vision and deliver tailored solutions that drive real results.
              </p>
              <div className="space-y-4">
                {['Strategic Architectural Planning', 'User-Centric Design Principles', 'Scalable Cloud Infrastructure'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-persian-blue-600" />
                    <span className="font-bold text-persian-blue-900">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-[4/5] bg-persian-blue-50 rounded-[2.5rem] overflow-hidden group">
                <div className="w-full h-full bg-persian-blue-100 flex items-center justify-center text-persian-blue-300 transition-transform group-hover:scale-110">
                  <Users size={64} />
                </div>
              </div>
              <div className="aspect-[4/5] bg-persian-blue-50 rounded-[2.5rem] overflow-hidden group translate-y-12">
                <div className="w-full h-full bg-persian-blue-100 flex items-center justify-center text-persian-blue-300 transition-transform group-hover:scale-110">
                  <Rocket size={64} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-persian-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-persian-blue-950 mb-6">Built on Values</h2>
            <p className="text-lg text-persian-blue-700 max-w-2xl mx-auto italic">"Our core values are the compass that guides every line of code we write."</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="p-10 bg-linear-to-br from-white/20 via-persian-blue-50/40 to-persian-blue-100/60 backdrop-blur-lg rounded-[2.5rem] border border-persian-blue-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-persian-blue-300/40 hover:-translate-y-2 group relative overflow-hidden">
                {/* Glossy Accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-persian-blue-400/10 blur-3xl group-hover:bg-persian-blue-400/20 transition-colors duration-500 rounded-full"></div>
                
                <div className="w-16 h-16 bg-persian-blue-50/50 backdrop-blur-md rounded-2xl flex items-center justify-center text-persian-blue-600 mb-8 transition-all duration-500 group-hover:scale-110 group-hover:bg-persian-blue-600 group-hover:text-white shadow-inner">
                  <v.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-persian-blue-950 mb-4 relative z-10">{v.title}</h3>
                <p className="text-persian-blue-700 leading-relaxed text-sm relative z-10">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <OurClients />
      <Footer />
    </main>
  );
};

export default About;
