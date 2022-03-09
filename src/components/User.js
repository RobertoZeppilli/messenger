import React, { useEffect, useState } from 'react'
import Img from '../image.jpg'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

import { styles } from './styles'


const User = ({ user, user1, setChat, setChatMessages, selectUser, chat }) => {
    const user2 = user?.uid
    const [lastMessage, setLastMessage] = useState()

    useEffect(() => {
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
        let unSub = onSnapshot(doc(db, 'lastMessage', id), (doc) => {
            setLastMessage(doc.data())
        })

        return () => unSub()
    }, [])


    return (
        <>
            <div className={`${styles.userBox} ${chat.name === user.name && styles.selectedUserBox}`} onClick={() => selectUser(user, user1, setChat, setChatMessages)}>
                <div className={styles.flexCenter}>
                    <div className={styles.profileInfo}>
                        <img src={user.avatar || Img} alt="avatar" className={`${styles.avatar} ${user.isOnline ? "border-green-500" : "border-red-500"}`} />
                        <div className={styles.profileNameContainer}>
                            <h4 className="font-semibold text-red-300 text-center">{user.name}</h4>
                            {lastMessage && lastMessage.from !== user1 && lastMessage.unread && (<span className={styles.newMessage}>

                            </span>)}
                        </div>
                    </div>
                </div>
                <div>
                    {lastMessage && (
                        <p className={styles.lastMessage}>
                            <span className={`${lastMessage.from === user1 && "mr-3"}`}>{lastMessage.from === user1 ? "Me:" : null}</span>
                            {lastMessage.message}
                        </p>)}
                </div>
            </div>
        </>
    )
}

export default User