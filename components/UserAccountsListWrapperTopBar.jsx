import { useState } from "react";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const UserAccountsListWrapperTopBar = (props) => {
  const [openSearchInput, setOpenSearchInput] = useState(false);

  const handleSearchInputOpen = () => {
    setOpenSearchInput(true);
  };

  const handleSearchInputClose = () => {
    setOpenSearchInput(false);
  };

  return (
    <Box className="h-[70px] min-h-[70px] flex items-center justify-between gap-3 border-b border-solid border-gray-800 px-4">
      <IconButton
        className="opacity-50 hover:opacity-100"
        onClick={props.toggleDrawer(true)}
        component="span"
      >
        <MenuIcon />
      </IconButton>

      <TextField
        fullWidth
        label="Search"
        variant="filled"
        className="hidden md:block"
      />

      {openSearchInput ? (
        <>
          <TextField fullWidth label="Search" variant="filled" className = "fade-in"/>
          <IconButton
            className="opacity-50 hover:opacity-100 md:hidden"
            onClick={handleSearchInputClose}
            component="span"
          >
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <IconButton
          className="opacity-50 hover:opacity-100 md:hidden"
          onClick={handleSearchInputOpen}
          component="span"
        >
          <SearchIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default UserAccountsListWrapperTopBar;
