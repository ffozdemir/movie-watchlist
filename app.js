const sectionContainerEl = document.querySelector("section.container");
const searchFormEl = document.querySelector("form.search-form");

const fetchMovieImdbId = async (search) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=6a8ebd02&s=${search}`
    );
    const data = await response.json();
    if (data.Response === "True") {
      return data.Search.map((movie) => movie.imdbID);
    } else {
      throw new Error(
        "Unable to find what you’re looking for. Please try another search."
      );
    }
  } catch (error) {
    unableToFindMovie(error);
    return null;
  }
};

const fetchMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=6a8ebd02&i=${imdbID}`
    );
    const data = await response.json();
    if (data.Response === "True") {
      return data;
    } else {
      throw new Error("Unable to find movie details.");
    }
  } catch (error) {
    unableToFindMovie(error);
    return null;
  }
};

const unableToFindMovie = (error) => {
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-movie-not-found");
  errorMessage.textContent = error;
  sectionContainerEl.appendChild(errorMessage);
};

searchFormEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  sectionContainerEl.innerHTML = "";
  const searchInput = event.target.querySelector("input[name='search']");
  const searchValue = searchInput.value.trim();
  searchInput.value = "";
  if (searchValue.length < 3) {
    unableToFindMovie("Please enter at least 3 characters.");
    return;
  }

  if (searchValue) {
    const movieIds = await fetchMovieImdbId(searchValue);
    if (movieIds) {
      const moviesListEl = document.createElement("div");
      moviesListEl.classList.add("movies-list");
      const moviePromises = movieIds.map((id) => fetchMovieDetails(id));
      Promise.all(moviePromises)
        .then((movies) => {
          movies.forEach((movie) => {
            if (!movie) return;

            const poster =
              movie.Poster && movie.Poster !== "N/A"
                ? movie.Poster
                : "https://placehold.co/150x220";
            const ratingValue =
              movie.Ratings && movie.Ratings.length > 0
                ? movie.Ratings[0].Value
                : "N/A";
            const runtime =
              movie.Runtime && movie.Runtime !== "N/A" ? movie.Runtime : "N/A";
            const genre =
              movie.Genre && movie.Genre !== "N/A" ? movie.Genre : "N/A";
            const plot =
              movie.Plot && movie.Plot !== "N/A"
                ? movie.Plot
                : "Plot not available.";

            moviesListEl.innerHTML += `
                                    <div class="movie-card" id="${movie.imdbID}">
                                       <img
                                       src="${poster}"
                                       alt="${movie.Title} poster"
                                       class="movie-poster"
                                       />
                                       <div class="movie-info"">
                                       <div class="movie-header">
                                          <h2>
                                             ${movie.Title}
                                          </h2>
                                          <p><i class="fa-solid fa-star"></p></i><p> ${ratingValue}</p>
                                       </div>
                                       <div class="movie-details">
                                          <p>${runtime}</p>
                                          <p>${genre}</p>
                                          <button class="add-to-watchlist" data-movie-id="${movie.imdbID}">
                                             <i class="fa-solid fa-plus watchlist-icon"></i> Watchlist
                                          </button>
                                       </div>
                                       <p>
                                          ${plot} 
                                       </p>
                                       </div>
                                    </div>
                                  `;
            sectionContainerEl.appendChild(moviesListEl);
          });
        })
        .catch((error) => {
          unableToFindMovie(error);
        });
    }
  } else {
    unableToFindMovie("Please enter a search term.");
  }
});
