const navbar = `
    flex items-center justify-between
    bg-zinc-700
    p-4
`
const logo = `
    font-bold
    text-2xl
    text-white
`

const navButtonNoMargin = `
    ml-5
    hover:text-red-300
    transition duration-150 ease-in-out
    font-bold
    p-1
`
const navButtonMargin = `
    ml-5
    hover:text-red-300
    transition duration-150 ease-in-out
    font-bold
    p-1
`

const userBox = `
    bg-zinc-900
    cursor-pointer
    py-4 px-2
    text-white
`
const selectedUserBox = `
    bg-zinc-700
    cursor-pointer
`

const flexCenter = `
    flex items-center justify-between
`

const avatar = `
    h-10 w-10
    rounded-full
    object-cover
    border-4 bg-white
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
    bg-red-300
    text-white
    font-semibold
`
const senderMessage = `
    bg-zinc-900
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