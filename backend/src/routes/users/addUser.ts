import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import {addUser} from '../../types/user';
import {usersModel} from '../../database/db';

const SALT_ROUNDS = 10;

async function addUserRoute(req: Request, res: Response) {
  const {name, emailId, password, contactNumber, userImg} = req.body;
  const createUserPayload = addUser.safeParse({
    name,
    emailId,
    password,
    contactNumber,
  });

  if (!createUserPayload.success) {
    return res.status(411).json({
      status: 'fail',
      code: 411,
      message: 'Please enter correct inputs to add user',
    });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  await usersModel.create({
    fullName: name,
    emailId,
    password: hashedPassword,
    contactNumber: contactNumber ?? '',
    userImg: userImg ?? '',
  });

  return res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Added User to DB',
  });
}

export {addUserRoute};
