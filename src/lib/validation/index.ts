// Purpose: Contains all the form validation rules.
import * as z from 'zod';

// Contains all the form validation rules.
export const SignUpValidation = z.object({
  name: z.string().min(2, { message: 'Too short' }).max(50),
  username: z
    .string()
    .min(2, { message: 'Username choice is too short' })
    .max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password Must be atleast 8 characters.' }),
});

// Contains all the form validation rules.
export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password Must be atleast 8 characters.' }),
});

export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});
