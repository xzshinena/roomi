import SwiftUI

struct SectionHeader: View {
    let title: String
    let action: (() -> Void)?
    let actionIcon: String?
    
    init(title: String, action: (() -> Void)? = nil, actionIcon: String? = nil) {
        self.title = title
        self.action = action
        self.actionIcon = actionIcon
    }
    
    var body: some View {
        HStack {
            Text(title)
                .font(.headline)
                .fontWeight(.semibold)
                .foregroundColor(.primary)
            
            Spacer()
            
            if let action = action, let actionIcon = actionIcon {
                Button(action: action) {
                    Image(systemName: actionIcon)
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(.secondary)
                }
                .accessibilityLabel("\(title) options")
            }
        }
        .padding(.horizontal, Theme.spacingL)
        .padding(.vertical, Theme.spacingS)
    }
}

#Preview {
    VStack(spacing: Theme.spacingL) {
        SectionHeader(title: "Appointment")
        SectionHeader(title: "Settings", action: {}, actionIcon: "gearshape")
    }
    .padding()
}
