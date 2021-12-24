import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export default function Layout(props) {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/");
      else router.push("/k")
    });
  }, []);

  return (
    <>
      <Box className="h-[30px] w-full bg-[#242f3d] fixed top-0 z-10 left-0" />
      {props.children}
    </>
  );
}
