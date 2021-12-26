import React from "react";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import moment from "moment";

const MessageWrapper = (props) => {
  const m = moment(new Date(props.message.CreatedAt.toDate()));
  const timestamp = m.format("hh:mm a");

  return (
    <Box className={`w-full mb-2 flex justify-${props.self ? "end" : "start"}`}>
      <Box
        className={`max-w-[65%] min-w-[140px] md:max-w-[430px] relative p-4 ${
          props.self ? "bg-[#3c69a2]" : "bg-[#141f2a]"
        } text-white rounded pb-[35px]`}
      >
        {props.children}

        <Box className="w-full text-[12px] text-right absolute bottom-0 right-0 px-4 py-1 flex justify-end items-center gap-2">
          <Box className="opacity-50">{timestamp}</Box>
          <IconButton>
            <DoneAllIcon
              className="h-[15px] w-[15px] text-[#84bbfe]"
              sx={{
                width: "15px",
                height: "15px",
              }}
            />
            {/* <DoneIcon className = "h-[15px] w-[15px] text-[#84bbfe]"/> */}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageWrapper;
