import { Box } from "@mui/material";
import UserAccountsListWrapperTopBar from "./UserAccountsListWrapperTopBar";
import UserListItem from "./UserListItem";
import { signInWithGoogle } from "../lib";
import { Button } from "@mui/material";

const UserAccountsListWrapper = ({ toggleDrawer }) => {
  return (
    <Box>
      <UserAccountsListWrapperTopBar toggleDrawer={toggleDrawer} />

      <Box className="h-full w-full overflow-auto pb-[100px]">
        <UserListItem />

        <Button onClick={signInWithGoogle}>SIGN IN</Button>


      </Box>
    </Box>
  );
};

export default UserAccountsListWrapper;
