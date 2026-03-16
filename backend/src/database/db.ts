import mongoose, {model, Schema} from 'mongoose';
import {user} from './schema/user';
import {pet} from './schema/pet';
import {remainder} from './schema/remainder';
import {walker} from './schema/walker';
import {booking} from './schema/booking';

require('dotenv').config({path: '.env.development'});

// Use MONGODB_URI for local MongoDB (e.g. mongodb://localhost:27017/petapp) to avoid Atlas DNS issues
const mongoDBURI =
  process.env.MONGODB_URI ||
  `mongodb+srv://shivansh:${process.env.PASSWORD}@cluster0.k8cqfet.mongodb.net`;

function connectMongo() {
  mongoose
    .connect(mongoDBURI, {serverSelectionTimeoutMS: 10000})
    .then(() => console.log('MongoDB connected'))
    .catch((err: Error) => {
      console.error(
        'MongoDB connection failed:',
        err.message || err,
        '\n\nServer will still run, but DB routes will fail. Possible fixes:',
        '\n  • Check internet / DNS (e.g. ENOTFOUND = cannot resolve Atlas hostname)',
        '\n  • Use a different network or disable VPN',
        '\n  • Use local MongoDB: mongodb://localhost:27017/petapp and set MONGODB_URI in .env',
      );
    });
}

connectMongo();

const usersSchema: Schema = new Schema(user);
const petsSchema: Schema = new Schema(pet);
const remindersSchema: Schema = new Schema(remainder);
const walkersSchema: Schema = new Schema(walker);
const bookingsSchema: Schema = new Schema(booking);

export const usersModel = model('users', usersSchema);
export const petsModel = model('pets', petsSchema);
export const remindersModel = model('reminders', remindersSchema);
export const walkersModel = model('walkers', walkersSchema);
export const bookingsModel = model('bookings', bookingsSchema);

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
