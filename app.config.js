/**
 * Loads .env and exposes API_KEY to the app via extra.newsApiKey.
 * Keep API_KEY in .env (or use EXPO_PUBLIC_NEWS_API_KEY for Expo's built-in env).
 */
require('dotenv').config();

const appJson = require('./app.json');

module.exports = {
  expo: {
    ...appJson.expo,
    extra: {
      newsApiKey: process.env.API_KEY || process.env.EXPO_PUBLIC_NEWS_API_KEY || '',
    },
  },
};
