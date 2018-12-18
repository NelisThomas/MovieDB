const searchInput = document.getElementById("searchInput");
const apiKey = "a49f54f4";
const url = "http://www.omdbapi.com/?apikey="
const s = "&s=";
const i = "&i=";

let results = "";
let movieList = document.getElementById("movieList");
let movieDetails = document.getElementById("movieDetails");
let body = document.getElementsByTagName("body")[0];
let searchContainer = document.getElementById("searchContainer");
let returnButton = document.getElementById("returnButton");
let mainCont = document.getElementById("mainContainer");

searchInput.addEventListener("focus",moveSearchBar);
searchInput.addEventListener("keyup",searchFunction);
returnButton.addEventListener("click",returnHome);


function searchFunction(){
    let searchValue = searchInput.value;
    if (searchValue.length>2){
        
        results = "";
        fetch(url+apiKey+s+searchValue) // Call the fetch function passing the url of the API as a parameter
        .then(function(response){
            return response.json();
        })
        .then(function(myJson) {
            let pushArray = [];
            for (let i in myJson){
                pushArray.push([i, myJson[i]]);
            }
            let movie = pushArray[0][1];
            console.log(movie);
            movie.map(movie => {
                results += `<li onclick="inspectMovie('${movie.imdbID}')">${movie.Title}</li>`;
                movieList.innerHTML = results;
            })
        })
        .catch(function() {
            // This is where you run code if the server returns any errors
            console.log("failed");
        });
    } else {
        movieList.innerHTML = "";
    }
}
let toBeIgnored = [
    "Title",
    "Year",
    "Poster",
    "Response",
    "imdbID",
    "Type",
    "Website"
]
function inspectMovie(id){
    returnButton.style.display = "block";
    searchContainer.style.display = "none";
    movieDetails.style.display = "flex";
    body.style.backgroundColor = "#0A095F";
    fetch(url+apiKey+i+id)
    .then(function(response){
        return response.json();
    })
    .then(function(resp){
        console.log(resp);
        document.getElementById("movieList").innerHTML = "";
        movieDetails.innerHTML = "";
        if (resp.Poster !== "N/A"){
            movieDetails.innerHTML += `
            <img src="${resp.Poster}">`;
        }
        movieDetails.innerHTML += `
                <h1><a href="${resp.Website}">${resp.Title}</a></h1>`;
        for (let i in resp){
            if (resp[i] !== "N/A" && toBeIgnored.includes(i) === false){
                console.log(i);
                let t = document.createTextNode(`${resp.i}`)
                movieDetails.innerHTML += `
                <p> <b>${i}:</b> ${resp[i]}`;
            }
        }
    })
}

let isSearchTop = false;
function moveSearchBar(){
    searchInput.removeEventListener("focus",moveSearchBar);
    isSearchTop = true;
    mainCont.style.justifyContent = "flex-start";
    searchInput.style.marginTop = "10vh";
    body.style.backgroundColor = "#0A095F";
}

function returnHome(){
    returnButton.style.display = "";
    searchContainer.style.display = "";
    movieDetails.style.display = "";
    body.style.backgroundColor = "";
    mainCont.style.justifyContent = "";
    searchInput.style.marginTop = "";
    body.style.backgroundColor = "";
    searchInput.value = "";
    searchInput.addEventListener("focus",moveSearchBar);
}