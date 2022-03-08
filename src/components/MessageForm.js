import React, { useState, useRef, useEffect } from 'react'

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import { FiSmile } from 'react-icons/fi'
import { BsUpload } from "react-icons/bs"
import { FiSend } from 'react-icons/fi'

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
        <form className="w-full flex items-center justify-center gap-3 p-3" onSubmit={sendMessage} >

            <label htmlFor="image">
                <BsUpload className="text-red-300" style={{ cursor: "pointer" }} size={20} />
                <input onChange={(e) => setMedia(e.target.files[0])} type="file" id="image" accept="image/*" style={{ display: "none" }} />
            </label>

            <label>
                <FiSmile className="text-red-300" style={{ cursor: "pointer" }} size={20} onClick={() => setChooseEmoji(true)} />
            </label>

            {chooseEmoji && <div className="emoji-table" ref={emojiRef}>
                <Picker
                    exclude={["search"]}
                    theme="dark"
                    onSelect={addEmoji}
                    style={{ position: 'absolute', top: '50%', right: '50%', transform: "translate(-50%, -50%)" }}
                />
            </div>}

            <input className="w-3/4 focus:outline-none
    focus:shadow-outline p-2" type="text" placheolder="Enter Message..." value={message} onChange={(e) => setMessage(e.target.value)} />

            <div>
                <button className="text-red-300">
                    <FiSend className="text-red-300" style={{ cursor: "pointer" }} size={20} />
                </button>
            </div>
        </form>
    )
}

export default MessageForm