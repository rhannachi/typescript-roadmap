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
        // transform user
        users.push({
            ...user,
            username: 'Luc',
        })
        logger("fetchWithFor", Date.now() - startItem, item);
    }
    logger("-> fetchWithFor", Date.now() - start);
    return users
}

// -------------------- Map ------------------

export const fetchWithMap = async () => {
    const start = Date.now();
    const promises = list.map(async (item) => {
        const startItem = Date.now();
        let user = await fetchUser(2);
        // transform users
        user = {
            ...user,
            username: 'Luc',
        }
        logger("fetchWithMap", Date.now() - startItem, item);
        return user
    });
    const users = await Promise.all(promises);
    logger("-> fetchWithMap", Date.now() - start);
    return users
}

export const fetchWithMap2 = async () => {
    const start = Date.now();
    const promises = list.map((item) => {
        const startItem = Date.now();
        const userPromise = fetchUser(2);
        logger("fetchWithMapOp", Date.now() - startItem, item);
        return userPromise
    });
    let users = await Promise.all(promises);
    // transform users
    users = users.map((user: User) =>({
        ...user,
        username: 'Luc',
    }))
    //
    logger("-> fetchWithMapOp", Date.now() - start);
    return users
}

// -------------------- Reduce ------------------

export const fetchWithReduce = async () => {
    const start = Date.now();
    const users = await list.reduce(async (accumulatorPromise, item) => {
        const startItem = Date.now();
        const accumulator = await accumulatorPromise
        let user = await fetchUser(2);
        // transform users
        user = {
            ...user,
            username: 'Luc',
        }
        accumulator.push(user)
        logger("fetchWithReduce", Date.now() - startItem, item);
        return accumulator
    }, Promise.resolve<User[]>([]));
    logger("-> fetchWithReduce", Date.now() - start);
    return users
}