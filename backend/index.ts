import express from 'express';
import cors from 'cors';
import {addUserRoute} from './src/routes/users/addUser';
import {deleteUserRoute} from './src/routes/users/deleteUser';

require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', function (req: any, res: any) {
  res.send({msg: 'hello, how are you'});
});

app.get('/addUser', addUserRoute);

app.delete('/deleteUser', deleteUserRoute);

app.listen(3500);
