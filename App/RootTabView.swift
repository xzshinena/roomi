import SwiftUI

struct RootTabView: View {
    @State private var selectedTab = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView()
                .tabItem {
                    Image(systemName: "house")
                    Text("Home")
                }
                .tag(0)
            
            CalendarView()
                .tabItem {
                    Image(systemName: "calendar")
                    Text("Calendar")
                }
                .tag(1)
            
            MapPlaceholderView()
                .tabItem {
                    Image(systemName: "map")
                    Text("Map")
                }
                .tag(2)
            
            RemindersPlaceholderView()
                .tabItem {
                    Image(systemName: "checklist")
                    Text("Reminders")
                }
                .tag(3)
        }
        .accentColor(Theme.primaryColor)
    }
}

struct MapPlaceholderView: View {
    var body: some View {
        VStack {
            Spacer()
            Text("Map coming soon")
                .font(.title2)
                .foregroundColor(.secondary)
            Spacer()
        }
        .navigationTitle("Map")
    }
}

struct RemindersPlaceholderView: View {
    var body: some View {
        VStack {
            Spacer()
            Text("Reminders coming soon")
                .font(.title2)
                .foregroundColor(.secondary)
            Spacer()
        }
        .navigationTitle("Reminders")
    }
}

#Preview {
    RootTabView()
}
