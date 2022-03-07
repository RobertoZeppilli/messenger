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
`
const label = `
    block
    text-gray-700
    text-sm font-bold
    mb-2
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
    bg-red-500
    hover:bg-red-700
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
    bg-red-400
    flex items-center justify-center
    p-2
`

export const styles = {
    form,
    label,
    input,
    container,
    formActions,
    formButton,
    error
}