import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ChatBoxTopBar from "./ChatBoxTopBar";
import ChatControls from "./ChatControls";
import TextMessageItem from "./chat-message-items/TextMessageItem";
import AudioMessageItem from "./chat-message-items/AudioMessageItem";
import ImageMessageitem from "./chat-message-items/ImageMessageItem";
import SwipeableChatDrawer from "./SwipeableChatDrawer";
import { useCurrentChat } from "./Layout";

const ChatPortal = (props) => {
  const { currentChat, setCurrentChat } = useCurrentChat();
  const [openMediaUploader, setOpenMediaUploader] = useState(false);
  const [openChatDrawer, setOpenChatDrawer] = useState(false);

  const handleMediaUploaderOpen = () => setOpenMediaUploader(true);
  const handleMediaUploaderClose = () => setOpenMediaUploader(false);

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
      <Box
        className="h-screen w-full bg-[#0e1621] pt-[100px] pb-[55px] relative bg-[#0c1118]"
        sx={{  
              transform: "translate(0,0)", 
              // backgroundImage: "url(./wallpaper.jpg)", 
              // backgroundSize:'cover'
             }}
        onDragOver={handleMediaUploaderOpen}
      >
        <ChatBoxTopBar
          {...props}
          toggleDrawer={toggleChatDrawer}
          currentChat={currentChat}
        />

        <Box className="h-full w-full overflow-auto p-4">
          <TextMessageItem />
          <AudioMessageItem self />
          <ImageMessageitem />
        </Box>

        <ChatControls
          handleMediaUploaderOpen={handleMediaUploaderOpen}
          handleMediaUploaderClose={handleMediaUploaderClose}
          openMediaUploader={openMediaUploader}
        />
      </Box>

      <SwipeableChatDrawer
        openDrawer={openChatDrawer}
        toggleDrawer={toggleChatDrawer}
        currentChat={currentChat}
      />
    </>
  );
};

export default ChatPortal;
