import { initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'
 
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDGPlYlakAeLCIhQSwgnQuH2z84ff-C7kw",
  authDomain: "watsapp-clone-b851c.firebaseapp.com",
  projectId: "watsapp-clone-b851c",
  storageBucket: "watsapp-clone-b851c.appspot.com",
  messagingSenderId: "2102807786",
  appId: "1:2102807786:web:bdb6e6eddea9fe20021b93"
});


export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export default {auth, db, storage};