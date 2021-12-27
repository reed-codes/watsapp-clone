import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/client-app";

export const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
            .then()
            .catch((error) => {
                  console.log(error.message)
            });
}
