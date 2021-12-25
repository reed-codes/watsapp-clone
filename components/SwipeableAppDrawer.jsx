import { useEffect } from "react";
import { Box } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Button, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { signOut } from "../lib";
import { useUser } from "../state/context/userContext";

export default function SwipeableAppDrawer(props) {
  const { user } = useUser();

  return (
    <Box>
      <SwipeableDrawer
        anchor={"left"}
        open={props.openDrawer}
        onClose={props.toggleDrawer(false)}
        onOpen={props.toggleDrawer(true)}
      >
        <Box
          sx={{ width: 300 }}
          role="presentation"
          // onClick={props.toggleDrawer(false)}
          onKeyDown={props.toggleDrawer(false)}
          className="flex flex-col h-full bg-[#17212b]"
        >
          <Box className="w-full bg-blue-400 p-4">
            <Box className="w-full flex items-center justify-center p-4">
              <Avatar
                alt={user ? user.Username : ""}
                src={user && user.ProfileImage}
                className="bg-black rounded-full"
                sx={{
                  height: "130px",
                  width: "130px",
                }}
              />
            </Box>

            <Typography
              className="font-bold text-[23px]"
              sx={{
                fontWeight: "bold",
                fontSize: "23px",
              }}
            >
              {user && user.Username}
            </Typography>
            <Typography className="text-[13px] opacity-75">
              {user && user.Email}
            </Typography>
          </Box>

          <Box className="w-full h-full flex-1 relative pt-4">
            <Button
              className="w-full justify-start p-4 font-bold text-white rounded-none"
              sx={{
                justifyContent: "flex-start",
                fontWeight: "bold",
                color: "#fff",
                borderRadius: 0,
                padding: "16px",
                position: "absolute",
                background: "rgb(0,0,0,.1)",
                bottom: "120px",
                left: 0,
              }}
              onClick={() => signOut()}
            >
              Log out
            </Button>

            <Box className="absolute bottom-0 left-0 w-full p-4 opacity-75">
              <Typography className="font-bold pt-2">Telegram Clone</Typography>
              <Typography className="text-sm font-bold opacity-50 pt-2">
                By Reedemer
              </Typography>
              <Typography className="text-sm pt-2">Version 3.3</Typography>
            </Box>
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
