import { Request, Response } from 'express';
import { User } from '../models/index.js';

// GET All Users /users
export const getAllUsers = async (_req: Request, res: Response) => { 
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// GET a single user based on id and populated friend and thought data
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId)
            .populate('friends')
            .populate('thoughts');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// POST a new user
export const createUser = async (req: Request, res: Response) => {
    const { username, email } = req.body;
    try {
        const newUser = await User.create({
            username,
            email
        });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}

// PUT to update a user by id
export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { username, email } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { username, email } },
            { runValidators: true, new: true }
        );
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'No user with this id!' });
        }
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}

// DELETE a user by id and remove their associated thoughts
export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findOneAndDelete({ _id: userId });
        if (user) {
            res.json({ message: 'User and thoughts deleted!' });
        } else {
            res.status(404).json({
                message: 'No user with that ID'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

//POST to add a new friend to a user's friend list
export const addFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { friends: friendId } },
            { runValidators: true, new: true }
        );
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'No user found with that ID :('
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// DELETE to remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: friendId } },
            { runValidators: true, new: true }
        );
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'No user found with that ID :('
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}
