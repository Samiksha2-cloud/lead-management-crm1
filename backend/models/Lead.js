const mongoose =require('mongoose');

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is REQUIRED'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is REQUIRED'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is REQUIRED'],
            trim: true,
        },
        company: {
            type: String,
            trim: true, 
            required:[true, 'Company is REQUIRED'],
        },
        status: {
            type: String,
            enum: ['New', 'Contacted', 'Qualified', 'Lost'],
            default: 'New',
        },
        notes:{
            type: String,
            trim: true,
            default: '',
        },
    },
    {
        timestamps: true,// this automatically WILL ADD createdAt and updatedAt fields- no need to add them manually.
    }
)
module.exports = mongoose.model('Lead', leadSchema);