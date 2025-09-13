import { Box, Container, Typography, Grid, Paper, TextField, Button, Checkbox, FormControlLabel, FormGroup, FormHelperText, FormControl } from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { volunteerSchema, type VolunteerFormInputs } from './volunteerSchema';
import axios from 'axios';
import { useState } from 'react';

const availabilityOptions = ["Hafta İçi - Gündüz", "Hafta İçi - Akşam", "Hafta Sonu"];

const VolunteerPage = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm<VolunteerFormInputs>({
        resolver: zodResolver(volunteerSchema),
        defaultValues: {
            availability: []
        }
    });

    // Form gönderim durumunu takip etmek için state'ler
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);

    const onValidSubmit: SubmitHandler<VolunteerFormInputs> = async (data) => {
        setIsSubmitting(true);
        setSubmitMessage(null);
        try {
            const response = await axios.post('http://localhost:5000/api/volunteers', data);
            setSubmitMessage(response.data.message);
            reset(); // Formu başarıyla gönderdikten sonra temizle
        } catch (error) {
            setSubmitMessage("Başvurunuz gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <Box sx={{
                bgcolor: 'primary.main',
                color: 'white',
                textAlign: 'center',
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)', // Modern asimetrik kesim
                mb: 2
            }}>
                <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
                    <PeopleAltIcon sx={{ fontSize: 60, color: 'white', mb: 2 }} />
                    <Typography variant="h2" component="h1" fontWeight="bold">
                        Gönüllümüz Olun
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 2, maxWidth: '700px', mx: 'auto' }} color="white">
                        Zamanınız ve yetenekleriniz, bir çocuğun hayatında yaratabileceğiniz en değerli hediyedir. İyilik Pınarı ailesine katılarak bu değişimin bir parçası olun.
                    </Typography>
                </Container>
            </Box>
            {/* BAŞVURU FORMU */}
            <Container maxWidth="md" sx={{ pb: 12 }}>
                <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', mb: 4 }}>
                    Gönüllülük Başvuru Formu
                </Typography>
                <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: '24px' }}>
                    <form onSubmit={handleSubmit(onValidSubmit)}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12 }}><TextField {...register("fullName")} required fullWidth label="Adınız Soyadınız" error={!!errors.fullName} helperText={errors.fullName?.message} /></Grid>
                            <Grid size={{ xs: 12, sm: 6 }}><TextField {...register("email")} required fullWidth label="E-posta Adresiniz" type="email" error={!!errors.email} helperText={errors.email?.message} /></Grid>
                            <Grid size={{ xs: 12, sm: 6 }}><TextField {...register("phone")} required fullWidth label="Telefon Numaranız" error={!!errors.phone} helperText={errors.phone?.message} /></Grid>
                            <Grid size={{ xs: 12 }}>
                                <Controller
                                    name="availability"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl error={!!errors.availability}>
                                            <Typography variant="subtitle1" fontWeight="bold">Uygun Olduğunuz Zamanlar (Birden fazla seçilebilir)</Typography>
                                            <FormGroup>
                                                {availabilityOptions.map((option) => (
                                                    <FormControlLabel
                                                        key={option}
                                                        control={
                                                            <Checkbox
                                                                // onChange'i manuel olarak yönetiyoruz
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        // Eğer seçildiyse, mevcut diziye yeni değeri ekle
                                                                        field.onChange([...field.value, option]);
                                                                    } else {
                                                                        // Eğer seçim kaldırıldıysa, diziden o değeri filtrele
                                                                        field.onChange(field.value.filter((value) => value !== option));
                                                                    }
                                                                }}
                                                                // Seçili olup olmadığını kontrol et
                                                                checked={field.value.includes(option)}
                                                            />
                                                        }
                                                        label={option}
                                                    />
                                                ))}
                                            </FormGroup>
                                            {errors.availability && <FormHelperText>{errors.availability.message}</FormHelperText>}
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}><TextField {...register("motivation")} required fullWidth label="Bize Neden Katılmak İstiyorsunuz?" multiline rows={5} error={!!errors.motivation} helperText={errors.motivation?.message} /></Grid>
                            <Grid size={{ xs: 12 }}>
                                <Button type="submit" disabled={isSubmitting} fullWidth variant="contained" size="large" sx={{ py: 1.5 }}>
                                    {isSubmitting ? 'Gönderiliyor...' : 'Başvurumu Gönder'}
                                </Button>
                                {submitMessage && (
                                    <Grid size={{ xs: 12 }} sx={{ mt: 2, textAlign: 'center' }}>
                                        <Typography color={submitMessage.includes('hata') ? 'error' : 'success'}>
                                            {submitMessage}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default VolunteerPage;