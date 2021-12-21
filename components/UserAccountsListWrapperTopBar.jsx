import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { TextField } from "@mui/material";

const UserAccountsListWrapperTopBar = (props) => {
  return (
    <Box className="h-[70px] min-h-[70px] flex items-center justify-between gap-3 border-b border-solid border-gray-800 px-4">
      <IconButton
        className="opacity-50 hover:opacity-100"
        onClick={props.toggleDrawer(true)}
        component="span"
      >
        <MenuIcon />
      </IconButton>

      <TextField fullWidth label="Search" variant="filled" />
    </Box>
  );
};

export default UserAccountsListWrapperTopBar;
