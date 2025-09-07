import SwiftUI

struct FAB: View {
    let action: () -> Void
    let color: Color
    
    init(action: @escaping () -> Void, color: Color = Theme.primaryColor) {
        self.action = action
        self.color = color
    }
    
    var body: some View {
        Button(action: action) {
            Image(systemName: "plus")
                .font(.system(size: 20, weight: .semibold))
                .foregroundColor(.white)
                .frame(width: 56, height: 56)
                .background(color)
                .clipShape(Circle())
        }
        .themeShadow(Theme.shadowMedium)
        .accessibilityLabel("Add new event")
        .accessibilityHint("Tap to create a new event")
    }
}

#Preview {
    ZStack {
        Color.gray.opacity(0.1)
            .ignoresSafeArea()
        
        VStack {
            Spacer()
            
            HStack {
                Spacer()
                FAB(action: {})
                Spacer()
            }
            .padding(.bottom, 100) // Simulate tab bar height
        }
    }
}
