import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import UserAccountsListWrapper from "../components/UserAccountsListWrapper";
import SwipeableAppDrawer from "../components/SwipeableAppDrawer";
import SwipeableChatDrawer from "../components/SwipeableChatDrawer";
import ChatPortal from "../components/ChatPortal";
import { useAppContext } from '../components/Layout'
import { setDocument } from "../firebase/hooks";


export default function Layout() {
  const { user } = useAppContext()
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

  useEffect(() => {
    if (user) {
      const data = {
        Email: user.email,
        Username: user.displayName,
        ID: user.uid,
        ProfileImage: user.photoURL,
        WallpaperImage: '',
        JoinedDate: user.metadata.creationTime,
        LastSignInTime: user.metadata.lastSignInTime,
        LastSeen: (new Date()).getTime(),
        Chats: []
      }

      const setUserDbRecord = async ()=> await setDocument("users", data)

      setUserDbRecord()
    }

  }, [])

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

          {/* <EmptyChatUI /> */}

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


const EmptyChatUI = () => {
  return (

    <Box className="w-full h-screen flex items-center justify-center">

      <Box className="px-5 py-2 bg-[#1e2f47] rounded-full text-white">Select a chat to start messaging</Box>

    </Box>

  )
}