import {Request, Response} from 'express';
import {userIdValidation} from '../../types/user';
import {usersModel} from '../../database/db';

export async function getUserRoute(req: Request, res: Response) {
  const {userId} = req.body;
  const idValidation = userIdValidation.safeParse({userId});
  if (!idValidation.success) {
    res.status(411).json({
      status: 'fail',
      code: 411,
      message: 'Please enter user id to get user details',
    });
  } else {
    const users = await usersModel.find({_id: userId});
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Got users from DB',
      users,
    });
  }
}
