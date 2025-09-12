import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { API_BASE_URL } from '../apiConfig';

interface UserData {
    _id: string;
    username: string;
    role: 'admin' | 'editor';
    createdAt: string;
}

interface UserFormInputs {
    username: string;
    password: string;
}

const UsersListPage = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserFormInputs>();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (err) {
            console.error("Kullanıcılar alınamadı:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [token]);

    const handleDelete = async (id: string) => {
        if (window.confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
            try {
                await axios.delete(`${API_BASE_URL}/api/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchUsers();
            } catch (err) {
                console.error("Kullanıcı silinemedi:", err);
                alert("Kullanıcı silinirken bir hata oluştu.");
            }
        }
    };

    // --- MODAL FONKSİYONLARI ---
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        reset();
        setError(null);
    };

    // --- YENİ KULLANICI OLUŞTURMA FONKSİYONU ---
    const handleCreateUser: SubmitHandler<UserFormInputs> = async (data) => {
        setError(null);
        try {
            await axios.post(`${API_BASE_URL}/api/users`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            handleCloseModal();
            fetchUsers();
        } catch (err: any) {
            console.error("Kullanıcı oluşturulurken hata:", err);
            setError(err.response?.data?.message || "Bir hata oluştu.");
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">Kullanıcı Yönetimi</Typography>
                <Button variant="contained" onClick={handleOpenModal}>Yeni Editör Ekle</Button>
            </Box>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Kullanıcı Adı</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>Oluşturulma Tarihi</TableCell>
                                <TableCell align="right">İşlemler</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleDateString('tr-TR')}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleDelete(user._id)}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* YENİ KULLANICI EKLEME MODAL'I */}
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <form onSubmit={handleSubmit(handleCreateUser)}>
                    <DialogTitle>Yeni Editör Oluştur</DialogTitle>
                    <DialogContent>
                        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                        <TextField
                            autoFocus margin="dense" label="Kullanıcı Adı" fullWidth
                            {...register("username", { required: "Kullanıcı adı zorunludur." })}
                            error={!!errors.username} helperText={errors.username?.message}
                            sx={{ mb: 2, mt: 1 }}
                        />
                        <TextField
                            margin="dense" label="Şifre" type="password" fullWidth
                            {...register("password", { required: "Şifre zorunludur.", minLength: { value: 6, message: "Şifre en az 6 karakter olmalıdır." } })}
                            error={!!errors.password} helperText={errors.password?.message}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>İptal</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Oluşturuluyor...' : 'Oluştur'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default UsersListPage;