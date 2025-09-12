import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    // useLocation hook'u ile mevcut konum (URL) bilgilerini alıyoruz.
    const { pathname } = useLocation();

    // useEffect hook'u ile, pathname her değiştiğinde bir işlem yapmasını sağlıyoruz.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

export default ScrollToTop;