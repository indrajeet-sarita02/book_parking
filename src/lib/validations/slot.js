import { z } from 'zod';

export const createSlotSchema = z.object({
  location_id: z.number().int().positive(),
  slot_number: z.string().min(1, 'Slot number is required'),
  floor: z.string().optional(),
  vehicle_type: z.enum(['car', 'bike', 'auto', 'bus', 'truck', 'ev']),
  price_per_hour: z.number().positive('Price must be positive'),
});
