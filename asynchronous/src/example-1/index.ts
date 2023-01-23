import {fetchWithFor, fetchWithMap, fetchWithMap2, fetchWithReduce} from "./services.js";

// ---------------------------- For -------------------------------
const onClickFetchWithFor = async (event: Event) => {
    event.preventDefault();
    buttonFetchWithFor!.disabled = true;
    buttonFetchWithFor!.innerText = "Loading ....";
    console.log("------------Start--------------")
    const users = await fetchWithFor()
    console.log({ users })
    console.log("------------End--------------")
    buttonFetchWithFor!.disabled = false;
    buttonFetchWithFor!.innerText = "Fetch users with For";
}

// ----------------------------- Map ------------------------------
const onClickFetchWithMap = async (event: Event) => {
    event.preventDefault();
    buttonFetchWithMap!.disabled = true;
    buttonFetchWithMap!.innerText = "Loading ....";
    console.log("------------Start--------------")
    const users = await fetchWithMap()
    console.log({ users })
    console.log("------------End--------------")
    buttonFetchWithMap!.disabled = false;
    buttonFetchWithMap!.innerText = "Fetch users with Map";
}

const onClickFetchWithMap2 = async (event: Event) => {
    event.preventDefault();
    buttonFetchWithMap2!.disabled = true;
    buttonFetchWithMap2!.innerText = "Loading ....";
    console.log("------------Start--------------")
    const users = await fetchWithMap2()
    console.log({ users })
    console.log("------------End--------------")
    buttonFetchWithMap2!.disabled = false;
    buttonFetchWithMap2!.innerText = "Fetch users with Map 2";
}

// ---------------------------- Reduce -------------------------------

const onClickFetchWithReduce = async (event: Event) => {
    event.preventDefault();
    buttonFetchWithReduce!.disabled = true;
    buttonFetchWithReduce!.innerText = "Loading ....";
    console.log("------------Start--------------")
    const users = await fetchWithReduce()
    console.log({ users })
    console.log("------------End--------------")
    buttonFetchWithReduce!.disabled = false;
    buttonFetchWithReduce!.innerText = "Fetch users with Reduce";
}


// ----------------------------------------------------------

const buttonFetchWithFor = <HTMLButtonElement>document.getElementById("id-button-fetch-with-for");
const buttonFetchWithMap = <HTMLButtonElement>document.getElementById("id-button-fetch-with-map");
const buttonFetchWithMap2 = <HTMLButtonElement>document.getElementById("id-button-fetch-with-map-2");
const buttonFetchWithReduce = <HTMLButtonElement>document.getElementById("id-button-fetch-with-reduce");

buttonFetchWithFor!.onclick = onClickFetchWithFor;
buttonFetchWithMap!.onclick = onClickFetchWithMap;
buttonFetchWithMap2!.onclick = onClickFetchWithMap2;
buttonFetchWithReduce!.onclick = onClickFetchWithReduce;
