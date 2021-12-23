import { useState, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { IconButton } from "@mui/material";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { Box } from "@mui/material";
import moment from "moment";

const AudioRecorder = ({ handleRecordUpdate }) => {
  return (
    <ReactMediaRecorder
      onStop={(blobUrl, blob) => handleRecordUpdate(blobUrl, blob)}
      render={({ status, startRecording, stopRecording }) => {
        return (
          <Box
            className={`relative z-10 border border-solid border-[transparent] active:border-[#1f3244] rounded-full w-[40px] h-[40px] min-w-[40px] min-h-[40px] flex items-center justify-center ${
              status === "recording" ? "bg-pink-500" : ""
            }`}
          >
            <Box className="absolute h-full w-full flex items-center justify-center ">
              {status === "recording" ? (
                <RecordingPanel stopRecording={stopRecording} status={status} />
              ) : (
                <IconButton
                  className="min-w-[35px] min-h-[35px] opacity-50 active:bg-[#1976d2]"
                  onClick={startRecording}
                >
                  <MicNoneIcon className="text-[20px]" />
                </IconButton>
              )}
            </Box>
          </Box>
        );
      }}
    />
  );
};

const RecordingPanel = ({ stopRecording, status }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  });

  const formattedTime = String(moment(time * 1000).format("hh:mm:ss"))
    .split("")
    .slice(3)
    .join("");

  return (
    <>
      <Box className="fixed left-0 top-0 w-full h-full bg-[#17212b] flex gap-2 items-center px-4">
        <Box className="flex flex-1 h-full">
          <Box className="h-full w-[70px] flex items-center justify-between">
            <Box className="h-[10px] w-[10px] bg-[#1976d2] rounded-full" />
            <Box className="pt-1">
              {formattedTime ? formattedTime : "00:00"}
            </Box>
          </Box>

          <Box className="h-full hidden md:flex flex-1 opacity-50 flex items-center justify-center">
               Click the microphone icon to top recording
          </Box>
        </Box>

        <Box className="w-[35px] h-[35px] min-w-[35px] min-h-[35px] rounded-full bg-pink-600 relative flex items-center justify-center">
          <MicNoneIcon
            className={`text-[20px] ${
              status === "recording" ? "opacity-100" : "opacity-150"
            }`}
          />
          <IconButton
            className="min-w-[35px] min-h-[35px] bg-pink-600 active:bg-[#1976d2] animate-ping origin-center"
            onClick={stopRecording}
            sx = {{
              position:'absolute',
              zIndex:10,
              top:0,
              bottom:0,
              left:0,
              right:0
            }}
          >
            <MicNoneIcon className="text-[20px]" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default AudioRecorder;
