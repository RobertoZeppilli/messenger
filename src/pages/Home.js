import React, { useEffect, useState } from 'react'
import { db, auth, storage } from '../firebase'
import { collection, getDocs, query, where, onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { User, MessageForm, Message, Navbar } from '../components/components-container/components-container'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import Img from '../image.jpg'

import { styles } from './styles'

const Home = () => {
  const [users, setUsers] = useState([])
  const [chat, setChat] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
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

  const selectUser = async (user) => {
    setChat(user)

    const user2 = user.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    const msgRef = collection(db, 'messages', id, 'chat')
    const Query = query(msgRef, orderBy('createdAt', 'asc'))

    onSnapshot(Query, querySnapshot => {
      let msgs = []
      querySnapshot.forEach(doc => {
        msgs.push(doc.data())
      })
      setMessages(msgs)
    })

    // get last message only if there has been a past conversation b/w the logged in user and the conversation opened
    // checking if docSnap.data() is true, solves the error when two users that never talk to each other are trying to click on the user avatar to start a conversation
    const docSnap = await getDoc(doc(db, 'lastMessage', id))
    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(db, 'lastMessage', id), {
        unread: false
      })
    }

  }

  const sendMessage = async (e) => {

    e.preventDefault()

    if (!media && !message) {
      return
    }

    const user2 = chat.uid

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    let url;
    if (media) {
      const mediaRef = ref(storage, `images/${new Date().getTime()} - ${media.name}`)
      const snap = await uploadBytes(mediaRef, media)
      const newUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
      url = newUrl
    }

    await addDoc(collection(db, 'messages', id, 'chat'), {
      message,
      from: user1,
      to: user2,
      media: url || "",
      createdAt: Timestamp.fromDate(new Date())
    })
    await setDoc(doc(db, 'lastMessage', id), {
      message,
      from: user1,
      to: user2,
      media: url || "",
      createdAt: Timestamp.fromDate(new Date()),
      unread: true
    })
    setMessage("")
    setMedia("")
  }

  const deleteMessage = async (msg) => {
    // const user2 = user.uid
    const user2 = chat.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    const msgRef = collection(db, 'messages', id, 'chat')
    console.log(msgRef)
    const Query = query(msgRef, orderBy('createdAt', 'asc'))

    onSnapshot(Query, querySnapshot => {
      // let msgs = []
      querySnapshot.forEach(doc => {
        // msgs.push(doc.data())
        console.log(doc.id, doc.data())
      })
      // setMessages(msgs)
    })

    // Ho il doc.id che servira per cancellare il messaggio!!!
  }


  return (
    <div className={styles.homeContainer}>
      <Navbar />

      <div className={styles.gridWrapper}>
        <div className={styles.usersContainer}>
          {users.map(user => (
            <User key={user.uid} user={user} user1={user1} selectUser={selectUser} chat={chat} />
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
                {messages.length ? messages.map((message, index) => <Message key={index} message={message} user1={user1} deleteMessage={deleteMessage} />) : ""}
              </div>
              <div className={styles.chatForm}>
                <MessageForm sendMessage={sendMessage} message={message} setMessage={setMessage} setMedia={setMedia} />
              </div>
            </div> : <h3 className={styles.noChat}>Select a user to start a conversation</h3>}
        </div>
      </div>
    </div>
  )
}

export default Home