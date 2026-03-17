import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, spacing, typography } from '../../config/theme';

const CATEGORIES = [
  'All',
  'Politics',
  'Technology',
  'Business',
  'Entertainment',
  'Health',
  'Science',
  'Sports',
] as const;

export type CategoryKey = (typeof CATEGORIES)[number];

interface CategoryPillsProps {
  selected: CategoryKey;
  onSelect: (category: CategoryKey) => void;
}

export function CategoryPills({ selected, onSelect }: CategoryPillsProps) {
  return (
    <View style={styles.wrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = cat === selected;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.pill, isSelected && styles.pillSelected]}
              onPress={() => onSelect(cat)}
              activeOpacity={0.8}
            >
              <Text
                style={[styles.pillText, isSelected && styles.pillTextSelected]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  pill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
  },
  pillSelected: {
    backgroundColor: colors.primary,
  },
  pillText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '500',
  },
  pillTextSelected: {
    color: colors.background,
    fontWeight: '600',
  },
});
