import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AudioSpectrum from "react-audio-spectrum";
import "react-audio-player-pro/dist/style.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopIcon from "@mui/icons-material/Stop";

const RecordPanel = ({ handleDiscardRecording, record }) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audioEl = document.querySelector("#voice-note-audio-element");
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
                <Box>
                  <audio
                    id="voice-note-audio-element"
                    className="hidden"
                    src={record.blobUrl}
                    loop
                  />
                  <AudioSpectrum
                    id="audio-canvas"
                    height={20}
                    width={200}
                    audioId={"voice-note-audio-element"}
                    capHeight={2}
                    meterWidth={2}
                    meterCount={612}
                    capColor={"#fff"}
                    meterColor="#4c9ce2"
                    gap={2}
                  />
                </Box>
              ) : (
                <Box className="w-[]75% h-[1px] bg-[#fff] min-w-[185px] min-w-[300px] mr-3" />
              )}
            </Box>
          </Box>
        </Box>

        <Box className="w-[35px] h-[35px] min-w-[35px] min-h-[35px] rounded-full  flex items-center justify-center">
          <IconButton className="min-w-[35px] min-h-[35px] text-[#5187c0] hover:text-[#408af0] active:text-[#344a60]">
            <SendIcon className="text-[20px]" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default RecordPanel;
