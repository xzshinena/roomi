import SwiftUI

struct AvatarCircle: View {
    let emoji: String
    let size: CGFloat
    
    init(emoji: String, size: CGFloat = 20) {
        self.emoji = emoji
        self.size = size
    }
    
    var body: some View {
        Text(emoji)
            .font(.system(size: size * 0.6))
            .frame(width: size, height: size)
            .background(Color.gray.opacity(0.2))
            .clipShape(Circle())
    }
}

struct AvatarStack: View {
    let users: [User]
    let maxVisible: Int
    let size: CGFloat
    
    init(users: [User], maxVisible: Int = 3, size: CGFloat = 20) {
        self.users = Array(users.prefix(maxVisible))
        self.maxVisible = maxVisible
        self.size = size
    }
    
    var body: some View {
        HStack(spacing: -4) {
            ForEach(users) { user in
                AvatarCircle(emoji: user.avatarEmoji, size: size)
            }
            
            if users.count < maxVisible && users.count < maxVisible {
                let remaining = min(maxVisible - users.count, maxVisible - users.count)
                ForEach(0..<remaining, id: \.self) { _ in
                    Circle()
                        .fill(Color.gray.opacity(0.3))
                        .frame(width: size, height: size)
                        .overlay(
                            Text("+")
                                .font(.system(size: size * 0.4, weight: .medium))
                                .foregroundColor(.secondary)
                        )
                }
            }
        }
    }
}

#Preview {
    VStack(spacing: Theme.spacingL) {
        AvatarCircle(emoji: "👤", size: 24)
        AvatarStack(users: [
            User(name: "Alice", avatarEmoji: "👤"),
            User(name: "Bob", avatarEmoji: "👨"),
            User(name: "Carol", avatarEmoji: "👩")
        ], size: 20)
    }
    .padding()
}
