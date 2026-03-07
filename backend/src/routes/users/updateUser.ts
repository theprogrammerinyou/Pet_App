import {usersModel} from '../../database/db';
import {Request, Response} from 'express';
import {AuthRequest} from '../../middleware/auth';

export async function editUserRoute(req: AuthRequest, res: Response) {
  const userId = req.userId;
  const {fullName, contactNumber, userImg} = req.body;

  if (!userId) {
    return res.status(401).json({
      status: 'fail',
      code: 401,
      message: 'Unauthorized',
    });
  }

  const updatePayload: Record<string, unknown> = {};
  if (fullName != null) updatePayload.fullName = fullName;
  if (contactNumber != null) updatePayload.contactNumber = contactNumber;
  if (userImg != null) updatePayload.userImg = userImg;

  await usersModel.updateOne({_id: userId}, { $set: updatePayload });

  return res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Updated user successfully',
  });
}
