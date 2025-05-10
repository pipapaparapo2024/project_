import { FC } from "react";

import { OutputClothes } from "../../../features/output/OutputClothes"
import { ModalWindowCreateCloth } from "../../../features/ModalWindow/ModalWindowCreateCloth";
import { SearchCloth } from "../../../features/SearchCloth/SearchCloth";

export const Weardrop: FC = () => {
  return (
    <div className="m-5">
      <div className="pb-2">
        <SearchCloth />
        <OutputClothes />
      </div>
      <ModalWindowCreateCloth />
    </div>
  );
};
