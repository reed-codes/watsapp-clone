import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Tooltip from "@mui/material/Tooltip";
import InputEmoji from "react-input-emoji";

export default function PostUploader(props) {
  const [step, setStep] = useState(props.files[0] ? 2 : 1);

  const handleNextStep = () => setStep(2);
  const handlePrevStep = () => setStep(1);

  if (!props.files[0] && step === 2) setStep(1);

  return (
    <Modal
      open={props.open}
      onClose={props.closeFunc}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        {step === 1 ? (
          <DropZone
            getRootProps={props.getRootProps}
            getInputProps={props.getInputProps}
            file={props.files[0]}
            step={step}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        ) : (
          <PostMetadataForm
            step={step}
            file={props.files[0]}
            message={props.message}
            send={props.send}
            handleMessageChange={props.handleMessageChange}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
      </>
    </Modal>
  );
}

const DropZone = (props) => {
  return (
    <Box
      sx={{
        transform: "translate(-50%, -50%)",
        boxShadow: 24,
      }}
      className="absolute top-[50%] left-[50%] flex justify-center flex-col basis-[505px] rounded-xl w-full h-full max-h-[508px] max-w-[75%] lg:max-w-[505px] bg-[#0e1621] overflow-hidden"
    >
      <Box className="bg-[#242f3d] font-bold truncate text-[16px] h-[45px] flex items-center justify-between border-b-[1px] border-solid border-[#17212b] absolute z-100 top-0 left-0 right-0">
        <Button
          className="font-bold rounded-lg"
          disabled={true}
          size="small"
          onClick={props.handlePrevStep}
        >
          <ArrowBackIosIcon className={"hidden pl-1"} />
        </Button>
        Create new post
        <Box
          className="h-full w-[70px] flex items-center justify-center"
          onClick={props.handleNextStep}
        >
          <Button
            disabled={!props.file}
            className={"font-bold rounded-lg"}
            size="small"
          >
            {" "}
            {props.file && "Next"}
          </Button>
        </Box>
      </Box>
      <div
        {...props.getRootProps({
          className:
            "dropzone flex justify-center items-center flex-col cursor-pointer",
        })}
      >
        <input {...props.getInputProps()} />
        <DropZoneContent />
      </div>

      <img
        src={props.file ? props.file.preview : ""}
        className="absolute h-full w-full top-0 left-0 z-[-1] opacity-20 object-cover"
        alt=""
      />
    </Box>
  );
};

const DropZoneContent = () => {
  return (
    <>
      <svg
        aria-label="Icon to represent media such as images or videos"
        className="_8-yf5 mb-5 text-white"
        color="#262626"
        fill="#262626"
        height="77"
        role="img"
        viewBox="0 0 97.6 77.3"
        width="96"
      >
        <path
          d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
          fill="currentColor"
        ></path>
        <path
          d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
          fill="currentColor"
        ></path>
        <path
          d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
          fill="currentColor"
        ></path>
      </svg>

      <Box className="mb-5 text-[22px]">Drag photo</Box>
      <Button variant="contained">Select from files</Button>
    </>
  );
};

const PostMetadataForm = (props) => {
  return (
    <Box
      sx={{
        transform: "translate(-50%, -50%)",
        boxShadow: 24,
      }}
      className="absolute top-[50%] left-[50%] flex justify-center flex-col basis-[505px] rounded-xl overflow-hidden w-full h-full max-h-[508px] max-w-[75%] lg:max-w-[505px] bg-[#0e1621]"
    >
      <Box className="font-bold truncate text-[16px] h-[45px] flex items-center justify-between border-b-[1px] border-solid bg-[#242f3d] absolute z-[1000] top-0 left-0 right-0">
        <Box className="h-full w-[70px] flex items-center justify-center">
          <Button
            className="font-bold rounded-lg"
            onClick={props.handlePrevStep}
            size="small"
          >
            <ArrowBackIosIcon className="pl-1" />
          </Button>
        </Box>
        Create new post
        <Box className="h-full w-[70px] flex items-center justify-center">
          <Button
            className="font-bold rounded-lg"
            size="small"
            onClick={props.send}
          >
            Send
          </Button>
        </Box>
      </Box>

      <Box className="h-full w-full flex flex-col items-center justify-center">
        <Box className="h-full w-full bg-[#05070b] overflow-hidden">
          <img
            src={props.file ? props.file.preview : ""}
            className="h-full w-full object-cover object-center pointer-events-none"
          />
        </Box>

        <Box className="w-full  p-3 flex flex-col items-end justify-end relative z-0">
          <InputEmoji
            value={props.message}
            onChange={props.handleMessageChange}
            placeholder="Write caption here ..."
            borderRadius={0}
            borderColor="#fff"
            maxLength={2000}
          />
          <Tooltip title="Maximum amount of characters">
            <Box className="inline-flex justify-end text-gray-400 hover:text-gray-700">
              {" "}
              {props.message.length}/2000{" "}
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};
