import { User } from "./models.js";

const API_GET_USER = "https://random-data-api.com/api/users/random_user" as const

const sleep = (n: number) => new Promise((res) => setTimeout(res, n));

/**
 * API: https://random-data-api.com
 */
export const fetchUser = async (seconds: number): Promise<User> => {

    const data: User = await fetch(API_GET_USER).then((response) => response.json())
    await sleep(seconds * 1000)

    return data
}
