import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../config/theme';

const DEFAULT_USER = {
  name: 'Andrew Ainsley',
  greeting: 'Welcome back 👋',
};

interface HomeHeaderProps {
  userName?: string;
  userGreeting?: string;
  avatarUri?: string | null;
  onNotificationPress?: () => void;
}

export function HomeHeader({
  userName = DEFAULT_USER.name,
  userGreeting = DEFAULT_USER.greeting,
  avatarUri,
  onNotificationPress,
}: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatar}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>
              {userName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </Text>
          )}
        </View>
        <View style={styles.greetingBlock}>
          <Text style={styles.greeting}>{userGreeting}</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.bellWrap}
        onPress={onNotificationPress}
        activeOpacity={0.7}
      >
        <Ionicons name="notifications-outline" size={24} color={colors.text} />
        <View style={styles.badge} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingTop: spacing.xxl,
    backgroundColor: colors.background,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
  greetingBlock: {
    flex: 1,
  },
  greeting: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  userName: {
    ...typography.title,
    color: colors.text,
  },
  bellWrap: {
    padding: spacing.sm,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.notification,
  },
});
