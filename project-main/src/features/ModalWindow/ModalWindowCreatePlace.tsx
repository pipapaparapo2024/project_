import { FC } from "react";
import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useClothStore } from "../createCloth/CreateStore";
import { style } from "../createCloth/CreateStore";

export const ModalWindowCreatePlace: FC = () => {
  const { addPlace } = useClothStore();

  const [open, setOpen] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewSpaceName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newSpaceName.trim()) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    addPlace(newSpaceName);
    handleClose();
  };
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create new space
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Create New Space
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              placeholder="Enter name..."
              value={newSpaceName}
              onChange={(e) => setNewSpaceName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
