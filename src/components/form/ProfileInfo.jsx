import React, { useState } from "react";
import Webcam from "react-webcam";
import FaceIcon from "@mui/icons-material/Face";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Typography } from "@mui/material";
import DialogWrapper from "../dialog/Dialog";
import { getImageReader } from "../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { updateMetaData } from "../../store/UserDetailsSlice";
import SignatureCanvas from "react-signature-canvas";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
const Profile = () => {
  const storeData = useSelector((state) => state.userDetails);
  const avatar = storeData.userData.meta.avatar
    ? storeData.userData.meta.avatar
    : "";
  const signature = storeData.userData.meta.signature
    ? storeData.userData.meta.signature
    : "";
  const [openCaptureDialog, setOpenCaptureDialog] = useState(false);
  const [openSignatureDialog, setOpenSignatureDialog] = useState(false);

  const dispatch = useDispatch();
  const webcamRef = React.useRef(null);
  const mousePadRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    const meta = {
      avatar: pictureSrc,
    };
    dispatch(updateMetaData({ meta }));
  });

  const handleUpload = async (event) => {
    const files = Array.from(event.target.files);
    const [file] = files;
    const image = await getImageReader(file);
    const meta = {
      avatar: image,
    };
    dispatch(updateMetaData({ meta }));
    // setPicture(image);
  };

  const resetAvatar = () => {
    const meta = {
      avatar: "",
    };
    dispatch(updateMetaData({ meta }));
  };

  const cameraDialog = (
    <DialogWrapper
      title={"Capture Photo"}
      open={openCaptureDialog}
      onSave={() => {}}
      onClose={() => setOpenCaptureDialog(false)}
    >
      <>
        <div className="captureForm">
          {avatar === "" ? (
            <Webcam
              audio={false}
              height={400}
              ref={webcamRef}
              width={400}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          ) : (
            <img src={avatar} alt="avatar" />
          )}
          {avatar !== "" ? (
            <Button
              onClick={(e) => {
                e.preventDefault();
                resetAvatar();
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
  );

  const setSignature = (data) => {
    const signature = mousePadRef.current
      ?.getTrimmedCanvas()
      .toDataURL("image/png");

    const meta = {
      signature,
    };

    dispatch(updateMetaData({ meta }));
  };

  const resetSignature = (e) => {
    e.preventDefault();
    mousePadRef.current?.clear();
    const meta = {
      signature: "",
    };

    dispatch(updateMetaData({ meta }));
  };

  const signatureDialog = (
    <DialogWrapper
      title={"Signature"}
      open={openSignatureDialog}
      onSave={() => {}}
      onClose={() => setOpenSignatureDialog(false)}
    >
      <>
        <div className="captureForm">
          <SignatureCanvas
            penColor="black"
            ref={mousePadRef}
            onEnd={setSignature}
            canvasProps={{
              width: 600,
              height: 400,
              className: "sigCanvas",
            }}
          />
          <Button onClick={resetSignature} variant="contained">
            Reset
          </Button>
        </div>
      </>
    </DialogWrapper>
  );

  return (
    <div className="profileInfoContainer">
      {cameraDialog}
      {signatureDialog}
      <div className="avatarContainer">
        {avatar !== "" ? (
          <>
            <img src={avatar} alt="avatar" width={"100px"} />
            <Button
              variant="contained"
              component="label"
              onClick={(e) => {
                e.preventDefault();
                resetAvatar();
              }}
              style={{
                width: "20px",
                height: "35px",
                display: "flex",
                alignSelf: "center",
              }}
            >
              <DeleteIcon />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              component="label"
              onClick={() => {
                resetAvatar();
                setOpenCaptureDialog(true);
              }}
            >
              <FaceIcon />
            </Button>
            <Button variant="contained" component="label">
              <DriveFolderUploadIcon />
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleUpload}
              />
            </Button>
          </>
        )}
      </div>
      <div className="signatureContainer">
        {signature === "" ? (
          <Button
            variant="contained"
            component="label"
            onClick={() => {
              setOpenSignatureDialog(true);
            }}
          >
            Signature
          </Button>
        ) : (
          <>
            <img
              src={signature}
              alt="signature"
              width={"100px"}
              height={"50px"}
            />
            <Button
              variant="contained"
              component="label"
              onClick={(e) => {
                e.preventDefault();
                resetSignature(e);
              }}
              style={{
                width: "20px",
                height: "35px",
                display: "flex",
                alignSelf: "center",
              }}
            >
              <DeleteIcon />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default Profile;
