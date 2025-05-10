import { FC } from "react";
import { LayoutProps } from "./LayoutStore";
import { Header } from "../../widgets/header/Header";
import { NavChoice } from "../navChoice/NavChoice";
import { Button } from "@mui/material";
import { useUserStore } from "../../entities/User/useUserSlice";

export const Layout: FC<LayoutProps> = ({ children }) => {
  const {logout}=useUserStore();
  return (
    <div className="h-screen mx-40">
      <Header />
      <div className="flex">
          <NavChoice/>
          {children}
      </div>
      <Button onClick={()=>logout()} variant="contained">exit</Button>
    </div>
  );
};
