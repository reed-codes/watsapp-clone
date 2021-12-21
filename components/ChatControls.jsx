import { useState } from "react";
import InputEmoji from "react-input-emoji";
import { Box } from "@mui/material";
import AudioRecorder from "./AudioRecorder";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import RecordPanel from "./RecordPanel";

const ChatControls = () => {
  const [message, setMessage] = useState("");
  const [record, setRecord] = useState({
    blobUrl: "",
    blob: null,
  });

  const handleMessageChange = (val) => setMessage(val);
  const handleRecordUpdate = (url, blob) =>
    setRecord({ blobUrl: url, blob: blob });

  const handleDiscardRecording = ()=>{
    delete record.blobUrl

    setRecord({
      blobUrl: "",
      blob: null,
    })
  }

  return (
    <Box
      className="w-full fixed bottom-0 left-0 flex items-center gap-1 px-4 py-2 bg-[#17212b] border-l border-solid border-gray-900"
      sx={{ transform: "translate(0,0)" }}
    >
      <IconButton className="min-w-[35px] min-h-[35px] opacity-50 hover:opacity-100">
        <AttachFileIcon className="text-[20px]" />
      </IconButton>
      <Box className="flex-1">
        <InputEmoji
          value={message}
          onChange={handleMessageChange}
          borderRadius={0}
          borderColor="transparent"
          placeholder="Write a message ..."
        />
      </Box>

      {message ? (
        <IconButton className="min-w-[35px] min-h-[35px] opacity-50 hover:opacity-100">
          <SendIcon className="text-[20px]" />
        </IconButton>
      ) : (
        <AudioRecorder handleRecordUpdate={handleRecordUpdate} />
      )}

      { 
         (record.blobUrl) && <RecordPanel handleDiscardRecording = {handleDiscardRecording}
                                         record = {record}
                                         />
      }
    </Box>
  );
};

export default ChatControls;
