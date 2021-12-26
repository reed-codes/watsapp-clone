import React from "react";
import { Box } from "@mui/material";
import AudioSpectrum from "react-audio-spectrum";
import "react-audio-player-pro/dist/style.css";

const VoiceNoteAudioPlayer = (props) => {
  return (
    <Box>
      <audio
        id = { "recording-audio-element" }
        className="hidden"
        src={props.url}
        // loop
      />
      <AudioSpectrum
        id = { "recording-audio-canvas" }
        height={20}
        width={200}
        audioId= {"recording-audio-element"}
        capHeight={2}
        meterWidth={2}
        meterCount={612}
        capColor={"#fff"}
        meterColor="#4c9ce2"
        gap={2}
      />
    </Box>
  );
};

export default VoiceNoteAudioPlayer;
