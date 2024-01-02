import {petIdValidation} from './../../types/pet';
import {Request, Response} from 'express';
import {petsModel} from '../../database/db';

async function deletePetRoute(req: Request, res: Response) {
  const {petId} = req.body;
  const deletePayPayload = petIdValidation.safeParse({petId});
  if (!deletePayPayload.success) {
    res.status(411).json({
      status: 'fail',
      code: 411,
      msg: 'Please send pet id to delete pet',
    });
  } else {
    await petsModel.deleteOne({
      _id: petId,
    });

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Deleted pet from DB',
    });
  }
}

export {deletePetRoute};
