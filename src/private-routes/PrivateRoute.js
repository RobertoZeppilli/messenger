// REACT STUFF & REACT-ROUTER-DOM
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

// CONTEXT
import { AuthContext } from '../context/auth'

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
    // console.log('USER FROM PRIVATE ROUTE -------->', user)
    // console.log('AUTH FROM PRIVATE ROUTE -------->', auth)
    return user ? children : <Navigate to="/login"/>


}


export default PrivateRoute