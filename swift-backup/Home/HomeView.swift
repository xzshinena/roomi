import SwiftUI

struct HomeView: View {
    @StateObject private var viewModel = HomeViewModel()
    
    private let hours = Array(8...22)
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(.systemGroupedBackground)
                    .ignoresSafeArea()
                
                VStack(spacing: 0) {
                    // Header
                    HStack {
                        Button(action: {}) {
                            Image(systemName: "arrow.left")
                                .font(.system(size: 18, weight: .medium))
                                .foregroundColor(.primary)
                        }
                        .accessibilityLabel("Back")
                        
                        Spacer()
                        
                        Text(DateFormats.monthYear(date: viewModel.selectedDate))
                            .font(.headline)
                            .fontWeight(.semibold)
                        
                        Spacer()
                        
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
                    .padding(.horizontal, Theme.spacingL)
                    .padding(.vertical, Theme.spacingM)
                    
                    // Day selector strip
                    DayStrip(
                        weekDates: viewModel.weekDates,
                        selectedDate: viewModel.selectedDate,
                        onDateSelected: viewModel.selectDate,
                        onPreviousWeek: viewModel.previousWeek,
                        onNextWeek: viewModel.nextWeek
                    )
                    
                    // Day header
                    HStack {
                        Text(DateFormats.dayHeader(date: viewModel.selectedDate))
                            .font(.title2)
                            .fontWeight(.bold)
                        
                        Spacer()
                    }
                    .padding(.horizontal, Theme.spacingL)
                    .padding(.bottom, Theme.spacingM)
                    
                    // Timeline
                    ScrollView {
                        LazyVStack(spacing: 0) {
                            ForEach(hours, id: \.self) { hour in
                                let eventsForHour = viewModel.eventsThisDay.filter { event in
                                    Calendar.current.component(.hour, from: event.start) == hour
                                }
                                
                                AgendaRow(hour: hour, events: eventsForHour)
                            }
                        }
                        .padding(.horizontal, Theme.spacingL)
                    }
                }
                
                // Floating Action Button
                VStack {
                    Spacer()
                    
                    HStack {
                        Spacer()
                        FAB(action: viewModel.showCreateEventDialog)
                        Spacer()
                    }
                    .padding(.bottom, 100) // Position above tab bar
                }
            }
        }
        .confirmationDialog("New Event", isPresented: $viewModel.showCreateDialog) {
            Button("Create Event") {
                // Handle create event
            }
            Button("Cancel", role: .cancel) {}
        } message: {
            Text("What would you like to create?")
        }
    }
}

#Preview {
    HomeView()
}

#Preview("Dark Mode") {
    HomeView()
        .preferredColorScheme(.dark)
}

#Preview("iPhone SE") {
    HomeView()
        .previewDevice("iPhone SE (3rd generation)")
}

#Preview("Large Text") {
    HomeView()
        .environment(\.sizeCategory, .accessibilityExtraExtraExtraLarge)
}
