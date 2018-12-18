const searchInput = document.getElementById("searchInput");
const apiKey = "a49f54f4";
const url = "http://www.omdbapi.com/?apikey="
const s = "&s=";
const i = "&i=";
let results = "";
let movieDetails = document.getElementById("movieDetails");

searchInput.addEventListener("keyup",searchFunction);


function searchFunction(){
    let searchValue = searchInput.value;
    if (searchValue.length>2){
        
        results = "";
        fetch(url+apiKey+s+searchValue) // Call the fetch function passing the url of the API as a parameter
        // fetch(`http://www.omdbapi.com/?apikey=a49f54f4&s=${searchValue}`)
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
            // for (let i=0;i<movie.length;i++){
            //     results += `<li onclick="inspectMovie('${movie[i].imdbID}')">${movie[i].Title}</li>`;
            //     document.getElementById("movieList").innerHTML = results;
            // }
            movie.map(movie => {
                results += `<li onclick="inspectMovie('${movie.imdbID}')">${movie.Title}</li>`;
                document.getElementById("movieList").innerHTML = results;
            })
        })
        .catch(function() {
            // This is where you run code if the server returns any errors
            console.log("failed");
        });
    }
}
function inspectMovie(id){
    movieDetails.style.display = "block";
    fetch(url+apiKey+i+id)
    .then(function(response){
        return response.json();
    })
    .then(function(resp){
        console.log(resp);
        document.getElementById("movieList").innerHTML = "";
        movieDetails.innerHTML = "";
        if (resp.Poster !== "N/A"){
            console.log("hhhhhhhhh");
            movieDetails.innerHTML += `
            <img src="${resp.Poster}">`;
        }
        movieDetails.innerHTML += `
                <h1>${resp.Title}</h1>`;
        for (let i in resp){
            if (resp[i] !== "N/A" && i !== "Title" && i !== "Year" && i !== "Poster"){
                console.log(i);
                let t = document.createTextNode(`${resp.i}`)
                movieDetails.innerHTML += `
                <p> <b>${i}:</b> ${resp[i]}`;
            }
        }
    })
}

