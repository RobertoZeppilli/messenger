import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import Login from '../pages/Login'

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    // console.log('USER FROM PRIVATE ROUTE -------->', user)
    // console.log('AUTH FROM PRIVATE ROUTE -------->', auth)
    return user ? children : <Login />

}


export default PrivateRoute