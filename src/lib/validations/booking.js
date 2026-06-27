import { z } from 'zod';

export const createBookingSchema = z.object({
  location_id: z.number().int().positive(),
  slot_id: z.number().int().positive(),
  vehicle_number: z.string()
    .min(5, 'Invalid vehicle number')
    .regex(/^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,2}\s?\d{1,4}$/, 'Invalid Indian vehicle number format'),
  vehicle_type: z.enum(['car', 'bike', 'auto', 'bus', 'truck', 'ev']),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  start_time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  end_time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
});
