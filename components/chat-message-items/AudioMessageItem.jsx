import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import VoiceNoteAudioPlayer from "../VoiceNoteAudioPlayer";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopIcon from "@mui/icons-material/Stop";
import MessageWrapper from "./common/MessageWrapper";

const TextMessageItem = () => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audioEl = document.querySelector("#voice-note-audio-element");
    if (audioEl && playing) audioEl.play();
    else if (audioEl && !playing) audioEl.load();
  }, [playing]);

  return (
    <MessageWrapper>
      <Box className="flex items-center gap-2">
        <IconButton
          className="h-[60px] w-[60px] rounded-full bg-blue-400 hover:bg-[#528bd1] text-white flex"
          onClick={() => setPlaying(!playing)}
        >
          {playing ? (
            <StopIcon className="text-[20px] text-white" />
          ) : (
            <PlayCircleIcon className="text-[20px] text-white" />
          )}
        </IconButton>

        <Box className="flex-1">
          {playing ? (
            <VoiceNoteAudioPlayer url="./demo.mp3" />
          ) : (
            <Box className="w-[75%] h-[1px] bg-[#fff] min-w-[185px] min-w-[300px] mr-3 animate-pulse" />
          )}
        </Box>
      </Box>
    </MessageWrapper>
  );
};

export default TextMessageItem;
