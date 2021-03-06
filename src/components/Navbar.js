// REACT STUFF & REACT-ROUTER-DOM
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// CONTEXT
import { AuthContext } from '../context/auth'

//STYLES
import { styles } from './styles'

// FUNCTIONS
import { handleSignout } from '../functions'


// ICONS
import { AiOutlineUser, FiLogOut } from '../assets'

const Navbar = () => {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    return (
        <nav className={styles.navbar}>
            <h3 className={styles.logo}>
                <Link to="/">Messenger</Link>
            </h3>
            <div className="text-white flex items-center">
                {user ? <>
                    <Link to="/profile" className={styles.navButtonNoMargin}>
                        <AiOutlineUser size={20} />
                    </Link>
                    <button className={styles.navButtonMargin} onClick={() => handleSignout(user, navigate)}>
                        <FiLogOut size={20} />
                    </button>
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