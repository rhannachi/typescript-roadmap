/**
 * Parameters
 */

function fetchUser(id:  number, username: string) {
    console.log(`Id:${id} - UserName:${username}`)
}

type FetchUserParams = Parameters<typeof fetchUser> // [id: number, username: string]

function fetchUser2(...params: FetchUserParams) {
    fetchUser(...params)
}

console.log('Parameters Example')
fetchUser2(23, 'Luc')
