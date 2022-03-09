import React, { useState, useRef, useEffect } from 'react'

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import { FiSmile } from 'react-icons/fi'
import { BsUpload } from "react-icons/bs"
import { FiSend } from 'react-icons/fi'
import { styles } from './styles'

const MessageForm = ({ sendMessage, message, setMessage, setMedia, media, chat, user1 }) => {
    const [chooseEmoji, setChooseEmoji] = useState(false)
    const emojiRef = useRef(null)


    function addEmoji(e) {
        let emoji = e.native;
        setMessage(message + emoji);
    };

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setChooseEmoji(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [emojiRef]);

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
                    onSelect={addEmoji}
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