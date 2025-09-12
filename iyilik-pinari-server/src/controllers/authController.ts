import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// --- YÖNETİCİ GİRİŞ  ---
export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre." });
        }
        const bcrypt = require('bcryptjs');
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre." });
        }
        const payload = {
            id: user._id,
            username: user.username,
            role: user.role
        };

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('.env dosyasında JWT_SECRET tanımlanmamış.');
        }

        const token = jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: '1h' } // Token 1 saat sonra geçersiz olacak
        );

        res.status(200).json({
            message: "Giriş başarılı.",
            token: token,
            user: { id: user._id, username: user.username, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ message: "Giriş sırasında bir hata oluştu.", error });
    }
};