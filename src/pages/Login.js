// REACT STUFF & REACT-ROUTER
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

// FIREBASE STUFF
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { updateDoc, doc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

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

        <div className="h-screen bg-red-400 flex items-center justify-center p-2">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" autoComplete='off' value={email} onChange={handleChange} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name="password" autoComplete='off' value={password} onChange={handleChange} placeholder="******************" />
                    {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                </div>
                {error ? <p className="text-red-500 text-xs italic">{error}</p> : ''}
                <div className="flex flex-col gap-1 items-center justify-between">
                    <button className="bg-red-500 hover:bg-red-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out" type="button" disabled={loading}>
                        {loading ? "Logging in..." : 'Login'}
                    </button>
                    <small>Not registered? <Link to="/register"><a className="text-red-400">Register</a></Link></small>
                </div>
            </form>

        </div>


    )
}

export default Login