import { Avatar, Box } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { IconButton, Button } from "@mui/material";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";

const ChatBoxTopBar = (props) => {
  const router = useRouter();
  const m = moment(new Date(props.currentChat.LastSeen));

// console.log(props.currentChat)

  return (
    <Box className="h-[70px] bg-[#17212b] w-full fixed left-0 top-[30px] flex items-center justify-between border-l border-b border-solid border-gray-900">
      <Button
        className="h-full flex md:hidden text-white rounded-none"
        sx={{
          borderRadius: 0,
          color: "#fff",
        }}
        onClick={() => router.back()}
      >
        <ArrowBackIcon />
      </Button>

      <Box className="flex items-center justify-center lg:pl-4 pr-2">
        <Avatar
          alt={props.currentChat.Username}
          src={props.currentChat.ProfileImage}
          sx={{
            height: "45px",
            width: "45px",
            minWidth: "45px",
            minHeight: "45px",
          }}
          component="span"
        />
      </Box>

      <Box
        className="flex flex-col justify-center flex-1 bg-[#17212b] cursor-pointer hover:brightness-90 active:brightness-75 pr-4 pl-2 h-full"
        onClick={props.toggleDrawer(true)}
      >
        <Box className="font-bold text-[16px]">
          {props.currentChat.Username}
        </Box>
        <Box
          className="text-[13px] opacity-70"
          sx={{
            color: props.currentChat.IsOnline ? "#50dbfc" : "#fff",
          }}
        >
          {" "}
          {props.currentChat.IsOnline
            ? "online"
            : "last seen " + m.fromNow()}{" "}
        </Box>
      </Box>

      <Box className="px-4">
        <IconButton
          className="md:opacity-50 hover:opacity-100"
          aria-label="upload picture"
          component="span"
          onClick={props.toggleDrawer(true)}
        >
          <ViewSidebarOutlinedIcon />
        </IconButton>

        <a href="https://github.com/reed-codes/watsapp-clone" target="_blank">
          <IconButton
            className="md:opacity-50 hover:opacity-100"
            aria-label="upload picture"
            component="span"
          >
            <GitHubIcon />
          </IconButton>
        </a>
      </Box>
    </Box>
  );
};

export default ChatBoxTopBar;
