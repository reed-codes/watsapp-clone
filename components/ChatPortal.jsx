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
  getDocs,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
  writeBatch,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/client-app";
import { useUser } from "../state/context/userContext";




const ChatPortal = () => {
  const { currentChat } = useCurrentChat();
  const {user} = useUser()
  const [messages, setMessages] = useState([]);
  const [openMediaUploader, setOpenMediaUploader] = useState(false);
  const [openChatDrawer, setOpenChatDrawer] = useState(false);

  const userOne = auth.currentUser.uid;
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
    document.querySelector("#scroll-into-view-stub").scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const q = query(
      collection(db, `chats/${conversationID}/messages`),
      where("RecipientID", "==", userOne),
      where("Unread", "==", true)
    );

    getUnreadMessages(q, conversationID);
  }, [messages]);


  console.log(user)
  return (
    <>
      <Box
        className="h-screen w-full pt-[100px] pb-[55px] relative bg-[#0c1118]"
        sx={{
          transform: "translate(0,0)",
          backgroundImage: `url(${user.WallpaperImage})`,
          backgroundSize: "70px",
        }}
        onDragOver={handleMediaUploaderOpen}
      >
        <Box
          className="h-full w-full"
          sx={{
            background:user.WallpaperImage ? "rgba(0,0,0,.8)" : "#0c1118"
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
                    self={message.SenderID === auth.currentUser.uid}
                  />
                );
              else if (message.Type === "IMAGE")
                return (
                  <ImageMessageitem
                    key={message.ID}
                    message={message}
                    self={message.SenderID === auth.currentUser.uid}
                  />
                );
              else if (message.Type === "AUDIO")
                return (
                  <AudioMessageItem
                    key={message.ID}
                    message={message}
                    self={message.SenderID === auth.currentUser.uid}
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


const getUnreadMessages = async (query, conversationID) => {
  const querySnapshot = await getDocs(query);
  let unreadDocs = [];
  querySnapshot.forEach((doc) => {
    unreadDocs.push(doc.id);
  });

  const refs = unreadDocs.map((docID) =>
    doc(db, `chats/${conversationID}/messages/${docID}`)
  );

  if (refs.length == 0) return;

  markMessagesAsRead(refs, conversationID);
};

const markMessagesAsRead = async (docRefs, conversationID) => {
  const batch = writeBatch(db);
  docRefs.forEach((ref) => batch.update(ref, { Unread: false }));
  await batch.commit();
  console.log("BACTCH UPDATE DONE");
  const lastMessageRef = doc(db, `last-messages/${conversationID}`);
  await updateDoc(lastMessageRef, { Unread: false });
  console.log("LAST MESSAGE SEEN UPDATE DONE");
};



export default ChatPortal;
