import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';

const { height } = Dimensions.get('window');

const TEAL = '#008080';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Newsline logo"
        />
        <Text style={styles.appName}>Newsline</Text>
      </View>
      <ActivityIndicator
        size="large"
        color={TEAL}
        style={styles.loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333333',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  loader: {
    marginBottom: height * 0.12,
  },
});
