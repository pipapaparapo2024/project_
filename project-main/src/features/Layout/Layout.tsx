import { FC } from "react";
import { LayoutProps } from "./LayoutStore";
import { Header } from "../../widgets/header/Header";
import { NavChoice } from "../navChoice/NavChoice";

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex">
          <NavChoice/>
          {children}
      </div>
    </div>
  );
};
