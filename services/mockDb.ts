import AsyncStorage from '@react-native-async-storage/async-storage';

const DB_KEY = '@petapp_mock_db';

export type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
};

export type Pet = {
  _id: string;
  userId: string;
  name: string;
  category: string;
  breed?: string;
  age?: string;
  weight?: string;
  gender?: string;
};

export type Reminder = {
  _id: string;
  userId: string;
  title: string;
  time: string;
  type: string;
};

type MockDBState = {
  users: User[];
  pets: Pet[];
  reminders: Reminder[];
};

const initialDBState: MockDBState = {
  users: [{_id: 'guest', name: 'Guest User', email: 'guest@petapp.com'}],
  pets: [
    {
      _id: 'p1',
      userId: 'guest',
      name: 'Max',
      category: 'Dog',
      breed: 'Golden Retriever',
      age: '2',
      weight: '20',
    },
    {
      _id: 'p2',
      userId: 'guest',
      name: 'Luna',
      category: 'Cat',
      breed: 'Persian',
      age: '1',
      weight: '4',
    },
  ],
  reminders: [
    {
      _id: 'r1',
      userId: 'guest',
      title: 'Vet Appointment',
      time: '10:00 AM',
      type: 'health',
    },
    {
      _id: 'r2',
      userId: 'guest',
      title: 'Walk Max',
      time: '05:00 PM',
      type: 'activity',
    },
  ],
};

class MockDatabase {
  private state: MockDBState = initialDBState;
  private isInitialized = false;

  async init() {
    if (this.isInitialized) {
      return;
    }
    try {
      const stored = await AsyncStorage.getItem(DB_KEY);
      if (stored) {
        this.state = JSON.parse(stored);
      } else {
        await this.sync();
      }
      this.isInitialized = true;
    } catch (e) {
      console.error('MockDB Init Error', e);
    }
  }

  private async sync() {
    try {
      await AsyncStorage.setItem(DB_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('MockDB Sync Error', e);
    }
  }

  async clear() {
    this.state = initialDBState;
    await this.sync();
  }

  // --- Users ---
  async getUser(id: string): Promise<User | undefined> {
    await this.init();
    return this.state.users.find(u => u._id === id);
  }

  // --- Pets ---
  async getPetsByUser(userId: string): Promise<Pet[]> {
    await this.init();
    return this.state.pets.filter(p => p.userId === userId);
  }

  async addPet(pet: Omit<Pet, '_id'>): Promise<Pet> {
    await this.init();
    const newPet = {...pet, _id: `p_${Date.now()}`};
    this.state.pets.push(newPet);
    await this.sync();
    return newPet;
  }

  // --- Reminders ---
  async getRemindersByUser(userId: string): Promise<Reminder[]> {
    await this.init();
    return this.state.reminders.filter(r => r.userId === userId);
  }

  async addReminder(reminder: Omit<Reminder, '_id'>): Promise<Reminder> {
    await this.init();
    const newReminder = {...reminder, _id: `r_${Date.now()}`};
    this.state.reminders.push(newReminder);
    await this.sync();
    return newReminder;
  }
}

export const mockDb = new MockDatabase();
