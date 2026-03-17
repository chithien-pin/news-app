/**
 * News API types (https://newsapi.org/docs)
 */

export interface NewsSource {
  id: string | null;
  name: string;
}

export interface NewsArticle {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface TopHeadlinesParams {
  country?: string;
  category?: 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
  sources?: string;
  q?: string;
  pageSize?: number;
  page?: number;
  language?: string;
}

export interface EverythingParams {
  q?: string;
  searchIn?: 'title' | 'description' | 'content';
  sources?: string;
  domains?: string;
  excludeDomains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  pageSize?: number;
  page?: number;
}

export interface NewsApiSuccessResponse<T> {
  status: 'ok';
  totalResults: number;
  articles: T[];
}

export interface NewsApiErrorResponse {
  status: 'error';
  code: string;
  message: string;
}

export type NewsApiResponse<T> = NewsApiSuccessResponse<T> | NewsApiErrorResponse;

export function isNewsApiError(
  res: NewsApiResponse<NewsArticle>
): res is NewsApiErrorResponse {
  return res.status === 'error';
}
