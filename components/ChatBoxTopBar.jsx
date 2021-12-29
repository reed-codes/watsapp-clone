import { Avatar, Box } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { IconButton } from "@mui/material";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCurrentChat } from "./Layout";
import withUsersMonitor from "../firebase/hocs/withUsersMonitor";
import useMediaQuery from "@mui/material/useMediaQuery";
import moment from "moment";

const ChatBoxTopBar = (props) => {
  const { currentChat } = useCurrentChat();
  const maxWidth768px = useMediaQuery("(max-width:768px)");
  const router = useRouter();
  const m = moment(new Date(currentChat?.LastSeen));

  return (
    // <Box className="min-h-[70px] bg-[#17212b] w-full fixed z-[100] top-0 left-0 flex flex-col items-center justify-between border-l border-b border-solid border-gray-900">
    <Box className="min-h-[70px] bg-[#17212b] w-full flex flex-col items-center justify-between border-l border-b border-solid border-gray-900 relative z-10"
         sx = {{
           minHeight: "70px !important",
         }}
         >
      <Box className="min-h-[30px] w-full bg-[#242f3d] hidden md:block" 
                    sx = {{
                      minHeight: "30px !important",
                    }}
           />

      <Box className="w-full flex items-center justify-between min-h-[70px] h-full bg-[#17212b]"
           sx = {{
            minHeight: "70px !important",
          }}
           >
        {maxWidth768px && (
          <IconButton
            className="flex text-white rounded-none"
            sx={{
              color: "#fff",
              ml: "10px",
              mr: "10px",
            }}
            onClick={() => router.back()}
          >
            <ArrowBackIcon />
          </IconButton>
        )}

        <Box className="flex items-center justify-center lg:pl-4 pr-2">
          <Avatar
            alt={currentChat?.Username}
            src={currentChat?.ProfileImage}
            sx={{
              height: maxWidth768px ? "30px" : "45px",
              width: maxWidth768px ? "30px" : "45px",
              minWidth: "45px",
              minHeight: "45px",
              minWidth: maxWidth768px ? "20px" : "45px",
              minHeight: maxWidth768px ? "20px" : "45px",
            }}
            component="span"
            className="pointer-events-none"
          />
        </Box>

        <Box
          className="flex flex-col justify-center flex-1 bg-[#17212b] cursor-pointer hover:brightness-90 active:brightness-75 pr-4 pl-2 h-full"
          onClick={props.toggleDrawer(true)}
        >
          <Box
            className="font-bold w-full truncate py-1"
            sx={{
              fontSize: maxWidth768px ? "13px" : "16px",
            }}
          >
            {currentChat?.Username}
          </Box>
          <Box
            className="opacity-70"
            sx={{
              color: currentChat?.IsOnline ? "#50dbfc" : "#fff",
              fontSize: maxWidth768px ? "10px" : "13px",
            }}
          >
            {" "}
            {currentChat?.IsOnline ? "online" : "last seen " + m.fromNow()}{" "}
          </Box>
        </Box>

        <Box
          className="px-4 shadow-2xl"
          sx={{
            position: maxWidth768px ? "absolute" : "static",
            right: 0,
            top: 0,
            zIndex: 100,
            height: "100%",
            display: "flex",
            alignItems: "center",
            background: "#17212b",
          }}
        >
          <IconButton
            className="md:opacity-50 hover:opacity-100"
            aria-label="upload picture"
            component="span"
            onClick={props.toggleDrawer(true)}
          >
            <ViewSidebarOutlinedIcon />
          </IconButton>

          {!maxWidth768px && (
            <a
              href="https://github.com/reed-codes/watsapp-clone"
              target="_blank"
            >
              <IconButton
                className="md:opacity-50 hover:opacity-100"
                aria-label="upload picture"
                component="span"
              >
                <GitHubIcon />
              </IconButton>
            </a>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default withUsersMonitor(ChatBoxTopBar);
