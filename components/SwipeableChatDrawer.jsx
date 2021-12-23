import { Box } from "@mui/material";
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
          sx={{ width: 300 }}
          role="presentation"
          onClick={props.toggleDrawer(false)}
          onKeyDown={props.toggleDrawer(false)}
          className = "bg-[#17212b] h-full"
        >
          
          
          
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
