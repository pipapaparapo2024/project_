import { FC, useState } from "react";
import { useClothStore, style } from "../../../features/createCloth/CreateStore";
import { SpaceProps } from "../../../features/createCloth/CreateStore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

export const Space: FC = () => {
  const { spaceContainer, addSpace } = useClothStore();
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

    addSpace(newSpaceName); 
    handleClose(); 
  };

  return (
    <div>
      {spaceContainer.length === 0 ? (
        <div className="m-5">
          <div className="text-white pb-2">No spaces available</div>
          <Button variant="contained" onClick={handleOpen}>Create new space</Button>
        </div>
      ) : (
        <div>
          <div>
            {spaceContainer.map((Space: SpaceProps) => (
              <div className="mb-2">
                {Space.space}
              </div>
            ))}
          </div>
          <Button onClick={handleOpen}>Create new space</Button>
        </div>
      )}

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