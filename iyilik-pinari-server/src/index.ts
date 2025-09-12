import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import newsRoutes from './routes/newsRoutes';
import authRoutes from './routes/authRoutes';
import messageRoutes from './routes/messageRoutes';
import volunteerRoutes from './routes/volunteerRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Rotaları Ayarlama
app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
    res.json({
        message: "API çalışıyor...",
        database_status: mongoose.connection.readyState === 1 ? "Bağlı" : "Bağlı Değil"
    });
});

const startServer = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            console.error("HATA: .env dosyasında MONGO_URI bulunamadı!");
            console.error("Lütfen projenin ana dizininde .env dosyası olduğundan ve içinde MONGO_URI değişkeninin tanımlandığından emin olun.");
            process.exit(1);
        }

        console.log("Veritabanına bağlanılıyor...");

        await mongoose.connect(mongoUri);

        console.log("MongoDB bağlantısı başarıyla kuruldu.");

        app.listen(PORT, () => {
            console.log(`Sunucu http://localhost:${PORT} adresinde başarıyla başlatıldı.`);
        });

    } catch (error) {
        // HATA AYIKLAMA
        console.error("!!! VERİTABANI BAĞLANTI HATASI !!!");
        if (error instanceof Error) {
            console.error(`Hata Adı: ${error.name}`);
            console.error(`Hata Mesajı: ${error.message}`);
        } else {
            console.error("Beklenmedik hata tipi:", error);
        }
        process.exit(1);
    }
};

startServer();