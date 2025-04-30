// import { toast } from "react-toastify";
import axios from "axios";
import { z } from "zod";
const api = axios.create({ baseURL: "http://82.147.85.20:8080/api" });

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

const registerSchema = loginSchema.extend({
  username: z.string().min(3, "Имя пользователя должно быть не меньше 3 символов"),
});

export interface LoginFormData {
  username?: string;
  email: string;
  password: string;
}

interface LoginUserResponce {
  token: string;

}
export const loginUser = (userData: LoginFormData) => {
  return Promise.resolve()
    .then(() => {
      const validatedData = loginSchema.parse(userData);
      return api.post<LoginUserResponce>("/auth/login", validatedData);
    })
    .then(({ data }) => {
      localStorage.setItem("jwtToken", data.token);
    })
    .catch((error) => {
      if (error instanceof z.ZodError) {
        const messages = error.errors.map((err) => err.message).join(", ");
        throw new Error(messages);
      }

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Ошибка при входе";
        throw new Error(message);
      }

      throw new Error("Неизвестная ошибка");
    });
};

export const registerUser = (userData: LoginFormData) => {
  return Promise.resolve()
    .then(() => {
      const validatedData = registerSchema.parse(userData);
      return api.post<LoginUserResponce>("/auth/register", validatedData);
    })
    .then(({ data }) => {
      localStorage.setItem("jwtToken", data.token);
    })
    .catch((error) => {
      if (error instanceof z.ZodError) {
        const messages = error.errors.map((err) => err.message).join(", ");
        throw new Error(messages);
      }

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Ошибка при регистрации";
        throw new Error(message);
      }

      throw new Error("Неизвестная ошибка");
    });
};

export const logoutUser = () => {
  localStorage.removeItem("jwtToken");
};

//   toast.info("Вы успешно вышли из системы.", {
//     position: "top-left",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   });


