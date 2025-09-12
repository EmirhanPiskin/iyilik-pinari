import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: { id: string; username: string; role: string; };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error('.env dosyasında JWT_SECRET tanımlanmamış.');
            }
            const decoded = jwt.verify(token, jwtSecret) as { id: string; username: string; role: string; };

            req.user = { id: decoded.id, username: decoded.username, role: decoded.role };

            next();

        } catch (error) {
            console.error('Token doğrulama hatası:', error);
            return res.status(401).json({ message: 'Yetkisiz erişim, token geçersiz.' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Yetkisiz erişim, token bulunamadı.' });
    }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Erişim reddedildi. Bu işlem için admin yetkisi gereklidir.' });
    }
};