import { Button, Card } from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch } from "react-redux";
import { resetStore } from "../../store/UserDetailsSlice";

export default function SuccessPage() {
  const dispatch = useDispatch();
  const handleCompletRegistration = () => {
    localStorage.removeItem("userId");
    dispatch(resetStore());
  };
  return (
    <div className="successPage">
      <Card sx={{ width: 600, height: 400 }} className="successPageCard">
        <span className="successIcon">
          <CheckCircleOutlineIcon sx={{ width: 100, height: 100 }} />
        </span>
        <h1>Success</h1>
        <h2>Your application has been submitted</h2>
        <Button
          size="small"
          variant="contained"
          style={{ background: "#EE1B25", width: "7rem", padding: "1rem" }}
          onClick={handleCompletRegistration}
        >
          Ok
        </Button>
      </Card>
    </div>
  );
}
