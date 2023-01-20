/**
 * ReturnType
 */

type FetchUserReturn = ReturnType<typeof fetchData> // {name: string, description: string}

function fetchData() {
    return {
        name: 'Luc',
        description: 'bla bla'
    }
}

const data: FetchUserReturn = fetchData()

console.log('ReturnType Example')
console.log({ data })
