import {useEffect} from 'react'
import { Box } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Button, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import useAuthStatus from "../firebase/hooks/useAuthStatus";
import { signOut } from "../lib";

export default function SwipeableAppDrawer(props) {
  const [user, loading, error] = useAuthStatus();
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
              <Avatar alt={user ? user.displayName : ""} 
                      src={user && user.providerData[0].photoURL}
                      className="bg-black rounded-full"
                      sx = {{
                         height:"130px",
                         width:"130px",
                      }}
                      />
            </Box>

            <Typography className="font-bold text-[23px]">{user && user.displayName}</Typography>
            <Typography className="font-bold text-[13px] opacity-75">
              {user && user.email}
            </Typography>
          </Box>

          <Box className="w-full h-full flex-1 relative pt-4">

           <Button className = "w-full justify-start p-4 font-bold text-white rounded-none absolute bottom-[110px] left-0 bg-[rgb(0,0,0,.1)]"
                   sx = {{
                         justifyContent:'flex-start',
                         fontWeight:'bold',
                         color:'#fff',
                         borderRadius:0,
                         padding:"16px"
                   }}
                   onClick = {()=> signOut()}
                   >
               Log out
           </Button>
            

            <Box className="absolute bottom-0 left-0 w-full p-4 opacity-75">
              <Typography className="font-bold pt-2">Telegram Clone</Typography>
              <Typography className="text-sm font-bold opacity-50 pt-2">By Reedemer</Typography>
              <Typography className="text-sm pt-2">Version 3.3</Typography>
            </Box>
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
