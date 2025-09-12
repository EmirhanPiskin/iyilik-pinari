import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_BASE_URL } from '../../apiConfig';

interface NewsData {
    _id: string;
    title: string;
    date: string;
    mainImage: string;
}

const NewsListPage = () => {
    const [news, setNews] = useState<NewsData[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth(); // Token'ı alıyoruz

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/news');
            setNews(response.data);
        } catch (error) {
            console.error("Haberler yüklenirken hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Bu haberi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
            try {
                await axios.delete(`http://localhost:5000/api/news/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchNews();
            } catch (error) {
                console.error("Haber silinirken hata oluştu:", error);
                alert("Haber silinirken bir hata oluştu.");
            }
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">Haber Yönetimi</Typography>
                <Button component={RouterLink} to="/admin/news/create" variant="contained">
                    Yeni Haber Ekle
                </Button>
            </Box>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Görsel</TableCell>
                                <TableCell>Başlık</TableCell>
                                <TableCell>Yayın Tarihi</TableCell>
                                <TableCell align="right">İşlemler</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {news.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        <img
                                            src={`${API_BASE_URL}/${item.mainImage}`}
                                            alt={item.title}
                                            style={{ width: '100px', height: 'auto', borderRadius: '4px' }}
                                        />
                                    </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{new Date(item.date).toLocaleDateString('tr-TR')}</TableCell>
                                    <TableCell align="right">
                                        <IconButton component={RouterLink} to={`/admin/news/edit/${item._id}`}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(item._id)}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default NewsListPage;