import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Theme } from '../../theme/Theme';
import { SampleData } from '../../shared/SampleData';
import { Event } from '../../models/Event';
import MiniMonthPicker from '../../components/MiniMonthPicker';
import AppointmentCard from '../../components/AppointmentCard';
import SectionHeader from '../../components/SectionHeader';

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(SampleData.makeSampleEvents());
  }, []);

  const eventsThisDay = events.filter(event => 
    event.start.toDateString() === selectedDate.toDateString()
  );

  // Get featured events (upcoming events)
  const today = new Date();
  const featuredEvents = events.filter(event => 
    event.start >= today
  ).slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MiniMonthPicker
          selectedDate={selectedDate}
          onDateSelected={setSelectedDate}
        />

        {featuredEvents.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Featured Appointments" />
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredContainer}
            >
              {featuredEvents.map((event) => (
                <AppointmentCard
                  key={event.id}
                  event={event}
                  style={styles.featuredCard}
                />
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.section}>
          <SectionHeader 
            title={`Events for ${selectedDate.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric'
            })}`} 
          />
          
          {eventsThisDay.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No events for this day</Text>
            </View>
          ) : (
            <View style={styles.eventsContainer}>
              {eventsThisDay.map((event) => (
                <AppointmentCard
                  key={event.id}
                  event={event}
                  style={styles.dayEventCard}
                  showProgress
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundSecondary,
  },
  section: {
    marginVertical: Theme.spacingM,
  },
  featuredContainer: {
    paddingLeft: Theme.spacingL,
    paddingRight: Theme.spacingS,
  },
  featuredCard: {
    width: 280,
    marginRight: Theme.spacingM,
  },
  eventsContainer: {
    paddingHorizontal: Theme.spacingL,
  },
  dayEventCard: {
    marginBottom: Theme.spacingM,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Theme.spacingXXL,
  },
  emptyStateText: {
    fontSize: 16,
    color: Theme.textSecondary,
    fontWeight: '500',
  },
});

export default CalendarScreen;
