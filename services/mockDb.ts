import AsyncStorage from '@react-native-async-storage/async-storage';

const DB_KEY = '@petapp_mock_db';

// ─── Types (aligned with AuthContext User shape) ─────────────────────────────

export type User = {
  _id: string;
  fullName: string;
  emailId: string;
  contactNumber?: string;
  userImg?: string;
  password?: string;
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
  notes?: string;
  date?: string;
};

export type Walker = {
  _id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  location: string;
  gender: 'male' | 'female';
  age: number;
  about: string;
  timings: string;
  imageUrl: string;
  experience: string;
};

export type Groomer = {
  _id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  location: string;
  services: string[];
  about: string;
  imageUrl: string;
};

export type Boarding = {
  _id: string;
  name: string;
  pricePerDay: number;
  rating: number;
  reviews: number;
  location: string;
  amenities: string[];
  about: string;
  imageUrl: string;
};

export type Vet = {
  _id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  fee: number;
  distance: string;
  location: string;
  about: string;
  imageUrl: string;
  availableDays: string;
};

export type Booking = {
  _id: string;
  userId: string;
  bookingType: 'walk' | 'grooming' | 'boarding' | 'vet';
  providerId: string;
  providerName: string;
  date: string;
  time: string;
  petId?: string;
  petName?: string;
  notes?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
};

export type Post = {
  _id: string;
  authorId: string;
  author: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  likedBy: string[];
};

export type Notification = {
  _id: string;
  userId: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'booking' | 'reminder' | 'community' | 'promo';
};

type MockDBState = {
  users: User[];
  pets: Pet[];
  reminders: Reminder[];
  walkers: Walker[];
  groomers: Groomer[];
  boardings: Boarding[];
  vets: Vet[];
  bookings: Booking[];
  posts: Post[];
  notifications: Notification[];
};

// ─── Seed Data ───────────────────────────────────────────────────────────────

