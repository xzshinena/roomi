import SwiftUI

struct Event: Identifiable, Hashable {
    let id: UUID
    let title: String
    let start: Date
    let end: Date
    let location: String?
    let attendees: [User]
    let color: Color
    
    init(title: String, start: Date, end: Date, location: String? = nil, attendees: [User] = [], color: Color) {
        self.id = UUID()
        self.title = title
        self.start = start
        self.end = end
        self.location = location
        self.attendees = attendees
        self.color = color
    }
}
