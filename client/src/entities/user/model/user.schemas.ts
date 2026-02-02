import z from 'zod';

export const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  desc: z.string()
});

export const RegisterFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  desc: z.string()
});


export const LoginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});
