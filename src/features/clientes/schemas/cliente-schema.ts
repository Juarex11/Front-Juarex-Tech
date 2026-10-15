import { z } from 'zod';

export const clienteSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  telefono: z.string().optional(),
});

export type ClienteFormData = z.infer<typeof clienteSchema>;