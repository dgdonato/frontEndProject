// This is the JS code to execute two API calls -> OMDB API and TMDB API
// OMDB is used to create a "smart" search (can guess movie based on key words), and to gather basic movie info including reviews
// TMDB is used to create a list of recommended movies that the user may also like

const moment = require('moment') // used the JS moment library

// create an event handler for the search button
document.getElementById("button").addEventListener('click', getMovie)

// create a function called "getMovie" that executes API calls and renders info to the screen
function getMovie() {
    let movieTitle = document.getElementById("movieTitle").value // user inputted values
    let apiKey =  document.getElementById("key1").value
    let apiKey2 = document.getElementById("key2").value
    let movieObj = {}

    if(movieTitle == "" || apiKey == "" || apiKey2 == "") { // cannot leave any fields blank (NOTE: HTML "required" attribute only works with submit)
        document.getElementById('errorHandling').innerHTML = "<b>ERROR:</b> Please fill in all fields." 
    }
    else {
        document.getElementById('errorHandling').innerHTML = "" // clear any old error messages
        fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}&type=movie`) // let's find the movie the user is looking for
        .then(response => {
            return response.json()
        })
        .then(data => { // if the API call produces an error, return the error to the user, if not proceed through the code
            if (data.Response == "True") {
                return data
            } else {
                document.getElementById('errorHandling').innerHTML = "<b>OMDB ERROR: </b>" + data.Error
            }
        })
        .then(data => { 
            return data.Search[0].imdbID // select the first movie in the query list (closest match to user's search)
        })
        .then(data => {
            reviews = fetch(`https://www.omdbapi.com/?i=${data}&apikey=${apiKey}&type=movie&plot=full`) // let's extract movie details we care about
            .then(response => {
                return response.json()
            })
            .then(data => {
                movieObj = {
                    imdbId: data.imdbID,            
                    title: data.Title,
                    released: moment(data.Released, "DD MMM YYYY").format("MMM DD, YYYY") + ` (${moment(data.Released, "DD MMM YYYY").fromNow()})`,
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
        .then(data => { // let's render the movie details to the upper portion of the page
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
    
            for(i=0; i<3; i++) { // edge case: we want to always run this three times (max number of reviews) to ensure old info is overwritten
                try {
                    elementId1 = 'output-source' + String(i+1)
                    elementId2 = 'output-rating' + String(i+1)
                    document.getElementById(elementId1).innerHTML = "<b>Source: </b>" + data.reviews[i].Source
                    document.getElementById(elementId2).innerHTML = "<b>Score: </b>" + data.reviews[i].Value
                }
                catch {
                    document.getElementById(elementId1).innerHTML = "-"
                    document.getElementById(elementId2).innerHTML = "-"
                }
            }
            return data
        })
        .then(obj => { // now we want recommendations, but we first need to find the corresponding TMDB unique identifier
            tmdbId = fetch(`https://api.themoviedb.org/3/find/${obj.imdbId}?api_key=${apiKey2}&language=en-US&external_source=imdb_id`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if(data.success == false) {
                    document.getElementById('errorHandling').innerHTML = "<b>TMDB ERROR: </b>" + data.status_message
                } else {
                    return data
                }
            })
            .then(data => {
                return data.movie_results[0].id
            })
            return tmdbId
        })
        .then(id => { // now let's use the TMDB ID to find recommendations
            let recsArray = []
            recs = fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey2}&language=en-US&page=1`)
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
        .then(data => { // let's render the recommendations to the bottom part of the screen
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