import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { API_BASE_URL } from '../../apiConfig';

interface VolunteerData {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    availability: string[];
    motivation: string;
    isReviewed: boolean;
    createdAt: string;
}

const VolunteersListPage = () => {
    const [volunteers, setVolunteers] = useState<VolunteerData[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    // Modal state'leri
    const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchVolunteers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/volunteers`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setVolunteers(response.data);
        } catch (error) {
            console.error("Başvurular yüklenirken hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVolunteers();
    }, [token]);

    const handleOpenModal = async (volunteer: VolunteerData) => {
        setSelectedVolunteer(volunteer);
        setIsModalOpen(true);

        if (!volunteer.isReviewed) {
            try {
                await axios.patch(`${API_BASE_URL}/api/volunteers/${volunteer._id}/reviewed`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setVolunteers(prevVolunteers =>
                    prevVolunteers.map(v =>
                        v._id === volunteer._id ? { ...v, isReviewed: true } : v
                    )
                );
            } catch (error) {
                console.error("Başvuru incelendi olarak işaretlenemedi:", error);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVolunteer(null);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Bu başvuruyu silmek istediğinizden emin misiniz?")) {
            try {
                await axios.delete(`${API_BASE_URL}/api/volunteers/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchVolunteers();
            } catch (error) {
                console.error("Başvuru silinirken hata oluştu:", error);
            }
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Box>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>Gönüllü Başvuruları</Typography>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ad Soyad</TableCell>
                                <TableCell>İletişim</TableCell>
                                <TableCell>Uygun Zamanlar</TableCell>
                                <TableCell>Başvuru Tarihi</TableCell>
                                <TableCell align="right">İşlemler</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {volunteers.map((item) => (
                                <TableRow key={item._id} sx={{ '& td, & th': { fontWeight: item.isReviewed ? 'normal' : 'bold' } }}>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.email}<br />{item.phone}</TableCell>
                                    <TableCell>{item.availability.join(', ')}</TableCell>
                                    <TableCell>{new Date(item.createdAt).toLocaleDateString('tr-TR')}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleOpenModal(item)}><VisibilityIcon /></IconButton>
                                        <IconButton onClick={() => handleDelete(item._id)}><DeleteIcon color="error" /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
                <DialogTitle>Gönüllü Başvuru Detayı</DialogTitle>
                {selectedVolunteer && (
                    <DialogContent dividers>
                        <Typography gutterBottom><strong>Ad Soyad:</strong> {selectedVolunteer.fullName}</Typography>
                        <Typography gutterBottom><strong>E-posta:</strong> {selectedVolunteer.email}</Typography>
                        <Typography gutterBottom><strong>Telefon:</strong> {selectedVolunteer.phone}</Typography>
                        <Typography gutterBottom><strong>Uygun Zamanlar:</strong> {selectedVolunteer.availability.join(', ')}</Typography>
                        <Typography gutterBottom sx={{ mt: 2 }}><strong>Motivasyon Mektubu:</strong></Typography>
                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>{selectedVolunteer.motivation}</Typography>
                    </DialogContent>
                )}
                <DialogActions><Button onClick={handleCloseModal}>Kapat</Button></DialogActions>
            </Dialog>
        </Box>
    );
};

export default VolunteersListPage;