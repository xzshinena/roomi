import SwiftUI

struct CalendarView: View {
    @StateObject private var viewModel = CalendarViewModel()
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: Theme.spacingXL) {
                    // Mini Month Picker
                    MiniMonthPicker(
                        selectedDate: viewModel.selectedDate,
                        month: viewModel.month,
                        onDateSelected: viewModel.selectDate,
                        onMonthChanged: viewModel.updateMonth
                    )
                    .padding(.horizontal, Theme.spacingL)
                    
                    // Appointment Section
                    VStack(spacing: Theme.spacingL) {
                        SectionHeader(
                            title: "Appointment",
                            action: {},
                            actionIcon: "gearshape"
                        )
                        
                        // Featured appointment cards
                        if !viewModel.featured.isEmpty {
                            ScrollView(.horizontal, showsIndicators: false) {
                                HStack(spacing: Theme.spacingM) {
                                    ForEach(Array(viewModel.featured.enumerated()), id: \.element.id) { index, event in
                                        AppointmentCard(
                                            event: event,
                                            progress: [0.8, 0.6, 0.3][index % 3],
                                            timeLeft: ["2 days left", "1 week left", "3 weeks left"][index % 3]
                                        )
                                    }
                                }
                                .padding(.horizontal, Theme.spacingL)
                            }
                        }
                        
                        // Daily events list
                        if !viewModel.eventsOnSelectedDay.isEmpty {
                            VStack(spacing: Theme.spacingS) {
                                ForEach(viewModel.eventsOnSelectedDay) { event in
                                    EventRow(event: event)
                                }
                            }
                            .padding(.horizontal, Theme.spacingL)
                        } else {
                            VStack(spacing: Theme.spacingM) {
                                Image(systemName: "calendar.badge.plus")
                                    .font(.system(size: 48))
                                    .foregroundColor(.secondary)
                                
                                Text("No events today")
                                    .font(.headline)
                                    .foregroundColor(.secondary)
                                
                                Text("Tap the + button to add an event")
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                            }
                            .padding(.vertical, Theme.spacingXXL)
                        }
                    }
                }
                .padding(.bottom, Theme.spacingXXL)
            }
            .background(Color(.systemGroupedBackground))
        }
        .navigationTitle("Calendar")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                Button(action: {}) {
                    Image(systemName: "arrow.left")
                        .font(.system(size: 18, weight: .medium))
                        .foregroundColor(.primary)
                }
                .accessibilityLabel("Back")
            }
            
            ToolbarItem(placement: .navigationBarTrailing) {
                HStack(spacing: Theme.spacingL) {
                    Button(action: {}) {
                        Image(systemName: "magnifyingglass")
                            .font(.system(size: 18, weight: .medium))
                            .foregroundColor(.primary)
                    }
                    .accessibilityLabel("Search")
                    
                    Button(action: {}) {
                        Image(systemName: "line.3.horizontal.decrease")
                            .font(.system(size: 18, weight: .medium))
                            .foregroundColor(.primary)
                    }
                    .accessibilityLabel("Filter")
                }
            }
        }
    }
}

struct EventRow: View {
    let event: Event
    
    var body: some View {
        HStack(spacing: Theme.spacingM) {
            // Leading icon
            Circle()
                .fill(event.color.opacity(0.8))
                .frame(width: 12, height: 12)
                .overlay(
                    Image(systemName: iconForEvent(event))
                        .font(.system(size: 8, weight: .medium))
                        .foregroundColor(.white)
                )
            
            VStack(alignment: .leading, spacing: 2) {
                Text(event.title)
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(.primary)
                    .lineLimit(1)
                
                Text("Time \(DateFormats.timeRange(start: event.start, end: event.end))")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
            
            Menu {
                Button("Edit") {}
                Button("Delete", role: .destructive) {}
                Button("Share") {}
            } label: {
                Image(systemName: "ellipsis")
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(.secondary)
                    .frame(width: 44, height: 44)
            }
            .accessibilityLabel("\(event.title) options")
        }
        .padding(.vertical, Theme.spacingM)
        .padding(.horizontal, Theme.spacingL)
        .background(
            RoundedRectangle(cornerRadius: Theme.cornerRadiusM)
                .fill(Color(.systemBackground))
        )
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
    CalendarView()
}

#Preview("Dark Mode") {
    CalendarView()
        .preferredColorScheme(.dark)
}

#Preview("iPhone SE") {
    CalendarView()
        .previewDevice("iPhone SE (3rd generation)")
}

#Preview("Large Text") {
    CalendarView()
        .environment(\.sizeCategory, .accessibilityExtraExtraExtraLarge)
}
