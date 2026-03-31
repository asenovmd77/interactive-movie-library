const SEARCH_API = 'http://www.omdbapi.com/?apikey=12435e1e&s=';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.Search)
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const movieEl = document.createElement('article');
        movieEl.classList.add('movie-card');

        movieEl.innerHTML = `
            <figure class="movie-card-poster">
                <img src="${movie.Poster}" alt="${movie.Title}">
            </figure>
            <div>
                <h3>${movie.Title}</h3>
                <h4>${movie.Year}</h4>
            </div>
            <div class="movie-card-buttons">
                <button class="details-btn">Show Details</button>
                <button class="favorites-btn">Add to Favorites</button>
            </div>
        `;

        main.appendChild(movieEl);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
});
