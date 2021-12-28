import { Avatar, Box, Typography } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import moment from "moment";

export default function SwipeableChatDrawer(props) {
  const joinedMomentDate = moment(
    props.currentChat ? new Date(props.currentChat.JoinedDate) : new Date()
  );
  const lastSeenMomentDate = moment(
    props.currentChat ? new Date(props.currentChat.LastSeen) : new Date()
  );

  return (
    <Box>
      <SwipeableDrawer
        anchor={"right"}
        open={props.openDrawer}
        onClose={props.toggleDrawer(false)}
        onOpen={props.toggleDrawer(true)}
      >
        <Box
          sx={{ width: 300 }}
          role="presentation"
          // onClick={props.toggleDrawer(false)}
          onKeyDown={props.toggleDrawer(false)}
          className="bg-[#17212b] h-full"
        >
          <Box
            className="h-[300px] w-full hover:brightness-75 cursor-pointer bg-black"
            sx={{
              background: props.currentChat.WallpaperImage
                ? `url(${props.currentChat.WallpaperImage})`
                : `url(${props.currentChat.ProfileImage})`,
              backgroundSize: "10px",
            }}
          >
            <Box
              className="h-full w-full flex items-center justify-center relative"
              sx={{
                background: "rgba(0,0,0,.7)",
              }}
            >
              {
                <Box className="relative">
                  <Avatar
                    src={props.currentChat.ProfileImage}
                    alt={props.currentChat.Username}
                    sx={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    className = "pointer-events-none"
                  />

                  <Avatar
                    src={props.currentChat.GooglePhotoURL}
                    alt={props.currentChat.Username}
                    sx={{
                      width: "40px",
                      height: "40px",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                    }}
                    className = "pointer-events-none"
                  />
                </Box>
              }

              <Box
                sx={{
                  position: "absolute",
                  left: "16px",
                  bottom: "16px",
                  fontSize: "13px",
                  fontWeight: props.currentChat.IsOnline ? "bold" : "light",
                }}
              >
                {props.currentChat.IsOnline
                  ? "Online"
                  : `Last seen ${lastSeenMomentDate.fromNow()}`}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{ padding: "16px" }}
            className="border-b border-solid border-[#0c111899]"
          >
            <Typography
              className="font-bold"
              sx={{
                fontWeight: "bold",
                fontSize: "23px",
                mb: 1,
              }}
            >
              {props.currentChat.Username}
            </Typography>

            <Typography
              sx={{
                fontSize: "13px",
                opacity: 0.8,
                mb: 1,
              }}
            >
              {props.currentChat.Email}
            </Typography>

            <Typography
              sx={{
                fontSize: "10px",
                opacity: 0.7,
              }}
            >
              Joined {joinedMomentDate.fromNow()}
            </Typography>
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
