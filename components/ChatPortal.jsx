import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ChatBoxTopBar from "./ChatBoxTopBar";
import ChatControls from "./ChatControls";
import TextMessageItem from "./chat-message-items/TextMessageItem";
import AudioMessageItem from "./chat-message-items/AudioMessageItem";
import ImageMessageitem from "./chat-message-items/ImageMessageItem";
// import { useAppContext } from "./Layout";
import SwipeableChatDrawer from "./SwipeableChatDrawer";
import { setDocument, addConversation } from "../firebase/hooks";
import { useCurrentChat } from "./Layout";

const ChatPortal = (props) => {
  const { currentChat, setCurrentChat } = useCurrentChat();
  const [openMediaUploader, setOpenMediaUploader] = useState(false);
  const [openChatDrawer, setOpenChatDrawer] = useState(false);

  const handleMediaUploaderOpen = () => setOpenMediaUploader(true);
  const handleMediaUploaderClose = () => setOpenMediaUploader(false);
  // const { currentUserchatID, user, setCurrentConversationID } = useAppContext();

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

  // useEffect(() => {
  //   if (user) {
  //     const findChat = user.Chats.filter((chat) =>
  //       chat.split("-hey-jude-").indexOf(currentUserchatID)
  //     );

  //     const handleSetDocument = async (chatCollection) => {
  //       await setDocument(chatCollection, { ID: "STUB" });
  //       await addConversation(user, chatCollection);
  //       setCurrentConversationID(chatCollection);
  //     };

  //     //  true if this is a new conversation
  //     if (findChat.length === 0) {
  //       const chatID = `${user.ID}-hey-jude-${currentUserchatID}`;
  //       const chatCollection = `chats/${chatID}/messages`;
  //       handleSetDocument(chatCollection);
  //     } else {
  //       // CHAT EXITS , START LISTEING ON CHANGES
  //       setCurrentConversationID(findChat[0]);
  //     }
  //   } else console.log("USER_NOT_DEFINED");
  // }, []);

  return (
    <>
      <Box
        className="h-screen w-full bg-[#0e1621] pt-[100px] pb-[55px] relative"
        sx={{ transform: "translate(0,0)" }}
        onDragOver={handleMediaUploaderOpen}
      >

        <ChatBoxTopBar {...props} 
                      toggleDrawer={toggleChatDrawer}
                      currentChat = {currentChat}
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
        currentChat = {currentChat}
      />
    </>
  );
};

export default ChatPortal;
