import { Box } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Button, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function SwipeableAppDrawer(props) {
  return (
    <Box>
      <SwipeableDrawer
        anchor={"left"}
        open={props.openDrawer}
        onClose={props.toggleDrawer(false)}
        onOpen={props.toggleDrawer(true)}
      >
        <Box
          sx={{ width: 300 }}
          role="presentation"
          // onClick={props.toggleDrawer(false)}
          onKeyDown={props.toggleDrawer(false)}
          className="flex flex-col h-full bg-[#17212b]"
        >
          <Box className="w-full bg-blue-400 p-4">
            <Box className="w-full flex items-center justify-center p-4">
              <Box className="h-[150px] w-[150px] bg-black rounded-full"></Box>
            </Box>

            <Typography className="font-bold">Grimm Reaper</Typography>
            <Typography className="font-bold text-sm opacity-75">
              kbker6jn3erlkejrer
            </Typography>
          </Box>

          <Box className="w-full h-full flex-1 relative pt-4">
         
           <Button className = "w-full justify-start p-4 font-bold text-white rounded-none">
               Users
           </Button>

           <Button className = "w-full justify-start p-4 font-bold text-white rounded-none">
               Log out
           </Button>
            

            <Box className="absolute bottom-0 left-0 w-full p-4 opacity-75">
              <Typography className="font-bold">Telegram Clone</Typography>
              <Typography className="text-sm">Version 3.3</Typography>
            </Box>
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
