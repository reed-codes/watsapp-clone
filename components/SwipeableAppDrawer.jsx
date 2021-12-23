import { Box } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Button, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';

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
              <Avatar alt="Remy Sharp" 
                      src="https://sportshub.cbsistatic.com/i/2021/09/08/60d0ccff-ab4e-45e6-8e02-09f86ef40ea2/rick-and-morty-season-rick-morty-break-up-adult-swim-1281894.jpg"
                      className="bg-black rounded-full"
                      sx = {{
                         height:"150px",
                         width:"150px",
                      }}
                      />
            </Box>

            <Typography className="font-bold">Grimm Reaper</Typography>
            <Typography className="font-bold text-sm opacity-75">
              kbker6jn3erlkejrer
            </Typography>
          </Box>

          <Box className="w-full h-full flex-1 relative pt-4">
         
           <Button className = "w-full justify-start p-4 font-bold text-white rounded-none"
                   sx = {{
                         justifyContent:'flex-start',
                         fontWeight:'bold',
                         color:'#fff',
                         borderRadius:0,
                         padding:"16px"
                   }}
                   >
               Users
           </Button>

           <Button className = "w-full justify-start p-4 font-bold text-white rounded-none"
                   sx = {{
                         justifyContent:'flex-start',
                         fontWeight:'bold',
                         color:'#fff',
                         borderRadius:0,
                         padding:"16px"
                   }}
                   >
               Log out
           </Button>
            

            <Box className="absolute bottom-0 left-0 w-full p-4 opacity-75">
              <Typography className="font-bold">Telegram Clone</Typography>
              <Typography className="text-sm font-bold opacity-50">By Reedemer</Typography>
              <Typography className="text-sm">Version 3.3</Typography>
            </Box>
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
