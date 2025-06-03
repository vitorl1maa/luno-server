import { z } from "zod";

export const userValidation = z.object({
    email: z.string({ required_error: "Email é obrigatório" })
        .email("Email inválido"),

    password: z.string({ required_error: "Senha é obrigatória" })
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .max(20, "A senha deve ter no máximo 20 caracteres")
        .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
        .regex(/[0-9]/, "A senha deve conter pelo menos um número")
        .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um caractere especial"),
});

export type UserValidation = z.infer<typeof userValidation>;