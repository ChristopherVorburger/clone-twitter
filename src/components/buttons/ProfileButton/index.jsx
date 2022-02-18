import React from "react";

import { IconButton } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfileButton = () => {
  return (
    <div>
      <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
        <AccountCircleIcon
          sx={{ color: "grey.main", transform: "scale(1.5)" }}
        />
      </IconButton>
    </div>
  );
};

export default ProfileButton;
