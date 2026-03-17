/**
 * News API service (https://newsapi.org/)
 * All fetch logic for news lives here.
 */
import apiClient from './api/client';
import type {
  NewsArticle,
  TopHeadlinesParams,
  EverythingParams,
  NewsApiResponse,
} from '../types/news';
import { isNewsApiError } from '../types/news';

const TOP_HEADLINES = '/top-headlines';
const EVERYTHING = '/everything';

export async function getTopHeadlines(
  params: TopHeadlinesParams = {}
): Promise<NewsApiResponse<NewsArticle>> {
  const { data } = await apiClient.get<NewsApiResponse<NewsArticle>>(
    TOP_HEADLINES,
    { params }
  );
  return data;
}

export async function getEverything(
  params: EverythingParams
): Promise<NewsApiResponse<NewsArticle>> {
  if (!params.q && !params.domains && !params.sources) {
    return {
      status: 'error',
      code: 'paramsError',
      message: 'At least one of q, domains, or sources is required.',
    };
  }
  const { data } = await apiClient.get<NewsApiResponse<NewsArticle>>(
    EVERYTHING,
    { params }
  );
  return data;
}

/** Throws if response is error; returns articles otherwise. */
export function assertOk(
  res: NewsApiResponse<NewsArticle>
): asserts res is { status: 'ok'; totalResults: number; articles: NewsArticle[] } {
  if (isNewsApiError(res)) {
    throw new Error(res.message || res.code || 'News API error');
  }
}
