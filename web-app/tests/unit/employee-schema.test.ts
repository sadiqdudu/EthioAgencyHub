import { describe, expect, it } from 'vitest';
import { employeeCreateSchema } from '@/lib/validations/employee.schema';

describe('employeeCreateSchema', () => {
  it('accepts a valid employee payload', () => {
    const result = employeeCreateSchema.safeParse({
      agencyId: 'agency-1',
      name: 'Mekdes Tesfaye',
      role: 'Caregiver',
      destination: 'UAE'
    });

    expect(result.success).toBe(true);
  });

  it('rejects missing agency and short name', () => {
    const result = employeeCreateSchema.safeParse({ agencyId: '', name: 'A' });

    expect(result.success).toBe(false);
  });
});
