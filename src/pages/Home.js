import React, { useEffect, useState } from 'react'
import { db, auth } from '../firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { User, MessageForm, Message, Navbar } from '../components'

import Img from '../assets/image.jpg'

import { styles } from './styles'

import { deleteMessage, sendMessage, selectUser } from '../functions'

const Home = () => {
  const [users, setUsers] = useState([])
  const [chat, setChat] = useState("")
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [media, setMedia] = useState("")

  const user1 = auth.currentUser.uid

  // query al db per chiamare tutti gli utenti tranne noi che siamo auth
  useEffect(() => {
    const userCollection = collection(db, 'users')
    const Query = query(userCollection, where("uid", "not-in", [user1]))
    const unSub = onSnapshot(Query, querySnapshot => {
      let choosedUsers = []
      querySnapshot.forEach(doc => {
        choosedUsers.push(doc.data())
      })
      setUsers(choosedUsers)
    })

    return () => unSub()
  }, [])


  return (
    <div className={styles.homeContainer}>
      <Navbar />

      <div className={styles.gridWrapper}>
        <div className={styles.usersContainer}>
          {users.map(user => (
            <User key={user.uid} user={user} user1={user1} selectUser={selectUser} chat={chat}
            setChat={setChat} setChatMessages={setChatMessages} />
          ))}
        </div>
        <div className={styles.chatWrapper}>
          {chat ?
            <div className={styles.chatContainer}>
              <div className={styles.chatProfile}>
                <img className={styles.chatProfileAvatar} src={chat.avatar || Img} alt={chat.name} />
                <h3 className="font-semibold">{chat.name}</h3>
              </div>
              <div className={styles.chatMessages}>
                {chatMessages ? chatMessages.map((message, index) => <Message key={index} message={message} user1={user1} deleteMessage={deleteMessage} chat={chat} />) : ""}
              </div>
              <div className={styles.chatForm}>
                <MessageForm sendMessage={sendMessage} message={message} setMessage={setMessage} setMedia={setMedia} media={media} chat={chat} user1={user1} />
              </div>
            </div> : <h3 className={styles.noChat}>Select a user to start a conversation</h3>}
        </div>
      </div>
    </div>
  )
}

export default Home