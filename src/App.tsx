import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ExperienceDetailPage from './pages/ExperienceDetailPage';
import MapPage from './pages/MapPage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import RecommendationPage from './pages/RecommendationPage';
import AuthPage from './pages/AuthPage';

function Layout({ children, showNav = true }: { children: React.ReactNode; showNav?: boolean }) {
  return (
    <div className="flex flex-col min-h-screen">
      {showNav && <Navbar />}
      <main className="flex-1">{children}</main>
      {showNav && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Layout showNav={false}><AuthPage /></Layout>} />
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/catalogo" element={<Layout><CatalogPage /></Layout>} />
          <Route path="/experiencia/:id" element={<Layout><ExperienceDetailPage /></Layout>} />
          <Route path="/mapa" element={<Layout><MapPage /></Layout>} />
          <Route path="/reservar/:id" element={<Layout><BookingPage /></Layout>} />
          <Route path="/perfil" element={<Layout><ProfilePage /></Layout>} />
          <Route path="/admin" element={<Layout><AdminPage /></Layout>} />
          <Route path="/recomendacion" element={<Layout><RecommendationPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
