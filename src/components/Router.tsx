import { useState } from 'react';
import { HomePage } from '../pages/HomePage';
import { IndiaPage } from '../pages/IndiaPage';
import { WorldPage } from '../pages/WorldPage';
import { BlogDetailPage } from '../pages/BlogDetailPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';

export type Page = 'home' | 'india' | 'world' | 'blog' | 'about' | 'contact';

interface RouterProps {
  currentPage: Page;
  onNavigate: (page: Page, blogId?: string) => void;
  blogId?: string;
}

export function Router({ currentPage, onNavigate, blogId }: RouterProps) {
  switch (currentPage) {
    case 'home':
      return <HomePage onNavigate={onNavigate} />;
    case 'india':
      return <IndiaPage onNavigate={onNavigate} />;
    case 'world':
      return <WorldPage onNavigate={onNavigate} />;
    case 'blog':
      return <BlogDetailPage onNavigate={onNavigate} blogId={blogId} />;
    case 'about':
      return <AboutPage onNavigate={onNavigate} />;
    case 'contact':
      return <ContactPage onNavigate={onNavigate} />;
    default:
      return <HomePage onNavigate={onNavigate} />;
  }
}