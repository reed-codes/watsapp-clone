import { Box } from "@mui/material";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";

const UserListItem = () => {
  return (
    <Button className="block p-0 m-0 w-full h-[72px] text-left my-1 rounded-none">
      <Box className="flex items-center text-white gap-3 overflow-hidden px-4 w-full h-full">
        <Avatar
          alt="Remy Sharp"
          src="https://images.theconversation.com/files/176655/original/file-20170703-7743-hyc2el.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
          className="h-[54px] w-[54px]"
          component="span"
        />

        <Box className="flex flex-col justify-center h-full flex-1 relative overflow-hidden">
          <Box className="flex justify-between">
            <Box className="normal-case truncate font-bold">
              Sherlock holmes
            </Box>
            <Box className="w-[45px] min-w-[45px] opacity-50 font-thin">
              16:22
            </Box>
          </Box>

          <Box className="normal-case w-full opacity-50 truncate">
            Referring to himself as a "consulting detective" in the stories,
            Holmes is known for his proficiency with
          </Box>
        </Box>
      </Box>
    </Button>
  );
};

export default UserListItem;
