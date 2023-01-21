/**
 * API: https://random-data-api.com
 */

const list = [1, 2, 3, 4, 5, 6, 7, 8 , 9, 10];

const logger = (nameFn: string, index: number, millisecond: number) => {
    return console.log(`Function ${nameFn}: Item N°${index} finished waiting ${Math.round(millisecond / 1000)} seconds later.`);
}

const fetchUser = async (seconds: number) => {
    await fetch("https://random-data-api.com/api/users/random_user");

    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

// ---------------------------- For -------------------------------

const fetchWithFor = async () => {
    const start = Date.now();
    for (const item of list) {
        await fetchUser(2);
        const later = Date.now();
        logger("mainWithFor", item, later - start);
    }
}

const onClickFetchWithFor = async (event: Event) => {
    event.preventDefault();
    buttonFetchWithFor!.disabled = true;
    buttonFetchWithFor!.innerText = "Loading ....";
    await fetchWithFor()
}

// ----------------------------ForEach-------------------------------

async function fetchWithForEach() {
    const start = Date.now();
    list.forEach(async (item) => {
        await fetchUser(2);
        const later = Date.now();
        logger("mainWithForEach", item, later - start);
    });
}

const onClickFetchWithForEach = async (event: Event) => {
    event.preventDefault();
    buttonFetchWithForEach!.disabled = true;
    buttonFetchWithForEach!.innerText = "Loading ....";
    await fetchWithForEach()
}

// ----------------------------- Map ------------------------------

async function fetchWithMap() {
    const start = Date.now();
    const promises = list.map(async (item) => {
        await fetchUser(2);
        const later = Date.now();
        logger("mainWithMap", item, later - start);
    });
    await Promise.all(promises);
}

const onClickFetchWithMap = async (event: Event) => {
    event.preventDefault();
    buttonFetchWithMap!.disabled = true;
    buttonFetchWithMap!.innerText = "Loading ....";
    await fetchWithMap()
}
// ----------------------------------------------------------

const buttonFetchWithFor = <HTMLButtonElement>document.getElementById("id-button-fetch-with-for");
const buttonFetchWithForEach = <HTMLButtonElement>document.getElementById("id-button-fetch-with-foreach");
const buttonFetchWithMap = <HTMLButtonElement>document.getElementById("id-button-fetch-with-map");

buttonFetchWithFor!.onclick = onClickFetchWithFor;
buttonFetchWithForEach!.onclick = onClickFetchWithForEach;
buttonFetchWithMap!.onclick = onClickFetchWithMap;
