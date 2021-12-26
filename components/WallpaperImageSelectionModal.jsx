import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import axios from "axios";
import { auth, db } from "../firebase/client-app";
import { Avatar } from "@mui/material";
import Chip from "@mui/material/Chip";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { useUser } from "../state/context/userContext";
import { doc, updateDoc } from "firebase/firestore";

export default function WallpaperImageSelectionModal(props) {
  const router = useRouter();
  const { user } = useUser();
  const [images, setImages] = useState([]);

  let dBWallpaper = null;
  let selectedBackground = props.selectedBackground;
  let isColor = selectedBackground[0] === "#";

  if (user) dBWallpaper = user.WallpaperImage;

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    axios
      .get("https://rickandmortyapi.com/api/character")
      .then(({ data }) => {
        let { results } = data;
        let srcList = results.map((character) => character.image);
        setImages(srcList);
      })
      .catch((err) => console.log(err.message));
  }, []);


  const handleUpdateWallpaperImage = async (flag)=>{
    const docRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(docRef, { WallpaperImage: (flag === "REMOVE") ? "" : props.selectedBackground })
    props.setUser({
          ...props.user,
          WallpaperImage: (flag === "REMOVE") ? "" : props.selectedBackground
    })
    props.clearSelection()
  }

  return (
    <Modal
      open={props.open}
      onClose={props.clearSelection}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          transform: "translate(-50%, -50%)",
          boxShadow: 24,
        }}
        className="absolute top-[50%] left-[50%] flex justify-center flex-col w-full h-full md:h-[98%] max-h-[100%] max-w-[100%] lg:max-w-[525px] bg-[#0e1621] overflow-auto px-4 py-4 pb-[50px] pt-[57px]"
      >
        <Box className="bg-[#242f3d] font-bold truncate text-[16px] h-[45px] w-full flex items-center justify-between border-b-[1px] border-solid border-[#17212b] absolute left-0 top-0 z-10">
          <Button
            className="font-bold h-full rounded-none"
            size="small"
            onClick={props.clearSelection}
          >
            <ArrowBackIosIcon className={"pl-1 text-white"} />
          </Button>
          Choose your new cover image
          <Box className="w-[40px] min-w-[40px]" />
        </Box>

        <Box className="w-full h-[50%] flex justify-center mb-1 rounded-lg overflow-hidden shadow-2xl relative">
          {(selectedBackground || dBWallpaper) && !isColor ? (
            <Box
              style={{
                height: "100%",
                width: "100%",
                backgroundImage: `url("${
                  props.selectedBackground
                    ? props.selectedBackground
                    : user.WallpaperImage
                }")`,
                backgroundSize: "70px !important",
                objectPosition: "center",
                filter: "brightness(80%)",
              }}
              id="wallpaper-demo-canvas"
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                width: "100%",
                backgroundColor: `#17212b`,
                border: "1px solid #0b1014",
              }}
            />
          )}

          <Chip
            className="absolute bottom-[10px] right-[10px]"
            avatar={<InsertPhotoOutlinedIcon />}
            label="Current"
          />
        </Box>

        <ImageList
          sx={{ width: "100%", height: "100%", pt: 1, mb: 1 }}
          cols={3}
          rowHeight={164}
        >
          {images.map((src) => (
            <ImageListItem
              key={src}
              className="cursor-pointer hover:brightness-75 active:brightness-50"
            >
              <img
                src={`${src}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={"background"}
                loading="lazy"
                onClick={(e) => props.selectBackground(e.currentTarget.src)}
              />
            </ImageListItem>
          ))}
        </ImageList>

        <Box className="text-[16px] h-[45px] w-full flex items-center justify-between pt-2 px-4 pb-2 absolute bottom-[5px] left-0 bg-[#0e1621]">

          <Button
            className="font-bold h-full"
            startIcon={
              <Box
                className="bg-black"
                sx={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: "#17212b",
                }}
              />
            }
            onClick={() => handleUpdateWallpaperImage("REMOVE")}
          >
            Use default
          </Button>


          {user &&
          props.selectedBackground !== user.WallpaperImage &&
          Boolean(props.selectedBackground) ? (
            <Button className="font-bold h-full" onClick={handleUpdateWallpaperImage}>
              Confirm change
            </Button>
          ) : (
            <Button className="font-bold h-full" onClick={props.clearSelection}>
              Close
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
