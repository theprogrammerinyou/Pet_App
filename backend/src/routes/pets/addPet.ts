import {Request, Response} from 'express';
import {petsModel} from '../../database/db';
import {addPet} from '../../types/pet';

export async function addPetRoute(req: Request, res: Response) {
  const {name, category, breed, gender, petImg, dob, weight} = req.body;
  const createUserPayload = addPet.safeParse({
    name,
    category,
    breed,
  });

  if (!createUserPayload.success) {
    res.status(411).json({
      status: 'fail',
      code: 411,
      message: 'Please enter correct inputs to add pet',
    });
  } else {
    await petsModel.create({
      name,
      category,
      breed,
      gender,
      petImg,
      dob,
      weight,
    });

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Added pet to DB',
    });
  }
}
