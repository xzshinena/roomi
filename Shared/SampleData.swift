import SwiftUI

struct SampleData {
    static let users: [User] = [
        User(name: "Alice Johnson", avatarEmoji: "👤"),
        User(name: "Bob Smith", avatarEmoji: "👨"),
        User(name: "Carol Davis", avatarEmoji: "👩"),
        User(name: "David Wilson", avatarEmoji: "🧑"),
        User(name: "Emma Brown", avatarEmoji: "👩‍💼")
    ]
    
    static func makeSampleEvents() -> [Event] {
        let calendar = Calendar.current
        let today = Date()
        
        // Create events for the current week
        var events: [Event] = []
        
        // Monday events
        if let monday = calendar.date(byAdding: .day, value: -calendar.component(.weekday, from: today) + 2, to: today) {
            events.append(Event(
                title: "Marketing team meeting",
                start: calendar.date(bySettingHour: 8, minute: 0, second: 0, of: monday) ?? monday,
                end: calendar.date(bySettingHour: 8, minute: 40, second: 0, of: monday) ?? monday,
                location: "Conference Room A",
                attendees: [users[0], users[1]],
                color: Theme.eventColors[0]
            ))
            
            events.append(Event(
                title: "Make plans to create new products",
                start: calendar.date(bySettingHour: 8, minute: 50, second: 0, of: monday) ?? monday,
                end: calendar.date(bySettingHour: 9, minute: 40, second: 0, of: monday) ?? monday,
                attendees: [users[2], users[3]],
                color: Theme.eventColors[1]
            ))
        }
        
        // Tuesday events (today)
        events.append(Event(
            title: "Coffee breaks and snacks",
            start: calendar.date(bySettingHour: 10, minute: 0, second: 0, of: today) ?? today,
            end: calendar.date(bySettingHour: 10, minute: 35, second: 0, of: today) ?? today,
            attendees: [users[0], users[4]],
            color: Theme.eventColors[2]
        ))
        
        events.append(Event(
            title: "Company policy meeting with management team",
            start: calendar.date(bySettingHour: 10, minute: 40, second: 0, of: today) ?? today,
            end: calendar.date(bySettingHour: 12, minute: 15, second: 0, of: today) ?? today,
            location: "Main Conference Room",
            attendees: [users[1], users[2], users[3]],
            color: Theme.eventColors[3]
        ))
        
        events.append(Event(
            title: "Have lunch",
            start: calendar.date(bySettingHour: 12, minute: 20, second: 0, of: today) ?? today,
            end: calendar.date(bySettingHour: 13, minute: 30, second: 0, of: today) ?? today,
            location: "Cafeteria",
            attendees: [users[0], users[4]],
            color: Theme.eventColors[4]
        ))
        
        // Wednesday events
        if let wednesday = calendar.date(byAdding: .day, value: 1, to: today) {
            events.append(Event(
                title: "Plan meeting",
                start: calendar.date(bySettingHour: 8, minute: 0, second: 0, of: wednesday) ?? wednesday,
                end: calendar.date(bySettingHour: 11, minute: 50, second: 0, of: wednesday) ?? wednesday,
                attendees: [users[1], users[2]],
                color: Theme.eventColors[5]
            ))
            
            events.append(Event(
                title: "Check project status",
                start: calendar.date(bySettingHour: 13, minute: 30, second: 0, of: wednesday) ?? wednesday,
                end: calendar.date(bySettingHour: 16, minute: 30, second: 0, of: wednesday) ?? wednesday,
                attendees: [users[3], users[4]],
                color: Theme.eventColors[6]
            ))
        }
        
        // Thursday events
        if let thursday = calendar.date(byAdding: .day, value: 2, to: today) {
            events.append(Event(
                title: "Team standup",
                start: calendar.date(bySettingHour: 9, minute: 0, second: 0, of: thursday) ?? thursday,
                end: calendar.date(bySettingHour: 9, minute: 30, second: 0, of: thursday) ?? thursday,
                attendees: users,
                color: Theme.eventColors[0]
            ))
        }
        
        return events
    }
}
