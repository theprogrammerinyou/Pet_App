import zod from 'zod';

export const addUser = zod.object({
  name: zod.string(),
  emailId: zod.string(),
  password: zod.string(),
  contactNumber: zod.number(),
});

export const userIdValidation = zod.object({
  userId: zod.string(),
});
