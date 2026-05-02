import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import OurClients from '../components/OurClients';
import Customers from '../components/Customers';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <main className="page-home">
            <Navbar />
            <Hero />
            <ServicesSection />
            <OurClients />
            <Customers />
            <Footer />
        </main>
    );
};

export default Home;
