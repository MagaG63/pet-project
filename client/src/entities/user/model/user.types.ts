import type z from 'zod';
import type { LoginFormSchema, RegisterFormSchema, UserSchema } from './user.schemas';

export type User = z.infer<typeof UserSchema>;
export type RegisterForm = z.infer<typeof RegisterFormSchema>;
export type LoginForm = z.infer<typeof LoginFormSchema>

export type UserState = {
  user: User | null;
  accessToken: string | null
  loading: boolean;
};
