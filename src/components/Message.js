import React, { useRef, useEffect } from 'react'
import Moment from 'react-moment'

const Message = ({ message, user1 }) => {
    const scrollRef = useRef(null)

    useEffect(() => {
        scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }, [message])

    return (
        <>
            <div className={`message_wrapper ${message.from === user1 ? 'own' : ''}`}>
                <p className={`${message.from === user1 ? 'me' : 'friend'}`}>
                    {message.media ? <img src={message.media} alt={message.text} /> : null}
                    {message.message}
                    <br />
                    <small>
                        <Moment fromNow>
                            {message.createdAt.toDate()}
                        </Moment>
                    </small>
                </p>
            </div>
            <div ref={scrollRef}></div>
        </>
    )
}

export default Message