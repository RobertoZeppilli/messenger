import React, { useEffect, useState } from 'react'
import Img from '../image.jpg'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'


const User = ({ user, user1, selectUser, chat }) => {
    const user2 = user?.uid
    const [lastMessage, setLastMessage] = useState()

    useEffect(() => {
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
        let unSub = onSnapshot(doc(db, 'lastMessage', id), (doc) => {
            setLastMessage(doc.data())
            console.log("RENDERS")
            // console.log("FROM USEEFFECT", data)
        })

        return () => unSub()
    }, [])


    return (
        <div className={`user_wrapper ${chat.name === user.name && 'selected_user'}`} onClick={() => selectUser(user)}>
            <div className="user_info">
                <div className="user_detail">
                    <img src={user.avatar || Img} alt="avatar" className="avatar" />
                    <h4>{user.name}</h4>
                </div>
                <div className={`user_status ${user.isOnline ? 'online' : 'offline'}`}>

                </div>
            </div>
            <div>
                {lastMessage && <p className="truncate">
                    {lastMessage.message}
                </p>}
            </div>
        </div>
    )
}

export default User