import express from 'express';
import cors from 'cors';

import {getUserRoute} from './src/routes/users/getUser';
import {addUserRoute} from './src/routes/users/addUser';
import {deleteUserRoute} from './src/routes/users/deleteUser';
import {editUserRoute} from './src/routes/users/updateUser';

import {getPetRoute} from './src/routes/pets/getPet';
import {addPetRoute} from './src/routes/pets/addPet';
import {editPetRoute} from './src/routes/pets/updatePet';
import {deletePetRoute} from './src/routes/pets/deletePet';

require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', function (req: any, res: any) {
  res.send({msg: 'hello, how are you'});
});

app.get('/getUser', getUserRoute);
app.post('/addUser', addUserRoute);
app.patch('/updateUser', editUserRoute);
app.delete('/deleteUser', deleteUserRoute);

app.get('/getPet', getPetRoute);
app.post('/addPet', addPetRoute);
app.patch('/updatePet', editPetRoute);
app.delete('/deletePet', deletePetRoute);

app.listen(3500);
