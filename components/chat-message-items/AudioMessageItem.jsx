import { Box } from "@mui/material";
import MessageWrapper from "./common/MessageWrapper";
import AudioPlayer from 'react-h5-audio-player';

const AudioMessageItem = (props) => {
  return (
    <MessageWrapper {...props}>
      <Box className="flex items-center gap-2">
        <Box className="flex-1">
            <AudioPlayerComponent url= {props.message.MediaURL} />
        </Box>
      </Box>
    </MessageWrapper>
  );
};

const AudioPlayerComponent = ({url})=>{
    return (
      <AudioPlayer
      // autoPlay
      src={url}
    />
    )
}

export default AudioMessageItem;
