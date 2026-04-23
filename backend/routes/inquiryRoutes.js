import express from 'express';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

// @route   POST /api/inquiries
// @desc    Submit new inquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, subject, message } = req.body;

    if (!name || !email || !service || !subject || !message) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      service,
      subject,
      message,
    });

    const savedInquiry = await newInquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/inquiries
// @desc    Get all inquiries (Admin)
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PATCH /api/inquiries/:id/status
// @desc    Update inquiry status (Admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(inquiry);
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/inquiries/:id
// @desc    Delete inquiry (Admin)
router.delete('/:id', async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inquiry deleted' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
