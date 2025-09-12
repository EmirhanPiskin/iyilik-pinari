import { createTheme } from '@mui/material/styles';

const primaryColor = '#0F92CA'; // Canlı Mavi
const secondaryColor = '#499E5D'; // Doğal Yeşil

const theme = createTheme({
    // 1. RENK PALETİ
    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
        background: {
            default: '#FFFFFF', // Beyaz arkaplan
            paper: '#f7f9fc',  // Paper/Card gibi bileşenler için hafif mavi/gri arkaplan
        },
    },

    // 2. TYPOGRAPHY
    typography: {
        fontFamily: 'Poppins, sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
    },

    // 3. BİLEŞENLERİN VARSAYILAN STİLLERİ
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    padding: '10px 24px',
                },
            },
        },
        // Kartların (Card, Paper) varsayılan stilini güncelleyelim
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                }
            }
        }
    },
});

export default theme;