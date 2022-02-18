import React, { useState, useEffect } from 'react'
import Camera from '../components/svg/Camera'
import Trash from '../components/svg/Trash'
import Img from '../image.jpg'
import { storage, db, auth } from '../firebase'
import { ref, deleteObject } from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { uploadImg } from '../functions/functions'

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
        <section>
            <div className="profile_container">
                <div className="img_container">
                    <img src={user.avatar || Img} alt="avatar" />
                    <div className="overlay">
                        <label htmlFor="photo">
                            <Camera />
                        </label>
                        {user.avatar ? <Trash deleteImage={deleteImage} /> : null}
                        <input type="file" accept="image/*" style={{ display: "none" }} id="photo" onChange={e => setImg(e.target.files[0])} />
                    </div>
                </div>
                <div className="text_container">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <hr />
                    <small>Joined On: {user.createdAt.toDate().toDateString()}</small>
                </div>
            </div>
        </section>
    ) : null;
}

export default Profile