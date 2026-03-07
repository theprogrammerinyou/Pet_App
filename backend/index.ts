import express from 'express';
import cors from 'cors';

import {getUserRoute} from './src/routes/users/getUser';
import {addUserRoute} from './src/routes/users/addUser';
import {deleteUserRoute} from './src/routes/users/deleteUser';
import {editUserRoute} from './src/routes/users/updateUser';
import {loginRoute} from './src/routes/users/login';

import {getPetRoute} from './src/routes/pets/getPet';
import {addPetRoute} from './src/routes/pets/addPet';
import {editPetRoute} from './src/routes/pets/updatePet';
import {deletePetRoute} from './src/routes/pets/deletePet';
import {getPetsByUserRoute} from './src/routes/pets/getPetsByUser';

import {getRemindersRoute} from './src/routes/reminders/getReminders';
import {addReminderRoute} from './src/routes/reminders/addReminder';
import {getWalkersRoute} from './src/routes/walkers/getWalkers';
import {addBookingRoute} from './src/routes/bookings/addBooking';
import {authMiddleware} from './src/middleware/auth';

require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', function (req: any, res: any) {
  res.send({msg: 'hello, how are you'});
});

app.post('/getUser', getUserRoute);
app.post('/addUser', addUserRoute);
app.post('/login', loginRoute);
app.patch('/updateUser', authMiddleware, editUserRoute);
app.delete('/deleteUser', deleteUserRoute);

app.post('/getPet', getPetRoute);
app.post('/getPetsByUser', authMiddleware, getPetsByUserRoute);
app.post('/addPet', authMiddleware, addPetRoute);
app.patch('/updatePet', editPetRoute);
app.delete('/deletePet', deletePetRoute);

app.post('/getReminders', authMiddleware, getRemindersRoute);
app.post('/addReminder', authMiddleware, addReminderRoute);
app.get('/getWalkers', getWalkersRoute);
app.post('/addBooking', authMiddleware, addBookingRoute);

app.listen(3500);
