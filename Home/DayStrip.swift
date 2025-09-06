import SwiftUI

struct DayStrip: View {
    let weekDates: [Date]
    let selectedDate: Date
    let onDateSelected: (Date) -> Void
    let onPreviousWeek: () -> Void
    let onNextWeek: () -> Void
    
    var body: some View {
        HStack(spacing: Theme.spacingS) {
            Button(action: onPreviousWeek) {
                Image(systemName: "chevron.left")
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(.primary)
            }
            .accessibilityLabel("Previous week")
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: Theme.spacingS) {
                    ForEach(weekDates, id: \.self) { date in
                        DayPill(
                            date: date,
                            isSelected: Calendar.current.isDate(date, inSameDayAs: selectedDate),
                            onTap: { onDateSelected(date) }
                        )
                    }
                }
                .padding(.horizontal, Theme.spacingL)
            }
            
            Button(action: onNextWeek) {
                Image(systemName: "chevron.right")
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(.primary)
            }
            .accessibilityLabel("Next week")
        }
        .padding(.vertical, Theme.spacingS)
    }
}

struct DayPill: View {
    let date: Date
    let isSelected: Bool
    let onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            VStack(spacing: 2) {
                Text(DateFormats.shortWeekdaySymbol(date: date))
                    .font(.caption)
                    .fontWeight(.medium)
                
                Text("\(DateFormats.weekdayNumber(date: date))")
                    .font(.system(size: 16, weight: .semibold))
            }
            .foregroundColor(isSelected ? .white : .primary)
            .frame(minWidth: 44, minHeight: 44)
            .background(
                RoundedRectangle(cornerRadius: Theme.cornerRadiusXL)
                    .fill(isSelected ? Theme.primaryColor : Color.clear)
                    .overlay(
                        RoundedRectangle(cornerRadius: Theme.cornerRadiusXL)
                            .stroke(isSelected ? Color.clear : Color.gray.opacity(0.3), lineWidth: 1)
                    )
            )
        }
        .accessibilityLabel("\(DateFormats.shortWeekdaySymbol(date: date)), \(DateFormats.weekdayNumber(date: date))")
        .accessibilityAddTraits(isSelected ? .isSelected : [])
    }
}

#Preview {
    VStack {
        DayStrip(
            weekDates: Array(0..<7).compactMap { Calendar.current.date(byAdding: .day, value: $0, to: Date()) },
            selectedDate: Date(),
            onDateSelected: { _ in },
            onPreviousWeek: {},
            onNextWeek: {}
        )
        
        Spacer()
    }
    .padding()
}
