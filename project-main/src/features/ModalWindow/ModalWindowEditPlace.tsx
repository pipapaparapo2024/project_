import { FC,useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { style } from "../createCloth/CreateStore";

interface ModalWindowEditPlaceProps {
  open: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
  initialPlaceName: string;
}

export const ModalWindowEditPlace: FC<ModalWindowEditPlaceProps> = ({
  open,
  onClose,
  onSave,
  initialPlaceName,
}) => {
  const [editValue, setEditValue] = useState(initialPlaceName);

  const handleSave = () => {
    onSave(editValue);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-place-modal"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          Edit Place
        </Typography>
        <TextField
          fullWidth
          label="Place name"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          sx={{ mb: 2 }}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
};