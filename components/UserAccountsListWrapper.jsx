import { Box } from "@mui/material";
import UserAccountsListWrapperTopBar from "./UserAccountsListWrapperTopBar";
import UserListItem from "./UserListItem";

const UserAccountsListWrapper = ({ toggleDrawer }) => {
  return (
    <Box>
      <UserAccountsListWrapperTopBar toggleDrawer={toggleDrawer} />

      <Box className="h-full w-full overflow-auto pb-[100px]">
        <UserListItem />
      </Box>
    </Box>
  );
};

export default UserAccountsListWrapper;
