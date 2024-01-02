import {Request, Response} from 'express';
import {userIdValidation} from '../../types/user';
import {usersModel} from '../../database/db';

async function deleteUserRoute(req: Request, res: Response) {
  const {userId} = req.body;
  const deleteUserPayload = userIdValidation.safeParse({userId});
  if (!deleteUserPayload.success) {
    res.status(411).json({
      status: 'fail',
      code: 411,
      msg: 'Please send user id to delete user',
    });
  } else {
    await usersModel.deleteOne({
      _id: userId,
    });

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Deleted user from DB',
    });
  }
}

export {deleteUserRoute};
