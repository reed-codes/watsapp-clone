import { useState } from "react";
import { Box } from "@mui/material";
import UserAccountsListWrapper from "../components/UserAccountsListWrapper";
import SwipeableAppDrawer from "../components/SwipeableAppDrawer";
import SwipeableChatDrawer from "../components/SwipeableChatDrawer";
import ChatPortal from "../components/ChatPortal";

export default function Layout() {
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
      <Box className="h-screen w-full flex items-start">
        <Box className="flex flex-col min-w-[300px] w-[27vw] h-full bg-[#17212b] relative pt-[30px]">
          <UserAccountsListWrapper toggleDrawer={toggleAppDrawer} />
        </Box>

        <ChatPortal
          onDragOver={handleMediaUploaderOpen}
          toggleDrawer={toggleChatDrawer}
          handleMediaUploaderOpen={handleMediaUploaderOpen}
          handleMediaUploaderClose={handleMediaUploaderClose}
          openMediaUploader={openMediaUploader}
        />

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
