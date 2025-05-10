import { FC } from "react";
import { ModalWindowCreateType } from "../../../features/ModalWindow/ModalWindowCreateType";
import { OutputTypes } from "../../../features/output/OutputTypes";

export const Type: FC = () => {
  return (
    <>
      <OutputTypes />
      <ModalWindowCreateType />
    </>
  );
};
