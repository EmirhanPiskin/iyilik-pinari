import { Box, Container, Typography, Chip, Grid, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { API_BASE_URL } from '../apiConfig';

interface NewsData {
    _id: string;
    title: string;
    date: string;
    content: string[];
    mainImage: string;
    galleryImages: string[];
}

const NewsDetailPage = () => {
    const { newsId } = useParams<{ newsId: string }>();
    const [newsItem, setNewsItem] = useState<NewsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [openLightbox, setOpenLightbox] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            if (!newsId) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/api/news/${newsId}`);
                setNewsItem(response.data);
            } catch (err) {
                console.error("Haber detayı yüklenemedi:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNewsDetail();
    }, [newsId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (!newsItem) {
        return (
            <Container sx={{ py: 12, textAlign: 'center' }}>
                <Typography variant="h4">Haber Bulunamadı</Typography>
            </Container>
        );
    }

    const mainImage = newsItem.mainImage;
    const galleryImages = newsItem.galleryImages;

    // Lightbox için tüm resimleri tek bir dizide birleştiriyoruz.
    const allImages = [mainImage, ...galleryImages];

    const handleGalleryClick = (index: number) => {
        setLightboxIndex(index + 1); // Kaydırılan indexe +1 ekle
        setOpenLightbox(true);
    };

    return (
        <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
            <Lightbox
                open={openLightbox}
                close={() => setOpenLightbox(false)}
                slides={allImages.map(img => ({ src: `${API_BASE_URL}/${img}` }))}
                index={lightboxIndex}
            />
            <Container maxWidth="lg">
                {/* ANA GÖRSEL */}
                <Box
                    component="img"
                    src={`${API_BASE_URL}/${mainImage}`}
                    alt={newsItem.title}
                    sx={{
                        width: { xs: '100%', md: '75%' },
                        height: 'auto',
                        mx: 'auto',
                        display: 'block',
                        borderRadius: '24px',
                        mb: 4,
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setLightboxIndex(0);
                        setOpenLightbox(true);
                    }}
                />

                {/* BAŞLIK ve TARİH */}
                <Box maxWidth="md" mx="auto" textAlign="center" mb={6}>
                    <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                        {newsItem.title}
                    </Typography>
                    <Chip
                        icon={<CalendarTodayIcon />}
                        label={new Date(newsItem.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    />
                </Box>

                {/* HABER METNİ */}
                <Box maxWidth="md" mx="auto">
                    {newsItem.content.map((paragraph, index) => (
                        <Typography
                            key={index}
                            variant="body1"
                            paragraph
                            sx={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'text.secondary' }}
                        >
                            {paragraph}
                        </Typography>
                    ))}
                </Box>

                {/* GALERİ (Eğer galeri resmi varsa gösterilir) */}
                {galleryImages && galleryImages.length > 0 && (
                    <Box mt={10}>
                        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom textAlign="center" mb={4}>
                            Galeriden Kareler
                        </Typography>
                        <Grid container spacing={2}>
                            {galleryImages.map((image, index) => (
                                <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Box
                                        component="img"
                                        src={`${API_BASE_URL}/${image}`}
                                        alt={`${newsItem.title} - galeri ${index + 1}`}
                                        sx={{
                                            width: '100%',
                                            height: 250,
                                            objectFit: 'cover',
                                            borderRadius: '16px',
                                            cursor: 'pointer',
                                            transition: '0.3s',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                                            }
                                        }}
                                        onClick={() => handleGalleryClick(index)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default NewsDetailPage;