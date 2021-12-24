import React, { useState, useEffect } from 'react'
import { getAuth } from "firebase/auth";


const useAuthStatus = () => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            setUser(getAuth().currentUser)
            setLoading(false)
        } catch (err) {
            setError(err)
        }
    })

    return ([user, loading, error])
}

export default useAuthStatus
