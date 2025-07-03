import { z } from "zod";

const passwordRules = z
  .string()
  .min(6, "La contraseña debe tener al menos 6 caracteres")
  .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
  .regex(/[a-z]/, "Debe contener al menos una minúscula")
  .regex(/[@$!%*?&]/, "Debe contener al menos un carácter especial (@$!%*?&)");

export const resetPasswordSchema = z
  .object({
    password: passwordRules,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export const defaultResetPasswordValues: ResetPasswordForm = {
  password: "",
  confirmPassword: "",
};
