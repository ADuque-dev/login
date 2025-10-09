import { z } from "zod";

export const loginSchema = z.object({
  name: z.string({ required_error: "El nombre es requerido" }).min(1, "El nombre es requerido"),
  email: z.string({ required_error: "El email es requerido" }).min(1, "El email es requerido").email("Email no válido"),
  countryCode: z.string({ required_error: "Código de país requerido" }).min(1, "Código de país requerido"),
  phone: z.string({ required_error: "El teléfono es requerido" }).min(1, "El teléfono es requerido"),
  country: z.string({ required_error: "El país es requerido" }).min(1, "El país es requerido"),
  city: z.string({ required_error: "La ciudad es requerida" }).min(1, "La ciudad es requerida"),
  address: z.string({ required_error: "La dirección es requerida" }).min(1, "La dirección es requerida"),
  password: z
    .string({ required_error: "La contraseña es requerida" })
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