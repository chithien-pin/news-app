import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../config/theme';
import TopBar from '../components/common/TopBar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/types';

export default function NotificationScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const onBackPress = () => {
    navigation.goBack();
  };
  const TopBarRight = () => {
    return (
      <TouchableOpacity onPress={() => { }}>
        <Ionicons name="settings-outline" size={24} color={colors.text} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <TopBar title="Notifications" onBackPress={onBackPress} TopBarRight={<TopBarRight />} />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>Notifications will appear here</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  title: {
    ...typography.sectionTitle,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
});
