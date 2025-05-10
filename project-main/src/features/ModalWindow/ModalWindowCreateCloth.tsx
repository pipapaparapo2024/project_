import { useState, useEffect, FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useClothStore } from "../createCloth/CreateStore";
import { SelectWindow } from "../createCloth/SelectWindow";
import { style } from "../createCloth/CreateStore";

export const ModalWindowCreateCloth: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    placeContainer,
    getClothes,
    typeContainer,
    name,
    photoUrl,
    size,
    setName,
    setPhotoUrl,
    setSize,
    setType,
    setPlace,
    handleSubmit,
  } = useClothStore();
  useEffect(() => {
    getClothes();
  }, []);
  
  const formattedSpaceContainer = placeContainer.map((place) => ({
    id: place.id,
    value: place.place,
  }));
  const formattedTypeContainer = typeContainer.map((type) => ({
    id: type.id,
    value: type.type,
  }));

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create cloth
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
                handleClose();
              }}
            >
              <TextField
                label="Name"
                placeholder="Enter name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Photo URL"
                placeholder="Enter photoUrl..."
                value={photoUrl || ""}
                onChange={(e) => setPhotoUrl(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Size"
                placeholder="Enter size..."
                value={size}
                onChange={(e) => setSize(e.target.value)}
                fullWidth
                margin="normal"
              />

              <SelectWindow
                name="Type"
                selectValue={formattedTypeContainer}
                onChange={(value) => setType(value)}
              />

              <SelectWindow
                name="Space"
                selectValue={formattedSpaceContainer}
                onChange={(value) => setPlace(value)}
              />

              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
