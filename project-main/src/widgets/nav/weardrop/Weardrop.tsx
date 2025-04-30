import { FC } from "react";

import { Card } from "../../../entities/Card";
import { useClothStore } from "../../../features/createCloth/CreateStore";
import { useSearchStore } from "../../../features/SearchCloth/SearchClothStore";
import { MenuCreateCloth } from "../../../features/menuCreateCloth/MenuCreateCloth";
import { SearchCloth } from "../../../features/SearchCloth/SearchCloth";

export const Weardrop: FC = () => {
  const { clothes } = useClothStore();
  const { searchText } = useSearchStore();
  const searchClothes = clothes.filter((cloth) =>
    cloth.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="m-5">
      <div className="pb-2">
        <SearchCloth />
        {searchClothes.map((cloth) => (
          <Card cloth={cloth} />
        ))}
      </div>
      <MenuCreateCloth />
    </div>
  );
};
