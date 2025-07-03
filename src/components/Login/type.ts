import { z } from 'zod';

export const loginSchema = z.object({
  role: z.string().min(1, 'Por favor seleccione un tipo de usuario'),
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const defaultLoginValues: LoginFormValues = {
  role: '',
  email: '',
  password: '',
};

//forgot password
export const forgotPasswordSchema = z.object({
  role: z.string().min(1, 'Por favor seleccione un tipo de usuario'),
  email: z.string().email('Correo electrónico inválido'),
  origin: z.string()
});

export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;

export const defaultForgotPasswordValues: ForgotPassword = {
  role: '',
  email: '',
  origin: 'web'
};