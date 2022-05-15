import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { Link } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

import { useSelector, useDispatch } from "react-redux";

function MainHeader() {
  const { website } = useSelector(state => state.website);

  let navigate = useNavigate();

  return (
    <Box style={{ marginBottom: 15 }}>
      <AppBar position="static">
        <Toolbar style={{ display:"flex", justifyContent: "space-between" }}>
          <Box>
            <Link
              color="inherit"
              aria-label="menu"
              onClick={() => navigate(`/`)}
              href="javascript:void(0)"
              style={{ textDecoration: "none" }}
            >
              {website?.name}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
