import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password_hash');
        res.status(200).json(users);
    } catch (error) { res.status(500).json({ message: "Kullanıcılar alınamadı." }); }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Kullanıcı adı ve şifre zorunludur." });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Bu kullanıcı adı zaten mevcut." });
        }
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        const newUser = new User({ username, password_hash, role: 'editor' });
        await newUser.save();
        const userResponse = newUser.toObject();
        delete userResponse.password_hash;
        res.status(201).json(userResponse);
    } catch (error) { res.status(500).json({ message: "Kullanıcı oluşturulamadı." }); }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "Kullanıcı başarıyla silindi." });
    } catch (error) { res.status(500).json({ message: "Kullanıcı silinemedi." }); }
};