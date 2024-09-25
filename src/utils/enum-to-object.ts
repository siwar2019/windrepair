export const enumToObject = (enumObj: object) => {
    return Object.keys(enumObj).reduce(
        (acc, key) => {
            const value = enumObj[key as keyof typeof enumObj]
            acc[value] = value
            return acc
        },
        {} as Record<string, string>
    )
}
