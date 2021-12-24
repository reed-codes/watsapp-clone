import React, { useState, useEffect } from "react";
import { getCollection } from "../hooks";
import {
    query,
    limit,
    orderBy,
    getDocs,
    onSnapshot,
} from "firebase/firestore";

const withUsersMonitor = (WrappedComponent) => {
    return (
        (props) => {
            const usersColRef = getCollection("users");
            const q = query(usersColRef, orderBy("name"), limit(25));
            const [users, setUsers] = useState([]);

            useEffect(() => {

                getDocs(usersColRef)
                    .then(snapshot => {
                        let currentUsers = users
                        snapshot.forEach((doc) => {
                            currentUsers = [...currentUsers, doc.data()]
                        })
                        setUsers(removeDuplicates(currentUsers))
                    }).catch(err=> console.log(err.message))


                const unsubscribe = onSnapshot(q, () => {
                    getDocs(usersColRef)
                        .then(snapshot => {
                            let newUsers = users
                            snapshot.forEach((doc) => {
                                newUsers = [...newUsers, doc.data()]
                            })
                            setUsers(removeDuplicates(newUsers))
                        }).catch(err=> console.log(err.message))
                });

                return () => unsubscribe()
            }, [])


            return <WrappedComponent users={users} {...props} />
        }
    )
}

const removeDuplicates = (arr) => {
    if (Array.isArray(arr)) {
        const stringArr = arr.map((user) => JSON.stringify(user))
        const uniqueUsersStringArr = [...(new Set([...stringArr]))]
        return uniqueUsersStringArr.map(str => JSON.parse(str))
    } else throw "INVALID_PARAMETER_GIVEN_TO_removeDuplicates"
}

export default withUsersMonitor
