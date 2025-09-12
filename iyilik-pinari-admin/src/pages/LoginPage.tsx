import { Container, Paper, Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormInputs } from '../schemas/loginSchema';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setLoginError(null);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', data);

            const { token, user } = response.data;
            login(token, user);
            navigate('/dashboard');

            alert("Giriş Başarılı! (Token kaydedildi)");
        } catch (error) {
            console.error("Giriş Hatası:", error);
            setLoginError("Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.");
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
            <Paper elevation={6} sx={{ p: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px' }}>
                <Typography component="h1" variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Yönetim Paneli Girişi
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Lütfen devam etmek için giriş yapın.
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Kullanıcı Adı"
                        autoComplete="username"
                        autoFocus
                        {...register("username")}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Şifre"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    {loginError && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{loginError}</Alert>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        {isSubmitting ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;