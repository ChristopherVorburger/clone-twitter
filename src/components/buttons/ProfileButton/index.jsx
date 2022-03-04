import React from "react";

import { IconButton } from "@mui/material";

import { icons } from "../../../constants";

const ProfileButton = () => {
  return (
    <div>
      <IconButton
        data-testid="profileButton"
        size="large"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <icons.AccountCircleIcon
          sx={{ color: "grey.main", transform: "scale(1.5)" }}
        />
      </IconButton>
    </div>
  );
};

export default ProfileButton;
