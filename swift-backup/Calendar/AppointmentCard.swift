import SwiftUI

struct AppointmentCard: View {
    let event: Event
    let progress: Double
    let timeLeft: String
    
    init(event: Event, progress: Double = 0.8, timeLeft: String = "2 days left") {
        self.event = event
        self.progress = progress
        self.timeLeft = timeLeft
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: Theme.spacingM) {
            HStack {
                Image(systemName: iconForEvent(event))
                    .font(.system(size: 20, weight: .medium))
                    .foregroundColor(.white)
                    .frame(width: 32, height: 32)
                    .background(
                        Circle()
                            .fill(event.color.opacity(0.8))
                    )
                
                Spacer()
            }
            
            VStack(alignment: .leading, spacing: Theme.spacingXS) {
                Text(event.title)
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundColor(.primary)
                    .lineLimit(2)
                
                Text(DateFormats.timeRange(start: event.start, end: event.end))
                    .font(.caption)
                    .foregroundColor(.secondary)
                
                HStack {
                    Text(timeLeft)
                        .font(.caption)
                        .fontWeight(.medium)
                        .foregroundColor(.white)
                        .padding(.horizontal, Theme.spacingS)
                        .padding(.vertical, 4)
                        .background(
                            Capsule()
                                .fill(event.color.opacity(0.8))
                        )
                    
                    Spacer()
                }
            }
        }
        .padding(Theme.spacingL)
        .frame(width: 200)
        .background(
            RoundedRectangle(cornerRadius: Theme.cornerRadiusL)
                .fill(event.color.opacity(0.1))
                .overlay(
                    RoundedRectangle(cornerRadius: Theme.cornerRadiusL)
                        .stroke(event.color.opacity(0.3), lineWidth: 1)
                )
        )
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\(event.title), \(DateFormats.timeRange(start: event.start, end: event.end)), \(timeLeft)")
    }
    
    private func iconForEvent(_ event: Event) -> String {
        let title = event.title.lowercased()
        if title.contains("meeting") {
            return "person.2"
        } else if title.contains("lunch") || title.contains("coffee") {
            return "cup.and.saucer"
        } else if title.contains("plan") {
            return "lightbulb"
        } else if title.contains("check") {
            return "checkmark.circle"
        } else {
            return "calendar"
        }
    }
}

#Preview {
    ScrollView(.horizontal, showsIndicators: false) {
        HStack(spacing: Theme.spacingM) {
            AppointmentCard(
                event: Event(
                    title: "Plan meeting",
                    start: Date(),
                    end: Calendar.current.date(byAdding: .hour, value: 3, to: Date()) ?? Date(),
                    attendees: [SampleData.users[0], SampleData.users[1]],
                    color: Theme.eventColors[5]
                ),
                progress: 0.8,
                timeLeft: "2 days left"
            )
            
            AppointmentCard(
                event: Event(
                    title: "Have lunch",
                    start: Date(),
                    end: Calendar.current.date(byAdding: .hour, value: 1, to: Date()) ?? Date(),
                    attendees: [SampleData.users[2]],
                    color: Theme.eventColors[4]
                ),
                progress: 0.6,
                timeLeft: "1 week left"
            )
            
            AppointmentCard(
                event: Event(
                    title: "Check project status",
                    start: Date(),
                    end: Calendar.current.date(byAdding: .hour, value: 3, to: Date()) ?? Date(),
                    attendees: [SampleData.users[3]],
                    color: Theme.eventColors[6]
                ),
                progress: 0.3,
                timeLeft: "3 weeks left"
            )
        }
        .padding(.horizontal, Theme.spacingL)
    }
}
