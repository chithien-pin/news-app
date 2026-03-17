import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../config/theme';

export type TabId = 'Home' | 'Discover' | 'Bookmark' | 'Profile';

const TABS: { id: TabId; label: string; icon: string; iconActive: string }[] = [
  { id: 'Home', label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { id: 'Discover', label: 'Discover', icon: 'compass-outline', iconActive: 'compass' },
  { id: 'Bookmark', label: 'Bookmark', icon: 'bookmark-outline', iconActive: 'bookmark' },
  { id: 'Profile', label: 'Profile', icon: 'person-outline', iconActive: 'person' },
];

interface BottomTabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, spacing.sm);

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding }]}>
      {TABS.map(({ id, label, icon, iconActive }) => {
        const isActive = activeTab === id;
        return (
          <TouchableOpacity
            key={id}
            style={styles.tab}
            onPress={() => onTabChange(id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={(isActive ? iconActive : icon) as keyof typeof Ionicons.glyphMap}
              size={24}
              color={isActive ? colors.primary : colors.textMuted}
            />
            <Text
              style={[
                styles.label,
                isActive && styles.labelActive,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
  },
  label: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: 2,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});
