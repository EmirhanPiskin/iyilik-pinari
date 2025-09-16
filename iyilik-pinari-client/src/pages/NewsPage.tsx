import { Box, Container, Typography, Grid, Paper, Button, Pagination, CircularProgress } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

// YENİ: Backend'den gelen haber verisinin tipini tanımlıyoruz.
// Bu, backend'deki INews interface'i ile uyumlu olmalı.
interface NewsData {
    _id: string; // MongoDB'nin eklediği ID
    title: string;
    date: string; // Tarih string olarak gelecek
    summary: string;
    mainImage: string;
    galleryImages: string[];
    content: string[];
    createdAt: string;
    updatedAt: string;
}

const NewsPage = () => {

    // --- STATE YÖNETİMİ ---
    const [news, setNews] = useState<NewsData[]>([]); // Haberleri tutacak state, başlangıçta boş
    const [loading, setLoading] = useState<boolean>(true); // Yüklenme durumunu tutacak state
    const [error, setError] = useState<string | null>(null); // Hata durumunu tutacak state
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    // --- VERİ ÇEKME MANTIĞI (useEffect) ---
    // Bu hook bileşen ilk render edildiğinde sadece bir kez çalışır.
    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true); // Yükleme başlıyor
                // Backend'deki API endpoint'imize GET isteği gönderiyoruz.
                const response = await axios.get(`${API_BASE_URL}/api/news`);
                setNews(response.data); // Gelen veriyi state'e kaydediyoruz
                setError(null); // Hata yok
            } catch (err) {
                setError("Haberler yüklenirken bir sorun oluştu.");
                console.error(err);
            } finally {
                setLoading(false); // Yükleme bitti (başarılı ya da başarısız)
            }
        };

        fetchNews();
    }, []);

    // === YENİ: SAYFALAMA MANTIĞI BAŞLANGICI ===
    // Toplam sayfa sayısını hesapla. (Toplam haber / sayfa başına haber), yukarı yuvarla.
    const pageCount = Math.ceil(news.length / ITEMS_PER_PAGE);

    // Mevcut sayfaya göre gösterilecek haberleri dilimle (slice).
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);

    // Pagination bileşeninde sayfa değiştirildiğinde çalışacak fonksiyon.
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value); // State'i yeni sayfa numarası ile güncelle
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // === SAYFALAMA MANTIĞI SONU ===

    // --- RENDER MANTIĞI ---
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return <Container sx={{ py: 12, textAlign: 'center' }}><Typography variant="h5" color="error">{error}</Typography></Container>;
    }

    return (
        <Box>
            {/* 1. BÖLÜM: SAYFA BAŞLIĞI */}
            <Box sx={{
                bgcolor: 'primary.main',
                color: 'white',
                py: 12,
                textAlign: 'center',
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)', // Modern asimetrik kesim
                mb: 8
            }}>
                <Container maxWidth="md">
                    <Typography variant="h2" component="h1" fontWeight="bold">
                        Haberler & Duyurular
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 2 }} color="#ffffff">
                        Derneğimizle ilgili en güncel gelişmeleri buradan takip edebilirsiniz.
                    </Typography>
                </Container>
            </Box>

            {/* 2. BÖLÜM: HABER AKIŞI */}
            <Container sx={{ py: 12 }}>
                <Grid container spacing={5}>
                    {currentNews.map((newsItem) => (
                        <Grid key={newsItem._id} size={{ xs: 12 }}>
                            <Paper
                                sx={{
                                    backgroundColor: "#F3F2EE",
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    p: 3,
                                    transition: '0.3s',
                                    '&:hover': {
                                        boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
                                        transform: 'scale(1.02)'
                                    }
                                }}
                            >
                                <Box
                                    component="img"
                                    src={`${API_BASE_URL}/${newsItem.mainImage}`}
                                    alt={newsItem.title}
                                    sx={{
                                        width: { xs: '100%', md: 300 },
                                        height: 250,
                                        objectFit: 'cover',
                                        borderRadius: '16px',
                                        mr: { md: 3 },
                                        mb: { xs: 2, md: 0 },
                                    }}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(newsItem.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </Typography>
                                    <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mt: 1, mb: 2 }}>
                                        {newsItem.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                        {newsItem.summary}
                                    </Typography>
                                    <Box sx={{ mt: 'auto' }}>
                                        <Button size="small" color="primary" component={RouterLink} to={`/news/${newsItem._id}`} endIcon={<ArrowForwardIcon />}>
                                            Devamını Oku
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                {pageCount > 1 && (
                    <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={pageCount}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                        />
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default NewsPage;