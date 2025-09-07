import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../theme/Theme';

interface FABProps {
  onPress: () => void;
  style?: ViewStyle;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: number;
}

const FAB: React.FC<FABProps> = ({
  onPress,
  style,
  icon = 'add',
  size = 24,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.fab, Theme.shadowLarge, style]}
      activeOpacity={0.8}
    >
      <Ionicons name={icon} size={size} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 100, // Above tab bar
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Theme.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FAB;
