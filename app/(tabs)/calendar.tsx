import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../../src/theme/Theme';
import CalendarScreen from '../../src/screens/calendar/CalendarScreen';

export default function CalendarTab() {
  return (
    <View style={styles.container}>
      <CalendarScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundSecondary,
  },
});
