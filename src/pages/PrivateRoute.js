// REACT STUFF & REACT-ROUTER-DOM
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

// CONTEXT
import { AuthContext } from '../context/auth'

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
    
    return user ? children : <Navigate to="/login"/>
}


export default PrivateRoute