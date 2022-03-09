const navbar = `
    flex items-center justify-between
    bg-zinc-700
    p-4
`
const logo = `
    text-white
    font-bold
    text-2xl
    hover:text-red-400
    transition duration-150 ease-in-out
`
const navButtonNoMargin = `
    hover:text-red-300
    transition duration-150 ease-in-out
`
const navButtonMargin = `
    ml-3
    hover:text-red-300
    transition duration-150 ease-in-out
`
const userBox = `
    bg-zinc-900
    cursor-pointer
    py-4 px-2
    text-white
    border-b
    border-red-200
`
const selectedUserBox = `
    cursor-pointer
    bg-zinc-600
    text-white
`
const flexCenter = `
    flex items-center justify-between
    w-full
`
const avatar = `
    h-10 w-10
    rounded-full
    object-cover
    border-4 bg-white
    self-start
`
const sender = `
    self-start text-left
`
const me = `
    self-end text-right
`
const message = `
    px-6 py-4
    w-full
    rounded-md
    relative
    group
    transition duration-150 ease-in-out
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
const newMessage = `
    w-2
    h-2
    rounded-full
    bg-red-300
    animate-ping
    absolute
    bottom-2
    right-0
`
const profileInfo = `
    flex flex-col
    items-center justify-center
    sm:flex-row
    lg:justify-start
    gap-3
    w-full
`
const profileNameContainer = `
    flex
    items-center justify-start
    gap-4
    relative
    w-full
`
const lastMessage = `
    hidden
    lg:inline-flex
    truncate
    mt-2
`
const form = `
w-full flex items-center justify-center gap-3 p-3
`
const messageInput = `
    w-3/4
    focus:outline-none
    focus:shadow-outline
    p-2
    caret-red-400
`

const emojiPicker = `
    absolute
    inset-x-20
    bottom-1/4
`
const deleteButton = "text-red-200 ml-3 cursor-pointer absolute right-0 bottom-0 hidden group-hover:block transition duration-150 ease-in-out hover:text-red-600"






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
    newMessage,
    profileInfo,
    profileNameContainer,
    lastMessage,
    form,
    messageInput,
    emojiPicker,
    deleteButton
}