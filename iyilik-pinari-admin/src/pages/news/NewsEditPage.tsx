import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import NewsForm, { type NewsFormInputs } from './NewsForm';
import { API_BASE_URL } from '../../apiConfig';

const NewsEditPage = () => {
    const { id } = useParams<{ id: string }>(); // URL'den haberin ID'sini alma
    const navigate = useNavigate();
    const { token } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState<NewsFormInputs | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [existingImages, setExistingImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/news/${id}`);
                const news = response.data;
                // Backend'den gelen dizi formatını, formun beklediği string formatına çevir
                const formattedData = {
                    title: news.title,
                    date: new Date(news.date).toISOString().split('T')[0],
                    summary: news.summary,
                    content: news.content.join(' | '),
                };
                setInitialData(formattedData);
                setExistingImages([news.mainImage, ...news.galleryImages]);
            } catch (err) {
                console.error("Haber verisi çekilirken hata:", err);
                setError("Haber verileri yüklenemedi.");
            } finally {
                setLoading(false);
            }
        };

        fetchNewsData();
    }, [id]);

    const handleUpdateNews = async (data: NewsFormInputs) => {
        setIsSubmitting(true);
        setError(null);
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('date', data.date);
        formData.append('summary', data.summary);
        formData.append('content', data.content);

        if (data.mainImage && data.mainImage.length > 0) {
            formData.append('mainImage', data.mainImage[0]);
        }
        if (data.galleryImages && data.galleryImages.length > 0) {
            for (let i = 0; i < data.galleryImages.length; i++) {
                formData.append('galleryImages', data.galleryImages[i]);
            }
        }

        try {
            await axios.put(`${API_BASE_URL}/api/news/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/admin/news');
        } catch (err) {
            console.error("Haber güncellenirken hata:", err);
            setError("Haber güncellenirken bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Box>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Haberi Düzenle
            </Typography>
            <Paper sx={{ p: 3 }}>
                {/* Mevcut resimleri gösteren bir önizleme alanı */}
                <Typography variant="subtitle1" gutterBottom>Mevcut Resimler</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                    {existingImages.map((img, i) => (
                        <img key={i} src={`${API_BASE_URL}/${img}`} alt="mevcut resim" style={{ height: '100px', borderRadius: '8px' }} />
                    ))}
                </Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                    Yeni resimler yüklerseniz, mevcut olanların hepsi silinip yenileri eklenecektir.
                </Typography>
                <NewsForm onSubmit={handleUpdateNews} initialData={initialData} isSubmitting={isSubmitting} />
            </Paper>
        </Box>
    );
};

export default NewsEditPage;