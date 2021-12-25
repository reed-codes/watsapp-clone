import { Box } from "@mui/material";

export default function Layout(props) {
  return (
    <>
      <Box className="h-[30px] w-full bg-[#242f3d] fixed top-0 z-10 left-0" />
      {props.children}
    </>
  );
}
