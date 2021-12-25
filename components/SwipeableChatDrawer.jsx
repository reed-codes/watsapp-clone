import { Avatar, Box,Typography } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

export default function SwipeableChatDrawer(props) {
  return (
    <Box>
      <SwipeableDrawer
        anchor={"right"}
        open={props.openDrawer}
        onClose={props.toggleDrawer(false)}
        onOpen={props.toggleDrawer(true)}
      >
        <Box
          sx={{ width: 330 }}
          role="presentation"
          onClick={props.toggleDrawer(false)}
          onKeyDown={props.toggleDrawer(false)}
          className = "bg-[#17212b] h-full"
        >
           <Box className = "h-[300px] w-full hover:brightness-75 cursor-pointer bg-black">
               <Avatar src = {props.currentChat.ProfileImage}
               sx = {{
                 width:'100%',
                 height:'100%',
                 objectFit:'cover',
                 objectPosition:'center',
                 borderRadius:0
               }}
                    />
           </Box>

           <Box sx = {{padding:'16px'}}> 

           <Typography className="font-bold text-[23px]"
                        sx= {{
                          fontWeight:'bold',
                          fontSize:"23px"
                        }}
                        >
                          {props.currentChat.Username}
            </Typography>
            <Typography className="text-[13px] opacity-75">
            {props.currentChat.Email}
            </Typography>

           </Box>

          
          
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
