import { Box } from "@mui/material";
import UserAccountsListWrapperTopBar from "./UserAccountsListWrapperTopBar";
import UserListItem from "./UserListItem";
import withUsersMonitor from "../firebase/hocs/withUsersMonitor";
import { useUser } from "../state/context/userContext";

const UserAccountsListWrapper = ({ toggleDrawer, users }) => {
  const { user: currentUser } = useUser();
  const accounts = users.filter(
    (user) => user.ID !== (currentUser ? currentUser.ID : "")
  );
  console.log("UserAccountsListWrapper RENDER")
  
  return (
    <Box>
      <UserAccountsListWrapperTopBar toggleDrawer={toggleDrawer} />

      <Box className="h-full w-full overflow-auto pb-[100px]">
        {accounts.map((user) => {
          return <UserListItem key={user.ID} user={user} />;
        })}
      </Box>
    </Box>
  );
};

export default withUsersMonitor(UserAccountsListWrapper);
