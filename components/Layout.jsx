import { useEffect, useState, createContext, useContext } from "react";
import { Box } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

const AppContext = createContext({});

export default function Layout(props) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/");
      else {
        setUser(user);
        router.push("/k");
      }
    });
  }, []);

  const payload = {
    user,
  };

  return (
    <AppContext.Provider value={payload}>
      <Box className="h-[30px] w-full bg-[#242f3d] fixed top-0 z-10 left-0" />
      {props.children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
