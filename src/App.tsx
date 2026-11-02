import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SareeDetailPage } from './pages/SareeDetailPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Storefront */}
        <Route path="/" element={<HomePage />} />
        
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
