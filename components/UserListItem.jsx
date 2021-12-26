import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useCurrentChat } from "./Layout";

const UserListItem = (props) => {
  const { currentChat, setCurrentChat } = useCurrentChat();
  const minWidth768px = useMediaQuery("(min-width:763px)");
  const router = useRouter();

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

  return (
    <Button
      className="block p-0 m-0 w-full h-[72px] text-left my-1 rounded-none"
      sx={{ borderRadius: 0 }}
      onClick={handleAccountClick}
    >
      <Box className="flex items-center text-white gap-3 overflow-hidden px-4 w-full h-full">
        <Box className="relative">
          <Avatar
            alt={props.user.Username}
            src={props.user.ProfileImage}
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
            sx={{ display: props.user.IsOnline ? "block" : "none" }}
          >
            <Box className="h-full w-full bg-[cyan] rounded-full animate-pulse" />
          </Box>
        </Box>

        <Box className="flex flex-col justify-center h-full flex-1 relative overflow-hidden border-b border-solid border-[#0c111899]">
          <Box className="flex justify-between">
            <Box className="normal-case truncate font-bold pr-1">
              {props.user.Username}
            </Box>
            <Box className="w-[45px] min-w-[45px] opacity-50 font-thin text-[10px] h-full flex items-center justify-center">
              16:22
            </Box>
          </Box>

          <Box className="normal-case w-full opacity-50 truncate">
            Referring to himself as a "consulting detective" in the stories,
            Holmes is known for his proficiency with
          </Box>
        </Box>
      </Box>
    </Button>
  );
};

export default UserListItem;
