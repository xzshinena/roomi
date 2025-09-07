import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../../src/theme/Theme';

export default function MapTab() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Map coming soon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundSecondary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: Theme.textSecondary,
    fontWeight: '500',
  },
});
