import { useState, createContext, useContext } from "react";
import { Box } from "@mui/material";

const CurrentChat = createContext(null);

export default function Layout(props) {
  const [currentChat, setCurrentChat] = useState("");

  return (
    <CurrentChat.Provider value={{ currentChat, setCurrentChat }}>
      <Box className="h-[30px] w-full bg-[#242f3d] fixed top-0 z-10 left-0" />
      {props.children}
    </CurrentChat.Provider>
  );
}

export const useCurrentChat = () => useContext(CurrentChat);
