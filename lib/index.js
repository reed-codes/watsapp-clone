import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/client-app";

export const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
            .then((result) => {
                  const user = result.user;
            }).catch((error) => {
                  console.log(error.message)
            });
}

export const signOut = () => {
      auth.signOut()
            .then(() => console.log("SIGN-OUT SUCCESSFUL"))
            .catch(() => console.log("SIGN-OUT FAILED"))
}
