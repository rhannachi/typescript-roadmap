import {User} from "./models.js";
import {fetchUser} from "./http.js";
import {list, logger} from "./utils.js";

// -------------------- For ------------------
export const fetchWithFor = async () => {
    const start = Date.now();
    const users: User[] = []
    for (const item of list) {
        console.log(`Start execution of Item N°${item}`)
        const startItem = Date.now();
        const user = await fetchUser(2);
        // transform user
        users.push({
            ...user,
            username: 'Luc',
        })
        logger("End", Date.now() - startItem, item);
    }
    logger("-> fetchWithFor", Date.now() - start);
    return users
}

// -------------------- Map ------------------

export const fetchWithMap = async () => {
    const start = Date.now();
    const promises = list.map(async (item) => {
        // return new Promise
        return new Promise(async (resolve) => {
            console.log(`Start execution of Item N°${item}`)
            const startItem = Date.now();
            let user = await fetchUser(2);
            // transform users
            user = {
                ...user,
                username: 'Luc',
            }
            logger("End", Date.now() - startItem, item);
            resolve(user)
        })
    });
    const users = await Promise.all(promises);
    logger("-> fetchWithMap", Date.now() - start);
    return users
}

export const fetchWithMap2 = async () => {
    const start = Date.now();
    const promises = list.map((item) => {
        console.log(`Start execution of Item N°${item}`)
        const startItem = Date.now();
        const userPromise = fetchUser(2);
        logger("End", Date.now() - startItem, item);
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
        const accumulator = await accumulatorPromise

        console.log(`Start execution of Item N°${item}`)
        const startItem = Date.now();
        let user = await fetchUser(2);
        // transform users
        user = {
            ...user,
            username: 'Luc',
        }
        accumulator.push(user)
        logger("End", Date.now() - startItem, item);
        return accumulator
    }, Promise.resolve<User[]>([]));
    logger("-> fetchWithReduce", Date.now() - start);
    return users
}