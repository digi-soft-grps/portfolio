import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// @route   POST /api/feedback
// @desc    Submit new feedback
router.post('/', async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({ message: 'Please provide name, rating, and comment' });
    }

    const newFeedback = new Feedback({
      name,
      rating,
      comment,
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/feedback/top
// @desc    Get top 5 rated feedbacks
router.get('/top', async (req, res) => {
  try {
    const topFeedbacks = await Feedback.find()
      .sort({ rating: -1, createdAt: -1 })
      .limit(5);

    res.json(topFeedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/feedback
// @desc    Get all feedback (Admin)
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching all feedbacks:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PATCH /api/feedback/:id/status
// @desc    Update feedback read status (Admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(feedback);
  } catch (error) {
    console.error('Error updating feedback status:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/feedback/:id
// @desc    Delete a feedback (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
