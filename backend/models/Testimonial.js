import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  reviewText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  profileImage: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
