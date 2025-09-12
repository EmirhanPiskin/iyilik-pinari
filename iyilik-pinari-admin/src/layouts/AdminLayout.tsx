import { Box, List, ListItem, ListItemButton, ListItemText, Button, Typography } from '@mui/material';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* SOL TARAF - SIDEBAR */}
            <Box component="nav" sx={{ width: 240, flexShrink: 0, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}>
                <List>
                    <Typography variant="h6" sx={{ p: 2 }}>Yönetim Paneli</Typography>
                    <ListItem disablePadding>
                        <ListItemButton component={NavLink} to="/dashboard">
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={NavLink} to="/admin/news">
                            <ListItemText primary="Haber Yönetimi" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={NavLink} to="/admin/messages">
                            <ListItemText primary="Mesajlar" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={NavLink} to="/admin/volunteers">
                            <ListItemText primary="Gönüllü Başvuruları" />
                        </ListItemButton>
                    </ListItem>
                    {user?.role === 'admin' && (
                        <ListItem disablePadding>
                            <ListItemButton component={NavLink} to="/admin/users">
                                <ListItemText primary="Kullanıcı Yönetimi" />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
                <Box sx={{ p: 2, position: 'absolute', bottom: 0 }}>
                    <Button variant="outlined" onClick={handleLogout}>Çıkış Yap</Button>
                </Box>
            </Box>

            {/* SAĞ TARAF - ANA İÇERİK ALANI */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f4f6f8' }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;