import React, { useEffect, useState } from 'react'
import Img from '../image.jpg'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

import { styles } from './styles'


const User = ({ user, user1, selectUser, chat }) => {
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
            <div className={`${styles.userBox} ${chat.name === user.name && styles.selectedUserBox}`} onClick={() => selectUser(user)}>
                <div className={styles.flexCenter}>
                    <div>
                        <img src={user.avatar || Img} alt="avatar" className={`${styles.avatar} ${user.isOnline ? "border-green-500" : "border-red-500"}`} />
                        <h4 className="hidden">{user.name}</h4>
                        {lastMessage && lastMessage.from !== user1 && lastMessage.unread && (<small className="text-sm">
                            New
                        </small>)}
                    </div>
                </div>
                <div>
                    {lastMessage && (
                        <p className="truncate">
                            <strong>{lastMessage.from === user1 ? "Me:" : null}</strong>
                            {lastMessage.message}
                        </p>)}
                </div>
            </div>
        </>
    )
}

export default User