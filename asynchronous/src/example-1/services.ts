import {User} from "./models.js";
import {fetchUser} from "./http.js";
import {list, logger} from "./utils.js";

// -------------------- For ------------------
export const fetchWithFor = async () => {
    const start = Date.now();
    const users: User[] = []
    for (const item of list) {
        const startItem = Date.now();
        const user = await fetchUser(2);
        users.push(user)
        logger("fetchWithFor", Date.now() - startItem, item);
    }
    logger("fetchWithFor", Date.now() - start);
    return users
}

// -------------------- Map ------------------
export async function fetchWithMap() {
    const start = Date.now();
    const promises = list.map((item) => {
        const startItem = Date.now();
        const userPromise = fetchUser(2);
        logger("fetchWithMap", Date.now() - startItem, item);
        return userPromise
    });
    const users = await Promise.all(promises);
    logger("fetchWithMap", Date.now() - start);
    return users
}