import {Request, Response} from 'express';
import {petIdValidation} from '../../types/pet';
import {petsModel} from '../../database/db';

export async function getPetRoute(req: Request, res: Response) {
  const {petId} = req.body;
  const idValidation = petIdValidation.safeParse({petId});
  if (!idValidation.success) {
    res.status(411).json({
      status: 'fail',
      code: 411,
      message: 'Please enter pet id to get pet details',
    });
  } else {
    const pets = await petsModel.find({_id: petId});
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Got pets from DB',
      pets,
    });
  }
}
