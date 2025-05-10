import { FC, useState } from "react";
import { useClothStore } from "../../features/createCloth/CreateStore";
import { TypeProps } from "../../features/createCloth/CreateStore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ModalWindowEditType } from "../../features/ModalWindow/ModalWindowEditType";

export const OutputTypes: FC = () => {
  const { typeContainer, editType, deleteType } = useClothStore();
  const [editingType, setEditingType] = useState<TypeProps | null>(null);

  const handleEditClick = (type: TypeProps) => {
    setEditingType(type);
  };

  const handleCloseModal = () => {
    setEditingType(null);
  };

  const handleSaveEdit = (newTypeName: string) => {
    if (editingType) {
      editType(editingType.id, newTypeName);
      handleCloseModal();
    }
  };

  return (
    <>
      {typeContainer.length === 0 ? (
        <div className="m-5 text-white pb-2">No types available</div>
      ) : (
        <div>
          {typeContainer.map((Type: TypeProps) => (
            <div
              key={Type.id}
              className="border-1 p-1 mb-1 border-black grid grid-cols-3 rounded-lg"
            >
              <span>{Type.type}</span>
              <div className="flex justify-end gap-2">
                <EditIcon onClick={() => handleEditClick(Type)} />
                <DeleteIcon onClick={() => deleteType(Type.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
      {editingType && (
        <ModalWindowEditType
          open={!!editingType}
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
          initialTypeName={editingType.type}
        />
      )}
    </>
  );
};
