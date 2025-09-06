import SwiftUI

struct AgendaRow: View {
    let hour: Int
    let events: [Event]
    
    private var hourString: String {
        String(format: "%02d:00", hour)
    }
    
    var body: some View {
        HStack(alignment: .top, spacing: Theme.spacingM) {
            // Hour tick
            VStack {
                Text(hourString)
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(.secondary)
                    .frame(width: 50, alignment: .trailing)
                
                if hour < 22 {
                    Rectangle()
                        .fill(Color.gray.opacity(0.2))
                        .frame(width: 1, height: 60)
                }
            }
            
            // Events for this hour
            VStack(spacing: Theme.spacingS) {
                ForEach(events) { event in
                    EventBlock(event: event)
                }
                
                if events.isEmpty {
                    Spacer()
                        .frame(height: 60)
                }
            }
        }
    }
}

struct EventBlock: View {
    let event: Event
    
    var body: some View {
        VStack(alignment: .leading, spacing: Theme.spacingXS) {
            HStack {
                Text(event.title)
                    .font(.system(size: 14, weight: .medium))
                    .foregroundColor(.primary)
                    .lineLimit(2)
                
                Spacer()
            }
            
            Text(DateFormats.timeRange(start: event.start, end: event.end))
                .font(.caption)
                .foregroundColor(.secondary)
            
            if !event.attendees.isEmpty {
                HStack {
                    AvatarStack(users: event.attendees, maxVisible: 3, size: 16)
                    Spacer()
                }
            }
        }
        .padding(Theme.spacingM)
        .background(
            RoundedRectangle(cornerRadius: Theme.cornerRadiusM)
                .fill(event.color)
                .overlay(
                    RoundedRectangle(cornerRadius: Theme.cornerRadiusM)
                        .stroke(event.color.opacity(0.3), lineWidth: 1)
                )
        )
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\(event.title), \(DateFormats.timeRange(start: event.start, end: event.end)), \(event.attendees.map(\.name).joined(separator: ", "))")
    }
}

#Preview {
    VStack(spacing: 0) {
        AgendaRow(
            hour: 8,
            events: [
                Event(
                    title: "Marketing team meeting",
                    start: Date(),
                    end: Calendar.current.date(byAdding: .minute, value: 40, to: Date()) ?? Date(),
                    attendees: [SampleData.users[0], SampleData.users[1]],
                    color: Theme.eventColors[0]
                )
            ]
        )
        
        AgendaRow(
            hour: 9,
            events: []
        )
    }
    .padding()
}
