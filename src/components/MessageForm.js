import React, { useState, useRef, useEffect } from 'react'
import Attachment from './svg/Attachment'

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import { FiSmile } from 'react-icons/fi'

const MessageForm = ({ sendMessage, message, setMessage, setMedia }) => {
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
        <form className="message_form" onSubmit={sendMessage} >
            <label htmlFor="image">
                <Attachment />
            </label>
            <input onChange={(e) => setMedia(e.target.files[0])} type="file" id="image" accept="image/*" style={{ display: "none" }} />
            <FiSmile style={{ cursor: "pointer" }} size={20} onClick={() => setChooseEmoji(true)} />

            {chooseEmoji && <div className="emoji-table" ref={emojiRef}>
                <Picker
                    exclude={["search"]}
                    theme="dark"
                    onSelect={addEmoji}
                    style={{ position: 'absolute', top: '50%', right: '50%' }}
                />
            </div>}
            <div className="main_input">
                <input type="text" placheolder="Enter Message..." value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <div>
                <button className="btn">Send</button>
            </div>
        </form>
    )
}

export default MessageForm