const initialDBState: MockDBState = {
  users: [
    {
      _id: 'guest',
      fullName: 'Guest User',
      emailId: 'guest@pawmantra.com',
      contactNumber: '+91 9876543210',
    },
    {
      _id: 'demo_user_1',
      fullName: 'Shivansh',
      emailId: 'shivansh@pawmantra.com',
      contactNumber: '+91 9166365861',
      password: 'password123',
    },
  ],

  pets: [
    {
      _id: 'p1',
      userId: 'guest',
      name: 'Max',
      category: 'Dog',
      breed: 'Golden Retriever',
      age: '3',
      weight: '28',
      gender: 'Male',
    },
    {
      _id: 'p2',
      userId: 'guest',
      name: 'Luna',
      category: 'Cat',
      breed: 'Persian',
      age: '2',
      weight: '4',
      gender: 'Female',
    },
    {
      _id: 'p3',
      userId: 'guest',
      name: 'Kiwi',
      category: 'Bird',
      breed: 'Budgerigar',
      age: '1',
      weight: '0.03',
      gender: 'Male',
    },
    {
      _id: 'p4',
      userId: 'guest',
      name: 'Coco',
      category: 'Rabbit',
      breed: 'Holland Lop',
      age: '1',
      weight: '2',
      gender: 'Female',
    },
    {
      _id: 'p5',
      userId: 'demo_user_1',
      name: 'Bruno',
      category: 'Dog',
      breed: 'Labrador',
      age: '4',
      weight: '32',
      gender: 'Male',
    },
    {
      _id: 'p6',
      userId: 'demo_user_1',
      name: 'Whiskers',
      category: 'Cat',
      breed: 'Siamese',
      age: '2',
      weight: '3.5',
      gender: 'Female',
    },
  ],

  reminders: [
    {
      _id: 'r1',
      userId: 'guest',
      title: 'Vet Appointment',
      time: '10:00 AM',
      type: 'health',
      notes: 'Annual checkup for Max',
      date: '2026-03-18',
    },
    {
      _id: 'r2',
      userId: 'guest',
      title: 'Walk Max',
      time: '06:30 AM',
      type: 'activity',
      notes: 'Morning walk at the park',
    },
    {
      _id: 'r3',
      userId: 'guest',
      title: "Luna's Grooming",
      time: '02:00 PM',
      type: 'grooming',
      notes: 'Fur trimming & bath',
      date: '2026-03-20',
    },
    {
      _id: 'r4',
      userId: 'guest',
      title: 'Buy Pet Food',
      time: '11:00 AM',
      type: 'food',
      notes: 'Royal Canin for Max, Whiskas for Luna',
    },
    {
      _id: 'r5',
      userId: 'demo_user_1',
      title: 'Bruno Vaccination',
      time: '09:00 AM',
      type: 'health',
      date: '2026-03-19',
    },
    {
      _id: 'r6',
      userId: 'demo_user_1',
      title: 'Evening Walk',
      time: '05:30 PM',
      type: 'activity',
    },
  ],

  walkers: [
    {
      _id: 'w1',
      name: 'Nikita Dutta',
      price: 300,
      rating: 4.8,
      reviews: 2100,
      location: 'Patrika Nagar, Hyderabad',
      gender: 'female',
      age: 26,
      about:
        'Certified pet walker with 4 years of experience. I treat every pet like my own! Specializing in large breeds and energetic dogs.',
      timings: '6:00 AM – 9:00 AM, 4:00 PM – 7:00 PM',
      experience: '4 years',
      imageUrl: 'https://avatar.iran.liara.run/public/girl?username=Nikita',
    },
    {
      _id: 'w2',
      name: 'Rahul Verma',
      price: 350,
      rating: 4.7,
      reviews: 890,
      location: 'Jubilee Hills, Hyderabad',
      gender: 'male',
      age: 30,
      about:
        'Dog trainer & walker. I keep your pets active and happy with structured walks and play sessions. CPR certified for pets.',
      timings: '7:00 AM – 10:00 AM, 5:00 PM – 8:00 PM',
      experience: '6 years',
      imageUrl: 'https://avatar.iran.liara.run/public/boy?username=Rahul',
    },
    {
      _id: 'w3',
      name: 'Sneha Patel',
      price: 280,
      rating: 4.5,
      reviews: 1200,
      location: 'Banjara Hills, Hyderabad',
      gender: 'female',
      age: 24,
      about:
        'Animal lover since childhood. I provide gentle, patient care for pets of all sizes. Great with puppies and senior dogs.',
      timings: '6:30 AM – 9:30 AM, 4:30 PM – 7:30 PM',
      experience: '3 years',
      imageUrl: 'https://avatar.iran.liara.run/public/girl?username=Sneha',
    },
    {
      _id: 'w4',
      name: 'Arjun Reddy',
      price: 320,
      rating: 4.6,
      reviews: 650,
      location: 'Madhapur, Hyderabad',
      gender: 'male',
      age: 28,
      about:
        'Professional dog walker and pet sitter. I focus on making sure your furry friend gets the exercise and attention they deserve.',
      timings: '6:00 AM – 8:30 AM, 5:00 PM – 7:30 PM',
      experience: '5 years',
      imageUrl: 'https://avatar.iran.liara.run/public/boy?username=Arjun',
    },
    {
      _id: 'w5',
      name: 'Meera Krishnan',
      price: 290,
      rating: 4.9,
      reviews: 1800,
      location: 'Gachibowli, Hyderabad',
      gender: 'female',
      age: 27,
      about:
        'Vet student and passionate pet walker. I understand animal behavior and provide safe, engaging walks for your beloved pets.',
      timings: '5:30 AM – 8:30 AM, 4:00 PM – 7:00 PM',
      experience: '4 years',
      imageUrl: 'https://avatar.iran.liara.run/public/girl?username=Meera',
    },
  ],

  groomers: [
    {
      _id: 'g1',
      name: 'Paws & Claws Salon',
      price: 800,
      rating: 4.7,
      reviews: 340,
      location: 'Jubilee Hills, Hyderabad',
      services: [
        'Bath & Blow Dry',
        'Haircut & Styling',
        'Nail Trimming',
        'Ear Cleaning',
        'Teeth Brushing',
      ],
      about:
        'Premium pet grooming salon with state-of-the-art equipment. Our certified groomers handle breeds of all sizes with love and care.',
      imageUrl: 'https://avatar.iran.liara.run/public/girl?username=PawsClaws',
    },
    {
      _id: 'g2',
      name: 'Fluffy Tails Grooming',
      price: 600,
      rating: 4.5,
      reviews: 520,
      location: 'Banjara Hills, Hyderabad',
      services: [
        'Full Bath',
        'Fur Trimming',
        'De-shedding',
        'Paw Care',
        'Flea Treatment',
      ],
      about:
        'Affordable grooming services with a personal touch. We use organic, pet-safe products for every grooming session.',
      imageUrl: 'https://avatar.iran.liara.run/public/boy?username=FluffyTails',
    },
    {
      _id: 'g3',
      name: 'Pet Spa Studio',
      price: 1200,
      rating: 4.9,
      reviews: 210,
      location: 'Madhapur, Hyderabad',
      services: [
        'Luxury Bath',
        'Breed-Specific Styling',
        'Spa Treatment',
        'Aromatherapy',
        'Nail Art',
      ],
      about:
        'Luxury spa experience for your pets. Relax while we pamper your furry babies with premium treatments and spa packages.',
      imageUrl: 'https://avatar.iran.liara.run/public/girl?username=PetSpa',
    },
    {
      _id: 'g4',
      name: 'Happy Paws Groomers',
      price: 500,
      rating: 4.4,
      reviews: 680,
      location: 'Gachibowli, Hyderabad',
      services: ['Basic Bath', 'Haircut', 'Nail Clipping', 'Ear Cleaning'],
      about:
        'Quick and gentle grooming for everyday freshness. Walk-ins welcome! Perfect for regular maintenance grooming.',
      imageUrl: 'https://avatar.iran.liara.run/public/boy?username=HappyPaws',
    },
    {
      _id: 'g5',
      name: 'Bark & Shine',
      price: 900,
      rating: 4.8,
      reviews: 415,
      location: 'Kondapur, Hyderabad',
      services: [
        'Full Grooming',
        'Medicated Bath',
        'De-matting',
        'Breed Cut',
        'Cologne Finish',
      ],
      about:
        'Expert grooming with attention to detail. We specialize in show-quality grooming for all breeds.',
      imageUrl: 'https://avatar.iran.liara.run/public/girl?username=BarkShine',
    },
  ],

  boardings: [
    {
      _id: 'b1',
      name: 'Happy Tails Boarding',
      pricePerDay: 600,
      rating: 4.6,
      reviews: 180,
      location: 'Patrika Nagar, Hyderabad',
      amenities: [
        'AC Rooms',
        'Play Area',
        'CCTV',
        'Vet on Call',
        'Daily Updates',
      ],
      about:
        'Home-like boarding with individual attention. Your pet gets their own space, regular walks, and healthy meals. 24/7 CCTV monitoring.',
      imageUrl: 'https://avatar.iran.liara.run/public/boy?username=HappyTails',
    },
    {
      _id: 'b2',
      name: 'Pet Paradise Stay',
      pricePerDay: 900,
      rating: 4.8,
      reviews: 320,
      location: 'Jubilee Hills, Hyderabad',
      amenities: [
        'Luxury Suites',
        'Swimming Pool',
        'Grooming',
        'Play Sessions',
        'Webcam Access',
      ],
      about:
        'Premium pet resort with luxury suites, swimming pool, and daily grooming. Live webcam access so you can check on your pet anytime.',
      imageUrl:
        'https://avatar.iran.liara.run/public/girl?username=PetParadise',
    },
    {
      _id: 'b3',
      name: 'Paw Haven',
      pricePerDay: 450,
      rating: 4.4,
      reviews: 95,
      location: 'Madhapur, Hyderabad',
      amenities: [
        'Indoor Housing',
        'Garden',
        'Feeding Schedule',
        'Basic Grooming',
      ],
      about:
        'Budget-friendly boarding with a clean, safe environment. Perfect for short stays. Your pets get regular meals and outdoor time.',
      imageUrl: 'https://avatar.iran.liara.run/public/boy?username=PawHaven',
    },
    {
      _id: 'b4',
      name: 'Comfy Kennels',
      pricePerDay: 750,
      rating: 4.7,
      reviews: 245,
      location: 'Gachibowli, Hyderabad',
      amenities: [
        'Climate Control',
        'Spacious Kennels',
        'Training',
        'Vet Visits',
        'Photo Updates',
      ],
      about:
        'Spacious, climate-controlled kennels with professional supervision. Daily training sessions and photo updates for pet parents.',
      imageUrl:
        'https://avatar.iran.liara.run/public/girl?username=ComfyKennels',
    },
  ],

  vets: [
    {
      _id: 'v1',
      name: 'Dr. Priya Sharma',
      specialty: 'General & Surgery',
      experience: '12 years',
      rating: 4.8,
      fee: 500,
      distance: '2.1 km',
      location: 'Jubilee Hills, Hyderabad',
      about:
        'Experienced veterinary surgeon with expertise in small animal medicine. Handles complex surgeries and general health checkups with compassion.',
      imageUrl: 'https://avatar.iran.liara.run/public/girl?username=DrPriya',
      availableDays: 'Mon–Sat, 9 AM – 6 PM',
    },
    {
      _id: 'v2',
      name: 'Dr. Rajesh Kumar',
      specialty: 'Dental & Dermatology',
      experience: '8 years',
      rating: 4.6,
      fee: 450,
      distance: '4.5 km',
      location: 'Banjara Hills, Hyderabad',
      about:
        'Specialist in pet dental care and skin conditions. Gentle approach that puts anxious pets at ease. Board certified in veterinary dermatology.',
      imageUrl: 'https://avatar.iran.liara.run/public/boy?username=DrRajesh',
      availableDays: 'Mon–Fri, 10 AM – 7 PM',
    },
    {
      _id: 'v3',
      name: 'Dr. Anitha Reddy',
      specialty: 'Emergency & Critical Care',
      experience: '15 years',
      rating: 4.9,
      fee: 600,
      distance: '3.2 km',
      location: 'Madhapur, Hyderabad',
      about:
        '24/7 emergency vet with 15 years of critical care experience. Equipped to handle trauma, poisoning, and life-threatening conditions.',
      imageUrl: 'https://avatar.iran.liara.run/public/girl?username=DrAnitha',
      availableDays: '24/7 Emergency',
    },
    {
      _id: 'v4',
      name: 'Dr. Vikram Patel',
      specialty: 'Orthopedics & Rehab',
      experience: '10 years',
      rating: 4.7,
      fee: 550,
      distance: '5.8 km',
      location: 'Gachibowli, Hyderabad',
      about:
        'Orthopedic specialist focusing on bone fractures, joint problems, and post-surgery rehabilitation. Uses modern physiotherapy techniques.',
      imageUrl: 'https://avatar.iran.liara.run/public/boy?username=DrVikram',
      availableDays: 'Tue–Sat, 9 AM – 5 PM',
    },
  ],

  bookings: [
    {
      _id: 'bk1',
      userId: 'guest',
      bookingType: 'walk',
      providerId: 'w1',
      providerName: 'Nikita Dutta',
      date: '2026-03-15',
      time: '06:30',
      petId: 'p1',
      petName: 'Max',
      status: 'completed',
    },
    {
      _id: 'bk2',
      userId: 'guest',
      bookingType: 'grooming',
      providerId: 'g1',
      providerName: 'Paws & Claws Salon',
      date: '2026-03-14',
      time: '11:00',
      petId: 'p2',
      petName: 'Luna',
      status: 'completed',
    },
    {
      _id: 'bk3',
      userId: 'guest',
      bookingType: 'boarding',
      providerId: 'b1',
      providerName: 'Happy Tails Boarding',
      date: '2026-03-16',
      time: '10:00',
      petId: 'p1',
      petName: 'Max',
      status: 'upcoming',
    },
  ],

  posts: [
    {
      _id: 'post1',
      authorId: 'user_x1',
      author: 'Priya M.',
      authorAvatar: '🐕',
      timeAgo: '2h ago',
      likes: 42,
      comments: 12,
      likedBy: [],
      content:
        'Just adopted this cutie from the shelter! Meet Bruno. Any tips for first-time dog parents?',
    },
    {
      _id: 'post2',
      authorId: 'user_x2',
      author: 'Rahul K.',
      authorAvatar: '🐈',
      timeAgo: '5h ago',
      likes: 18,
      comments: 24,
      likedBy: [],
      content:
        'Best vet in Hyderabad for cat vaccinations? Looking for someone gentle and affordable.',
    },
    {
      _id: 'post3',
      authorId: 'user_x3',
      author: 'Anitha R.',
      authorAvatar: '🐾',
      timeAgo: '1d ago',
      likes: 56,
      comments: 8,
      likedBy: [],
      content:
        'Pet-friendly cafes in the city? Want to take my golden retriever out for a weekend brunch!',
    },
    {
      _id: 'post4',
      authorId: 'user_x4',
      author: 'Sneha P.',
      authorAvatar: '🐶',
      timeAgo: '2d ago',
      likes: 89,
      comments: 31,
      likedBy: [],
      content:
        "Share your favourite homemade dog treat recipes! Here's mine: peanut butter + oats + banana.",
    },
    {
      _id: 'post5',
      authorId: 'user_x5',
      author: 'Vikram S.',
      authorAvatar: '🦜',
      timeAgo: '3d ago',
      likes: 34,
      comments: 15,
      likedBy: [],
      content:
        'My budgie just learned to say "hello"! Took 3 months of patient training. Never give up on your bird babies!',
    },
    {
      _id: 'post6',
      authorId: 'user_x6',
      author: 'Meera K.',
      authorAvatar: '🐰',
      timeAgo: '4d ago',
      likes: 27,
      comments: 9,
      likedBy: [],
      content:
        'Rabbit parents, how do you bunny-proof your homes? My Holland Lop chews on everything!',
    },
  ],

  notifications: [
    {
      _id: 'n1',
      userId: 'guest',
      title: 'Booking Confirmed',
      message:
        'Your walk with Nikita Dutta for Max is confirmed for tomorrow at 6:30 AM.',
      time: '1h ago',
      read: false,
      type: 'booking',
    },
    {
      _id: 'n2',
      userId: 'guest',
      title: 'Reminder',
      message: 'Vet appointment for Max is coming up on March 18.',
      time: '3h ago',
      read: false,
      type: 'reminder',
    },
    {
      _id: 'n3',
      userId: 'guest',
      title: 'Community',
      message: 'Priya M. liked your post about pet-friendly cafes.',
      time: '5h ago',
      read: true,
      type: 'community',
    },
    {
      _id: 'n4',
      userId: 'guest',
      title: 'Special Offer',
      message: '20% off on grooming at Paws & Claws Salon this weekend!',
      time: '1d ago',
      read: true,
      type: 'promo',
    },
    {
      _id: 'n5',
      userId: 'guest',
      title: 'Walk Completed',
      message:
        "Max's walk with Nikita Dutta is complete. Rate your experience!",
      time: '2d ago',
      read: true,
      type: 'booking',
    },
  ],
};

