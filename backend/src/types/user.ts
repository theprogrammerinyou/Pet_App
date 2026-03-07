import zod from 'zod';

export const addUser = zod.object({
  name: zod.string(),
  emailId: zod.string().email(),
  password: zod.string().min(6),
  contactNumber: zod.union([zod.string(), zod.number()]).transform(String),
});

export const loginBody = zod.object({
  emailId: zod.string(),
  password: zod.string(),
});

export const userIdValidation = zod.object({
  userId: zod.string(),
});
