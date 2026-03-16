import {Response} from 'express';
import {petsModel} from '../../database/db';
import {AuthRequest} from '../../middleware/auth';

export async function getPetsByUserRoute(req: AuthRequest, res: Response) {
  const userId = req.userId;
  if (!userId) {
    return res
      .status(401)
      .json({status: 'fail', code: 401, message: 'Unauthorized'});
  }
  const pets = await petsModel.find({userId}).lean();
  return res.status(200).json({
    status: 'success',
    code: 200,
    pets,
  });
}
