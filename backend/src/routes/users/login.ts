import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import {loginBody} from '../../types/user';
import {usersModel} from '../../database/db';
import {getToken} from '../../middleware/auth';

export async function loginRoute(req: Request, res: Response) {
  const parsed = loginBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      status: 'fail',
      code: 400,
      message: 'Invalid email or password',
    });
  }
  const {emailId, password} = parsed.data;
  const user = await usersModel.findOne({emailId}).lean();
  if (!user) {
    return res.status(401).json({
      status: 'fail',
      code: 401,
      message: 'Invalid email or password',
    });
  }
  const match = await bcrypt.compare(password, (user as any).password);
  if (!match) {
    return res.status(401).json({
      status: 'fail',
      code: 401,
      message: 'Invalid email or password',
    });
  }
  const token = getToken(String((user as any)._id));
  return res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Logged in',
    token,
    user: {
      _id: (user as any)._id,
      fullName: (user as any).fullName,
      emailId: (user as any).emailId,
      contactNumber: (user as any).contactNumber,
      userImg: (user as any).userImg,
    },
  });
}
