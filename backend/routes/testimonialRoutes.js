import express from 'express';
import Testimonial from '../models/Testimonial.js';

const router = express.Router();

// @route   POST /api/testimonials
// @desc    Submit new testimonial (Public)
router.post('/', async (req, res) => {
  try {
    const { name, company, reviewText, rating, profileImage, customerId } = req.body;

    if (!name || !rating || !reviewText) {
      return res.status(400).json({ message: 'Please provide name, rating, and review text' });
    }

    const newTestimonial = new Testimonial({
      name,
      company,
      reviewText,
      rating,
      profileImage,
      customerId,
      isApproved: false // Always false by default for public submissions
    });

    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    console.error('Error saving testimonial:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/testimonials/public
// @desc    Get all approved testimonials for the website
router.get('/public', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true })
      .sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/testimonials
// @desc    Get all testimonials (Admin)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching all testimonials:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PATCH /api/testimonials/:id/approve
// @desc    Toggle approval status (Admin)
router.patch('/:id/approve', async (req, res) => {
  try {
    const { isApproved } = req.body;
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    );
    res.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial approval:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/testimonials/admin
// @desc    Create testimonial directly from Admin (Auto-approved)
router.post('/admin', async (req, res) => {
  try {
    const testimonial = new Testimonial({
      ...req.body,
      isApproved: true
    });
    const saved = await testimonial.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete a testimonial (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/testimonials/:id
// @desc    Update a testimonial (Admin)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Testimonial not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
