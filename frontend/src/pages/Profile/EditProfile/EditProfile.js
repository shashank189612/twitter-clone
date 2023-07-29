import React, { useState } from "react";
import "./EditProfile.css";
import { Box, IconButton, Modal, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import axios from "axios";
import MainPage from "../MainPage/MainPage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 8,
};

function EditChild({ dob, setDob }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="birthDate-section" onClick={handleOpen}>
        <button>Edit</button>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 400 }}>
          <div className="text">
            <h2>Edit date of birth</h2>
            <p>
              this can only be change a few times .<br />
              make sure you enter the age of the <br />
              person using account
            </p>
            <input type="date" onChange={(e) => setDob(e.target.value)} />
            <Button
              className="e-button"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function EditProfile({ user, loggedInUser }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(" ");
  const [bio, setBio] = useState(" ");
  const [location, setLocation] = useState(" ");
  const [website, setWebsite] = useState(" ");
  const [dob, setDob] = useState("  ");

  const handleSave = async () => {
    const editedInfo = {
      name,
      bio,
      location,
      website,
      dob,
    };

    if (editedInfo) {
      await axios.patch(
        `http://localhost:5000/userUpdates/${user?.email}`,
        editedInfo
      );
      setOpen(false);
    }
  };

  const loggedInUserName = loggedInUser[0]?.name ? loggedInUser[0]?.name : " ";
  const loggedInUserBio = loggedInUser[0]?.bio ? loggedInUser[0]?.bio : " ";
  const loggedInUserLocation = loggedInUser[0]?.location
    ? loggedInUser[0]?.location
    : " ";
  const loggedInUserWebsite = loggedInUser[0]?.website
    ? loggedInUser[0]?.website
    : " ";

  // const loggedInUserName = loggedInUser?.[0]?.name || "";
  // const loggedInUserBio = loggedInUser?.[0]?.bio || "";
  // const loggedInUserLocation = loggedInUser?.[0]?.location || "";
  // const loggedInUserWebsite = loggedInUser?.[0]?.website || "";
  return (
    <div>
      <button
        className="Edit-profile-btn infoContainer"
        onClick={() => setOpen(true)}
      >
        Edit Profile
      </button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => setOpen(false)}
      >
        <Box sx={style} className="modal">
          <div className="header">
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
            <h2 className="header-title">Edit Profile</h2>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
          <form className="fill-content">
            <TextField
              className="text-field"
              fullWidth
              label="Name"
              variant="filled"
              onChange={(e) => setName(e.target.value)}
              defaultValue={loggedInUserName}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Bio"
              variant="filled"
              onChange={(e) => setBio(e.target.value)}
              defaultValue={loggedInUserBio}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Location"
              variant="filled"
              onChange={(e) => setLocation(e.target.value)}
              defaultValue={loggedInUserLocation}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Website"
              variant="filled"
              onChange={(e) => setWebsite(e.target.value)}
              defaultValue={loggedInUserWebsite}
            />
          </form>
          <div className="birthdate-section">
            <p>Birth Date</p>
            <p>.</p>
            <EditChild dob={dob} setDob={setDob} />
          </div>
          <div className="Last-section">
            {loggedInUser?.[0]?.dob ? (
              <h2>{loggedInUser[0].dob}</h2>
            ) : (
              <h2>{dob ? dob : "Add your date of birth"}</h2>
            )}

            <div className="Last-btn">
              <h2>Switch to professional</h2>
              <ChevronRightIcon />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
