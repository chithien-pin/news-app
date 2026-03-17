import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  HomeHeader,
  SectionHeader,
  TrendingCard,
  RecentStoryCard,
  CategoryPills,
  type CategoryKey,
} from '../components/home';
import { useTopHeadlines } from '../hooks/useNews';
import { colors, spacing } from '../config/theme';
import type { TopHeadlinesParams } from '../types/news';

const CATEGORY_TO_API: Record<CategoryKey, TopHeadlinesParams['category'] | undefined> = {
  All: undefined,
  Politics: 'general',
  Technology: 'technology',
  Business: 'business',
  Entertainment: 'entertainment',
  Health: 'health',
  Science: 'science',
  Sports: 'sports',
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('All');

  const trendingParams = useMemo<TopHeadlinesParams>(
    () => ({ country: 'us', pageSize: 10 }),
    []
  );
  const recentParams = useMemo<TopHeadlinesParams>(
    () => ({
      country: 'us',
      category: CATEGORY_TO_API[selectedCategory],
      pageSize: 20,
    }),
    [selectedCategory]
  );

  const {
    articles: trendingArticles,
    loading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending,
  } = useTopHeadlines(trendingParams);

  const {
    articles: recentArticles,
    loading: recentLoading,
    error: recentError,
    refetch: refetchRecent,
  } = useTopHeadlines(recentParams);

  const refreshing = trendingLoading || recentLoading;
  const onRefresh = () => {
    refetchTrending();
    refetchRecent();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <HomeHeader />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Trending */}
        <SectionHeader title="Trending" onViewAll={() => {}} />
        {trendingError ? (
          <Text style={styles.error}>{trendingError}</Text>
        ) : trendingLoading && trendingArticles.length === 0 ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={trendingArticles}
            horizontal
            keyExtractor={(item) => item.url + item.publishedAt}
            renderItem={({ item }) => <TrendingCard article={item} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingList}
            listKey="trending"
          />
        )}

        {/* Recent Stories */}
        <SectionHeader title="Recent Stories" onViewAll={() => {}} />
        <CategoryPills
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        {recentError ? (
          <Text style={styles.error}>{recentError}</Text>
        ) : recentLoading && recentArticles.length === 0 ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : (
          <View style={styles.recentList}>
            {recentArticles.map((article) => (
              <RecentStoryCard
                key={article.url + article.publishedAt}
                article={article}
              />
            ))}
          </View>
        )}
        <View style={{ height: spacing.xxl + 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  trendingList: {
    paddingLeft: spacing.lg,
    paddingBottom: spacing.lg,
  },
  recentList: {
    paddingBottom: spacing.lg,
  },
  loadingRow: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
  },
  error: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    color: colors.notification,
    fontSize: 14,
  },
});
