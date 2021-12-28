import { Box } from "@mui/material";
import UserAccountsListWrapperTopBar from "./UserAccountsListWrapperTopBar";
import UserListItem from "./UserListItem";
import withUsersMonitor from "../firebase/hocs/withUsersMonitor";
import { useUser } from "../state/context/userContext";
import { RotateSpinner } from "react-spinners-kit";

const UserAccountsListWrapper = ({ toggleDrawer, users, usersLoading }) => {
  const { user: currentUser } = useUser();
  const accounts = users.filter(
    (user) => user.ID !== (currentUser ? currentUser.ID : "")
  );

  return (
    <Box
      className="relative flex flex-col h-full"
      sx={{ transform: "translate(0,0)" }}
    >
      <UserAccountsListWrapperTopBar toggleDrawer={toggleDrawer} />

      <Box className="h-full w-full overflow-auto pb-[100px]">

        {usersLoading ? (
          <Box className="flex items-center justify-center w-full py-5">
            <RotateSpinner color="#5fa4f9" size={20} />
          </Box>
        ) : (
          accounts.map((user) => {
            return <UserListItem key={user.ID} user={user} />;
          })
        )}
      </Box>

      <Box
        style={{
          height: "15px",
          width: "100%",
          position: "fixed",
          background: "url(./rnm.gif)",
          bottom: 0,
          left: 0,
          zIndex: 10,
          filter: "brightness(50%)",
        }}
      />
    </Box>
  );
};

export default withUsersMonitor(UserAccountsListWrapper);
