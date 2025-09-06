import SwiftUI
import Combine

@MainActor
class CalendarViewModel: ObservableObject {
    @Published var selectedDate: Date = Date()
    @Published var month: DateComponents
    @Published var eventsOnSelectedDay: [Event] = []
    @Published var featured: [Event] = []
    
    private let sampleEvents: [Event]
    
    init() {
        self.sampleEvents = SampleData.makeSampleEvents()
        self.month = Calendar.current.dateComponents([.year, .month], from: Date())
        updateEventsForSelectedDay()
    }
    
    func updateEventsForSelectedDay() {
        let calendar = Calendar.current
        eventsOnSelectedDay = sampleEvents.filter { event in
            calendar.isDate(event.start, inSameDayAs: selectedDate)
        }.sorted { $0.start < $1.start }
        
        // Featured events are the first 3 events of the day
        featured = Array(eventsOnSelectedDay.prefix(3))
    }
    
    func selectDate(_ date: Date) {
        selectedDate = date
        updateEventsForSelectedDay()
    }
    
    func updateMonth(_ date: Date) {
        month = Calendar.current.dateComponents([.year, .month], from: date)
    }
    
    func getWeekDates(for date: Date) -> [Date] {
        let calendar = Calendar.current
        let startOfWeek = calendar.dateInterval(of: .weekOfYear, for: date)?.start ?? date
        
        return (0..<7).compactMap { dayOffset in
            calendar.date(byAdding: .day, value: dayOffset, to: startOfWeek)
        }
    }
}
