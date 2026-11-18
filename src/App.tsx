import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SareeDetailPage } from './pages/SareeDetailPage';
import { AdminPage } from './pages/AdminPage';
import { ShopPage } from './pages/ShopPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SpecialCollectionPage } from './pages/SpecialCollectionPage';
import { RouteSeo } from './components/RouteSeo';
import { PoliciesPage } from './pages/PoliciesPage';
import { WeaveCollectionPage } from './pages/WeaveCollectionPage';

export default function App() {
  return (
    <BrowserRouter>
      <RouteSeo />
      <Routes>
        {/* Main Storefront */}
        <Route path="/" element={<HomePage />} />
        
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:weave" element={<WeaveCollectionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sale" element={<SpecialCollectionPage type="sale" />} />
        <Route path="/upcoming-sarees" element={<SpecialCollectionPage type="upcoming" />} />
        <Route path="/policies" element={<PoliciesPage />} />

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
