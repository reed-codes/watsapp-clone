import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopIcon from "@mui/icons-material/Stop";
import VoiceNoteAudioPreviewPlayer from "./VoiceNoteAudioPreviewPlayer";

const SendingInProgressPanel = ({ handleDiscardRecording, record, send }) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audioEl = document.querySelector("#recording-audio-element");
    if (audioEl && playing) audioEl.play();
    else if (audioEl && !playing) audioEl.load();
  }, [playing]);

  return (
    <>
      <Box className="fixed z-[100] left-0 top-0 w-full h-full bg-[#17212b] flex gap-2 items-center px-4">
        <Box className="flex flex-1 h-full">
          <Box className="h-full w-[40px] flex items-center justify-between">
            <IconButton
              className="min-w-[35px] min-h-[35px] opacity-50 hover:opacity-100"
              onClick={handleDiscardRecording}
            >
              <DeleteOutlineIcon className="text-[20px]" />
            </IconButton>
          </Box>

          <Box className="h-full flex-1 flex items-center justify-center">
            <Box className="p-2 rounded-lg bg-[#6ab3f3] flex items-center justify-center gap-3">
              <IconButton
                className="min-w-[35px] min-h-[35px]"
                onClick={() => setPlaying(!playing)}
              >
                {playing ? (
                  <StopIcon className="text-[20px] text-white" />
                ) : (
                  <PlayCircleIcon className="text-[20px] text-white" />
                )}
              </IconButton>

              {playing ? (
                <VoiceNoteAudioPreviewPlayer url={record.blobUrl} />
              ) : (
                <Box className="w-[75%] h-[1px] bg-[#fff] w-[85px] md:min-w-[185px] w-[100px] md:min-w-[300px] mr-3 animate-pulse" />
              )}
            </Box>
          </Box>
        </Box>

        <Box className="w-[35px] h-[35px] min-w-[35px] min-h-[35px] rounded-full  flex items-center justify-center">
          <IconButton
            className="min-w-[35px] min-h-[35px] text-[#5187c0] hover:text-[#408af0] active:text-[#344a60]"
            onClick={send}
          >
            <SendIcon className="text-[20px]" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default SendingInProgressPanel;
