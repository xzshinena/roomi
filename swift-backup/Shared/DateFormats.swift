import Foundation

struct DateFormats {
    static let timeFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "h:mm a"
        return formatter
    }()
    
    static let dayHeaderFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "E, MMM d"
        return formatter
    }()
    
    static let shortWeekdayFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "E"
        return formatter
    }()
    
    static let monthYearFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "MMMM"
        return formatter
    }()
    
    static func timeRange(start: Date, end: Date) -> String {
        let startTime = timeFormatter.string(from: start)
        let endTime = timeFormatter.string(from: end)
        return "\(startTime) – \(endTime)"
    }
    
    static func dayHeader(date: Date) -> String {
        if Calendar.current.isDateInToday(date) {
            return "Today"
        } else {
            return dayHeaderFormatter.string(from: date)
        }
    }
    
    static func weekdayNumber(date: Date) -> Int {
        Calendar.current.component(.day, from: date)
    }
    
    static func shortWeekdaySymbol(date: Date) -> String {
        shortWeekdayFormatter.string(from: date)
    }
    
    static func monthYear(date: Date) -> String {
        monthYearFormatter.string(from: date)
    }
}
