import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { user } = useAuth();
    // Eğer kullanıcı 'admin' rolüne sahipse, içeriği göster.
    // Değilse, onu ana sayfaya (dashboard) yönlendir.
    return user?.role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;