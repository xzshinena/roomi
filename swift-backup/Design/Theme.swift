import SwiftUI

struct Theme {
    // Spacing
    static let spacingXS: CGFloat = 4
    static let spacingS: CGFloat = 8
    static let spacingM: CGFloat = 12
    static let spacingL: CGFloat = 16
    static let spacingXL: CGFloat = 20
    static let spacingXXL: CGFloat = 24
    
    // Corner Radius
    static let cornerRadiusS: CGFloat = 8
    static let cornerRadiusM: CGFloat = 12
    static let cornerRadiusL: CGFloat = 16
    static let cornerRadiusXL: CGFloat = 24
    
    // Shadows
    static let shadowSmall = Shadow(radius: 4, opacity: 0.08)
    static let shadowMedium = Shadow(radius: 8, opacity: 0.12)
    static let shadowLarge = Shadow(radius: 12, opacity: 0.16)
    
    // Colors
    static let primaryColor = Color.purple
    static let secondaryColor = Color.teal
    static let accentColor = Color.orange
    
    // Event Colors
    static let eventColors: [Color] = [
        Color.orange.opacity(0.2),
        Color.purple.opacity(0.2),
        Color.blue.opacity(0.2),
        Color.pink.opacity(0.2),
        Color.yellow.opacity(0.2),
        Color.green.opacity(0.2),
        Color.indigo.opacity(0.2)
    ]
    
    static let eventColorBorders: [Color] = [
        Color.orange,
        Color.purple,
        Color.blue,
        Color.pink,
        Color.yellow,
        Color.green,
        Color.indigo
    ]
}

struct Shadow {
    let radius: CGFloat
    let opacity: Double
}

extension View {
    func themeShadow(_ shadow: Shadow) -> some View {
        self.shadow(color: .black.opacity(shadow.opacity), radius: shadow.radius, x: 0, y: 2)
    }
}
