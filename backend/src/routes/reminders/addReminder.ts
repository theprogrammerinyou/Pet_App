import {Response} from 'express';
import {remindersModel} from '../../database/db';
import {AuthRequest} from '../../middleware/auth';

export async function addReminderRoute(req: AuthRequest, res: Response) {
  const userId = req.userId;
  const {title, notes, date, time, repeat} = req.body;
  if (!userId || !title) {
    return res.status(400).json({
      status: 'fail',
      code: 400,
      message: 'Title is required',
    });
  }
  const created = await remindersModel.create({
    userId,
    title: title || 'Reminder',
    notes: notes || '',
    date: date ? new Date(date) : new Date(),
    time: time || '09:00',
    repeat: repeat || 'none',
  });
  return res.status(200).json({
    status: 'success',
    code: 200,
    reminder: created,
  });
}
