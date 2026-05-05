import { z } from 'zod';

export const employeeCreateSchema = z.object({
  agencyId: z.string().min(1),
  name: z.string().min(2),
  role: z.string().optional(),
  destination: z.string().optional(),
  docPath: z.string().optional(),
  tgVideoId: z.string().optional()
});

export const employeeUploadSchema = z.object({
  name: z.string().min(2),
  agencyId: z.string().min(1)
});
