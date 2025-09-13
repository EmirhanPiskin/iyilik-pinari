import { AppBar, Toolbar, Box, Button, useTheme, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Divider } from "@mui/material";
import { NavLink, type NavLinkProps } from "react-router-dom";
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import finalLogo from '../assets/iyilikpinarijustlogo.jpg';

const StyledNavLink = styled(NavLink)<NavLinkProps>(({ theme }) => ({
    background: 'transparent',
    boxShadow: 'none',
    fontSize: '16px',
    padding: '8px 16px',
    position: 'relative',
    borderRadius: '12px',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    color: '#333',

    '&::after': {
        content: "''", // 'content' özelliğini buraya taşıdık
        position: 'absolute',
        bottom: '-5px',
        left: '16px',
        right: '16px',
        width: 'calc(100% - 32px)',
        height: '2px',
        backgroundColor: theme.palette.secondary.main,
        transition: 'transform 0.3s ease', // Geçiş burada tanımlı
        transform: 'scaleX(0)', // Başlangıç durumu: görünmez
        transformOrigin: 'center',
    },

    '&:hover': {
        color: theme.palette.secondary.main,
        // Artık burada 'content' tanımlamaya gerek yok
        '&::after': {
            transform: 'scaleX(1)', // Bitiş durumu: görünür
        }
    },

    '&.active': {
        color: theme.palette.primary.main,
        '&::after': {
            transform: 'scaleX(0)',
        }
    },
}));

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
        <AppBar position="static" sx={{ bgcolor: '#F3F2EE', color: '#333', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.07)', display: 'flex', justifyContent: 'center' }}>
            <Toolbar sx={{ minHeight: '90px' }}>
                {/* Logo Bölümü */}
                <NavLink to="/" style={{
                    textDecoration: 'none',
                    color: '#333',
                    fontWeight: '700'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <img
                            src={finalLogo}
                            alt="İyilik Pınarı Yardım Derneği Logosu"
                            style={{
                                height: '90px',
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
                            <StyledNavLink key={link.title} to={link.path}>
                                {link.title}
                            </StyledNavLink>
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