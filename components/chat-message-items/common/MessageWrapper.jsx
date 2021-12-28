import { useState } from "react";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import moment from "moment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase/client-app";

const deleteMessage = async (message) => {
  // IF MESSAGE INCLUDED MEDIA FILE
  if (message.Type === "TEXT") {
    try {
      await deleteDoc(doc(db, message.DocPath));
      console.log("DELETED DOC");
    } catch (err) {
      console.log(err.message, " FAILED TO DELETE DOC");
    }
  } else {
    let fileRef = ref(storage, message.FilePath);
    try {
      await deleteObject(fileRef);
      await deleteDoc(doc(db, message.DocPath));
      console.log("DELETED DOC & FILE");
    } catch (err) {
      console.log(err.message, " FAILED TO DELTE FILE");
    }
  }

  try {
    await deleteDoc(doc(db, message.LastMessageDocPath));
  } catch (err) {
    console.log(err.message, " FAILED TO DELTE LAST MESSAGE");
  }
};

const MessageWrapper = (props) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [contextElement, setContextElement] = useState(null);
  const m = moment(new Date(props.message.CreatedAt.toDate()));
  const timestamp = m.format("hh:mm a");

  const isImage = props.message.Type === "IMAGE";

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextElement(event.currentTarget);
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  const handleClose = () => {
    setContextElement(null);
    setContextMenu(null);
  };

  const handleDeleteMessage = () => {
    deleteMessage(props.message);
  };

  return (
    <>
      <Box
        className={`overflow-hidden w-full mb-2 flex justify-${
          props.self ? "end" : "start"
        }`}
        onContextMenu={handleContextMenu}
        sx={{
          background: contextElement ? "#60a5fa29 !important" : "none",
          borderRadius: contextElement ? "3px" : 0,
        }}
      >
        <Box
          className={`shadow-2xl min-w-[140px] md:max-w-[430px] relative ${
            props.self ? "bg-[#3c69a2]" : "bg-[#141f2a]"
          } text-white rounded overflow-auto`}
          sx={{
            padding: isImage ? "0 !important" : "10px 16px 35px !important",
            maxWidth:
              props.message.Type === "AUDIO" ? "auto !important" : "65%",
          }}
        >
          {props.children}

          <Box className="w-full text-[12px] text-right absolute bottom-0 right-0 px-4 py-1 flex justify-end items-center gap-2">
            <Box className="opacity-50">{timestamp}</Box>
            {props.self && (
              <IconButton>
                {props.message.Unread ? (
                  <DoneIcon
                    className="h-[15px] w-[15px] text-[#84bbfe]"
                    sx={{
                      width: "15px",
                      height: "15px",
                    }}
                  />
                ) : (
                  <DoneAllIcon
                    className="h-[15px] w-[15px] text-[#84bbfe]"
                    sx={{
                      width: "15px",
                      height: "15px",
                    }}
                  />
                )}
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>

      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleDeleteMessage} sx={{ background: "#17212b" }}>
          Delete message
        </MenuItem>
      </Menu>
    </>
  );
};

export default MessageWrapper;
