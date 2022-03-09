// REACT STUFF AND REACT-ROUTER
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

// FUNCTIONS
import { handleRegister } from '../functions'

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

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={(e) => handleRegister(e, setData, data, name, email, password, navigate)}>

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
                    <button className={styles.formButton} type="submit" disabled={loading}>
                        {loading ? "Registering..." : 'Register'}
                    </button>
                    <small>Have an account? <Link to="/login" className={styles.otherPage}>Login</Link></small>
                </div>
            </form>

        </div>
    )
}

export default Register