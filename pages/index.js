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

    console.log("boom")

    setOpenChatDrawer(state);
  };

  return (
    <>
      <Box className="h-screen w-full flex items-start">
        <Box className="flex flex-col min-w-[300px] md:w-[27vw] w-full h-full bg-[#17212b] relative pt-[30px]">
          <UserAccountsListWrapper toggleDrawer={toggleAppDrawer} />
        </Box>


        <Box className="w-[73vw] hidden md:block">
          <ChatPortal
            onDragOver={handleMediaUploaderOpen}
            toggleDrawer={toggleChatDrawer}
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
