import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { API_BASE_URL } from '../../apiConfig';

interface MessageData {
    _id: string;
    name: string;
    email: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

const MessagesListPage = () => {
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    // Modal'ı yönetmek için state'ler
    const [selectedMessage, setSelectedMessage] = useState<MessageData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = async (message: MessageData) => {
        setSelectedMessage(message);
        setIsModalOpen(true);

        if (!message.isRead) {
            try {
                await axios.patch(`${API_BASE_URL}/api/messages/${message._id}/read`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg._id === message._id ? { ...msg, isRead: true } : msg
                    )
                );

            } catch (error) {
                console.error("Mesaj okundu olarak işaretlenemedi:", error);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMessage(null);
    };

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/messages`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data);
        } catch (error) {
            console.error("Mesajlar yüklenirken hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [token]);

    const handleDelete = async (id: string) => {
        if (window.confirm("Bu mesajı silmek istediğinizden emin misiniz?")) {
            try {
                await axios.delete(`${API_BASE_URL}/api/messages/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchMessages();
            } catch (error) {
                console.error("Mesaj silinirken hata oluştu:", error);
                alert("Mesaj silinirken bir hata oluştu.");
            }
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Box>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>Gelen Mesajlar</Typography>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Gönderen</TableCell>
                                <TableCell>E-posta</TableCell>
                                <TableCell>Mesaj</TableCell>
                                <TableCell>Tarih</TableCell>
                                <TableCell align="right">İşlemler</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {messages.map((item) => (
                                <TableRow key={item._id} sx={{ '& td, & th': { fontWeight: item.isRead ? 'normal' : 'bold' } }}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.message.substring(0, 50)}...</TableCell>
                                    <TableCell>{new Date(item.createdAt).toLocaleDateString('tr-TR')}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleOpenModal(item)}>
                                            <VisibilityIcon />
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
            {/* DETAY GÖRÜNTÜLEME MODAL'I */}
            <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
                <DialogTitle>Mesaj Detayı</DialogTitle>
                {selectedMessage && (
                    <DialogContent>
                        <DialogContentText><strong>Gönderen:</strong> {selectedMessage.name}</DialogContentText>
                        <DialogContentText><strong>E-posta:</strong> {selectedMessage.email}</DialogContentText>
                        <DialogContentText sx={{ mt: 2 }}>
                            <strong>Mesaj:</strong><br />
                            {selectedMessage.message}
                        </DialogContentText>
                    </DialogContent>
                )}
                <DialogActions>
                    <Button onClick={handleCloseModal}>Kapat</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default MessagesListPage;