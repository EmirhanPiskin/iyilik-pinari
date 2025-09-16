import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

// Rota import'ları
import newsRoutes from './routes/newsRoutes';
import authRoutes from './routes/authRoutes';
import messageRoutes from './routes/messageRoutes';
import volunteerRoutes from './routes/volunteerRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    'https://iyilik-pinari-projesi.vercel.app',
    'https://iyilik-pinari-admin.vercel.app'
];
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Bu origin CORS tarafından engellendi.'));
        }
    }
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/api', (req, res) => {
    res.json({
        message: "API çalışıyor...",
        database_status: mongoose.connection.readyState === 1 ? "Bağlı" : "Bağlı Değil"
    });
});
app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);

const startServer = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error(".env dosyasında MONGO_URI bulunamadı!");
        }

        console.log("Veritabanına bağlanılıyor...");
        await mongoose.connect(mongoUri);
        console.log("MongoDB bağlantısı başarıyla kuruldu.");

        app.listen(PORT, () => {
            console.log(`Sunucu http://localhost:${PORT} adresinde başarıyla başlatıldı.`);
        });

    } catch (error) {
        console.error("!!! SUNUCU BAŞLATMA HATASI !!!", error);
        process.exit(1);
    }
};

startServer();