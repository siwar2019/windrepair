export const getDisplayText = (text: string, maxLength: number) => {
    const isLongText = text.length > maxLength
    const displayText = isLongText ? text.substring(0, maxLength) + '...' : text
    return { displayText, isLongText }
}
