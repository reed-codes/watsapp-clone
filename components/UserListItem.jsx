import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useCurrentChat } from "./Layout";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../firebase/client-app";
import moment from "moment";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";

const UserListItem = (props) => {
  const { currentChat, setCurrentChat, MESSAGE_SENT_HYDRATION_TRIGGER } =
    useCurrentChat();
  const [data, setData] = useState(null);
  const router = useRouter();
  const minWidth768px = useMediaQuery("(min-width:763px)");
  const m = moment(
    new Date(data ? data.CreatedAt.toDate() : new Date().getTime())
  );
  const timestamp = m.format("hh:mm a");

  const handleAccountClick = () => {
    if (currentChat) {
      if (currentChat.ID === props.user.ID && minWidth768px) {
        console.log("CHAT ALREADY OPEN");
        return;
      }
    }
    if (minWidth768px) setCurrentChat(props.user);
    else {
      setCurrentChat(props.user);
      router.push(`c/${props.user.ID}`);
    }
  };

  useEffect(() => {
    console.log("last message effect triggered");

    const userOne = auth.currentUser.uid;
    const userTwo = currentChat.ID;
    const conversationID =
      userOne > userTwo
        ? userTwo + "-hey-jude-" + userOne
        : userOne + "-hey-jude-" + userTwo;

    const unsubscriber = onSnapshot(
      doc(db, "last-messages", conversationID),
      (res) => {
        setData(res.data());
      }
    );

    return () => unsubscriber();
  }, [MESSAGE_SENT_HYDRATION_TRIGGER]);

  return (
    <Button
      className="block p-0 m-0 w-full h-[72px] text-left my-1 rounded-none"
      sx={{ borderRadius: 0 }}
      onClick={handleAccountClick}
    >
      <Box className="flex items-center text-white gap-3 overflow-hidden px-4 w-full h-full">
        <Box className="relative">
          <Avatar
            alt={props.user ? props.user.Username : ""}
            src={props.user ? props.user.ProfileImage : ""}
            sx={{
              height: "54px",
              width: "54px",
              minWidth: "54px",
              minHeight: "54px",
            }}
            component="span"
          />

          <Box
            className="bg-[#63b3fa] h-[8px] w-[8px] rounded-full absolute right-[3px] bottom-[5px]"
            sx={{
              display: props.user && props.user.IsOnline ? "block" : "none",
            }}
          >
            <Box className="h-full w-full bg-[cyan] rounded-full animate-pulse" />
          </Box>
        </Box>

        <Box className="flex flex-col justify-center h-full flex-1 relative overflow-hidden border-b border-solid border-[#0c111899]">
          <Box className="flex justify-between">
            <Box className="normal-case truncate font-bold pr-1">
              {props.user && props.user.Username}
            </Box>
            <Box className="w-[65px] min-w-[60px] opacity-50 font-thin text-[10px] h-full flex items-center justify-center">
              {timestamp}
            </Box>
          </Box>

          <Box
            className="normal-case w-full truncate relative pr-5"
            sx={{
              pl: data?.MediaURL && data?.Type === "IMAGE" ? "25px" : 0,
              opacity:
                data?.Unread && auth.currentUser.uid !== data?.SenderID
                  ? 1
                  : 0.5,
              color:
                data?.Unread && auth.currentUser.uid !== data?.SenderID
                  ? "#7ac2eb"
                  : "inherit",
              fontWeight:
                data?.Unread && auth.currentUser.uid !== data?.SenderID
                  ? "bold"
                  : "light",
            }}
          >
            {data?.MediaURL && data.Type === "IMAGE" && (
              <img
                className="h-[20px] w-[20px] mr-4 absolute left-0 top-[2px]"
                src={data?.MediaURL + "&size=20"}
              />
            )}
            {data?.MediaURL && data.Type === "AUDIO" && (
              <>
                <VolumeDownIcon className="h-[20px] w-[20px] mr-1" />: Audio
                file
              </>
            )}

            {data?.Markup}

            {auth.currentUser.uid === data?.SenderID &&
              (data?.Unread ? (
                <DoneIcon
                  className="h-[15px] w-[15px] text-[#84bbfe] absolute right-1 top-1 z-10"
                  sx={{
                    width: "15px",
                    height: "15px",
                  }}
                />
              ) : (
                <DoneAllIcon
                  className="h-[15px] w-[15px] text-[#84bbfe] absolute right-1 top-1 z-10"
                  sx={{
                    width: "15px",
                    height: "15px",
                  }}
                />
              ))}
          </Box>
        </Box>
      </Box>
    </Button>
  );
};

export default UserListItem;
