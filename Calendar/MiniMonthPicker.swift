import SwiftUI

struct MiniMonthPicker: View {
    let selectedDate: Date
    let month: DateComponents
    let onDateSelected: (Date) -> Void
    let onMonthChanged: (Date) -> Void
    
    private var weekDates: [Date] {
        Calendar.current.dateInterval(of: .weekOfYear, for: selectedDate)?.start.flatMap { startOfWeek in
            (0..<7).compactMap { dayOffset in
                Calendar.current.date(byAdding: .day, value: dayOffset, to: startOfWeek)
            }
        } ?? []
    }
    
    private var monthYearString: String {
        guard let monthDate = Calendar.current.date(from: month) else { return "" }
        return DateFormats.monthYear(date: monthDate)
    }
    
    var body: some View {
        VStack(spacing: Theme.spacingM) {
            HStack {
                Text("Start date and time")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                
                Spacer()
                
                Menu {
                    ForEach(0..<12) { monthOffset in
                        Button(action: {
                            if let newMonth = Calendar.current.date(byAdding: .month, value: monthOffset, to: Date()) {
                                onMonthChanged(newMonth)
                            }
                        }) {
                            Text(DateFormats.monthYear(date: Calendar.current.date(byAdding: .month, value: monthOffset, to: Date()) ?? Date()))
                        }
                    }
                } label: {
                    HStack(spacing: 4) {
                        Text(monthYearString)
                            .font(.subheadline)
                            .fontWeight(.medium)
                        
                        Image(systemName: "chevron.down")
                            .font(.caption)
                    }
                    .foregroundColor(.primary)
                }
            }
            
            // Weekday headers
            HStack {
                ForEach(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], id: \.self) { weekday in
                    Text(weekday)
                        .font(.caption)
                        .fontWeight(.medium)
                        .foregroundColor(.secondary)
                        .frame(maxWidth: .infinity)
                }
            }
            
            // Week dates
            HStack(spacing: 0) {
                ForEach(weekDates, id: \.self) { date in
                    DayCircle(
                        date: date,
                        isSelected: Calendar.current.isDate(date, inSameDayAs: selectedDate),
                        onTap: { onDateSelected(date) }
                    )
                }
            }
        }
        .padding(Theme.spacingL)
        .background(
            RoundedRectangle(cornerRadius: Theme.cornerRadiusL)
                .fill(Color(.systemBackground))
                .themeShadow(Theme.shadowSmall)
        )
    }
}

struct DayCircle: View {
    let date: Date
    let isSelected: Bool
    let onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            Text("\(DateFormats.weekdayNumber(date: date))")
                .font(.system(size: 16, weight: .medium))
                .foregroundColor(isSelected ? .white : .primary)
                .frame(width: 32, height: 32)
                .background(
                    Circle()
                        .fill(isSelected ? Theme.secondaryColor : Color.clear)
                        .overlay(
                            Circle()
                                .stroke(isSelected ? Color.clear : Color.gray.opacity(0.3), lineWidth: 1)
                        )
                )
        }
        .frame(maxWidth: .infinity)
        .accessibilityLabel("\(DateFormats.shortWeekdaySymbol(date: date)), \(DateFormats.weekdayNumber(date: date))")
        .accessibilityAddTraits(isSelected ? .isSelected : [])
    }
}

#Preview {
    MiniMonthPicker(
        selectedDate: Date(),
        month: Calendar.current.dateComponents([.year, .month], from: Date()),
        onDateSelected: { _ in },
        onMonthChanged: { _ in }
    )
    .padding()
}
