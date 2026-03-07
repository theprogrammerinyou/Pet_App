import zod from 'zod';

export const addPet = zod.object({
  userId: zod.string(),
  name: zod.string(),
  category: zod.string().optional(),
  breed: zod.string().optional(),
  gender: zod.string().optional(),
  weight: zod.number().optional(),
});

export const petIdValidation = zod.object({
  petId: zod.string(),
});

export const getPetsByUserBody = zod.object({
  userId: zod.string(),
});
