import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
    query,
    where,
    onSnapshot,
    collection
} from "firebase/firestore";
import { auth, db } from "../client-app";
import { useCurrentChat } from "../../components/Layout";


const withUsersMonitor = (WrappedComponent) => {
    return (
        (props) => {
            const { currentChat, setCurrentChat } = useCurrentChat();
            const router = useRouter()
            const [users, setUsers] = useState([]);
            const [loading, setLoading] = useState(true);

            useEffect(() => {
                if (!auth.currentUser) {
                    router.push('/')
                    return
                }

                const usersRef = collection(db, "users");
                const q = query(usersRef, where('ID', 'not-in', [auth.currentUser.uid]));
                const unsubscribe = onSnapshot(q, querySnapshot => {
                    let users = []
                    querySnapshot.forEach(doc => users.push(doc.data()))
                    setLoading(false)
                    setUsers(users)
                })

                return () => unsubscribe()
            }, [])

            useEffect(() => {
                if (currentChat) {
                    const currentChatMatch = users.filter(user => user.ID === currentChat.ID)
                    if (currentChatMatch.length > 0)
                        setCurrentChat(currentChatMatch[0])
                }
            }, [users])

            return <WrappedComponent users={users} usersLoading={loading} {...props} />
        }
    )
}



export default withUsersMonitor
