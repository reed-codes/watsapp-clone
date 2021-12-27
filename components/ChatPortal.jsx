import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ChatBoxTopBar from "./ChatBoxTopBar";
import ChatControls from "./ChatControls";
import TextMessageItem from "./chat-message-items/TextMessageItem";
import AudioMessageItem from "./chat-message-items/AudioMessageItem";
import ImageMessageitem from "./chat-message-items/ImageMessageItem";
import SwipeableChatDrawer from "./SwipeableChatDrawer";
import { useCurrentChat } from "./Layout";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/client-app";
import { handleMessageReadStatus } from "../lib/handle-messages-read-status";
import { useUser } from "../state/context/userContext";

const ChatPortal = () => {
  const { currentChat, TRIGGER_MESSAGE_SENT_UPDATE } = useCurrentChat();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [openMediaUploader, setOpenMediaUploader] = useState(false);
  const [openChatDrawer, setOpenChatDrawer] = useState(false);

  const userOne = auth.currentUser ? auth.currentUser.uid : "";
  const userTwo = currentChat.ID;
  const conversationID =
    userOne > userTwo
      ? userTwo + "-hey-jude-" + userOne
      : userOne + "-hey-jude-" + userTwo;

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

  useEffect(() => {
    const messagesRef = collection(db, "chats", conversationID, "messages");
    const q = query(messagesRef, orderBy("CreatedAt", "asc"));

    const unsubscriber = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => msgs.push(doc.data()));
      setMessages(msgs);
    });

    return () => unsubscriber();
  }, [currentChat]);

  useEffect(() => {
    const q = query(
      collection(db, `chats/${conversationID}/messages`),
      where("RecipientID", "==", userOne),
      where("Unread", "==", true)
    );

    handleMessageReadStatus(q, conversationID, TRIGGER_MESSAGE_SENT_UPDATE);
  }, [messages]);

  useEffect(() => {
    TRIGGER_MESSAGE_SENT_UPDATE({ sent: true });
  }, []);

  return (
    <>
      <Box
        className="h-screen w-full pb-[55px] relative bg-[#0c1118]"
        sx={{
          transform: "translate(0,0)",
          backgroundImage: `url(${user?.WallpaperImage})`,
          backgroundSize: "70px",
        }}
        onDragOver={handleMediaUploaderOpen}
      >
        <Box
          className="h-full w-full"
          sx={{
            background: user?.WallpaperImage ? "rgba(0,0,0,.8)" : "#0c1118",
          }}
        >
          <ChatBoxTopBar
            toggleDrawer={toggleChatDrawer}
            currentChat={currentChat}
          />

          <Box className="h-full w-full overflow-auto p-4">
            {messages.map((message) => {
              if (message.Type === "TEXT")
                return (
                  <TextMessageItem
                    key={message.ID}
                    message={message}
                    self={
                      message.SenderID ===
                      (auth.currentUser ? auth.currentUser.uid : "")
                    }
                  />
                );
              else if (message.Type === "IMAGE")
                return (
                  <ImageMessageitem
                    key={message.ID}
                    message={message}
                    self={
                      message.SenderID ===
                      (auth.currentUser ? auth.currentUser.uid : "")
                    }
                  />
                );
              else if (message.Type === "AUDIO")
                return (
                  <AudioMessageItem
                    key={message.ID}
                    message={message}
                    self={
                      message.SenderID ===
                      (auth.currentUser ? auth.currentUser.uid : "")
                    }
                  />
                );
            })}

            <Box id="scroll-into-view-stub" />
          </Box>

          <ChatControls
            handleMediaUploaderOpen={handleMediaUploaderOpen}
            handleMediaUploaderClose={handleMediaUploaderClose}
            openMediaUploader={openMediaUploader}
          />
        </Box>
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
