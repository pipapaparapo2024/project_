import { FC } from "react";
import { OutputPlaces } from "../../../features/output/OutputPlaces";
import { ModalWindowCreatePlace } from "../../../features/ModalWindow/ModalWindowCreatePlace";

export const Space: FC = () => {
  return (
    <>
      <OutputPlaces />
      <ModalWindowCreatePlace />
    </>
  );
};
