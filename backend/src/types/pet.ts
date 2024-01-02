import zod from 'zod';

export const addPet = zod.object({
  name: zod.string(),
  category: zod.string(),
  breed: zod.string(),
});

export const petIdValidation = zod.object({
  petId: zod.string(),
});
