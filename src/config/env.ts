/**
 * App config & env.
 * - EXPO_PUBLIC_NEWS_API_KEY: loaded from .env by Expo (recommended).
 * - API_KEY: used when provided via app.config.js extra (e.g. dotenv in app.config.js).
 */
import Constants from 'expo-constants';

const extra = (Constants.expoConfig as { extra?: { newsApiKey?: string } } | null)?.extra;
const apiKeyFromExtra = extra?.newsApiKey;

export const NEWS_API_KEY =
  process.env.EXPO_PUBLIC_NEWS_API_KEY ?? apiKeyFromExtra ?? '';

export const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
