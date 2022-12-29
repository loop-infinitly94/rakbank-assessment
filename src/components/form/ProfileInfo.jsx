import React, { useState } from "react";
import Webcam from "react-webcam";
import FaceIcon from "@mui/icons-material/Face";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { Button, Typography } from "@mui/material";
import DialogWrapper from "../dialog/Dialog";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
const Profile = () => {
  const [picture, setPicture] = useState("");
  const [openCaptureDialog, setOpenCaptureDialog] = useState(false);
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  });

  return (
    <div className="profileInfoContainer">
      <DialogWrapper
        title={"Capture Photo"}
        open={openCaptureDialog}
        onSave={() => {}}
        onClose={() => setOpenCaptureDialog(false)}
      >
        <>
          <div className="captureForm">
            {picture === "" ? (
              <Webcam
                audio={false}
                height={400}
                ref={webcamRef}
                width={400}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
            ) : (
              <img src={picture} alt="avatar" />
            )}
            {picture !== "" ? (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setPicture("");
                }}
                variant="contained"
              >
                Retake
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  capture();
                }}
                variant="contained"
              >
                Capture
              </Button>
            )}
          </div>
        </>
      </DialogWrapper>
      <div className="avatarContainer">
        {picture !== "" ? (
          <>
            <img src={picture} alt="avatar" width={"100px"} />
          </>
        ) : (
          <span
            onClick={() => {
              console.log();
              setPicture("");
              setOpenCaptureDialog(true);
            }}
          >
            <FaceIcon />
          </span>
        )}

        <span>
          <DriveFolderUploadIcon />
        </span>
      </div>
      <div className="signatureContainer">
        <Typography>Signature</Typography>
      </div>
    </div>
  );
};
export default Profile;
