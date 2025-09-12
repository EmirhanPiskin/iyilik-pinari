import { AppBar, Toolbar, Box, Link, Button, useTheme, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import finalLogo from '../assets/iyilikpinarijustlogo.jpg';

// Yönetimi kolaylaştırması için navigasyon linklerimizi bir dizi olarak tanımladık.
const navLinks = [
    { title: "Anasayfa", path: "/" },
    { title: "Hakkımızda", path: "/about" },
    { title: "Haberler", path: "/news" },
    { title: "Gönüllü Ol", path: "/gonullu-ol" },
    { title: "İletişim", path: "/contact" },
];

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Mobil menüyü açıp kapatan fonksiyon
    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    // Mobil menünün içindeki link listesi
    const drawerContent = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {navLinks.map((link) => (
                    <ListItem key={link.title} disablePadding>
                        <ListItemButton component={NavLink} to={link.path}>
                            <ListItemText primary={link.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Box sx={{ p: 2 }}>
                <Button
                    component={NavLink}
                    to="/bagis-yap"
                    variant="contained"
                    color="secondary"
                    fullWidth
                >
                    Bağış Yap
                </Button>
            </Box>
        </Box>
    );
    return (
        <AppBar position="static" className={styles.navbar}>
            <Toolbar>
                {/* Logo Bölümü */}
                <NavLink to="/" className={styles.brand}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <img
                            src={finalLogo}
                            alt="İyilik Pınarı Yardım Derneği Logosu"
                            style={{
                                height: '75px',
                                display: 'block'
                            }}
                        />
                        <Typography
                            variant="h6"
                            component="span"
                            sx={{
                                fontWeight: 'bold',
                                color: '#145a8cff'
                            }}
                        >
                            İyilik Pınarı
                            <br />Yardım Derneği
                        </Typography>
                    </Box>
                </NavLink>
                <Box sx={{ flexGrow: 1 }}></Box>
                {isMobile ? (
                    // EĞER MOBİL İSE:
                    <>
                        <IconButton
                            color="inherit"
                            aria-label="menüyü aç"
                            edge="end"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                        >
                            {drawerContent}
                        </Drawer>
                    </>
                ) : (
                    // EĞER MASAÜSTÜ İSE:
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.title}
                                component={NavLink} // Bu kullanım, Material UI'ın Button bileşeninin tüm görsel özelliklerini korurken, arka planda React Router'ın NavLink işlevselliğini (doğru sayfaya yönlendirme) kullanmasını sağlar.
                                to={link.path}
                                underline="none"
                                className={styles.navLink}
                                sx={{
                                    color: ({ isActive }: { isActive: boolean }) =>
                                        isActive ? '#0F92CA' : '#333',
                                    '&:hover': {
                                        color: '#499E5D',
                                    },
                                }}
                            >
                                {({ isActive }) => (
                                    <span className={isActive ? styles.activeText : ''}>
                                        {link.title}
                                    </span>
                                )}
                            </Link>
                        ))}
                        <Button
                            component={NavLink}
                            to="/bagis-yap"
                            variant="contained"
                            color="secondary"
                            sx={{
                                borderRadius: '20px',
                                boxShadow: 'none',
                                '&:hover': {
                                    transform: 'scale(1.05)'
                                }
                            }}
                        >
                            Bağış Yap
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;