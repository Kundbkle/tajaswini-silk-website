import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SareeDetailPage } from './pages/SareeDetailPage';
import { AdminPage } from './pages/AdminPage';
import { ShopPage } from './pages/ShopPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Storefront */}
        <Route path="/" element={<HomePage />} />
        
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Shareable Saree Detail Page */}
        <Route path="/saree/:id" element={<SareeDetailPage />} />

        {/* Private Owner Admin Panel (not linked in public menu) */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
