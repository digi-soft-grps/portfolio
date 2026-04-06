import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    company: { type: String },
    notes: { type: String },
    avatar: { type: String },
    rating: { type: Number, default: 5 },
    customFields: [
        {
            label: { type: String },
            value: { type: String }
        }
    ]
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
