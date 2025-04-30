import { FC } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearchStore } from "./SearchClothStore";
import { style } from "./SearchClothStore";
export const SearchCloth: FC = () => {
  const { searchText, setSearchText } = useSearchStore();

  return (
    <>
      <input
        type="text"
        className="text-white border border-gray-500 rounded-md p-2"
        placeholder="Enter name.."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ClearIcon className={style} onClick={() => setSearchText("")} />
    </>
  );
};
