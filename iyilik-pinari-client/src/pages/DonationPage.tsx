import { Box, Container, Typography, Paper, List, ListItem, ListItemText, Button, Divider } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FavoriteIcon from '@mui/icons-material/Favorite';

const bankInfo = {
    iban: "TR12 3456 7890 1234 5678 9012 34",
    accountHolder: "İyilik Pınarı Yardım Derneği"
};

const DonationPage = () => {

    // IBAN'ı panoya kopyalama fonksiyonu
    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("IBAN panoya kopyalandı!");
        }, (err) => {
            console.error('Kopyalama başarısız oldu: ', err);
            alert("Kopyalama başarısız oldu.");
        });
    };

    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            {/* 1. BÖLÜM: SAYFA BAŞLIĞI */}
            <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
                <FavoriteIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                <Typography variant="h2" component="h1" fontWeight="bold">
                    Desteğinizle Umut Olun
                </Typography>
                <Typography variant="h5" sx={{ mt: 2, maxWidth: '800px', mx: 'auto' }} color="text.secondary">
                    Yapacağınız her bağış, bir çocuğun eğitimine, geleceğine ve hayallerine dokunacak bir umut ışığıdır. Banka hesap bilgilerimizi kullanarak bize doğrudan destek olabilirsiniz.
                </Typography>
            </Container>

            {/* 2. BÖLÜM: HESAP BİLGİLERİ */}
            <Container maxWidth="sm" sx={{ pb: 12 }}>
                <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: '24px', textAlign: 'center' }}>
                    <AccountBalanceIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                    <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                        Banka Havale / EFT Bilgileri
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <List>
                        <ListItem>
                            <ListItemText
                                primary="Hesap Sahibi"
                                secondary={bankInfo.accountHolder}
                                primaryTypographyProps={{ fontWeight: 'bold' }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="IBAN"
                                secondary={bankInfo.iban}
                                primaryTypographyProps={{ fontWeight: 'bold' }}
                            />
                        </ListItem>
                    </List>

                    <Button
                        variant="contained"
                        onClick={() => handleCopyToClipboard(bankInfo.iban)}
                        startIcon={<ContentCopyIcon />}
                        sx={{ mt: 2 }}
                    >
                        IBAN'ı Kopyala
                    </Button>

                    <Box sx={{ mt: 4, p: 2, bgcolor: 'action.hover', borderRadius: '16px' }}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Önemli Not:</strong> Lütfen bağış yaparken açıklama kısmına Adınızı, Soyadınızı ve "BAĞIŞ" kelimesini yazmayı unutmayınız.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default DonationPage;