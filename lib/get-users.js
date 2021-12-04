import { db } from "../firebase/client-app";
import { collection, getDocs } from 'firebase/firestore'

const getUsers = async () => {
      const querySnapShot = await getDocs(collection(db, "users"))
            querySnapShot.forEach(doc =>  console.log(`${doc.id} => ${doc.data()}`) )
}

export {getUsers};