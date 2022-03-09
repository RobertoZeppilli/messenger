const input = `
    shadow
    appearance-none
    border
    rounded
    w-full
    py-2 px-3
    text-gray-700
    leading-tight
    focus:outline-none
    focus:shadow-outline
    caret-red-400
`
const label = `
    block
    text-gray-700
    text-sm font-bold
    mb-2
    text-red-400
`
const form = `
    bg-white
    shadow-md
    rounded
    px-8 pt-6 pb-8 mb-4
`
const error = `
    text-red-500 text-xs italic
`
const formActions = `
    flex
    flex-col
    gap-1
    items-center justify-between
`
const formButton = `
    bg-red-400
    hover:bg-red-500
    w-full text-white
    font-bold
    py-2 px-4
    rounded
    focus:outline-none
    focus:shadow-outline
    transition duration-150 ease-in-out
`
const container = `
    h-screen
    bg-zinc-800
    flex items-center justify-center
    p-2
`
const homeContainer = `
    flex flex-col h-screen
`
const gridWrapper = `
    grid-container
    grid
    grid-cols-5
    flex-grow
`
const usersContainer = `
    col-span-1
    bg-zinc-700
`
const chatWrapper = `
    col-span-4
    overflow-hidden
    bg-zinc-900
`
const chatContainer = `
    flex flex-col
    h-full
`
const chatProfile = `
    myProfile
    text-red-300
    flex items-center justify-center
    gap-2
`
const chatProfileAvatar = `
    h-12 w-12
    rounded-full
    object-cover
`
const chatMessages = `
    myMessages
    bg-zinc-700
    overflow-y-auto
`

const chatForm = `
    myForm
    bg-zinc-900
    flex items-center justify-center
`
const noChat = `
    text-red-400
    font-bold
    sm:text-3xl
    text-center
    p-4
`
const otherPage = `
    text-red-400
    hover:text-red-500
    transition duration-150 ease-in-out
`

const profileContainer = `
    bg-zinc-800
    flex items-center justify-center
    p-2
`
const profileBox = `
    flex flex-col
    items-center
    sm:flex-row
    border-4
    border-red-400 p-4
`
const imageContainer = `
    img_container
    sm:mr-3 mb-2 sm:mb-0
`
const userEmail = `
    italic
    py-2
    border-b border-red-400
`
export const styles = {
    form,
    label,
    input,
    container,
    formActions,
    formButton,
    error,
    homeContainer,
    gridWrapper,
    usersContainer,
    chatWrapper,
    chatContainer,
    chatProfile,
    chatProfileAvatar,
    chatMessages,
    chatForm,
    noChat,
    otherPage,
    profileContainer,
    profileBox,
    imageContainer,
    userEmail
}

