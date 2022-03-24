// Utilize both the OMDB and TMBD APIs for the "move getter" page
// The OMDB API call(s) will extract selected movie information, namely reviews from three sources
// The TMDB API will be used to extract the recommendations
// Use helper functions to keep code cleaner

// we need an event handler first
document.getElementById("button").addEventListener('click', getMovie)

// the variables eventually need to be dynamic, but for now...
function getMovie() {
    let movieTitle = document.getElementById("movieTitle").value
    let apiKey = '8a624efe' // key for OMDB - will need to take this out
    let apiKey2 = '9c4e939d595025072865984402123836' // key for TMDB - will need to take this out
    let movieObj = {}

    if(movieTitle == "" || apiKey == "" | apiKey2 == "") {
        alert("ERROR: fields cannot be blank");
    }
    else{
        fetch(`http://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}&type=movie`) // let's pull the movie someone is searching for (smarter search)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.Response == "True") {
                return data
            } else {
                alert(data.Error)  
            }
        })
        .then(data => { 
            return data.Search[0].imdbID // get the first movie's ID
        })
        .then(data => {
            reviews = fetch(`http://www.omdbapi.com/?i=${data}&apikey=${apiKey}&type=movie&plot=full`) // let's add all the movie details we care about
            .then(response => {
                return response.json()
            })
            .then(data => {
                movieObj = {
                    imdbId: data.imdbID,            
                    title: data.Title,
                    released: data.Released,
                    actors: data.Actors,
                    director: data.Director,
                    awards: data.Awards,
                    rated: data.Rated,
                    runtime: data.Runtime,
                    genre: data.Genre,
                    plot: data.Plot,
                    poster: data.Poster,
                    reviews: data.Ratings
                    
                }
                return movieObj
            })
            return reviews
        })
        .then(data => { // let's render some of the stuff for the first half of the page
            document.getElementById('output-poster').src = data.poster
            document.getElementById('output-title').innerHTML = "<b>Title: </b>" + data.title
            document.getElementById('output-released').innerHTML = "<b>Released: </b>" + data.released
            document.getElementById('output-runtime').innerHTML = "<b>Runtime: </b>" + data.runtime
            document.getElementById('output-rated').innerHTML = "<b>Rated: </b>" + data.rated
            document.getElementById('output-genre').innerHTML = "<b>Genre: </b>" + data.genre
            document.getElementById('output-actors').innerHTML = "<b>Actors: </b>" + data.actors
            document.getElementById('output-director').innerHTML = "<b>Director: </b>" + data.director
            document.getElementById('output-awards').innerHTML = "<b>Awards: </b>" + data.awards
            document.getElementById('output-plot').innerHTML = "<i>" + data.plot + "</i>"
    
            for(i=0; i<3; i++) { // make dynamic, because sometimes there are less than three review sources
                try {
                    elementId1 = 'output-source' + String(i+1)
                    elementId2 = 'output-rating' + String(i+1)
                    document.getElementById(elementId1).innerHTML = data.reviews[i].Source
                    document.getElementById(elementId2).innerHTML = "<b>Score: </b>" + data.reviews[i].Value
                }
                catch {
                    document.getElementById(elementId1).innerHTML = "-"
                    document.getElementById(elementId2).innerHTML = "-"
                }
            }
            return data
        })
        .then(obj => {
            tmdbId = fetch(`https://api.themoviedb.org/3/find/${obj.imdbId}?api_key=${apiKey2}&language=en-US&external_source=imdb_id`) // lets use the IMDB id to find the TMDB id
            .then(response => {
                return response.json()
            })
            .then(data => {
                return data.movie_results[0].id
            })
            return tmdbId
        })
        .then(id => {
            let recsArray = []
            recs = fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey2}&language=en-US&page=1`) // lets use the TMDB id to find recommendations
            .then(response => {
                return response.json()
            })
            .then(data => {
                for(i=0; i < 3; i++) {
                    recsArray.push({title: data.results[i].title, poster: data.results[i].backdrop_path, overview: data.results[i].overview})
                }
                return recsArray
            })
            return recs
        })
        .then(data => { // let's render some of the stuff for the second half of the
            document.getElementById("output-recs-img1").src = "https://image.tmdb.org/t/p/w500" + data[0].poster
            document.getElementById("output-recs-title1").innerHTML = data[0].title
            document.getElementById("output-recs-synopsis1").innerHTML = data[0].overview
    
            document.getElementById("output-recs-img2").src = "https://image.tmdb.org/t/p/w500" + data[1].poster
            document.getElementById("output-recs-title2").innerHTML = data[1].title
            document.getElementById("output-recs-synopsis2").innerHTML = data[1].overview
    
            document.getElementById("output-recs-img3").src = "https://image.tmdb.org/t/p/w500" + data[2].poster
            document.getElementById("output-recs-title3").innerHTML = data[2].title
            document.getElementById("output-recs-synopsis3").innerHTML = data[2].overview        
        })      
    }
}
