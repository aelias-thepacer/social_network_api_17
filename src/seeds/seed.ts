import mongoose from 'mongoose';
import db from '../config/connection.js';
import { User } from '../models/index.js';
import { Thought } from '../models/index.js';

const seedDatabase = async () => {
    try {
        // Connect to the database
        await db();

        console.log('Database connected.');

        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});
        console.log('Existing data cleared.');

        // Seed users
        const users = [
            { username: 'john_doe', email: 'john@example.com' },
            { username: 'jane_smith', email: 'jane@example.com' },
            { username: 'alice_wonder', email: 'alice@example.com' },
        ];

        const createdUsers = await User.insertMany(users);
        console.log('Users seeded:', createdUsers);

        // Seed thoughts
        const thoughts = [
            { thoughtText: 'This is my first thought!', username: 'john_doe' },
            { thoughtText: 'Loving this app!', username: 'jane_smith' },
            { thoughtText: 'Hello world!', username: 'alice_wonder' },
        ];

        const createdThoughts = await Thought.insertMany(thoughts);
        console.log('Thoughts seeded:', createdThoughts);

        // Close the database connection
        await mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error seeding the database:', error);
        process.exit(1);
    }
};

seedDatabase();