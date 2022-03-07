// REACT STUFF & REACT-ROUTER
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

// FIREBASE STUFF
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { updateDoc, doc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

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

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        setData({ ...data, error: null, loading: true })
        if (!email || !password) {
            setData({ ...data, error: 'All fields are required' })
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)

            await updateDoc(doc(db, 'users', result.user.uid), {
                isOnline: true,
            })

            setData({ email: '', password: '', error: null, loading: false })
            navigate('/')
        } catch (err) {
            setData({ ...data, error: err.message.replace(/[^\w\s]/gi, ' ') })
        }
    }

    return (

        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className={styles.label} htmlFor="email">
                        Email
                    </label>
                    <input className={styles.input}
                        id="email"
                        type="email"
                        autoComplete='off'
                        value={email}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        placeholder="******************"
                    />
                </div>
                {error ? <p className={styles.error}>{error}</p> : ''}
                <div className={styles.formActions}>
                    <button className={styles.formButton} type="button" disabled={loading}>
                        {loading ? "Logging in..." : 'Login'}
                    </button>
                    <small>Not registered? <Link to="/register"><a className="text-red-400">Register</a></Link></small>
                </div>
            </form>

        </div>


    )
}

export default Login