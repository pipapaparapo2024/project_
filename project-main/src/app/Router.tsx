import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import {TypePage} from '../pages/TypePage'
import {WeardropPage} from '../pages/WeardropPage'
import {SpacePage} from '../pages/SpacePage'
import { RegisterPage } from "../pages/RegisterPage";
import { StaticRoutes } from "./app";
export const Router: FC = () => {


  return (
    <div className="bg-gray-500 py-1">
      <Routes>
        <Route path={StaticRoutes.Home} element={<HomePage />}></Route>
        <Route path={StaticRoutes.Login} element={<LoginPage />}></Route>
        <Route path={StaticRoutes.Register} element={<RegisterPage />}></Route>
        <Route path={StaticRoutes.Space} element={<SpacePage />}></Route>
        <Route path={StaticRoutes.Weardrop} element={<WeardropPage />}></Route>
        <Route path={StaticRoutes.Type} element={<TypePage />}></Route>
      </Routes>
    </div>
  );
};

