import React from 'react'
import Attachment from './svg/Attachment'

const MessageForm = ({ sendMessage, message, setMessage, setMedia }) => {
    return (
        <form className="message_form" onSubmit={sendMessage} >
            <label htmlFor="image">
                <Attachment />
            </label>
            <input onChange={(e) => setMedia(e.target.files[0])} type="file" id="image" accept="image/*" style={{ display: "none" }} />
            <div>
                <input type="text" placheolder="Enter Message..." value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <div>
                <button className="btn">Send</button>
            </div>
        </form>
    )
}

export default MessageForm