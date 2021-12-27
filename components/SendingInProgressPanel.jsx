import { IconButton } from "@mui/material";
import { Box } from "@mui/material";
import { ImpulseSpinner } from "react-spinners-kit";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import { motion } from "framer-motion";

const SendingInProgressPanel = (props) => {
  return (
    <>
      <motion.div
        className="fixed z-[200] left-0 top-0 w-full h-full bg-[#17212b] flex gap-2 items-center px-4"
        animate={{ y: 0 }}
        initial={{ y: -60 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Box
          sx={{
            height: "1px",
            width: props.progress ? `${props.progress}%` : 0,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          id="upload-progress-indicator-line"
        />

        <Box className="flex flex-1 h-full items-center">
          <Box className="w-[50px] h-[50px] min-w-[50px] min-h-[50px]">
            <IconButton className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] shadow-2xl">
              {props.fileType === "IMAGE" && (
                <motion.img
                  animate={{ scale: 1 }}
                  initial={{ scale: 0.7 }}
                  transition={{ type: "spring", stiffness: 50, delay: 1 }}
                  src={props.preview}
                  className="
             h-full w-full object-cover rounded-full shadow-2xl"
                />
              )}

              {props.fileType === "AUDIO" && <AudioFileIcon />}
            </IconButton>
          </Box>

          <Box className="h-full flex-1 flex items-center justify-center">
            <Box className="p-2 rounded-lg flex items-center justify-center gap-3">
              <ImpulseSpinner size={30} frontColor="#5fa3f8" />
            </Box>
          </Box>
        </Box>

        <Box
          className="w-[65px] h-[65px] min-w-[65px] min-h-[65px] flex items-center flex justify-end text-[10px] font-bold"
          id="upload-progress-number-indicator-container"
        >
          {
          (props.fileType !== "TEXT") && ( props.progress ? `${props.progress.toFixed(2)} %` : "0 %")
          }
        </Box>
      </motion.div>
    </>
  );
};

export default SendingInProgressPanel;
