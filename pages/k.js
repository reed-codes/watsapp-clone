import { useState } from "react";
import { Box } from "@mui/material";
import UserAccountsListWrapper from "../components/UserAccountsListWrapper";
import SwipeableAppDrawer from "../components/SwipeableAppDrawer";
import ChatPortal from "../components/ChatPortal";
import { useCurrentChat } from "../components/Layout";

export default function Home() {
  const {currentChat} = useCurrentChat()
  const [openAppDrawer, setOpenAppDrawer] = useState(false);

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

  return (
    <>
      <Box className="h-screen w-full flex items-start">
        <Box className="flex flex-col min-w-[300px] md:w-[27vw] w-full h-full bg-[#17212b] relative">

          <UserAccountsListWrapper toggleDrawer={toggleAppDrawer} />
        </Box>


        <Box className="w-[73vw] hidden md:block">
          { currentChat ? <ChatPortal/> :  <EmptyChatUI />  }
        </Box>
      </Box>

      <SwipeableAppDrawer
        openDrawer={openAppDrawer}
        toggleDrawer={toggleAppDrawer}
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