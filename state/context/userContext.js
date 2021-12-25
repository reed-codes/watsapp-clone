import { useState, useEffect, createContext, useContext } from 'react'
import { auth, db } from '../../firebase/client-app'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { useRouter } from "next/router";

export const UserContext = createContext()

export default function UserContextComp({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = onAuthStateChanged(auth, async (person) => {

      try {
        if (!person) router.push("/");
        else {
          const userDocumentObject = {
            Email: person.email,
            Username: person.displayName,
            ID: person.uid,
            ProfileImage: person.photoURL,
            WallpaperImage: "",
            JoinedDate: Timestamp.fromDate(new Date()),
            LastSignInTime: person.metadata.lastSignInTime,
            LastSeen: Timestamp.fromDate(new Date()),
            IsOnline: true,
            Chats: [],
          };

          try {
            const docRef = doc(db, "users", userDocumentObject.ID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) throw { message: "DOCUMENT_ALREADY_EXISTS" }
            else {
              console.log("ADDING_NEW_DOCUMENT");
              await setDoc(doc(db, "users", userDocumentObject.ID), userDocumentObject);
              setUser(userDocumentObject)
              console.log("NEW_DOCUMENT_ADDED")
              router.push("/k");
            }
          } catch (err) {
            if (err.message === "DOCUMENT_ALREADY_EXISTS") {
              const docRef = doc(db, "users", userDocumentObject.ID);
              await updateDoc(docRef, { IsOnline: true })
              const docSnap = await getDoc(docRef);
              setUser(docSnap.data())
              router.push("/k");
            }
            else console.log(err.message)
          }
        }

      } catch (error) {
        // Most probably a connection error. Handle appropriately.
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    })

    // Unsubscribe auth listener on unmount
    return () => unsubscriber()
  }, [])

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext)