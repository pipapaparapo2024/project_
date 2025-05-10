import { FC } from "react";
import { Cloth } from "../createCloth/CreateStore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useClothStore } from "../createCloth/CreateStore";
import { useSearchStore } from "../SearchCloth/SearchClothStore";

export const OutputClothes: FC = () => {
  const{deleteCloth,clothes}=useClothStore();
  const { searchText } = useSearchStore();
  const searchClothes = clothes.filter((cloth) =>
    cloth.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div>
      {searchClothes.map((cloth:Cloth) => (
        <div className="border-1 p-1 mb-1 border-black grid grid-cols-3 rounded-lg">
          <img src={cloth.photoUrl} />
          <div>
            <span>{cloth.name}</span>
            <span>{cloth.size}</span>
            <span>{cloth.type}</span>
            <span>{cloth.place}</span>
          </div>
          <EditIcon onClick={() => console.log("")} />
          <DeleteIcon onClick={() => deleteCloth(cloth.id!)} />
        </div>
        ))}
    </div>
  );
};


