import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Partner from './modules/partner/model/partner.model.js';

dotenv.config();

const makeDatabaseConnection = async () => {
    console.log('Connecting to MongoDB...', process.env.MONGO_URI);
    const uri = process.env.MONGO_URI;

    if (!uri) {
        throw new Error('MONGO_URI environment variable is not set.');
    }

    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

makeDatabaseConnection();
