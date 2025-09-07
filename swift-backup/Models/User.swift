import SwiftUI

struct User: Identifiable, Hashable {
    let id: UUID
    let name: String
    let avatarEmoji: String
    
    init(name: String, avatarEmoji: String) {
        self.id = UUID()
        self.name = name
        self.avatarEmoji = avatarEmoji
    }
}
