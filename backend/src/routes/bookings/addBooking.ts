import {Response} from 'express';
import {bookingsModel} from '../../database/db';
import {AuthRequest} from '../../middleware/auth';

export async function addBookingRoute(req: AuthRequest, res: Response) {
  const userId = req.userId;
  const {bookingType, providerId, providerName, date, time, petId, petName, notes} = req.body;

  if (!userId) {
    return res.status(401).json({ status: 'fail', code: 401, message: 'Unauthorized' });
  }
  if (!bookingType || !providerName) {
    return res.status(400).json({
      status: 'fail',
      code: 400,
      message: 'bookingType and providerName are required',
    });
  }

  const created = await bookingsModel.create({
    userId,
    bookingType: String(bookingType),
    providerId: providerId ? String(providerId) : '',
    providerName: String(providerName),
    date: date ? String(date) : new Date().toISOString().split('T')[0],
    time: time ? String(time) : '09:00',
    petId: petId ? String(petId) : '',
    petName: petName ? String(petName) : '',
    notes: notes ? String(notes) : '',
  });

  return res.status(200).json({
    status: 'success',
    code: 200,
    booking: created,
  });
}
