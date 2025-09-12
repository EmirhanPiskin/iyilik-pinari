import multer from 'multer';
import path from 'path';

// Storage Ayarları
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Dosya adının çakışmasını önlemek için benzersiz bir isim oluşturuyoruz:
        // orijinal_dosya_adi-zaman_damgasi.uzanti
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Dosya Filtresi
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Hata: Sadece resim dosyaları (.jpeg, .jpg, .png) yükleyebilirsiniz!'));
};

// Multer Middleware'ini Oluşturma ve Export Etme
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Dosya boyutu limiti: 5MB
});