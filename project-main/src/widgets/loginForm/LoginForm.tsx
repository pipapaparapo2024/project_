import { FC } from "react";
import "../../app/index.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { LoginFormData } from "../../entities/User/useUserSlice";
import { useUserStore } from "../../entities/User/useUserSlice";
import { useNavigate } from "react-router-dom";

export const LoginForm: FC = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const {loginUser}=useUserStore();
  const navigate = useNavigate();

  const onSubmit = async (User: LoginFormData) => {
    loginUser(User)
      .then(() => {
        navigate("/");
        toast.success("Авторизация прошла успешно");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="border-5-800 border rounded-lg p-3 bg-gray-800 h-[260px] w-[300px] mx-auto">
      <div className="flex justify-around">
        <Button variant="contained" sx={{margin:"8px 0px",padding:"8px 30px"}} onClick={()=>navigate("/Login")}>Login</Button>
        <Button variant="contained" sx={{margin:"8px 0px",padding:"8px 30px"}} onClick={()=>navigate("/Register")}>Register</Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <input
            className="border rounded-sm p-2 m-2 pr-17 text-white"
            {...register("email")}
            type="email"
            placeholder="Email"
          />
          <input
            className="border rounded-sm p-2 m-2 pr-17 text-white"
            {...register("password")}
            type="password"
            placeholder="Password"
          />
        </section>
        <button
          className="cursor-pointer hover:scale-105 transition duration-300 text-white p-2 w-65 rounded-sm bg-green-500 font-bold p-1 m-2 text-[20px]"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};
