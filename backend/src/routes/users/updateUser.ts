import {usersModel} from '../../database/db';
import {userIdValidation} from './../../types/user';
import {Request, Response} from 'express';

export async function editUserRoute(req: Request, res: Response) {
  const {userId, name, contactNumber, userImg, emailId} = req.body;
  const updateUserPayload = userIdValidation.safeParse({userId, emailId});

  if (!updateUserPayload.success) {
    res.status(411).json({
      status: 'fail',
      code: 411,
      message: 'Please send user id to udpate user',
    });
  } else {
    await usersModel.updateOne(
      {_id: userId},
      {
        name,
        contactNumber,
        userImg,
      },
    );

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Upated user successfully',
    });
  }
}
