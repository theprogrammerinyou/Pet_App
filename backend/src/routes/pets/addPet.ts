import {Response} from 'express';
import {petsModel} from '../../database/db';
import {addPet} from '../../types/pet';
import {AuthRequest} from '../../middleware/auth';

export async function addPetRoute(req: AuthRequest, res: Response) {
  const userId = req.userId;
  const {name, category, breed, gender, petImg, dob, weight} = req.body;

  if (!userId) {
    return res
      .status(401)
      .json({status: 'fail', code: 401, message: 'Unauthorized'});
  }

  const parsed = addPet.safeParse({
    userId,
    name,
    category: category ?? '',
    breed: breed ?? '',
    gender,
    weight,
  });

  if (!parsed.success) {
    return res.status(400).json({
      status: 'fail',
      code: 400,
      message: 'Please send name to add pet',
    });
  }

  const created = await petsModel.create({
    userId,
    name: parsed.data.name,
    category: parsed.data.category ?? '',
    breed: parsed.data.breed ?? '',
    gender: gender ?? '',
    petImg: petImg ?? '',
    dob: dob ? new Date(dob) : undefined,
    weight: parsed.data.weight,
  });

  return res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Added pet to DB',
    pet: created,
  });
}
