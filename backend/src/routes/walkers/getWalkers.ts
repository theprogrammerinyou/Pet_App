import {Request, Response} from 'express';
import {walkersModel} from '../../database/db';

// Returns walkers from DB; if none, returns mock list so app works without seed
const MOCK_WALKERS = [
  {
    name: 'Nikita Dutta',
    gender: 'Female',
    age: 27,
    price: 300,
    rating: 4.4,
    reviews: 2100,
    location: 'Patrika Nagar, Hyderabad',
    about: 'Love dogs and long walks.',
    timings: 'Mon-Sat 7AM-9PM',
    _id: 'mock1',
  },
  {
    name: 'Rahul Verma',
    gender: 'Male',
    age: 30,
    price: 350,
    rating: 4.7,
    reviews: 890,
    location: 'Jubilee Hills',
    about: 'Professional pet walker.',
    timings: 'Daily 6AM-8PM',
    _id: 'mock2',
  },
  {
    name: 'Sneha Patel',
    gender: 'Female',
    age: 25,
    price: 280,
    rating: 4.5,
    reviews: 1200,
    location: 'Banjara Hills',
    about: 'Cat and dog lover.',
    timings: 'Mon-Fri 8AM-7PM',
    _id: 'mock3',
  },
];

export async function getWalkersRoute(req: Request, res: Response) {
  try {
    const walkers = await walkersModel.find().lean();
    const list = walkers.length > 0 ? walkers : MOCK_WALKERS;
    return res.status(200).json({
      status: 'success',
      code: 200,
      walkers: list,
    });
  } catch {
    return res.status(200).json({
      status: 'success',
      code: 200,
      walkers: MOCK_WALKERS,
    });
  }
}
