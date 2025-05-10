import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

export const registerSchema = loginSchema.extend({
  username: z.string().optional(), // 👈 Делаем необязательным
  // username: z.string().min(3, "Имя пользователя должно быть не меньше 3 символов"),
});