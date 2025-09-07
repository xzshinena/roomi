import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../../theme/Theme';
import { DateFormats } from '../../shared/DateFormats';
import { SampleData } from '../../shared/SampleData';
import { Event } from '../../models/Event';
import DayStrip from '../../components/DayStrip';
import AgendaRow from '../../components/AgendaRow';
import FAB from '../../components/FAB';

const HomeScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const hours = Array.from({ length: 15 }, (_, i) => i + 8); // 8 AM to 10 PM

  useEffect(() => {
    setWeekDates(DateFormats.getWeekDates(selectedDate));
    setEvents(SampleData.makeSampleEvents());
  }, [selectedDate]);

  const eventsThisDay = events.filter(event => 
    event.start.toDateString() === selectedDate.toDateString()
  );

  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const previousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const showCreateEventDialog = () => {
    Alert.alert(
      'New Event',
      'What would you like to create?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Create Event', onPress: () => console.log('Create Event') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="arrow-back" size={18} color={Theme.textPrimary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>
          {DateFormats.formatMonthYear(selectedDate)}
        </Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.headerButton, { marginRight: Theme.spacingL }]}>
            <Ionicons name="search" size={18} color={Theme.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="filter" size={18} color={Theme.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <DayStrip
        weekDates={weekDates}
        selectedDate={selectedDate}
        onDateSelected={selectDate}
        onPreviousWeek={previousWeek}
        onNextWeek={nextWeek}
      />

      <View style={styles.dayHeaderContainer}>
        <Text style={styles.dayHeader}>
          {DateFormats.formatDayHeader(selectedDate)}
        </Text>
      </View>

      <ScrollView style={styles.timeline} showsVerticalScrollIndicator={false}>
        {hours.map(hour => {
          const eventsForHour = eventsThisDay.filter(event =>
            event.start.getHours() === hour
          );

          return (
            <AgendaRow
              key={hour}
              hour={hour}
              events={eventsForHour}
            />
          );
        })}
      </ScrollView>

      <FAB onPress={showCreateEventDialog} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacingL,
    paddingVertical: Theme.spacingM,
    backgroundColor: Theme.backgroundPrimary,
  },
  headerButton: {
    padding: Theme.spacingS,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: Theme.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayHeaderContainer: {
    paddingHorizontal: Theme.spacingL,
    paddingBottom: Theme.spacingM,
    backgroundColor: Theme.backgroundPrimary,
  },
  dayHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.textPrimary,
  },
  timeline: {
    flex: 1,
    paddingHorizontal: Theme.spacingL,
  },
});

export default HomeScreen;
