import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AuthModal from "./AuthModal";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export default function Layout(props) {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const handleAuthModalOpen = () => setOpenAuthModal(true);
  const handleAuthModalClose = () => setOpenAuthModal(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/sign-in");
      else router.push("/")
    });
  }, []);

  return (
    <>
      <Box className="h-[30px] w-full bg-[#242f3d] fixed top-0 z-10 left-0" />
      {props.children}
    </>
  );
}
