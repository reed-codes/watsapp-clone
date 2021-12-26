import React from "react";
import { Typography } from "@mui/material";
import MessageWrapper from "./common/MessageWrapper";
import ReactHtmlParser from "react-html-parser";

const TextMessageItem = (props) => {
  return (
    <MessageWrapper {...props}>
      <Typography>{ReactHtmlParser(props.message.Markup)}</Typography>
    </MessageWrapper>
  );
};

export default TextMessageItem;
