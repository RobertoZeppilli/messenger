import React, { useRef, useEffect } from 'react'
import Moment from 'react-moment'

import { styles } from './styles'

import { TiDelete } from 'react-icons/ti'

const Message = ({ message, user1, deleteMessage, chat }) => {
    const scrollRef = useRef(null)

    // console.log(message)

    useEffect(() => {
        scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }, [message])

    return (
        <>
            <div className={`mt-5 ${message.from === user1 ? styles.me : styles.sender}`}>
                <p className={`${styles.message} ${message.from === user1 ? styles.myMessage : styles.senderMessage}`}>
                    {message.media ? <img className="h-12 w-12" src={message.media} alt={message.text} /> : null}
                    {message.message}
                    {message.from === user1 && <span onClick={() => deleteMessage(message.messageID, chat, user1)} className={styles.deleteButton}>
                        <TiDelete size={20} />
                    </span>}
                </p>
                <small className="text-zinc-300 italic">
                    <Moment fromNow>
                        {message.createdAt.toDate()}
                    </Moment>
                </small>
            </div>
            <div ref={scrollRef}></div>
        </>
    )
}

export default Message