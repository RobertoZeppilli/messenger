import React, { useState, useRef } from 'react'

// EMOJI PICKER
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

// ICONS
import {FiSmile, FiSend, BsUpload} from '../assets'
import { styles } from './styles'

// FUNCTIONS
import { addEmoji } from '../functions'

const MessageForm = ({ sendMessage, message, setMessage, setMedia, media, chat, user1 }) => {
    const [chooseEmoji, setChooseEmoji] = useState(false)
    const emojiRef = useRef(null)

    return (
        <form className={styles.form} onSubmit={(e) => sendMessage(e,
            message,
            media,
            user1,
            chat,
            setMessage,
            setMedia
        )} >

            <label htmlFor="image">
                <BsUpload className="text-red-300" style={{ cursor: "pointer" }} size={20} />
                <input onChange={(e) => setMedia(e.target.files[0])} type="file" id="image" accept="image/*" style={{ display: "none" }} />
            </label>

            <label>
                <FiSmile className="text-red-300" style={{ cursor: "pointer" }} size={20} onClick={() => setChooseEmoji(true)} />
            </label>

            {chooseEmoji && <div className={styles.emojiPicker} ref={emojiRef}>
                <Picker
                    exclude={["search"]}
                    theme="dark"
                    onSelect={(e) => addEmoji(e, setMessage, message)}
                    onClick={() => setChooseEmoji(false)}
                />
            </div>}

            <input className={styles.messageInput} type="text" placheolder="Enter Message..." value={message} onChange={(e) => setMessage(e.target.value.trimStart())} />

            <div>
                <button className="text-red-300">
                    <FiSend className="text-red-300" style={{ cursor: "pointer" }} size={20} />
                </button>
            </div>
        </form>
    )
}

export default MessageForm