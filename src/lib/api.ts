// Simple API client for Vite application
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
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
}

export const apiClient = new ApiClient();
