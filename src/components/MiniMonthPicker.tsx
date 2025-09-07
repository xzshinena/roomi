import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../theme/Theme';
import { DateFormats } from '../shared/DateFormats';

interface MiniMonthPickerProps {
  selectedDate: Date;
  onDateSelected: (date: Date) => void;
}

const MiniMonthPicker: React.FC<MiniMonthPickerProps> = ({
  selectedDate,
  onDateSelected,
}) => {
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days = getDaysInMonth(selectedDate);

  const selectMonth = (monthIndex: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(monthIndex);
    onDateSelected(newDate);
    setShowMonthPicker(false);
  };

  const previousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() - 1);
    onDateSelected(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + 1);
    onDateSelected(newDate);
  };

  const renderDay = (day: Date | null, index: number) => {
    if (!day) {
      return <View key={index} style={styles.emptyDay} />;
    }

    const isSelected = day.toDateString() === selectedDate.toDateString();
    const isToday = DateFormats.isToday(day);

    return (
      <TouchableOpacity
        key={index}
        onPress={() => onDateSelected(day)}
        style={[
          styles.dayCell,
          isSelected && styles.selectedDay,
          isToday && !isSelected && styles.todayDay,
        ]}
      >
        <Text
          style={[
            styles.dayText,
            isSelected && styles.selectedDayText,
            isToday && !isSelected && styles.todayDayText,
          ]}
        >
          {day.getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={previousMonth} style={styles.navButton}>
          <Ionicons name="chevron-back" size={20} color={Theme.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowMonthPicker(true)} style={styles.monthButton}>
          <Text style={styles.monthText}>
            {DateFormats.formatMonthYear(selectedDate)} {selectedDate.getFullYear()}
          </Text>
          <Ionicons name="chevron-down" size={16} color={Theme.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
          <Ionicons name="chevron-forward" size={20} color={Theme.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekHeader}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Text key={index} style={styles.weekHeaderText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.calendar}>
        {Array.from({ length: Math.ceil(days.length / 7) }, (_, weekIndex) => (
          <View key={weekIndex} style={styles.week}>
            {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) =>
              renderDay(day, weekIndex * 7 + dayIndex)
            )}
          </View>
        ))}
      </View>

      <Modal visible={showMonthPicker} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowMonthPicker(false)}
        >
          <View style={styles.monthPickerContainer}>
            <FlatList
              data={months}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.monthOption,
                    index === selectedDate.getMonth() && styles.selectedMonthOption,
                  ]}
                  onPress={() => selectMonth(index)}
                >
                  <Text
                    style={[
                      styles.monthOptionText,
                      index === selectedDate.getMonth() && styles.selectedMonthOptionText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.backgroundPrimary,
    padding: Theme.spacingL,
    margin: Theme.spacingL,
    borderRadius: Theme.cornerRadiusL,
    ...Theme.shadowSmall,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacingL,
  },
  navButton: {
    padding: Theme.spacingS,
  },
  monthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacingM,
    paddingVertical: Theme.spacingS,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: Theme.textPrimary,
    marginRight: Theme.spacingS,
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: Theme.spacingM,
  },
  weekHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: Theme.textSecondary,
  },
  calendar: {
    gap: Theme.spacingXS,
  },
  week: {
    flexDirection: 'row',
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.cornerRadiusS,
  },
  selectedDay: {
    backgroundColor: Theme.primaryColor,
  },
  todayDay: {
    backgroundColor: Theme.accentColor,
  },
  emptyDay: {
    flex: 1,
    aspectRatio: 1,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: Theme.textPrimary,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: '600',
  },
  todayDayText: {
    color: 'white',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthPickerContainer: {
    backgroundColor: Theme.backgroundPrimary,
    borderRadius: Theme.cornerRadiusL,
    width: 200,
    maxHeight: 300,
    ...Theme.shadowLarge,
  },
  monthOption: {
    paddingHorizontal: Theme.spacingL,
    paddingVertical: Theme.spacingM,
  },
  selectedMonthOption: {
    backgroundColor: Theme.primaryColor,
  },
  monthOptionText: {
    fontSize: 16,
    color: Theme.textPrimary,
    textAlign: 'center',
  },
  selectedMonthOptionText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default MiniMonthPicker;
