import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().min(1, "El email es requerido").email("Email no válido"),
  countryCode: z.string().min(1, "Código de país requerido"),
  phone: z.string().min(1, "Teléfono es requerido"),
  country: z.string().min(1, "El país es requerido"),
  city: z.string().min(1, "La ciudad es requerida"),
  address: z.string().min(1, "La dirección es requerida"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/[@$!%*?&]/, "Debe contener al menos un carácter especial (@$!%*?&)"),
});

export type RegisterFormValues = z.infer<typeof loginSchema>;

export const defaultLoginValues: RegisterFormValues = {
  name: "",
  email: "",
  countryCode: "+58",
  phone: "",
  country: "",
  city: "",
  address: "",
  password: "",
};