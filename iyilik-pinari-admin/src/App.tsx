import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminLayout from './layouts/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import NewsListPage from './pages/news/NewsListPage';
import NewsCreatePage from './pages/news/NewsCreatePage';
import NewsEditPage from './pages/news/NewsEditPage';
import MessagesListPage from './pages/messages/MessagesListPage';
import VolunteersListPage from './pages/volunteers/VolunteersListPage';
import AdminRoute from './components/AdminRoute';
import UsersListPage from './pages/UsersListPage';
// Giriş yapmış kullanıcıların login sayfasına gitmesini engelleyen özel bir rota
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import type { JSX } from 'react';
// Haberler listesi ve diğer admin sayfaları için boş component'ler
const NotFoundPage = () => <h2>Sayfa Bulunamadı</h2>;


const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Herkesin erişebileceği login sayfası */}
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />

        {/* Sadece giriş yapmış kullanıcıların erişebileceği korumalı alan */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin/news" element={<NewsListPage />} />
            <Route path="/admin/news/create" element={<NewsCreatePage />} />
            <Route path="/admin/news/edit/:id" element={<NewsEditPage />} />
            <Route path="/admin/messages" element={<MessagesListPage />} />
            <Route path="/admin/volunteers" element={<VolunteersListPage />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin/users" element={<UsersListPage />} />
            </Route>
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>
        </Route>

        {/* Eşleşmeyen tüm yollar için 404 sayfası */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;