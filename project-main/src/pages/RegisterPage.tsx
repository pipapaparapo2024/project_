import { FC } from "react";
import { RegisterForm } from "../widgets/registerForm/RegisterForm";

export const RegisterPage: FC = () => {
  return (
    <div className="pt-60 bg-gray-600 h-[100vh]">
      <RegisterForm />
    </div>
  );
};
