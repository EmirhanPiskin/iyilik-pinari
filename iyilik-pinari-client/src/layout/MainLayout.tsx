import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = () => {
    return (
        // Bu Box, tüm sayfanın dikey flex yapısını yönetir
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <ScrollToTop />
            <Navbar />

            {/* Bu Box, Navbar ve Footer arasındaki tüm alanı doldurur. */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>

            <Footer />
        </Box>
    );
};

export default MainLayout;