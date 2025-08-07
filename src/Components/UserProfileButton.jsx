"use client"
import { useState } from "react";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";

const UserProfileButton = ({ getemail, getusername, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const firstLetter = getusername ? getusername[0].toUpperCase() : "?";

  return (
    <div className="flex justify-end items-center space-x-2">
      <Button
        onClick={handleMenuClick}
        variant="outlined"
        className="flex items-center px-4 py-2 space-x-2 text-sm text-white-800 rounded-md bg-white shadow-md hover:bg-gray-100"
      >
        <span className="text-sm text-white">{getemail}</span>
        <Avatar
          sx={{
            width: 30,
            height: 30,
            fontSize: "1rem",
            bgcolor: "#1976d2",
          }}
        >
          {firstLetter}
        </Avatar>
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserProfileButton;
