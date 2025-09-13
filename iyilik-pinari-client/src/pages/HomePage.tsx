import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

interface NewsData {
    _id: string;
    title: string;
    date: string;
    summary: string;
    mainImage: string;
}

const heroImageUrl = 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop';

const HomePage = () => {
    // Haberleri tutmak için state
    const [featuredNews, setFeaturedNews] = useState<NewsData[]>([]);

    useEffect(() => {
        const fetchFeaturedNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news');
                // Gelen tüm haberlerin sadece ilk 3'ünü alıp state'e kaydediyoruz.
                setFeaturedNews(response.data.slice(0, 3));
            } catch (err) {
                console.error("Öne çıkan haberler yüklenemedi:", err);
            }
        };
        fetchFeaturedNews();
    }, []);

    return (
        <Box>
            {/* BÖLÜM 1: HERO SECTION */}
            <Box
                sx={{
                    position: 'relative', height: '80vh', color: 'white',
                    backgroundImage: `url(${heroImageUrl})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                }}
            >
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                <Container maxWidth="md" sx={{ position: 'relative' }}>
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        İyilik Pınarı
                    </Typography>
                    <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4 }} >
                        Her çocuk bir damla umut, birlikte İyilik Pınarıyız.
                    </Typography>
                    <Button variant="contained" color="secondary" size="large" component={RouterLink} to="/gonullu-ol" endIcon={<ArrowForwardIcon />}>
                        Bize Katılın
                    </Button>
                </Container>
            </Box>

            {/* BÖLÜM 2: TANITIM/MİSYON BÖLÜMÜ */}
            <Box sx={{ py: 12, backgroundColor: "#F3F2EE" }}>
                <Container maxWidth="lg">
                    <Grid container spacing={8} alignItems="center">
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Geleceğe Uzanan Bir El: <br />İyilik Pınarı
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
                                İyilik Pınarı Yardım Derneği, özellikle köy okullarında öğrenim gören çocukların sosyal ve ekonomik ihtiyaçlarını karşılamak amacıyla kurulmuştur. Eğitimde fırsat eşitliğini sağlamak temel önceliğimizdir.
                            </Typography>
                            <Button variant="outlined" color="primary" size="large" component={RouterLink} to="/about" endIcon={<ArrowForwardIcon />}>
                                Daha Fazla Bilgi
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box
                                component="img"
                                sx={{ width: '100%', borderRadius: '24px', boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}
                                alt="Gülen çocuklar"
                                src="https://images.unsplash.com/photo-1571417800906-5a5058dbd45d?q=80&w=2070&auto=format&fit=crop"
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* BÖLÜM 3: ÖNE ÇIKAN HABERLER BÖLÜMÜ */}
            <Box sx={{ py: 12, backgroundColor: '#F3F2EE' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', mb: 8 }}>
                        Öne Çıkan Haberlerimiz
                    </Typography>
                    <Grid container spacing={4}>
                        {featuredNews.map((newsItem) => (
                            <Grid key={newsItem._id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 16px 40px rgba(0,0,0,0.12)' } }}>
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        image={`${API_BASE_URL}/${newsItem.mainImage}`}
                                        alt={newsItem.title}
                                    />
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '600' }}>
                                            {newsItem.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {newsItem.summary}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ p: 3, pt: 0 }}>
                                        <Button size="small" color="secondary" component={RouterLink} to={`/news/${newsItem._id}`} endIcon={<ArrowForwardIcon />}>
                                            Detayları Gör
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;