import { useState } from "react";
import { Box } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Button, Typography } from "@mui/material";
import { signOut } from "../lib/sign-out";
import { useUser } from "../state/context/userContext";
import ProfileImageSelectionModal from "./ProfileImageSelectionModal";
import WallpaperImageSelectionModal from "./WallpaperImageSelectionModal";
import { useCurrentChat } from "./Layout";
import AppDrawerHeaderCard from "./AppDrawerHeadCard";

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

  const { user, setUser } = useUser();

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
            sx={{ width: 300 }}
            role="presentation"
            onKeyDown={props.toggleDrawer(false)}
            className="flex flex-col h-full bg-[#17212b]"
          >
            <AppDrawerHeaderCard
              user={user}
              openSelectionModal={handleImageSelectionModalOpen}
            />

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
                onClick={() => {
                  setCurrentChat("");
                  signOut();
                }}
              >
                Log out
              </Button>

              <Box className="absolute bottom-0 left-0 w-full p-4 opacity-75">
                <Typography
                  sx={{
                    pt: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Telegram Clone
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    pt: "8px",
                    opacity: 0.5,
                    fontWeight: "bold",
                  }}
                >
                  By Reedemer
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    pt: "8px",
                  }}
                >
                  Version 3.3
                </Typography>
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
