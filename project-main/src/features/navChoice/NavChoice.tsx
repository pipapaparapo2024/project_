import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
export const NavChoice: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="my-3 bg-gray-800 text-white h-100 w-45 rounded-lg p-3 flex flex-col">
      <div className="pb-2">
        <Button
        sx={{margin:"10px 0px"}}
        onClick={() => navigate("/Weardrop")}
        variant="contained"
        >
          Weardrop
        </Button>
      </div>
      <div className="pb-2">
        <Button
          sx={{margin:"10px 0px"}}
          className="p-5"
          onClick={() => navigate("/Type")}
          variant="contained"
          >
          Type
        </Button>
      </div>
      <div>
        <Button
          sx={{margin:"10px 0px"}}
          className="p-5"
          onClick={() => navigate("/Space")}
          variant="contained"
        >
          Space
        </Button>
      </div>
    </div>
  );
};
