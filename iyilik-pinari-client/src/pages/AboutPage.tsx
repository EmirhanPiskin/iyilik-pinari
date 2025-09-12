import { Box, Container, Typography, Grid, Avatar } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import finalLogo from '../assets/iyilikpinari.jpg';
const AboutPage = () => {
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
                        Biz Kimiz?
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 2, opacity: 0.9 }}>
                        Bir çocuğun yüzünü güldürmenin, geleceği aydınlatmak olduğuna inanıyoruz.
                    </Typography>
                </Container>
            </Box>

            {/* 2. BÖLÜM: HİKAYE BÖLÜMÜ */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={8} alignItems="center">
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Box
                            component="img"
                            sx={{
                                width: '100%',
                                borderRadius: '24px',
                                boxShadow: '0 16px 40px rgba(15,146,202,0.2)',
                            }}
                            alt="Dernek faaliyeti"
                            src={finalLogo}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                            Hikayemiz ve Amacımız
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
                            İyilik Pınarı Yardım Derneği, özellikle köy okullarında öğrenim gören çocukların sosyal ve ekonomik ihtiyaçlarını karşılamak amacıyla kurulmuştur. Eğitimde fırsat eşitliğini sağlamak, çocuklarımızın daha mutlu, umutlu ve güçlü bir geleceğe yürüyebilmeleri için gerekli desteği sunmak temel önceliğimizdir.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
                            Tiyatrodan kütüphane projelerine, kamplardan atölye çalışmalarına kadar pek çok alanda etkinlikler düzenleyerek, çocukların hayal dünyalarını zenginleştirmek ve sosyal becerilerini artırmak için çalışıyoruz.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            {/* 3. BÖLÜM: VİZYON, MİSYON, DEĞERLER */}
            <Box sx={{ py: 12, backgroundColor: '#F3F2EE' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', mb: 8 }}>
                        Temel İlkelerimiz
                    </Typography>
                    <Grid container spacing={4}>
                        {/* Misyon */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box textAlign="center" p={3}>
                                <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64, margin: '0 auto 16px' }}>
                                    <TrackChangesIcon fontSize="large" />
                                </Avatar>
                                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>Misyonumuz</Typography>
                                <Typography color="text.secondary">
                                    Köy okullarındaki çocukların eğitim, sosyal ve kültürel ihtiyaçlarını karşılayarak çok yönlü bireyler olarak yetişmelerine katkı sağlamak.
                                </Typography>
                            </Box>
                        </Grid>
                        {/* Vizyon */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box textAlign="center" p={3}>
                                <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64, margin: '0 auto 16px' }}>
                                    <VisibilityIcon fontSize="large" />
                                </Avatar>
                                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>Vizyonumuz</Typography>
                                <Typography color="text.secondary">
                                    Eğitimde fırsat eşitliğini sağlayarak her çocuğun mutlu, umutlu ve güçlü bir geleceğe yürüdüğü bir toplum inşa etmek.
                                </Typography>
                            </Box>
                        </Grid>
                        {/* Değerlerimiz */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box textAlign="center" p={3}>
                                <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64, margin: '0 auto 16px' }}>
                                    <FavoriteBorderIcon fontSize="large" />
                                </Avatar>
                                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>Değerlerimiz</Typography>
                                <Typography color="text.secondary">
                                    Toplumda yardımlaşma ve dayanışma ruhunu güçlendirerek, insanları ortak bir iyilik amacı etrafında birleştirmek.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default AboutPage;