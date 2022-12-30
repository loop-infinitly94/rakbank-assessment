import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function NotificationHandler() {
  const isLoading = useSelector((state) => state.userDetails).status;
  const errorMessage = useSelector((state) => state.userDetails).error;
  const currentStep = useSelector((state) => state.userDetails).userData.meta
    .currentStep;
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (isLoading === "success" || isLoading === "failed") {
      setOpenSnackbar(true);
    }
  }, [currentStep, isLoading]);

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {isLoading === "success" ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {currentStep === 1 ? "User Data Added" : "User Data Updated"}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
