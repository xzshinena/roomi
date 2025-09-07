import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Theme } from '../theme/Theme';
import { User } from '../models/User';

interface AvatarCircleProps {
  user: User;
  size?: number;
  style?: ViewStyle;
}

const AvatarCircle: React.FC<AvatarCircleProps> = ({
  user,
  size = 32,
  style,
}) => {
  const containerStyle = [
    styles.container,
    {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    style,
  ];

  const textStyle = [
    styles.emoji,
    {
      fontSize: size * 0.6,
    },
  ];

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{user.avatarEmoji}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    lineHeight: undefined, // Let the emoji center naturally
  },
});

export default AvatarCircle;
