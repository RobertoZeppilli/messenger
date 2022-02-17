// STUFF FROM REACT
import { createContext, useEffect, useState } from "react";

// FIREBASE STUFF
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// COMPONENTS
import { Loading } from '../components/components-container/components-container'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, loggedUser => {
            setUser(loggedUser)
            setLoading(false)
        })
        return () => {
            setUser(null); // This worked for me
            setLoading(true)
        };
    }, [])

    if (loading) {
        return <Loading />
    }

    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export default AuthProvider