import mongoose, {model, Schema} from 'mongoose';
import {user} from './schema/user';
import {pet} from './schema/pet';
import {remainder} from './schema/remainder';
import {walker} from './schema/walker';

require('dotenv').config({path: '.env.development'});

const PASSWORD = process.env.PASSWORD;
const mongoDBURI = `mongodb+srv://shivansh:${PASSWORD}@cluster0.k8cqfet.mongodb.net`;

mongoose.connect(mongoDBURI);

const usersSchema: Schema = new Schema(user);
const petsSchema: Schema = new Schema(pet);
const remindersSchema: Schema = new Schema(remainder);
const walkersSchema: Schema = new Schema(walker);

export const usersModel = model('users', usersSchema);
export const petsModel = model('pets', petsSchema);
export const remindersModel = model('reminders', remindersSchema);
export const walkersModel = model('walkers', walkersSchema);
