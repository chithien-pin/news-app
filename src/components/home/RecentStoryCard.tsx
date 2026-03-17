import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../config/theme';
import { timeAgo, formatViews } from '../../utils/format';
import type { NewsArticle } from '../../types/news';

const THUMB_SIZE = 80;

function randomViews() {
  return Math.floor(Math.random() * 1500) + 100;
}

function randomComments() {
  return Math.floor(Math.random() * 20) + 1;
}

interface RecentStoryCardProps {
  article: NewsArticle;
  views?: number;
  comments?: number;
  onPress?: () => void;
  onShare?: () => void;
  onMore?: () => void;
}

export function RecentStoryCard({
  article,
  views = randomViews(),
  comments = randomComments(),
  onPress,
  onShare,
  onMore,
}: RecentStoryCardProps) {
  const author = article.author || article.source?.name || 'Source';
  const imageUri = article.urlToImage ?? undefined;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.textBlock}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        <View style={styles.authorRow}>
          <View style={styles.avatarSmall} />
          <Text style={styles.author}>{author}</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.time}>{timeAgo(article.publishedAt)}</Text>
          <View style={styles.stats}>
            <Ionicons name="eye-outline" size={12} color={colors.textMuted} />
            <Text style={styles.statText}>{formatViews(views)}</Text>
            <Ionicons name="chatbubble-outline" size={12} color={colors.textMuted} />
            <Text style={styles.statText}>{comments}</Text>
          </View>
        </View>
      </View>
      <View style={styles.thumbWrap}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.thumb} resizeMode="cover" />
        ) : (
          <View style={styles.thumbPlaceholder} />
        )}
        <View style={styles.actions}>
          <TouchableOpacity onPress={onShare} hitSlop={8}>
            <Ionicons name="share-outline" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onMore} hitSlop={8}>
            <Ionicons name="ellipsis-vertical" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  textBlock: {
    flex: 1,
    marginRight: spacing.md,
    justifyContent: 'space-between',
  },
  title: {
    ...typography.bodyBold,
    color: colors.text,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  avatarSmall: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    marginRight: 6,
  },
  author: {
    ...typography.small,
    color: colors.textSecondary,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    ...typography.small,
    color: colors.textMuted,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  statText: {
    ...typography.small,
    color: colors.textMuted,
    marginRight: 6,
  },
  thumbWrap: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    position: 'relative',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 8,
  },
  thumbPlaceholder: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 8,
    backgroundColor: colors.border,
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    gap: 4,
  },
});
