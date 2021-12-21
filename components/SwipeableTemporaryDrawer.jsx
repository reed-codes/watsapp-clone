import { Box } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

export default function SwipeableTemporaryDrawer(props) {
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
          onClick={props.toggleDrawer(false)}
          onKeyDown={props.toggleDrawer(false)}
        ></Box>
      </SwipeableDrawer>
    </Box>
  );
}
