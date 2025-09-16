import { Box, Typography, Grid, Paper, List, ListItem, ListItemText, Divider, Button, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../apiConfig';
import { Link as RouterLink } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

interface Stats {
    newsCount: number;
    unreadMessagesCount: number;
    newVolunteersCount: number;
    recentNews: { _id: string; title: string; createdAt: string }[];
    recentMessages: { _id: string; name: string; createdAt: string }[];
}

const StatCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactElement }) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '16px' }}>
            <Box>
                <Typography color="text.secondary">{title}</Typography>
                <Typography variant="h4" fontWeight="bold">{value}</Typography>
            </Box>
            {icon}
        </Paper>
    </Grid>
);


const DashboardPage = () => {
    const { user, token } = useAuth();
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/dashboard/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(response.data);
            } catch (error) {
                console.error("Dashboard verileri yüklenemedi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [token]);

    if (loading) return <CircularProgress />;
    if (!stats) return <Typography>Veriler yüklenemedi.</Typography>;

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>Hoş Geldin, {user?.username}!</Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>İşte sitenin anlık durumu:</Typography>

            {/* İSTATİSTİK KARTLARI */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <StatCard title="Toplam Haber Sayısı" value={stats.newsCount} icon={<ArticleIcon color="primary" sx={{ fontSize: 40 }} />} />
                <StatCard title="Yeni Mesajlar" value={stats.unreadMessagesCount} icon={<MailOutlineIcon color="secondary" sx={{ fontSize: 40 }} />} />
                <StatCard title="Yeni Başvurular" value={stats.newVolunteersCount} icon={<PeopleOutlineIcon color="error" sx={{ fontSize: 40 }} />} />
            </Grid>

            {/* SON GELENLER LİSTELERİ */}
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 2, borderRadius: '16px' }}>
                        <Typography variant="h6" sx={{ p: 2 }}>Son Haberler</Typography>
                        <List>
                            {stats.recentNews.map(news => (
                                <ListItem key={news._id} secondaryAction={
                                    <Button size="small" component={RouterLink} to={`/admin/news/edit/${news._id}`}>Düzenle</Button>
                                }>
                                    <ListItemText primary={news.title} secondary={new Date(news.createdAt).toLocaleDateString('tr-TR')} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <Box sx={{ p: 2, textAlign: 'right' }}>
                            <Button component={RouterLink} to="/admin/news">Tüm Haberleri Gör</Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 2, borderRadius: '16px' }}>
                        <Typography variant="h6" sx={{ p: 2 }}>Son Mesajlar</Typography>
                        <List>
                            {stats.recentMessages.map(msg => (
                                <ListItem key={msg._id}>
                                    <ListItemText primary={msg.name} secondary={new Date(msg.createdAt).toLocaleDateString('tr-TR')} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <Box sx={{ p: 2, textAlign: 'right' }}>
                            <Button component={RouterLink} to="/admin/messages">Tüm Mesajları Gör</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardPage;