import { useState } from "react";
import { Box } from "@mui/material";
import ChatBoxTopBar from "./ChatBoxTopBar";
import UserAccountsListWrapper from "./UserAccountsListWrapper";
import SwipeableTemporaryDrawer from "./SwipeableTemporaryDrawer";
import ChatControls from "./ChatControls";

export default function Layout({ children }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (state) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(state);
  };

  return (
    <>
      <Box className="h-[30px] w-full bg-[#242f3d] fixed top-0 z-10 left-0" />

      <Box className="h-screen w-full flex items-start">
        <Box className="flex flex-col min-w-[300px] w-[27vw] h-full bg-[#17212b] relative pt-[30px]">
          <UserAccountsListWrapper toggleDrawer={toggleDrawer} />
        </Box>



        <Box
          className="h-full w-[73vw] bg-[#0e1621] pt-[100px] pb-[55px] relative"
          sx={{ transform: "translate(0,0)" }}
          onDragEnter={()=>{console.log("boom")}}
          onDragLeave={()=>{console.log("boom")}}
        >

          <ChatBoxTopBar />

          {children}

          <ChatControls />
        </Box>


      </Box>

      <SwipeableTemporaryDrawer
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
}
