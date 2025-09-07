export interface User {
  id: string;
  name: string;
  avatarEmoji: string;
}

export const createUser = (name: string, avatarEmoji: string): User => ({
  id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  name,
  avatarEmoji,
});
