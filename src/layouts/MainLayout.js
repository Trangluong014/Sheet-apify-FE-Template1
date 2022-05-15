import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { getSingleWebsite } from "../features/websites/websiteSlice";

import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function MainLayout() {
  const { websiteId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (websiteId) dispatch(getSingleWebsite(websiteId));
  }, [websiteId])
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />

      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
