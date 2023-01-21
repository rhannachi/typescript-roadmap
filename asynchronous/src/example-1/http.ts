import { User } from "./models.js";

/**
 * API: https://random-data-api.com
 */
export const fetchUser = async (seconds: number): Promise<User> => {
    const data: User = await fetch("https://random-data-api.com/api/users/random_user")
        .then((response) => response.json())
    await new Promise((resolve) => setTimeout(resolve, seconds * 1000));

    return data
}
