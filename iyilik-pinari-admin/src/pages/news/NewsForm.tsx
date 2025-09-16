import { Box, Grid, TextField, Button, Typography, Input } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';

export interface NewsFormInputs {
    title: string;
    date: string;
    summary: string;
    content: string;
    mainImage?: FileList;
    galleryImages?: FileList;
}

interface NewsFormProps {
    onSubmit: SubmitHandler<NewsFormInputs>;
    initialData?: Omit<NewsFormInputs, 'images'>; // initialData'da images olmayacak
    isSubmitting: boolean;
}

const NewsForm = ({ onSubmit, initialData, isSubmitting }: NewsFormProps) => {
    const { register, handleSubmit, reset } = useForm<NewsFormInputs>({
        defaultValues: initialData || {}
    });

    useEffect(() => {
        if (initialData) {
            const { date, ...rest } = initialData;
            const formattedData = {
                ...rest,
                date: date ? new Date(date).toISOString().split('T')[0] : ''
            };
            reset(formattedData);
        }
    }, [initialData, reset]);

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}><TextField {...register("title")} required fullWidth label="Haber Başlığı" /></Grid>
                <Grid size={{ xs: 12 }}><TextField {...register("date")} required fullWidth label="Yayın Tarihi" type="date" InputLabelProps={{ shrink: true }} /></Grid>
                <Grid size={{ xs: 12 }}><TextField {...register("summary")} required fullWidth label="Özet" multiline rows={3} /></Grid>

                {/* DOSYA YÜKLEME ALANI */}
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1" gutterBottom>Ana Görsel (Zorunlu)</Typography>
                    <Input
                        type="file"
                        fullWidth
                        {...register("mainImage")}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1" gutterBottom>Galeri Görselleri (İsteğe bağlı)</Typography>
                    <Input
                        type="file"
                        fullWidth
                        inputProps={{ multiple: true }}
                        {...register("galleryImages")}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}><TextField {...register("content")} required fullWidth label="İçerik (Paragrafları | ile ayırın)" multiline rows={8} /></Grid>
                <Grid size={{ xs: 12 }}>
                    <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                        {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewsForm;