import { Box } from "@mui/material";
import { Button, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { auth } from "../firebase/client-app";
import moment from "moment";

const BTN_STYLE = {
  justifyContent: "flex-start",
  fontWeight: "bold",
  color: "#fff",
  borderRadius: 0,
  padding: "16px",
};

const AppDrawerHeaderCard = (props) => {
  const minWidth763px = useMediaQuery("(min-width:763px)");
  const m = moment(props.user ? new Date(props.user.JoinedDate) : new Date());

  return (
    <Box className="flex flex-col h-full">
      <Box
        className="w-full bg-blue-400 mb-2"
        sx={{
          backgroundImage: `url(${
            props.user && props.user.WallpaperImage
              ? props.user.WallpaperImage
              : "#60a5fa"
          }) !important`,
          backgroundColor: !(props.user && props.user.WallpaperImage)
            ? "#60a5fa !important"
            : "none",
          backgroundSize: "cover",
        }}
      >
        <Box
          className="w-full p-4"
          sx={{
            backgroundColor:
              props.user && props.user.WallpaperImage
                ? "rgba(0,0,0,.8)"
                : "rgba(0,0,0,0)",
          }}
        >
          <Box className="w-full flex items-center justify-start lg:justify-center pb-4 pt-4 lg:p-4">
            <Box component="span" className="relative">
              <Avatar
                alt={props.user ? props.user.Username : ""}
                src={props.user && props.user.ProfileImage}
                className="bg-black rounded-full shadow-xl pointer-events-none"
                sx={{
                  height: minWidth763px ? "130px" : "90px",
                  width: minWidth763px ? "130px" : "90px",
                  background: "#000",
                }}
              />
              {auth.currentUser &&
                auth.currentUser.photoURL !==
                  (props.user && props.user.ProfileImage) && (
                  <Avatar
                    alt={props.user ? props.user.Username : ""}
                    src={auth.currentUser ? auth.currentUser.photoURL : ""}
                    className="bg-black rounded-full shadow-xl pointer-events-none"
                    sx={{
                      height: "30px",
                      width: "30px",
                      background: "#111",
                      position: "absolute",
                      bottom: "4px",
                      right: "4px",
                    }}
                  />
                )}
            </Box>
          </Box>

          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "23px",
            }}
          >
            {props.user && props.user.Username}
          </Typography>

          <Typography sx={{ fontSize: "15px" }}>
            {props.user && props.user.Email}
          </Typography>

          <Typography
            sx={{
              fontSize: "10px",
              opacity: 0.8,
            }}
          >
            Joined {m.fromNow()}
          </Typography>
        </Box>
      </Box>

      <Button
        className="w-full justify-start p-4 font-bold text-white rounded-none"
        sx={BTN_STYLE}
        onClick={() => props.openSelectionModal("PROFILE_IMAGE")}
        startIcon={<InsertPhotoOutlinedIcon className="opacity-50" />}
      >
        Change Profile Image
      </Button>

      <Button
        className="w-full justify-start p-4 font-bold text-white rounded-none"
        sx={BTN_STYLE}
        onClick={() => props.openSelectionModal("WALLPAPER_MODAL")}
        startIcon={<AccountCircleOutlinedIcon className="opacity-50" />}
      >
        Change Wallpaper
      </Button>
    </Box>
  );
};

export default AppDrawerHeaderCard;
