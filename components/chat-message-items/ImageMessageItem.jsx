import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import MessageWrapper from "./common/MessageWrapper";
import ReactHtmlParser from "react-html-parser";

const ImageMessageItem = (props) => {
  return (
    <MessageWrapper {...props}>
      <Box>
        <img
          src={props.message.MediaURL}
          className="w-full pointer-events-none"
        />
        <Typography className="p-4 pb-8">
          {ReactHtmlParser(props.message.Markup)}
        </Typography>
      </Box>
    </MessageWrapper>
  );
};

export default ImageMessageItem;
