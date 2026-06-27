import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  mobile: z.string()
    .min(10, 'Mobile number must be at least 10 digits')
    .regex(/^[0-9]+$/, 'Mobile number must contain only digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['super_admin', 'admin', 'staff', 'customer']),
  status: z.enum(['active', 'inactive']).optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  mobile: z.string().min(10).regex(/^[0-9]+$/).optional(),
  password: z.string().min(6).optional(),
  role: z.enum(['super_admin', 'admin', 'staff', 'customer']).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});
