
export const list = [1, 2, 3, 4, 5, 6, 7, 8 , 9, 10] as const

export const logger = (nameFn: string, millisecond: number,  index?: number) => {
    let message = `${nameFn}: execution time of`
    if (typeof index === "number") {
        message = `${message} Item N°${index}`
    } else {
        message = `${message} Function`
    }
    message = `${message} is ${Math.round(millisecond / 1000)} seconds.`
    console.log(message)
}
