import { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import axios from "axios";
import { auth, db } from "../firebase/client-app";
import { Avatar } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";

export default function ProfileImageSelectionModal(props) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then(({ data }) => {
        let { results } = data;
        let srcList = results.map((character) => character.image);
        setImages(srcList);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleUpdateProfileImage = async ()=>{
    const docRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(docRef, { ProfileImage: props.selectedImage })
    props.setUser({
          ...props.user,
          ProfileImage: props.selectedImage
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
        className="absolute top-[50%] left-[50%] flex justify-center flex-col w-full h-full md:h-[98%] max-h-[100%] max-w-[100%] lg:max-w-[525px] bg-[#0e1621] overflow-auto px-4 py-4 pb-[50px]"
      >
        <Box className="bg-[#242f3d] font-bold truncate text-[16px] h-[55px] flex items-center justify-between border-b-[1px] border-solid border-[#17212b]">
          <Button
            className="font-bold h-full rounded-none"
            size="small"
            onClick={props.clearSelection}
          >
            <ArrowBackIosIcon className={"pl-1 text-white"} />
          </Button>
          Choose profile image
          <Box className="w-[40px] min-w-[40px]" />
        </Box>

        <Box className="w-full p-4 flex justify-center">
          {auth.currentUser && (
            <Avatar
              alt={auth.currentUser.displayName}
              src={
                props.selectedImage
                  ? props.selectedImage
                  : props.user.ProfileImage
              }
              className="bg-black rounded-full"
              sx={{
                height: "150px",
                width: "150px",
              }}
            />
          )}
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
                onClick={(e) => props.selectImage(e.currentTarget.src)}
              />
            </ImageListItem>
          ))}
        </ImageList>

        <Box className="text-[16px] h-[45px] w-full flex items-center justify-between pt-2 px-4 pb-2 absolute bottom-[5px] left-0 bg-[#0e1621]">
          {auth.currentUser && (
            <Button
              className="font-bold h-full text-[13px]"
              startIcon={
                <Avatar
                  alt={auth.currentUser.displayName}
                  src={auth.currentUser.photoURL}
                  className="bg-black rounded-full"
                  sx={{
                    height: "20px",
                    width: "20px",
                  }}
                />
              }
              onClick={(e) =>
                props.selectImage(auth.currentUser.photoURL)
              }
            >
              Use my Google profile image
            </Button>
          )}

          {props.user && props.user.ProfileImage === props.selectedImage ? (
            <Button
              className="font-bold h-full opacity-50 text-[13px]"
              onClick={props.clearSelection}
            >
              Close
            </Button>
          ) : (
            <Button
              className="font-bold h-full text-[13px]"
              onClick={handleUpdateProfileImage}
            >
              Confirm change
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
