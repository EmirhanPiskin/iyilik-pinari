import { Box, Container, Grid, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <Box className={styles.footer} component="footer">
            <Container maxWidth="lg">
                <Grid container spacing={5} className={styles.gridContainer}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="h6" className={styles.heading}>
                            İyilik Pınarı Derneği
                        </Typography>
                        <Typography variant="body2">
                            Her çocuk bir damla umut, birlikte İyilik Pınarıyız.
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="h6" className={styles.heading}>
                            Hızlı Erişim
                        </Typography>
                        <Link component={RouterLink} to="/" className={styles.link}>Anasayfa</Link>
                        <Link component={RouterLink} to="/about" className={styles.link}>Hakkımızda</Link>
                        <Link component={RouterLink} to="/news" className={styles.link}>Haberler</Link>
                        <Link component={RouterLink} to="/contact" className={styles.link}>İletişim</Link>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="h6" className={styles.heading}>
                            Bizi Takip Edin
                        </Typography>
                        <Link href="https://facebook.com" className={styles.socialIconLink} sx={{ paddingLeft: "120px" }}>
                            <FacebookIcon />
                        </Link>
                        <Link href="https://twitter.com" className={styles.socialIconLink}>
                            <TwitterIcon />
                        </Link>
                        <Link href="https://instagram.com/iyilikpinariyarder/" className={styles.socialIconLink}>
                            <InstagramIcon />
                        </Link>
                    </Grid>
                </Grid>

                <Box className={styles.copyright}>
                    <Typography variant="body2">
                        © {new Date().getFullYear()} İyilik Pınarı Yardım Derneği. Tüm Hakları Saklıdır.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;