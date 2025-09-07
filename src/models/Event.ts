import { User } from './User';

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  attendees: User[];
  color: string;
}

export const createEvent = (
  title: string,
  start: Date,
  end: Date,
  location?: string,
  attendees: User[] = [],
  color: string = '#E5E7EB'
): Event => ({
  id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  title,
  start,
  end,
  location,
  attendees,
  color,
});
