import React, { useState, useEffect } from 'react'

import { Camera, Trash } from '../components'
import Img from '../assets/image.jpg'

import { storage, db, auth } from '../firebase'
import { ref, deleteObject } from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { useNavigate } from 'react-router-dom'
import { uploadImg } from '../functions'

import { styles } from './styles'
import '../index.css'

import { Navbar, Loading } from '../components'

const Profile = () => {
    const [img, setImg] = useState("")
    const [user, setUser] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user)
        getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap => {
            if (docSnap.exists) {
                setUser(docSnap.data())
            }
        })

        if (img) {
            uploadImg(img, user, setImg)
        }
    }, [img])

    const deleteImage = async () => {
        try {
            const confirm = window.confirm('Delete avatar?')
            if (confirm) {
                await deleteObject(ref(storage, user.avatarPath))
                await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                    avatar: "",
                    avatarPath: ""
                })
                navigate('/')
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return user ? (
        <>
            <Navbar />
            <section style={{ height: "calc(100vh - 64px)" }} className={styles.profileContainer}>
                <div className={styles.profileBox}>
                    <div className={styles.imageContainer}>
                        <img src={user.avatar || Img} alt="avatar" />
                        <div className="overlay flex gap-2">
                            <label htmlFor="photo" className="text-white">
                                <Camera />
                            </label>
                            {user.avatar ? <Trash deleteImage={deleteImage} /> : null}
                            <input type="file" accept="image/*" style={{ display: "none" }} id="photo" onChange={e => setImg(e.target.files[0])} />
                        </div>
                    </div>
                    <div className="text_container text-white">
                        <h3 className="capitalize font-bold">{user.name}</h3>
                        <p className={styles.userEmail}>{user.email}</p>

                        <small><span className="font-bold">Joined On:</span> {user.createdAt.toDate().toDateString()}</small>
                    </div>
                </div>
            </section>
        </>
    ) : <Loading />;
}

export default Profile