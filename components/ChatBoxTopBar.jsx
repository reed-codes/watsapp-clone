import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";

const ChatBoxTopBar = () => {
  return (
    <Box className="h-[70px] bg-[#17212b] w-full fixed left-0 top-[30px] flex items-center justify-between border-l border-solid border-gray-900">
      <Box className="flex flex-col justify-center flex-1 bg-[#17212b] cursor-pointer hover:brightness-90 active:brightness-75 px-4 h-full">
        <Box className="font-bold text-[16px]">Skywalker</Box>
        <Box>last seen recently</Box>
      </Box>

      <Box className="px-4">
        <IconButton
          className="opacity-50 hover:opacity-100"
          aria-label="upload picture"
          component="span"
        >
          <ViewSidebarOutlinedIcon />
        </IconButton>

        <IconButton
          className="opacity-50 hover:opacity-100"
          aria-label="upload picture"
          component="span"
        >
          <GitHubIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatBoxTopBar;
