import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from "../../config/theme";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';

interface TopBarProps {
    title: string;
    onBackPress: () => void;
    TopBarRight: React.ReactNode;
}

const TopBar = ({ title, onBackPress, TopBarRight }: TopBarProps) => {
    const insets = useSafeAreaInsets();
    const windowWidth = useWindowDimensions().width;
    return (
        <View style={[styles.container, { paddingTop: insets.top }, { width: windowWidth}]}>
            <Ionicons name="arrow-back" onPress={onBackPress} style={styles.backButton} />
            <Text style={styles.title}>{title}</Text>
            {TopBarRight}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: colors.background,
    },
    title: {
        color: colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        color: colors.text,
        fontSize: 24,
        fontWeight: 'bold',
    }
});

export default TopBar;