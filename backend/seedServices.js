import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';

dotenv.config();

const services = [
    {
        title: 'Search Engine Optimisation',
        description: 'Enhance your visibility on search engines and drive organic traffic to your website with our expert SEO strategies.',
        image: '',
        order: 1
    },
    {
        title: 'Social Media Management',
        description: 'Build a strong brand presence and engage with your audience across all social platforms effectively.',
        image: '',
        order: 2
    },
    {
        title: 'Content Creation',
        description: 'High-quality, engaging content tailored to your brand to attract and retain your target audience.',
        image: '',
        order: 3
    },
    {
        title: 'Performance Marketing',
        description: 'Data-driven marketing campaigns focused on delivering measurable results and high ROI.',
        image: '',
        order: 4
    },
    {
        title: 'Web Development',
        description: 'Custom, responsive, and high-performance websites built with the latest technologies.',
        image: '',
        order: 5
    },
    {
        title: 'App Development',
        description: 'Powerful and user-friendly mobile applications for iOS and Android platforms.',
        image: '',
        order: 6
    }
];

const seedServices = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        // Clear existing services
        await Service.deleteMany({});
        console.log('Cleared existing services');

        // Insert new services
        await Service.insertMany(services);
        console.log('Successfully seeded services');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding services:', error);
        process.exit(1);
    }
};

seedServices();
