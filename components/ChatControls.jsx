import { useState, useEffect } from "react";
import InputEmoji from "react-input-emoji";
import { Box } from "@mui/material";
import AudioRecorder from "./AudioRecorder";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import RecordPanel from "./RecordPanel";
import MediaUploader from "./MediaUploader";
import { useDropzone } from "react-dropzone";
import { useCurrentChat } from "./Layout";
import { auth, db } from "../firebase/client-app";
import {
  setDoc,
  Timestamp,
  doc,
  collection,
  addDoc,
} from "firebase/firestore";
import { v4 as uuid4 } from "uuid";
import { storage } from "../firebase/client-app";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const ChatControls = (props) => {
  const { currentChat } = useCurrentChat();
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [record, setRecord] = useState({
    blobUrl: "",
    blob: null,
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(record.blobUrl);
    },
    [record]
  );

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const handleMessageChange = (val) => setMessage(val);
  const handleRecordUpdate = (url, blob) =>
    setRecord({ blobUrl: url, blob: blob });

  const handleDiscardRecording = () => {
    URL.revokeObjectURL(record.blobUrl);

    setRecord({
      blobUrl: "",
      blob: null,
    });
  };

  const closeMediaUploader = () => {
    if (files[0]) {
      if (window.confirm("Discard current changes")) {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
        setFiles([]);
        props.handleMediaUploaderClose();
      }
    } else props.handleMediaUploaderClose();
  };

  const cleanUpMessage = () => {
    if (message) setMessage("");
    if (files[0]) {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      setFiles([]);
    }
    if (record.blob) handleDiscardRecording();
  };

  const handleSendRequest = async () => {
    const messageType = files[0] ? "IMAGE" : record.blob ? "AUDIO" : "TEXT";
    const userOne = auth.currentUser.uid;
    const userTwo = currentChat.ID;
    const conversationID =
      userOne > userTwo
        ? userTwo + "-hey-jude-" + userOne
        : userOne + "-hey-jude-" + userTwo;

    let url = "";
    if (files[0]) {
      const fileRef = ref(
        storage,
        `${conversationID}/images/${files[0].name}-${new Date().getTime()}`
      );
      const snap = await uploadBytes(fileRef, files[0]);
      url = await getDownloadURL(ref(storage, snap.ref.fullPath));
    } else if (record.blob) {
      const fileRef = ref(
        storage,
        `${conversationID}/audio/voice-note-${new Date().getTime()}`
      );
      const snap = await uploadBytes(fileRef, record.blob);
      url = await getDownloadURL(ref(storage, snap.ref.fullPath));
    }

    const messageObject = {
      ID: uuid4(),
      Markup: message,
      From: auth.currentUser.displayName,
      To: currentChat.Username,
      RecipientID: userTwo,
      SenderID: userOne,
      CreatedAt: Timestamp.fromDate(new Date()),
      MediaURL: url ? url : "",
      Type: messageType,
      Unread: true,
    };

    await addDoc(
      collection(db, "chats", conversationID, "messages"),
      messageObject
    );

    await setDoc(doc(db, "last-messages", conversationID), {
      ID: uuid4(),
      Markup: message,
      From: auth.currentUser.displayName,
      To: currentChat.Username,
      RecipientID: userTwo,
      SenderID: userOne,
      CreatedAt: Timestamp.fromDate(new Date()),
      MediaURL: url ? url : "",
      Type: messageType,
      Unread: true,
    });

    cleanUpMessage();

    console.log("MESSAGE SENT");
  };

  return (
    <>
      <Box
        className="w-full fixed bottom-0 left-0 flex items-center gap-1 px-4 py-2 bg-[#17212b] border-l border-t border-solid border-gray-900"
        sx={{ transform: "translate(0,0)" }}
      >
        <IconButton
          className="min-w-[35px] min-h-[35px] opacity-50 hover:opacity-100"
          onClick={props.handleMediaUploaderOpen}
        >
          <AttachFileIcon className="text-[20px]" />
        </IconButton>

        <Box className="flex-1">
          <InputEmoji
            value={message}
            onChange={handleMessageChange}
            borderRadius={0}
            maxLength={2000}
            borderColor="transparent"
            placeholder="Write a message ..."
          />
        </Box>

        {message ? (
          <IconButton
            className="min-w-[35px] min-h-[35px] opacity-50 hover:opacity-100"
            onClick={handleSendRequest}
          >
            <SendIcon className="text-[20px]" />
          </IconButton>
        ) : (
          <AudioRecorder handleRecordUpdate={handleRecordUpdate} />
        )}

        {record.blobUrl && (
          <RecordPanel
            handleDiscardRecording={handleDiscardRecording}
            record={record}
            send={handleSendRequest}
          />
        )}
      </Box>

      <MediaUploader
        closeFunc={closeMediaUploader}
        handleMessageChange={handleMessageChange}
        files={files}
        message={message}
        open={props.openMediaUploader}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        send={handleSendRequest}
      />
    </>
  );
};

export default ChatControls;
