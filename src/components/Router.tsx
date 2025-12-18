import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { IndiaPage } from '../pages/IndiaPage';
import { WorldPage } from '../pages/WorldPage';
import { BlogDetailPage } from '../pages/BlogDetailPage';
import { ContactPage } from '../pages/ContactPage';
import { AboutPage } from '../pages/AboutPage';
import { AdminPage } from '../pages/AdminPage';
import { SearchResults } from '../pages/SearchResults';

// Keep Page type for compatibility with legacy code
export type Page = 'home' | 'india' | 'world' | 'blog' | 'contact' | 'admin';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/india" element={<IndiaPage />} />
      <Route path="/world" element={<WorldPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/blog/:id" element={<BlogDetailPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}