// REACT STUFF & REACT-ROUTER
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'

// FUNCTIONS
import { handleLogin } from '../functions'

// STYLES
import { styles } from './styles'

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        error: null,
        loading: false
    })
    const navigate = useNavigate()

    const { email, password, error, loading } = data

    return (

        <div className={styles.container}>
            <form className={styles.form} onSubmit={(e) => handleLogin(e, setData, data, email, password, navigate)}>

                <div className="mb-4">
                    <label className={styles.label} htmlFor="email">
                        Email
                    </label>
                    <input className={styles.input}
                        id="email"
                        type="email"
                        autoComplete='off'
                        value={email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        placeholder="Email"
                    />
                </div>
                <div className="mb-6">
                    <label className={styles.label} htmlFor="password">
                        Password
                    </label>
                    <input className={styles.input}
                        id="password"
                        type="password"
                        name="password"
                        autoComplete='off'
                        value={password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        placeholder="******************"
                    />
                </div>
                {error ? <p className={styles.error}>{error}</p> : ''}
                <div className={styles.formActions}>
                    <button className={styles.formButton} type="submit" disabled={loading}>
                        {loading ? "Logging in..." : 'Login'}
                    </button>
                    <small>Not registered? <Link to="/register" className="text-red-400 hover:text-red-500">Register</Link></small>
                </div>
            </form>

        </div>


    )
}

export default Login