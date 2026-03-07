import {Response} from 'express';
import {remindersModel} from '../../database/db';
import {AuthRequest} from '../../middleware/auth';

export async function getRemindersRoute(req: AuthRequest, res: Response) {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ status: 'fail', code: 401, message: 'Unauthorized' });
  }
  const reminders = await remindersModel.find({userId}).lean().sort({date: 1});
  return res.status(200).json({
    status: 'success',
    code: 200,
    reminders,
  });
}
