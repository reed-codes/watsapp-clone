
import { Box } from "@mui/material";
import UserAccountsListWrapperTopBar from "./UserAccountsListWrapperTopBar";
import UserListItem from "./UserListItem";
import withUsersMonitor from "../firebase/hocs/withUsersMonitor";

const UserAccountsListWrapper = ({ toggleDrawer, users }) => {
  return (
    <Box>
      <UserAccountsListWrapperTopBar toggleDrawer={toggleDrawer} />

      <Box className="h-full w-full overflow-auto pb-[100px]">
        <UserListItem />
      </Box>
    </Box>
  );
};

export default withUsersMonitor(UserAccountsListWrapper);
