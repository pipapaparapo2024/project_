import { FC, useState } from "react";
import { useClothStore } from "../../features/createCloth/CreateStore";
import { PlaceProps } from "../../features/createCloth/CreateStore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ModalWindowEditPlace } from "../../features/ModalWindow/ModalWindowEditPlace";
export const OutputPlaces: FC = () => {
  const { placeContainer, editPlace, deletePlace } = useClothStore();
  const [editingPlace, setEditingPlace] = useState<PlaceProps | null>(null);

  const handleEditClick = (place: PlaceProps) => {
    setEditingPlace(place);
  };

  const handleCloseModal = () => {
    setEditingPlace(null);
  };

  const handleSaveEdit = (newPlaceName: string) => {
    if (editingPlace) {
      editPlace(editingPlace.id, newPlaceName);
      handleCloseModal();
    }
  };

  return (
    <>
      {placeContainer.length === 0 ? (
        <div className="m-5 text-white pb-2">No spaces available</div>
      ) : (
        <div>
          {placeContainer.map((Place: PlaceProps) => (
            <div
              key={Place.id}
              className="border-1 p-1 mb-1 border-black grid grid-cols-3 rounded-lg items-center"
            >
              <span>{Place.place}</span>
              <div className="flex justify-end gap-2">
                <EditIcon
                  onClick={() => handleEditClick(Place)}
                  className="cursor-pointer hover:text-blue-500"
                />
                <DeleteIcon
                  onClick={() => deletePlace(Place.id)}
                  className="cursor-pointer hover:text-red-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {editingPlace && (
        <ModalWindowEditPlace
          open={!!editingPlace}
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
          initialPlaceName={editingPlace.place}
        />
      )}
    </>
  );
};
