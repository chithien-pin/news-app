import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../config/theme';
import { timeAgo, formatViews } from '../../utils/format';
import type { NewsArticle } from '../../types/news';

const CARD_WIDTH = Dimensions.get('window').width * 0.78;
const IMAGE_HEIGHT = 180;

interface TrendingCardProps {
  article: NewsArticle;
  views?: number;
  comments?: number;
  onPress?: () => void;
  onShare?: () => void;
  onMore?: () => void;
}

function randomViews() {
  return Math.floor(Math.random() * 200000) + 10000;
}

function randomComments() {
  return Math.floor(Math.random() * 5000) + 100;
}

export function TrendingCard({
  article,
  views = randomViews(),
  comments = randomComments(),
  onPress,
  onShare,
  onMore,
}: TrendingCardProps) {
  const sourceName = article.source?.name ?? 'Source';
  const imageUri = article.urlToImage ?? undefined;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.95}
    >
      <View style={styles.imageWrap}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={3}>
          {article.title}
        </Text>
        <Text style={styles.source}>{sourceName}</Text>
        <View style={styles.meta}>
          <Text style={styles.time}>{timeAgo(article.publishedAt)}</Text>
          <View style={styles.stats}>
            <Ionicons name="eye-outline" size={14} color={colors.textMuted} />
            <Text style={styles.statText}>{formatViews(views)}</Text>
            <Ionicons name="chatbubble-outline" size={14} color={colors.textMuted} />
            <Text style={styles.statText}>{formatViews(comments)}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={onShare} hitSlop={12}>
              <Ionicons name="share-outline" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onMore} hitSlop={12}>
              <Ionicons name="ellipsis-vertical" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  imageWrap: {
    width: '100%',
    height: IMAGE_HEIGHT,
    backgroundColor: colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.border,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    ...typography.bodyBold,
    color: colors.text,
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
  source: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  time: {
    ...typography.small,
    color: colors.textMuted,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    ...typography.small,
    color: colors.textMuted,
    marginRight: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
