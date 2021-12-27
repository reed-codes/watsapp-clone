import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import MessageWrapper from "./common/MessageWrapper";
import ReactHtmlParser from "react-html-parser";
import { scrollToLatestMessage } from "../../lib/scroll-for-new-message";

const ImageMessageItem = (props) => {
  return (
    <MessageWrapper {...props}>
      <Box className="hover:brightness-75 cursor-pointer">
        <img
          src={props.message.MediaURL}
          className="w-full pointer-events-none max-h-[500px]"
          onLoad={scrollToLatestMessage}
        />
        <Typography className="p-4 pb-8">
          {ReactHtmlParser(props.message.Markup)}
        </Typography>
      </Box>
    </MessageWrapper>
  );
};

export default ImageMessageItem;
