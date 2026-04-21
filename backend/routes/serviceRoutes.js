import express from 'express';
import Service from '../models/Service.js';

const router = express.Router();

// Get All Services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find().sort({ order: 1 });
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create New Service
router.post('/', async (req, res) => {
    try {
        const { title, description, image, order } = req.body;
        const newService = new Service({ title, description, image, order });
        await newService.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create service' });
    }
});

// Update Existing Service
router.put('/:id', async (req, res) => {
    try {
        const { title, description, image, order } = req.body;
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id, 
            { title, description, image, order }, 
            { new: true }
        );
        res.json(updatedService);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update service' });
    }
});

// Delete Service
router.delete('/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete service' });
    }
});

export default router;
