import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
    query,
    where,
    onSnapshot,
    collection
} from "firebase/firestore";
import { auth, db } from "../client-app";

const withUsersMonitor = (WrappedComponent) => {
    return (
        (props) => {
            const router = useRouter()
            const [users, setUsers] = useState([]);

            useEffect(() => {
                if(!auth.currentUser) 
                {
                    router.push('/')
                    return
                }

                const usersRef = collection(db, "users");
                const q = query(usersRef, where('ID', 'not-in', [auth.currentUser.uid]));
                const unsubscribe = onSnapshot(q, querySnapshot => {
                    let users = []
                    querySnapshot.forEach(doc => users.push( doc.data() ))
                    setUsers(users)
                })

                return () => unsubscribe()
            }, [])

            return <WrappedComponent users = {users} {...props} />
        }
    )
}



export default withUsersMonitor
