import { useState } from "react";
import { Box } from "@mui/material";
import ChatBoxTopBar from "./ChatBoxTopBar";
import UserAccountsListWrapper from "./UserAccountsListWrapper";
import SwipeableAppDrawer from "./SwipeableAppDrawer";
import SwipeableChatDrawer from "./SwipeableChatDrawer";
import ChatControls from "./ChatControls";

export default function Layout({ children }) {
  const [openAppDrawer, setOpenAppDrawer] = useState(false);
  const [openChatDrawer, setOpenChatDrawer] = useState(false);
  const [openMediaUploader, setOpenMediaUploader] = useState(false);

  const handleMediaUploaderOpen = () => setOpenMediaUploader(true);
  const handleMediaUploaderClose = () => setOpenMediaUploader(false);

  const toggleAppDrawer = (state) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenAppDrawer(state);
  };


  const toggleChatDrawer = (state) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenChatDrawer(state);
  };

  return (
    <>
      <Box className="h-[30px] w-full bg-[#242f3d] fixed top-0 z-10 left-0" />

      <Box className="h-screen w-full flex items-start">
        <Box className="flex flex-col min-w-[300px] w-[27vw] h-full bg-[#17212b] relative pt-[30px]">
          <UserAccountsListWrapper toggleDrawer={toggleAppDrawer} />
        </Box>

        <Box
          className="h-full w-[73vw] bg-[#0e1621] pt-[100px] pb-[55px] relative"
          sx={{ transform: "translate(0,0)" }}
          onDragOver={handleMediaUploaderOpen}
        >
          <ChatBoxTopBar toggleDrawer={toggleChatDrawer} />

          {children}

          <ChatControls
            handleMediaUploaderOpen={handleMediaUploaderOpen}
            handleMediaUploaderClose={handleMediaUploaderClose}
            openMediaUploader={openMediaUploader}
          />
        </Box>
      </Box>

      <SwipeableAppDrawer
        openDrawer={openAppDrawer}
        toggleDrawer={toggleAppDrawer}
      />

      <SwipeableChatDrawer
        openDrawer={openChatDrawer}
        toggleDrawer={toggleChatDrawer}
      />
    </>
  );
}
