import {petIdValidation} from './../../types/pet';
import {petsModel} from '../../database/db';
import {Request, Response} from 'express';

export async function editPetRoute(req: Request, res: Response) {
  const {petId, name, petImg, weight, dob, gender, category, breed} = req.body;
  const updateUserPayload = petIdValidation.safeParse({petId});

  if (!updateUserPayload.success) {
    res.status(411).json({
      status: 'fail',
      code: 411,
      message: 'Please send user id to udpate pet',
    });
  } else {
    await petsModel.updateOne(
      {_id: petId},
      {
        name,
        petImg,
        weight,
        dob,
        gender,
        category,
        breed,
      },
    );

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Upated pet successfully',
    });
  }
}
