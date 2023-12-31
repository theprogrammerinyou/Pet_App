import {Request, Response} from 'express';
import {addUser} from '../../types/user';
import {usersModel} from '../../database/db';

async function addUserRoute(req: Request, res: Response) {
  const {name, emailId, password, contactNumber, userImg} = req.body;
  const createUserPayload = addUser.safeParse({
    name,
    emailId,
    password,
    contactNumber,
  });

  if (!createUserPayload.success) {
    res.status(411).json({
      status: 'fail',
      code: 411,
      message: 'Please enter correct inputs to add user',
    });
  } else {
    await usersModel.create({
      fullName: name,
      emailId,
      password,
      contactNumber,
      userImg,
    });

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Added User to DB',
    });
  }
}

export {addUserRoute};
