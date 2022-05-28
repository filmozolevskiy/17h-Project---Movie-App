const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5a947c16c1452b4050b40b452f37a4e1&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=5a947c16c1452b4050b40b452f37a4e1&page=1&query="'


const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
  const res = await fetch(url) // receives the data in basic format
  const data = await res.json() // turn it into JSON
  
  showMovies(data.results) // use array with the results and make visual representation
}



function showMovies(movies) {
  main.innerHTML = '' // set the page to nothing, because when we refresh a page we want to show the search results separately, not to add them to the existing ones

  movies.forEach((movie) => { // go through all received movies
    const {title, poster_path, vote_average, overview} = movie // destructuring = easier syntax to create consts and variables; e.g. cost title = movie.title

    const movieEl = document.createElement('div') // creating movieEL
    movieEl.classList.add('movie') // giving the class of movie
    
    // creating html for each movie
    movieEl.innerHTML = ` 
      <img src="${IMG_PATH + poster_path}" alt="${title}">

      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>

      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `
    main.appendChild(movieEl) // putting them to the DOM
  })
}

function getClassByRate(vote) { // utility function for painting the rating of movie
 if (vote >= 8) {
   return 'green'
 } else if(vote >= 5) {
   return 'orange'
 } else {
  return 'red'
 }
}

// Functionality for search

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTearm = search.value

  // checking if searchTearm exists and not equal to nothing
  if(searchTearm && searchTearm !== '') {
    getMovies(SEARCH_API + searchTearm) // if so use getMovies with SEARCH_API and searchTearm -> it will return a list of found elements

    search.value = '' // set search.value to none
  } else {
    window.location.reload() // if we submit without info in search.value -> just reload
  }
})