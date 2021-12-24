import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithGoogle } from "../lib";

export default function AuthModal(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.closeFunc}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          transform: "translate(-50%, -50%)",
          boxShadow: 24,
        }}
        className="absolute top-[50%] left-[50%] flex justify-center flex-col basis-[400px] rounded-xl w-[90%] h-full max-h-[300px] md:max-w-[65%] lg:max-w-[400px] bg-[#0e1621] overflow-hidden"
      >
        <img src="/telegram-cover.png" className="w-full h-full object-cover" />

        <Button
          variant="contained"
          className="font-bold bg-white p-4 justify-center hover:bg-[#efefef] items-center text-[#26a5e3] inline-flex rounded-none"
          endIcon={<GoogleIcon className="text-[red]" />}
          onClick={signInWithGoogle}
        >
          Sign in with google
        </Button>
      </Box>
    </Modal>
  );
}
