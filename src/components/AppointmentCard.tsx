import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../theme/Theme';
import { Event } from '../models/Event';
import { DateFormats } from '../shared/DateFormats';
import AvatarCircle from './AvatarCircle';

interface AppointmentCardProps {
  event: Event;
  style?: ViewStyle;
  showProgress?: boolean;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  event,
  style,
  showProgress = false,
}) => {
  const getEventIcon = (title: string): keyof typeof Ionicons.glyphMap => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('meeting')) return 'people';
    if (lowerTitle.includes('lunch') || lowerTitle.includes('coffee')) return 'restaurant';
    if (lowerTitle.includes('plan')) return 'documents';
    return 'calendar';
  };

  const getProgressPercentage = (): number => {
    const now = new Date();
    if (now < event.start) return 0;
    if (now > event.end) return 100;
    
    const total = event.end.getTime() - event.start.getTime();
    const elapsed = now.getTime() - event.start.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const progress = getProgressPercentage();

  return (
    <TouchableOpacity style={[styles.container, style]}>
      <View style={[styles.card, { backgroundColor: event.color }]}>
        <View style={styles.header}>
          <Ionicons
            name={getEventIcon(event.title)}
            size={20}
            color={Theme.textPrimary}
            style={styles.icon}
          />
          
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="ellipsis-horizontal" size={16} color={Theme.textSecondary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>

        <Text style={styles.time}>
          {DateFormats.formatTimeRange(event.start, event.end)}
        </Text>

        {event.location && (
          <Text style={styles.location} numberOfLines={1}>
            📍 {event.location}
          </Text>
        )}

        {event.attendees.length > 0 && (
          <View style={styles.attendeesContainer}>
            <View style={styles.avatarsContainer}>
              {event.attendees.slice(0, 4).map((attendee, index) => (
                <AvatarCircle
                  key={attendee.id}
                  user={attendee}
                  size={28}
                  style={[
                    styles.avatar,
                    { marginLeft: index > 0 ? -8 : 0 }
                  ]}
                />
              ))}
              {event.attendees.length > 4 && (
                <View style={[styles.moreAvatar, { marginLeft: -8 }]}>
                  <Text style={styles.moreAvatarText}>
                    +{event.attendees.length - 4}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {showProgress && progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(progress)}% complete
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // Container for touch handling
  },
  card: {
    borderRadius: Theme.cornerRadiusL,
    padding: Theme.spacingL,
    ...Theme.shadowSmall,
    borderLeftWidth: 4,
    borderLeftColor: Theme.primaryColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacingM,
  },
  icon: {
    marginRight: Theme.spacingS,
  },
  menuButton: {
    padding: Theme.spacingXS,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: Theme.textPrimary,
    marginBottom: Theme.spacingXS,
  },
  time: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.textSecondary,
    marginBottom: Theme.spacingXS,
  },
  location: {
    fontSize: 13,
    color: Theme.textSecondary,
    marginBottom: Theme.spacingM,
  },
  attendeesContainer: {
    marginTop: Theme.spacingM,
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 2,
    borderColor: 'white',
  },
  moreAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Theme.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  moreAvatarText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'white',
  },
  progressContainer: {
    marginTop: Theme.spacingM,
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: Theme.spacingXS,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Theme.primaryColor,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.textSecondary,
  },
});

export default AppointmentCard;
