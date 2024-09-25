export const capitalize = (text: string): string => {
    if (text) {
        return text.toLowerCase().replace(/(?:^|\s)\S/g, (match) => match.toUpperCase())
    } else return ''
}
