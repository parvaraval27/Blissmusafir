// Simple API client for Vite application
const API_BASE = (import.meta as any).env.VITE_API_URL || '/api';
const ADMIN_TOKEN_KEY = 'bliss-admin-token';

function getAdminToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(ADMIN_TOKEN_KEY);
}

function setAdminToken(token: string) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

function clearAdminToken() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string; // Google Drive URL
  category: 'India' | 'World';
  location?: string;
  author: string;
  readTime: string;
  views?: number;
  date: string;
  tags: string[];
  isPopular?: boolean;
  continent?: string; // For World articles
  createdAt?: string;
  updatedAt?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = getAdminToken();
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response;
  }

  async getArticles(category?: 'India' | 'World'): Promise<Article[]> {
    const params = category ? `?category=${category}` : '';
    const response = await this.request(`/api/articles${params}`);
    return response.json();
  }

  async createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<Article> {
    const response = await this.request('/api/articles', {
      method: 'POST',
      body: JSON.stringify(article),
    });
    return response.json();
  }

  async updateArticle(article: Article): Promise<void> {
    await this.request('/api/articles', {
      method: 'PUT',
      body: JSON.stringify(article),
    });
  }

  async deleteArticle(id: string): Promise<void> {
    await this.request(`/api/articles?id=${id}`, {
      method: 'DELETE',
    });
  }

  async sendContactMessage(payload: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    await this.request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async subscribeToNewsletter(email: string): Promise<{ message: string }> {
    const response = await this.request('/api/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    return response.json();
  }

  async adminLogin(email: string, password: string): Promise<{ token: string; email: string }> {
    const response = await this.request('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    return response.json();
  }

  async getAdminSession(): Promise<{ email: string } | null> {
    const url = `${this.baseUrl}/api/admin/me`;
    const token = getAdminToken();
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (response.status === 401) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async adminLogout(): Promise<void> {
    try {
      await this.request('/api/admin/logout', {
        method: 'POST',
      });
    } finally {
      clearAdminToken();
    }
  }

  setAdminToken(token: string) {
    setAdminToken(token);
  }

  clearAdminToken() {
    clearAdminToken();
  }

  async triggerDigestSend(): Promise<{ message: string }> {
    const response = await this.request('/api/admin/send-digest', {
      method: 'POST',
    });

    return response.json();
  }
  
  // Add this to your ApiClient class in src/lib/api.ts
  async getArticleById(id: string): Promise<Article> {
  const response = await this.request(`/api/articles/${id}`);
  return response.json();
  }

}

export const apiClient = new ApiClient();
