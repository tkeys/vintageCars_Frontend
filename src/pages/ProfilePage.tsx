import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector(selectCurrentUser);
  return {
    /* <Box>
      <Typography variant="h2">Profile</Typography>
      <Typography variant="subtitle1">Hello {user.name}</Typography>
      <Typography variant="subtitle1">Email: {user.email}</Typography>
    </Box> */
  };
};

export default ProfilePage;
function selectCurrentUser(state: unknown): unknown {
  throw new Error("Function not implemented.");
}
