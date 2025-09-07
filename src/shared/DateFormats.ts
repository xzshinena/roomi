// Date formatting utilities for React Native
export class DateFormats {
  // Format time as "2:30 PM"
  static formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  // Format day header as "Tue, Jan 15" or "Today"
  static formatDayHeader(date: Date): string {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return 'Today';
    }
    
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }

  // Format short weekday as "M", "T", "W", etc.
  static formatShortWeekday(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
    }).charAt(0);
  }

  // Format month and year as "January"
  static formatMonthYear(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'long',
    });
  }

  // Format time range as "2:30 PM – 4:00 PM"
  static formatTimeRange(start: Date, end: Date): string {
    const startTime = DateFormats.formatTime(start);
    const endTime = DateFormats.formatTime(end);
    return `${startTime} – ${endTime}`;
  }

  // Get day number (1-31)
  static getDayNumber(date: Date): number {
    return date.getDate();
  }

  // Get short weekday symbol
  static getShortWeekdaySymbol(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
    });
  }

  // Check if date is today
  static isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  // Get week dates starting from Monday
  static getWeekDates(date: Date): Date[] {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    startOfWeek.setDate(diff);
    
    const weekDates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startOfWeek);
      weekDate.setDate(startOfWeek.getDate() + i);
      weekDates.push(weekDate);
    }
    
    return weekDates;
  }
}
