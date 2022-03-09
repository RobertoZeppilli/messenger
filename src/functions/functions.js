import { storage, db, auth } from '../firebase'
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { doc, getDoc, query, orderBy, onSnapshot, collection, addDoc, setDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore'

export const uploadImg = async (img, user, setFunction) => {
    const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${img.name}`)
    try {

        if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath))
        }
        const snap = await uploadBytes(imgRef, img)
        const url = await getDownloadURL(ref(storage, snap.ref.fullPath))

        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath
        })

        setFunction("")
        console.log(snap.ref.fullPath)
        console.log(url)

    } catch (error) {
        console.log(error.message)
    }

}
export const deleteLastMessage = async (id) => {
    await deleteDoc(doc(db, "lastMessage", id))
}
export const deleteMessage = async (messageID, chat, user1) => {
    const user2 = chat.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`


    await deleteDoc(doc(db, "messages", id, "chat", messageID))
    deleteLastMessage(id)
}
export const sendMessage = async (e, message, media, user1, chat, setMessage, setMedia) => {

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
    // addMessage()
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
export const selectUser = async (user, user1, setChat, setChatMessages) => {
    setChat(user)

    const user2 = user.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    const msgRef = collection(db, 'messages', id, 'chat')
    const Query = query(msgRef, orderBy('createdAt', 'asc'))

    onSnapshot(Query, querySnapshot => {
        let msgs = []
        querySnapshot.forEach(doc => {
            // const { message } = doc.data()
            const message = doc.data()
            message.messageID = doc.id
            // doc.data().id = doc.id
            // console.log("DOC ", message)
            msgs.push(message)
        })
        setChatMessages(msgs)
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




