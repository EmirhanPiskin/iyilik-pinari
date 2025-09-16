import { Box, Container, Typography, Grid, TextField, Button, Paper, Stack, Avatar } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormInputs } from './contactSchema';
import axios from 'axios';
import { useState } from 'react';
import { API_BASE_URL } from '../apiConfig';

const ContactPage = () => {
    // --- React Hook Form Kurulumu ---
    const {
        register, // Form elemanlarını React Hook Form'a kaydetmek için
        handleSubmit, // Form gönderimini yönetir, önce doğrulamayı çalıştırır
        formState: { errors }, // Doğrulama hatalarını içeren obje
        reset
    } = useForm<ContactFormInputs>({
        resolver: zodResolver(contactSchema) // Zod şemamızı resolver olarak kullanıyoruz
    });

    // YENİ: Form gönderim durumunu takip etmek için state'ler
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);

    // Bu fonksiyon sadece form geçerli olduğunda çalışır.
    const onValidSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
        setIsSubmitting(true);
        setSubmitMessage(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/messages`, data);
            // Başarılı olursa
            setSubmitMessage(response.data.message); // Backend'den gelen başarı mesajını göster
            reset();
        } catch (error) {
            // Başarısız olursa
            setSubmitMessage("Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
            console.error(error);
        } finally {
            setIsSubmitting(false); // Gönderim bitti (başarılı veya başarısız)
        }
    };

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
                        Bize Ulaşın
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 2 }} color="#ffffff">
                        Sorularınız, önerileriniz veya gönüllülük talepleriniz için bize her zaman yazabilirsiniz.
                    </Typography>
                </Container>
            </Box>

            {/* 2. BÖLÜM: İLETİŞİM ALANI */}
            <Container sx={{ py: 12 }}>
                <Paper sx={{ p: { xs: 2, md: 5 }, borderRadius: '24px', backgroundColor: "#F3F2EE" }}>
                    <Grid container spacing={5}>

                        {/* Sol Taraf: İletişim Bilgileri */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                                İletişim Bilgileri
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                                Aşağıdaki bilgilerden veya yandaki formu doldurarak bize ulaşabilirsiniz.
                            </Typography>

                            <Stack spacing={3}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                                        <InstagramIcon />
                                    </Avatar>
                                    <Typography>
                                        iyilikpinariyarder
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                                        <EmailIcon />
                                    </Avatar>
                                    <Typography>
                                        bilgi@iyilikpinari.org
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                                        <PhoneIcon />
                                    </Avatar>
                                    <Typography>
                                        +90 555 123 45 67
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>

                        {/* Sağ Taraf: İletişim Formu */}
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                                Mesaj Gönderin
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit(onValidSubmit)}>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            required fullWidth
                                            id="name" label="Adınız Soyadınız"
                                            {...register("name")} // Input'u 'name' adıyla kaydediyoruz
                                            error={!!errors.name} // Hata varsa kırmızı yap
                                            helperText={errors.name?.message} // Hata mesajını göster
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            required fullWidth
                                            id="email" label="E-posta Adresiniz"
                                            {...register("email")} // Input'u 'email' adıyla kaydediyoruz
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <TextField
                                            required fullWidth
                                            label="Mesajınız" id="message"
                                            multiline rows={5}
                                            {...register("message")} // Input'u 'message' adıyla kaydediyoruz
                                            error={!!errors.message}
                                            helperText={errors.message?.message}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{ mt: 3 }}
                                >
                                    {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                                </Button>
                                {submitMessage && (
                                    <Typography color={submitMessage.includes('hata') ? 'error' : 'success'} sx={{ mt: 2, textAlign: 'center' }}>
                                        {submitMessage}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default ContactPage;