// ─── MockDatabase Class ──────────────────────────────────────────────────────

class MockDatabase {
  private state: MockDBState = JSON.parse(JSON.stringify(initialDBState));
  private isInitialized = false;

  async init() {
    if (this.isInitialized) {
      return;
    }
    try {
      const stored = await AsyncStorage.getItem(DB_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as MockDBState;
        // Merge with initial state to pick up new collections added in updates
        this.state = {
          ...initialDBState,
          ...parsed,
          walkers: parsed.walkers?.length
            ? parsed.walkers
            : initialDBState.walkers,
          groomers: parsed.groomers?.length
            ? parsed.groomers
            : initialDBState.groomers,
          boardings: parsed.boardings?.length
            ? parsed.boardings
            : initialDBState.boardings,
          vets: parsed.vets?.length ? parsed.vets : initialDBState.vets,
          posts: parsed.posts?.length ? parsed.posts : initialDBState.posts,
          notifications: parsed.notifications?.length
            ? parsed.notifications
            : initialDBState.notifications,
        };
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
    this.state = JSON.parse(JSON.stringify(initialDBState));
    this.isInitialized = false;
    await AsyncStorage.removeItem(DB_KEY);
  }

  // ─── Users ──────────────────────────────────────────────────────────────

  async getUser(id: string): Promise<User | undefined> {
    await this.init();
    return this.state.users.find(u => u._id === id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    await this.init();
    return this.state.users.find(u => u.emailId === email);
  }

  async addUser(user: Omit<User, '_id'>): Promise<User> {
    await this.init();
    const newUser = {...user, _id: `u_${Date.now()}`};
    this.state.users.push(newUser);
    await this.sync();
    return newUser;
  }

  async updateUser(
    id: string,
    updates: Partial<User>,
  ): Promise<User | undefined> {
    await this.init();
    const idx = this.state.users.findIndex(u => u._id === id);
    if (idx === -1) {
      return undefined;
    }
    this.state.users[idx] = {...this.state.users[idx], ...updates};
    await this.sync();
    return this.state.users[idx];
  }

  async login(
    email: string,
    password: string,
  ): Promise<{user: User; token: string} | null> {
    await this.init();
    const user = this.state.users.find(u => u.emailId === email);
    if (user) {
      // For mock: accept any password or match stored password
      if (!user.password || user.password === password) {
        const safeUser = {...user};
        delete safeUser.password;
        return {user: safeUser, token: `mock_jwt_${user._id}_${Date.now()}`};
      }
    }
    return null;
  }

  // ─── Pets ───────────────────────────────────────────────────────────────

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

  async deletePet(petId: string): Promise<boolean> {
    await this.init();
    const idx = this.state.pets.findIndex(p => p._id === petId);
    if (idx === -1) {
      return false;
    }
    this.state.pets.splice(idx, 1);
    await this.sync();
    return true;
  }

  // ─── Reminders ──────────────────────────────────────────────────────────

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

  async deleteReminder(reminderId: string): Promise<boolean> {
    await this.init();
    const idx = this.state.reminders.findIndex(r => r._id === reminderId);
    if (idx === -1) {
      return false;
    }
    this.state.reminders.splice(idx, 1);
    await this.sync();
    return true;
  }

  // ─── Walkers ────────────────────────────────────────────────────────────

  async getWalkers(): Promise<Walker[]> {
    await this.init();
    return this.state.walkers;
  }

  // ─── Groomers ───────────────────────────────────────────────────────────

  async getGroomers(): Promise<Groomer[]> {
    await this.init();
    return this.state.groomers;
  }

  // ─── Boardings ──────────────────────────────────────────────────────────

  async getBoardings(): Promise<Boarding[]> {
    await this.init();
    return this.state.boardings;
  }

  // ─── Vets ───────────────────────────────────────────────────────────────

  async getVets(): Promise<Vet[]> {
    await this.init();
    return this.state.vets;
  }

  // ─── Bookings ───────────────────────────────────────────────────────────

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    await this.init();
    return this.state.bookings.filter(b => b.userId === userId);
  }

  async addBooking(booking: Omit<Booking, '_id'>): Promise<Booking> {
    await this.init();
    const newBooking = {...booking, _id: `bk_${Date.now()}`};
    this.state.bookings.push(newBooking);
    await this.sync();
    return newBooking;
  }

  // ─── Posts ──────────────────────────────────────────────────────────────

  async getPosts(): Promise<Post[]> {
    await this.init();
    return this.state.posts;
  }

  async addPost(post: Omit<Post, '_id'>): Promise<Post> {
    await this.init();
    const newPost = {...post, _id: `post_${Date.now()}`};
    this.state.posts.unshift(newPost);
    await this.sync();
    return newPost;
  }

  async toggleLike(postId: string, userId: string): Promise<Post | undefined> {
    await this.init();
    const post = this.state.posts.find(p => p._id === postId);
    if (!post) {
      return undefined;
    }
    const likedIdx = post.likedBy.indexOf(userId);
    if (likedIdx >= 0) {
      post.likedBy.splice(likedIdx, 1);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      post.likedBy.push(userId);
      post.likes += 1;
    }
    await this.sync();
    return post;
  }

  // ─── Notifications ──────────────────────────────────────────────────────

  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    await this.init();
    return this.state.notifications.filter(n => n.userId === userId);
  }

  async markNotificationRead(notifId: string): Promise<boolean> {
    await this.init();
    const n = this.state.notifications.find(x => x._id === notifId);
    if (!n) {
      return false;
    }
    n.read = true;
    await this.sync();
    return true;
  }
}

export const mockDb = new MockDatabase();
