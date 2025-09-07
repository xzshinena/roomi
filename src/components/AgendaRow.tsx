import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Theme } from '../theme/Theme';
import { Event } from '../models/Event';
import { DateFormats } from '../shared/DateFormats';
import AvatarCircle from './AvatarCircle';

interface AgendaRowProps {
  hour: number;
  events: Event[];
}

const AgendaRow: React.FC<AgendaRowProps> = ({ hour, events }) => {
  const formatHour = (hour: number): string => {
    if (hour === 0) return '12:00 AM';
    if (hour < 12) return `${hour}:00 AM`;
    if (hour === 12) return '12:00 PM';
    return `${hour - 12}:00 PM`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeColumn}>
        <Text style={styles.timeText}>{formatHour(hour)}</Text>
      </View>

      <View style={styles.eventsColumn}>
        {events.length === 0 ? (
          <View style={styles.emptySlot} />
        ) : (
          events.map((event) => (
            <View
              key={event.id}
              style={[
                styles.eventCard,
                { backgroundColor: event.color },
                Theme.shadowSmall,
              ]}
            >
              <View style={styles.eventHeader}>
                <Text style={styles.eventTitle} numberOfLines={2}>
                  {event.title}
                </Text>
                <Text style={styles.eventTime}>
                  {DateFormats.formatTimeRange(event.start, event.end)}
                </Text>
              </View>

              {event.location && (
                <Text style={styles.eventLocation} numberOfLines={1}>
                  📍 {event.location}
                </Text>
              )}

              {event.attendees.length > 0 && (
                <View style={styles.attendeesContainer}>
                  <View style={styles.avatarsContainer}>
                    {event.attendees.slice(0, 3).map((attendee, index) => (
                      <AvatarCircle
                        key={attendee.id}
                        user={attendee}
                        size={24}
                        style={[
                          styles.avatar,
                          { marginLeft: index > 0 ? -8 : 0 }
                        ]}
                      />
                    ))}
                    {event.attendees.length > 3 && (
                      <View style={[styles.moreAvatar, { marginLeft: -8 }]}>
                        <Text style={styles.moreAvatarText}>
                          +{event.attendees.length - 3}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 60,
    paddingVertical: Theme.spacingS,
  },
  timeColumn: {
    width: 80,
    alignItems: 'flex-end',
    paddingRight: Theme.spacingM,
    paddingTop: Theme.spacingXS,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.textSecondary,
  },
  eventsColumn: {
    flex: 1,
  },
  emptySlot: {
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: Theme.backgroundTertiary,
  },
  eventCard: {
    borderRadius: Theme.cornerRadiusM,
    padding: Theme.spacingM,
    marginBottom: Theme.spacingS,
    borderLeftWidth: 4,
    borderLeftColor: Theme.primaryColor,
  },
  eventHeader: {
    marginBottom: Theme.spacingXS,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.textPrimary,
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.textSecondary,
  },
  eventLocation: {
    fontSize: 13,
    color: Theme.textSecondary,
    marginBottom: Theme.spacingXS,
  },
  attendeesContainer: {
    marginTop: Theme.spacingXS,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Theme.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  moreAvatarText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
});

export default AgendaRow;
