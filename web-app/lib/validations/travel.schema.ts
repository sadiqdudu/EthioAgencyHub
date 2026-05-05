import { z } from 'zod';

export const travelCreateSchema = z.object({
  employeeId: z.string().min(1),
  destination: z.string().min(1),
  departureAt: z.coerce.date(),
  ticket: z.string().optional()
});

export const travelUpdateSchema = z.object({
  destination: z.string().min(1).optional(),
  departureAt: z.coerce.date().optional(),
  ticket: z.string().optional(),
  status: z.enum(['SCHEDULED', 'TICKETED', 'READY', 'DEPARTED', 'ARRIVED', 'CANCELLED']).optional()
});
