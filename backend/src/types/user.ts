import zod from 'zod';

export const addUser = zod.object({
  name: zod.string(),
  emailId: zod.string(),
  password: zod.string(),
  contactNumber: zod.number(),
});

export const updateUser = zod.object({
  id: zod.string(),
});

export const deleteUser = zod.object({
  userId: zod.string(),
});
