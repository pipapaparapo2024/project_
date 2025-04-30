import { FC, useState } from "react";
import { TypeProps } from "../../../features/createCloth/CreateStore";
import { useClothStore, style } from "../../../features/createCloth/CreateStore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

export const Type: FC = () => {
  const { typeContainer,addType } = useClothStore();
  const [open, setOpen] = useState(false);
  const [newTypeName, setNewTypeName] = useState(""); 

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewTypeName(""); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!newTypeName.trim()) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    addType(newTypeName); 
    handleClose(); 
  };

  return (
    <div>
      {typeContainer.length === 0 ? (
        <div className="m-5">
          <div className="text-white pb-2">No types available</div>
          <Button variant="contained" onClick={handleOpen}>Create new type</Button>
        </div>
      ) : (
        <div>
          <div>
            {typeContainer.map(( Type: TypeProps) => (
              <div className="mb-2">
                {Type.type}
              </div>
            ))}
          </div>
          <Button onClick={handleOpen}>Create new type</Button>
        </div>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Create New Type
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              placeholder="Enter name..."
              value={newTypeName}
              onChange={(e) => setNewTypeName(e.target.value)}
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