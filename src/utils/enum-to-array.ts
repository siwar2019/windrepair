export const enumToArray = (enumObj: any, data: string, t: (key: string) => string) => {
    return Object.values(enumObj).map((value) => ({
        name: t(`${data}.${value as string}`),
        value: value as string
    }))
}
