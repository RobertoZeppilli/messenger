// REACT STUFF AND REACT-ROUTER
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

// FIREBASE STUFF
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { setDoc, doc, Timestamp } from 'firebase/firestore'
import { Link } from 'react-router-dom'

// STYLES
import { styles } from './styles'

const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        error: null,
        loading: false
    })
    const navigate = useNavigate()

    const { name, email, password, error, loading } = data

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        setData({ ...data, error: null, loading: true })
        if (!name || !email || !password) {
            setData({ ...data, error: 'All fields are required' })
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)

            await setDoc(doc(db, 'users', result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
            })

            setData({ name: '', email: '', password: '', error: null, loading: false })
            navigate('/')
        } catch (err) {
            setData({ ...data, error: err.message })
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className={styles.label} htmlFor="name">
                        Name
                    </label>
                    <input className={styles.input} placeholder='Name' id="name" type="text" name="name" autoComplete='off' value={name} onChange={handleChange}  />
                </div>
                <div className="mb-4">
                    <label className={styles.label} htmlFor="email">
                        Email
                    </label>
                    <input className={styles.input} placeholder='Email' id="email" type="email" name="email" autoComplete='off' value={email} onChange={handleChange}  />
                </div>
                <div className="mb-6">
                    <label className={styles.label} htmlFor="password">
                        Password
                    </label>
                    <input className={styles.input} id="password" type="password" name="password" autoComplete='off' value={password} onChange={handleChange} placeholder="******************" />
                </div>
                {error ? <p className={styles.error}>{error}</p> : ''}
                <div className={styles.formActions}>
                    <button className={styles.formButton} type="button" disabled={loading}>
                        {loading ? "Registering..." : 'Register'}
                    </button>
                    <small>Have an account? <Link to="/login">Login</Link></small>
                </div>
            </form>

        </div>
    )
}

export default Register