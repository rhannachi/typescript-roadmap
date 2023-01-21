import {fetchWithFor, fetchWithMap } from "./services.js";

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

// ---------------------------- Reduce -------------------------------


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


// ----------------------------------------------------------

const buttonFetchWithFor = <HTMLButtonElement>document.getElementById("id-button-fetch-with-for");
// const buttonFetchWithForEach = <HTMLButtonElement>document.getElementById("id-button-fetch-with-foreach");
const buttonFetchWithMap = <HTMLButtonElement>document.getElementById("id-button-fetch-with-map");

buttonFetchWithFor!.onclick = onClickFetchWithFor;
// buttonFetchWithForEach!.onclick = onClickFetchWithForEach;
buttonFetchWithMap!.onclick = onClickFetchWithMap;
