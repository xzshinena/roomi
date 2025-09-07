import { User, createUser } from '../models/User';
import { Event, createEvent } from '../models/Event';
import { Theme } from '../theme/Theme';

export class SampleData {
  static users: User[] = [
    createUser('Alice Johnson', '👤'),
    createUser('Bob Smith', '👨'),
    createUser('Carol Davis', '👩'),
    createUser('David Wilson', '🧑'),
    createUser('Emma Brown', '👩‍💼'),
  ];

  static makeSampleEvents(): Event[] {
    const today = new Date();
    const events: Event[] = [];

    // Helper to create date with specific time
    const createDateWithTime = (baseDate: Date, hour: number, minute: number = 0): Date => {
      const date = new Date(baseDate);
      date.setHours(hour, minute, 0, 0);
      return date;
    };

    // Helper to get Monday of current week
    const getMonday = (date: Date): Date => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      d.setDate(diff);
      return d;
    };

    const monday = getMonday(today);

    // Monday events
    events.push(
      createEvent(
        'Marketing team meeting',
        createDateWithTime(monday, 8, 0),
        createDateWithTime(monday, 8, 40),
        'Conference Room A',
        [SampleData.users[0], SampleData.users[1]],
        Theme.eventColors[0]
      ),
      createEvent(
        'Make plans to create new products',
        createDateWithTime(monday, 8, 50),
        createDateWithTime(monday, 9, 40),
        undefined,
        [SampleData.users[2], SampleData.users[3]],
        Theme.eventColors[1]
      )
    );

    // Tuesday events (assuming today is Tuesday for demo)
    events.push(
      createEvent(
        'Coffee breaks and snacks',
        createDateWithTime(today, 10, 0),
        createDateWithTime(today, 10, 35),
        undefined,
        [SampleData.users[0], SampleData.users[4]],
        Theme.eventColors[2]
      ),
      createEvent(
        'Company policy meeting with management team',
        createDateWithTime(today, 10, 40),
        createDateWithTime(today, 12, 15),
        'Main Conference Room',
        [SampleData.users[1], SampleData.users[2], SampleData.users[3]],
        Theme.eventColors[3]
      ),
      createEvent(
        'Have lunch',
        createDateWithTime(today, 12, 20),
        createDateWithTime(today, 13, 30),
        'Cafeteria',
        [SampleData.users[0], SampleData.users[4]],
        Theme.eventColors[4]
      )
    );

    // Wednesday events
    const wednesday = new Date(today);
    wednesday.setDate(today.getDate() + 1);

    events.push(
      createEvent(
        'Plan meeting',
        createDateWithTime(wednesday, 8, 0),
        createDateWithTime(wednesday, 11, 50),
        undefined,
        [SampleData.users[1], SampleData.users[2]],
        Theme.eventColors[5]
      ),
      createEvent(
        'Check project status',
        createDateWithTime(wednesday, 13, 30),
        createDateWithTime(wednesday, 16, 30),
        undefined,
        [SampleData.users[3], SampleData.users[4]],
        Theme.eventColors[6]
      )
    );

    // Thursday events
    const thursday = new Date(today);
    thursday.setDate(today.getDate() + 2);

    events.push(
      createEvent(
        'Team standup',
        createDateWithTime(thursday, 9, 0),
        createDateWithTime(thursday, 9, 30),
        undefined,
        SampleData.users,
        Theme.eventColors[0]
      )
    );

    return events;
  }
}
