import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import { Icon } from "@iconify/react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Progress({success, loading, handleOrder}) {

    const buttonSx = {
        ...(success && {
          bgcolor: green[500],
          "&:hover": {
            bgcolor: green[700],
          },
        }),
      };

  return (
    <Box sx={{ marginTop: 1, position: "relative" }}>
      {success ? (
        <p className="text-black inline-block">Ordered Successfully!</p>
      ) : (
        <p className=" text-black inline-block">Order Now:</p>
      )}
      <Fab
        className="!ms-4 !mb-2"
        aria-label="save"
        color="primary"
        sx={buttonSx}
      >
        {success ? (
          <div className="flex items-center">
            <CheckIcon />
          </div>
        ) : (
          <div className="flex items-center" 
          onClick={handleOrder}>
            <Icon icon="icons8:buy" width="40" className="!" />
          </div>
        )}
      </Fab>

      {success && (
        <NavLink to="/Orders">
          <div
            className="bg-sky-600 hover:bg-sky-500 p-2 text-white text-center rounded-xl mt-4" >
            Go to Orders
          </div>
        </NavLink>
      )}

      {loading && (
        <CircularProgress
          size={68}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: 92,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
}
