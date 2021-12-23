import React from "react";
import { Box } from "@mui/material";
import ChatBoxTopBar from "./ChatBoxTopBar";
import ChatControls from "./ChatControls";
import TextMessageItem from "./chat-message-items/TextMessageItem";
import AudioMessageItem from "./chat-message-items/AudioMessageItem";
import ImageMessageitem from "./chat-message-items/ImageMessageItem";

const ChatPortal = (props) => {
  return (
    <Box
      className="h-full w-[73vw] bg-[#0e1621] pt-[100px] pb-[55px] relative"
      sx={{ transform: "translate(0,0)" }}
      onDragOver={props.handleMediaUploaderOpen}
    >
      <ChatBoxTopBar {...props} />

      <Box className="h-full w-full overflow-auto p-4">
        <TextMessageItem />
        <AudioMessageItem self/>
        <ImageMessageitem />
      </Box>

      <ChatControls
        handleMediaUploaderOpen={props.handleMediaUploaderOpen}
        handleMediaUploaderClose={props.handleMediaUploaderClose}
        openMediaUploader={props.openMediaUploader}
      />
    </Box>
  );
};

export default ChatPortal;
