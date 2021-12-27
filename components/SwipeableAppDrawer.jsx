import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Button, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { signOut } from "../lib";
import { useUser } from "../state/context/userContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import ProfileImageSelectionModal from "./ProfileImageSelectionModal";
import WallpaperImageSelectionModal from "./WallpaperImageSelectionModal";
import { auth } from "../firebase/client-app";
import moment from "moment";
import { useCurrentChat } from "./Layout";

const BTN_STYLE = {
  justifyContent: "flex-start",
  fontWeight: "bold",
  color: "#fff",
  borderRadius: 0,
  padding: "16px",
};

export default function SwipeableAppDrawer(props) {
  const [openProfileImageSelectionModal, setOpenProfileImageSelectionModal] =
    useState(false);
  const [
    openWallpaperImageSelectionModal,
    setOpenWallpaperImageSelectionModal,
  ] = useState(false);
  const { setCurrentChat } = useCurrentChat();
  const [currentModal, setCurrentModal] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const minWidth763px = useMediaQuery("(min-width:763px)");
  const { user, setUser } = useUser();
  const m = moment(user ? new Date(user.JoinedDate) : new Date());

  const handleImageSelectionModalOpen = (role) => {
    setCurrentModal(role);
    if (role === "WALLPAPER_MODAL") setOpenWallpaperImageSelectionModal(true);
    else setOpenProfileImageSelectionModal(true);
  };

  const handleSelection = (src, color) => {
    if (color) setSelectedImage(color);
    else setSelectedImage(src);
  };

  const handleProfileImageSelectionModalClose = () =>
    setOpenProfileImageSelectionModal(false);

  const handleWallpaperSelectionModalClose = () =>
    setOpenWallpaperImageSelectionModal(false);

  const handleClearSelection = () => {
    setSelectedImage("");
    if (currentModal == "WALLPAPER_MODAL") handleWallpaperSelectionModalClose();
    else handleProfileImageSelectionModalClose();
  };

  const handleWallpaperChangeConfirmation = async () => {
    handleClearSelection();
  };

  return (
    <>
      <Box>
        <SwipeableDrawer
          anchor={"left"}
          open={props.openDrawer}
          onClose={props.toggleDrawer(false)}
          onOpen={props.toggleDrawer(true)}
        >
          <Box
            sx={{ width: 330 }}
            role="presentation"
            onKeyDown={props.toggleDrawer(false)}
            className="flex flex-col h-full bg-[#17212b]"
          >
            <Box className="flex flex-col h-full">
              <Box
                className="w-full bg-blue-400 mb-2"
                sx={{
                  backgroundImage: `url(${
                    user && user.WallpaperImage
                      ? user.WallpaperImage
                      : "#60a5fa"
                  }) !important`,
                  backgroundColor: !(user && user.WallpaperImage)
                    ? "#60a5fa !important"
                    : "none",
                  backgroundSize: "30px",
                }}
              >
                <Box
                  className="w-full p-4"
                  sx={{
                    backgroundColor:
                      user && user.WallpaperImage
                        ? "rgba(0,0,0,.7)"
                        : "rgba(0,0,0,0)",
                  }}
                >
                  <Box className="w-full flex items-center justify-start lg:justify-center pb-4 pt-4 lg:p-4">
                    <Box component="span" className="relative">
                      <Avatar
                        alt={user ? user.Username : ""}
                        src={user && user.ProfileImage}
                        className="bg-black rounded-full shadow-xl"
                        sx={{
                          height: minWidth763px ? "130px" : "90px",
                          width: minWidth763px ? "130px" : "90px",
                          background: "#000",
                        }}
                      />
                      {auth.currentUser &&
                        auth.currentUser.photoURL !==
                          (user && user.ProfileImage) && (
                          <Avatar
                            alt={user ? user.Username : ""}
                            src={
                              auth.currentUser ? auth.currentUser.photoURL : ""
                            }
                            className="bg-black rounded-full absolute bottom-1 right-1 shadow-xl"
                            sx={{
                              height: "30px",
                              width: "30px",
                              background: "#111",
                            }}
                          />
                        )}
                    </Box>
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
                  <Typography className="text-[15px]">
                    {user && user.Email}
                  </Typography>

                  <Typography className="text-[10px] opacity-80">
                    Joined {m.fromNow()}
                  </Typography>
                </Box>
              </Box>

              <Button
                className="w-full justify-start p-4 font-bold text-white rounded-none"
                sx={BTN_STYLE}
                onClick={() => handleImageSelectionModalOpen("PROFILE_IMAGE")}
                startIcon={<InsertPhotoOutlinedIcon className="opacity-50" />}
              >
                Change Profile Image
              </Button>

              <Button
                className="w-full justify-start p-4 font-bold text-white rounded-none"
                sx={BTN_STYLE}
                onClick={() => handleImageSelectionModalOpen("WALLPAPER_MODAL")}
                startIcon={<AccountCircleOutlinedIcon className="opacity-50" />}
              >
                Change Wallpaper
              </Button>
            </Box>

            <Box className="w-full h-full flex-1 relative pt-4">
              <Button
                className="w-full justify-start p-4 font-bold text-white rounded-none"
                sx={{
                  ...BTN_STYLE,
                  position: "absolute",
                  background: "rgb(0,0,0,.1)",
                  bottom: "120px",
                  left: 0,
                }}
                onClick={() => {
                  setCurrentChat("");
                  signOut();
                }}
              >
                Log out
              </Button>

              <Box className="absolute bottom-0 left-0 w-full p-4 opacity-75">
                <Typography className="font-bold pt-2">
                  Telegram Clone
                </Typography>
                <Typography className="text-sm font-bold opacity-50 pt-2">
                  By Reedemer
                </Typography>
                <Typography className="text-sm pt-2">Version 3.3</Typography>
              </Box>
            </Box>
          </Box>
        </SwipeableDrawer>
      </Box>

      <WallpaperImageSelectionModal
        closeFunc={handleWallpaperSelectionModalClose}
        selectBackground={handleSelection}
        clearSelection={handleClearSelection}
        confirmChange={handleWallpaperChangeConfirmation}
        selectedBackground={selectedImage}
        open={openWallpaperImageSelectionModal}
        user={user}
        setUser={setUser}
      />

      <ProfileImageSelectionModal
        closeFunc={handleProfileImageSelectionModalClose}
        selectImage={handleSelection}
        selectedImage={selectedImage}
        clearSelection={handleClearSelection}
        open={openProfileImageSelectionModal}
        user={user}
        setUser={setUser}
      />
    </>
  );
}
