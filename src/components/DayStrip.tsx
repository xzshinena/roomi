import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../theme/Theme';
import { DateFormats } from '../shared/DateFormats';

interface DayStripProps {
  weekDates: Date[];
  selectedDate: Date;
  onDateSelected: (date: Date) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

const DayStrip: React.FC<DayStripProps> = ({
  weekDates,
  selectedDate,
  onDateSelected,
  onPreviousWeek,
  onNextWeek,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPreviousWeek} style={styles.weekButton}>
        <Ionicons name="chevron-back" size={20} color={Theme.textSecondary} />
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daysContainer}
        contentContainerStyle={styles.daysContent}
      >
        {weekDates.map((date, index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const isToday = DateFormats.isToday(date);

          return (
            <TouchableOpacity
              key={index}
              onPress={() => onDateSelected(date)}
              style={[
                styles.dayPill,
                isSelected && styles.selectedDayPill,
                isToday && !isSelected && styles.todayDayPill,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  isSelected && styles.selectedDayText,
                  isToday && !isSelected && styles.todayDayText,
                ]}
              >
                {DateFormats.getShortWeekdaySymbol(date)}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  isSelected && styles.selectedDateText,
                  isToday && !isSelected && styles.todayDateText,
                ]}
              >
                {DateFormats.getDayNumber(date)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity onPress={onNextWeek} style={styles.weekButton}>
        <Ionicons name="chevron-forward" size={20} color={Theme.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.backgroundPrimary,
    paddingVertical: Theme.spacingM,
  },
  weekButton: {
    paddingHorizontal: Theme.spacingM,
    paddingVertical: Theme.spacingS,
  },
  daysContainer: {
    flex: 1,
  },
  daysContent: {
    paddingHorizontal: Theme.spacingS,
  },
  dayPill: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacingM,
    paddingHorizontal: Theme.spacingL,
    marginHorizontal: Theme.spacingXS,
    borderRadius: Theme.cornerRadiusL,
    backgroundColor: Theme.backgroundTertiary,
    minWidth: 50,
  },
  selectedDayPill: {
    backgroundColor: Theme.primaryColor,
  },
  todayDayPill: {
    backgroundColor: Theme.accentColor,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.textSecondary,
    marginBottom: 2,
  },
  selectedDayText: {
    color: 'white',
  },
  todayDayText: {
    color: 'white',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.textPrimary,
  },
  selectedDateText: {
    color: 'white',
  },
  todayDateText: {
    color: 'white',
  },
});

export default DayStrip;
