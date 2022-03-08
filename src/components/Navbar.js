// REACT STUFF & REACT-ROUTER-DOM
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// FIREBASE STUFF
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'

// CONTEXT
import { AuthContext } from '../context/auth'

//STYLES

import { styles } from './styles'

const Navbar = () => {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    async function handleSignout() {
        await updateDoc(doc(db, 'users', user.uid), {
            isOnline: false
        })
        await signOut(auth)
            .then(() => navigate('/login'))
    }

    return (
        <nav className={styles.navbar}>
            <h3 className={styles.logo}>
                <Link to="/">Messenger</Link>
            </h3>
            <div className="text-white">
                {user ? <>
                    <Link to="/profile" className={styles.navButtonNoMargin}>Profile</Link>
                    <button className={styles.navButtonMargin} onClick={handleSignout}>Logout</button>
                </> :
                    <>
                        <Link className={styles.navButtonNoMargin} to="/register">Register</Link>
                        <Link className={styles.navButtonMargin} to="/login">Login</Link>
                    </>}
            </div>
        </nav>
    )
}

export default Navbar