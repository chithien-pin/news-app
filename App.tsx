import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { BottomTabBar, type TabId } from './src/components/common/BottomTabBar';

const SPLASH_DURATION_MS = 2500;

function MainTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Discover':
        return <DiscoverScreen />;
      case 'Bookmark':
        return <BookmarkScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.screen}>{renderScreen()}</View>
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <>
        <StatusBar style="dark" />
        <SplashScreen />
      </>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <MainTabs />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
});
