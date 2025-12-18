import { apiClient, Article } from '../lib/api';

export const articleService = {
  async getArticles(category?: 'India' | 'World'): Promise<Article[]> {
    return apiClient.getArticles(category);
  },

  async getAllArticles(): Promise<Article[]> {
    return apiClient.getArticles(); // No category parameter to get all articles
  },

  async createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<Article> {
    return apiClient.createArticle(article);
  },
  // Add this to your articleService in src/services/articleService.ts
  async getArticleById(id: string): Promise<Article> {
    return apiClient.getArticleById(id);
  },
  async updateArticle(article: Article): Promise<void> {
    return apiClient.updateArticle(article);
  },

  async deleteArticle(id: string): Promise<void> {
    return apiClient.deleteArticle(id);
  },
};
