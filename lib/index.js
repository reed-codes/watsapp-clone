import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/client-app";

export const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
            .then()
            .catch((error) => {
                  console.log(error.message)
            });
}

export const signOut = async () => {
      try {
            const docRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(docRef, { IsOnline: false, LastSeen: (new Date()).getTime() })
            await auth.signOut()
            console.log("SIGN-OUT SUCCESSFUL")
      } catch (err) {
            console.log("SIGN-OUT FAILED ", err.message)
      }
}
