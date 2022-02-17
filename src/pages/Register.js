// REACT STUFF AND REACT-ROUTER
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

// FIREBASE STUFF
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { setDoc, doc, Timestamp } from 'firebase/firestore'

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
        <section>
            <h3>Create an account</h3>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input_container">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" autoComplete='off' value={name} onChange={handleChange} />
                </div>
                <div className="input_container">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" autoComplete='off' value={email} onChange={handleChange} />
                </div>
                <div className="input_container">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" autoComplete='off' value={password} onChange={handleChange} />
                </div>
                {error ? <p className="error">{error}</p> : ''}
                <div className="btn_container">
                    <button className='btn' disabled={loading}>
                        {loading ? "Registering..." : 'Register'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Register