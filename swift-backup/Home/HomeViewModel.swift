import SwiftUI
import Combine

@MainActor
class HomeViewModel: ObservableObject {
    @Published var selectedDate: Date = Date()
    @Published var weekDates: [Date] = []
    @Published var eventsThisDay: [Event] = []
    @Published var showCreateDialog: Bool = false
    
    private let sampleEvents: [Event]
    
    init() {
        self.sampleEvents = SampleData.makeSampleEvents()
        updateWeekDates()
        updateEventsForSelectedDay()
    }
    
    func updateWeekDates() {
        let calendar = Calendar.current
        let startOfWeek = calendar.dateInterval(of: .weekOfYear, for: selectedDate)?.start ?? selectedDate
        
        weekDates = (0..<7).compactMap { dayOffset in
            calendar.date(byAdding: .day, value: dayOffset, to: startOfWeek)
        }
    }
    
    func updateEventsForSelectedDay() {
        let calendar = Calendar.current
        eventsThisDay = sampleEvents.filter { event in
            calendar.isDate(event.start, inSameDayAs: selectedDate)
        }.sorted { $0.start < $1.start }
    }
    
    func selectDate(_ date: Date) {
        selectedDate = date
        updateEventsForSelectedDay()
    }
    
    func previousWeek() {
        selectedDate = Calendar.current.date(byAdding: .weekOfYear, value: -1, to: selectedDate) ?? selectedDate
        updateWeekDates()
        updateEventsForSelectedDay()
    }
    
    func nextWeek() {
        selectedDate = Calendar.current.date(byAdding: .weekOfYear, value: 1, to: selectedDate) ?? selectedDate
        updateWeekDates()
        updateEventsForSelectedDay()
    }
    
    func showCreateEventDialog() {
        showCreateDialog = true
    }
}
