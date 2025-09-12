import { Box, Typography, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import NewsForm, { type NewsFormInputs } from './NewsForm';

const NewsCreatePage = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateNews = async (data: NewsFormInputs) => {
        setIsSubmitting(true);
        setError(null);
        const formData = new FormData();

        // Metin verilerini FormData'ya ekliyoruz
        formData.append('title', data.title);
        formData.append('date', data.date);
        formData.append('summary', data.summary);
        formData.append('content', data.content);

        if (data.mainImage && data.mainImage.length > 0) {
            formData.append('mainImage', data.mainImage[0]);
        }
        if (data.galleryImages) {
            for (let i = 0; i < data.galleryImages.length; i++) {
                formData.append('galleryImages', data.galleryImages[i]);
            }
        }

        try {
            await axios.post('http://localhost:5000/api/news', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/admin/news');
        } catch (err) {
            console.error("Haber oluşturulurken hata:", err);
            setError("Haber oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Yeni Haber Ekle
            </Typography>
            <Paper sx={{ p: 3 }}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <NewsForm onSubmit={handleCreateNews} isSubmitting={isSubmitting} />
            </Paper>
        </Box>
    );
};

export default NewsCreatePage;