import React from 'react'
import { FaSpinner } from '../assets'

const Loading = () => {
  return (
    <div className="bg-zinc-700 h-screen text-red-300 flex items-center justify-center" style={{ position: "relative" }}>
      <FaSpinner className="animate-spin" size={50} />
    </div>
  )
}

export default Loading