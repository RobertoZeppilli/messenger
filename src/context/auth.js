import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Loading from '../components/Loading'


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