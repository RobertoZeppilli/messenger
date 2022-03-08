const navbar = `
    flex items-center justify-between
    bg-red-500
    p-4
`
const logo = `
    font-bold
    text-2xl
    text-white
`

const navButtonNoMargin = `
    ml-5
    hover:bg-white hover:text-red-500
    transition duration-150 ease-in-out
    font-bold
    p-1
    rounded-full
`
const navButtonMargin = `
    ml-5
    hover:bg-white hover:text-red-500
    transition duration-150 ease-in-out
    font-bold
    p-1
    rounded-full
`

const userBox = `
    bg-zinc-200
    cursor-pointer
    py-3 px-2
    border-b-2 border-zinc-500
`
const selectedUserBox = `
    bg-zinc-500
    border-zinc-200
`

const flexCenter = `
    flex items-center justify-between
`

const avatar = `
    h-12 w-12
    rounded-full
    object-cover
    border-2 bg-white
`
const sender = `
    self-start text-left
`
const me = `
    self-end text-right
`
const message = `
    px-5 py-3
    w-full
    rounded-md
`

const myMessage = `
    bg-red-400
    text-white
    font-semibold
`
const senderMessage = `
    bg-green-400
    text-white
    font-semibold
`

export const styles = {
    navbar,
    logo,
    navButtonMargin,
    navButtonNoMargin,
    userBox,
    flexCenter,
    avatar,
    selectedUserBox,
    sender,
    me,
    message,
    myMessage,
    senderMessage,
}