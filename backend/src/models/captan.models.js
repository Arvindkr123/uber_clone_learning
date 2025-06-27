import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenvConfig from '../config/dotenv.config.js';
import bcrypt from 'bcrypt';

const captionSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'fistname must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'lastname must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color plate must be 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'plate must be 3 characters long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcyle', 'auto']
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }

}, {
    timestamps: true
})

captionSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, dotenvConfig.JWT_SECRET, {
        expiresIn: '24h'
    })
    return token;
}

captionSchema.methods.comparePassword = async function (password) {
    return await bcrypt.hash(password, this.password)
}
captionSchema.statics.hashPassword = async function () {
    return await bcrypt.hash(password, 10)
}

const CaptionModel = mongoose.model('caption_schema', captionSchema);

export default CaptionModel