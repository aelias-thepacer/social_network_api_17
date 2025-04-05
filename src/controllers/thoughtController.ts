import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

// GET to get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// GET to get a single thought by id
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// POST to create a new thought (make sure to push the thought id to the associated user's thoughts array)
export const createThought = async (req: Request, res: Response) => {
    const { thoughtText, username } = req.body;
    try {
        const newThought = await Thought.create({
            thoughtText,
            username
        });
        const user = await User.findOneAndUpdate(
            { username },
            { $push: { thoughts: newThought._id } },
            { new: true }
        );
        console.log(user);
        res.status(201).json(newThought);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}

// PUT to update a thought by id
export const updateThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $set: { thoughtText } },
            { runValidators: true, new: true }
        );
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({ message: 'No thought with this id!' });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// DELETE to remove a thought by id and remove it from the user's thoughts array
export const deleteThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findByIdAndDelete(thoughtId);
        if (thought) {
            await User.findOneAndUpdate(
                { thoughts: thoughtId },
                { $pull: { thoughts: thoughtId } }
            );
            res.json({ message: 'Thought deleted successfully!' });
        } else {
            res.status(404).json({ message: 'No thought with this id!' });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// POST to create a reaction stored in a single thought's reactions array field
export const createReaction = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $addToSet: { reactions: { reactionBody, username } } },
            { new: true }
        );
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({ message: 'No thought with this id!' });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// DELETE to pull and remove a reaction by the reaction's reactionId value
export const deleteReaction = async (req: Request, res: Response) => {
    const { thoughtId, reactionId } = req.params;
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { reactions: { _id: reactionId } } },
            { new: true }
        );
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({ message: 'No thought with this id!' });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}