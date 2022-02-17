import React, { useEffect, useState } from 'react'
import { db, auth } from '../firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { User } from '../components/components-container/components-container'

const Home = () => {
  const [users, setusers] = useState([])
  useEffect(() => {
    const userCollection = collection(db, 'users')
    const Query = query(userCollection, where("uid", "not-in", [auth.currentUser.uid]))
    const unSub = onSnapshot(Query, querySnapshot => {
      let choosedUsers = []
      querySnapshot.forEach(doc => {
        choosedUsers.push(doc.data())
      })
      setusers(choosedUsers)
    })

    return () => unSub()
  }, [])
  console.log(users)
  return (
    <div className="home_container">
      <div className="users_container">
        {users.map(user => (
          <User key={user.uid} user={user} />
        ))}
      </div>
    </div>
  )
}

export default Home