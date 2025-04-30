import { FC, useEffect } from "react";

import { useClothStore } from "../../features/createCloth/CreateStore";
import { ModalWindowCreateCloth } from "../createCloth/ModalWindowCreateCloth";

export const MenuCreateCloth: FC = () => {
  const { getClothes } = useClothStore();

  useEffect(() => {
    getClothes();
  }, []);

  return (
    <>
      <ModalWindowCreateCloth />
    </>
  );
};
