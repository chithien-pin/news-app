import { useState, useEffect, useCallback } from 'react';
import type { NewsArticle, TopHeadlinesParams, EverythingParams } from '../types/news';
import { getTopHeadlines, getEverything, assertOk } from '../services/newsApi';

type NewsState = {
  articles: NewsArticle[];
  totalResults: number;
  loading: boolean;
  error: string | null;
};

const initialState: NewsState = {
  articles: [],
  totalResults: 0,
  loading: false,
  error: null,
};

/**
 * Fetch top headlines (best for home/ticker).
 * Refetch when options change.
 */
export function useTopHeadlines(options: TopHeadlinesParams = {}) {
  const [state, setState] = useState<NewsState>(initialState);

  const fetchHeadlines = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await getTopHeadlines(options);
      assertOk(res);
      setState({
        articles: res.articles,
        totalResults: res.totalResults,
        loading: false,
        error: null,
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to load headlines';
      setState((s) => ({
        ...s,
        loading: false,
        error: message,
      }));
    }
  }, [options.country, options.category, options.sources, options.q, options.page, options.pageSize, options.language]);

  useEffect(() => {
    fetchHeadlines();
  }, [fetchHeadlines]);

  return { ...state, refetch: fetchHeadlines };
}

/**
 * Search everything (keyword, date range, etc.).
 * Call search() to run; does not auto-fetch.
 */
export function useEverything() {
  const [state, setState] = useState<NewsState>(initialState);

  const search = useCallback(async (params: EverythingParams) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await getEverything(params);
      assertOk(res);
      setState({
        articles: res.articles,
        totalResults: res.totalResults,
        loading: false,
        error: null,
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Search failed';
      setState((s) => ({
        ...s,
        loading: false,
        error: message,
      }));
    }
  }, []);

  return { ...state, search };
}
