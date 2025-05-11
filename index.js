import "./styles.css";

const sectionContainerEl = document.querySelector("section.container");
const searchFormEl = document.querySelector("form.search-form");

const fetchMovieImdbId = async (search) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${search}`
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
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbID}`
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
            moviesListEl.innerHTML += createMovieCard(movie);
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

const createMovieCard = (movie) => {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://placehold.co/150x220";
  const ratingValue =
    movie.Ratings && movie.Ratings.length > 0 ? movie.Ratings[0].Value : "N/A";
  const runtime =
    movie.Runtime && movie.Runtime !== "N/A" ? movie.Runtime : "N/A";
  const genre = movie.Genre && movie.Genre !== "N/A" ? movie.Genre : "N/A";
  const plot =
    movie.Plot && movie.Plot !== "N/A" ? movie.Plot : "Plot not available.";

  const movieId = movie.imdbID;
  const movieTitle = movie.Title;
  return `
                                    <div class="movie-card" id="${movieId}">
                                       <img
                                       src="${poster}"
                                       alt="${movieTitle} poster"
                                       class="movie-poster"
                                       />
                                       <div class="movie-info"">
                                          <div class="movie-header">
                                             <h2>
                                                ${movieTitle}
                                             </h2>
                                             <p><i class="fa-solid fa-star"></p></i><p class="movie-rating"> ${ratingValue}</p>
                                          </div>
                                          <div class="movie-details">
                                             <p class = "movie-runtime">${runtime}</p>
                                             <p class="movie-genre">${genre}</p>
                                             <button class="add-to-watchlist" data-movie-id="${movieId}">
                                                <i class="fa-solid fa-plus watchlist-icon"></i> Watchlist
                                             </button>
                                          </div>
                                          <p class="movie-plot">
                                             ${plot} 
                                          </p>
                                       </div>
                                    </div>
   `;
};

sectionContainerEl.addEventListener("click", (event) => {
  const addBtn = event.target.closest("button.add-to-watchlist");
  const removeBtn = event.target.closest("button.remove-from-watchlist");

  if (addBtn) {
    const movieId = addBtn.dataset.movieId;
    const movieCard = document.getElementById(movieId);
    const movieTitle = movieCard.querySelector("h2").textContent;
    const moviePoster = movieCard.querySelector(".movie-poster").src;
    const moviePlot = movieCard.querySelector(".movie-plot").textContent;
    const movieRuntime = movieCard.querySelector(".movie-runtime").textContent;
    const movieGenre = movieCard.querySelector(".movie-genre").textContent;
    const movieRating = movieCard.querySelector(".movie-rating").textContent;

    const watchlistItem = {
      id: movieId,
      title: movieTitle,
      poster: moviePoster,
      plot: moviePlot,
      runtime: movieRuntime,
      genre: movieGenre,
      rating: movieRating,
    };

    let watchlist = [];
    try {
      watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    } catch (e) {
      watchlist = [];
    }
    if (!watchlist.some((item) => item.id === watchlistItem.id)) {
      watchlist.push(watchlistItem);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
    addBtn.innerHTML = `<i class="fa-solid fa-minus"></i> Remove`;
    addBtn.classList.remove("add-to-watchlist");
    addBtn.classList.add("remove-from-watchlist");
  }

  if (removeBtn) {
    const movieId = removeBtn.dataset.movieId;
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist = watchlist.filter((item) => item.id !== movieId);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    removeBtn.classList.remove("remove-from-watchlist");
    removeBtn.classList.add("add-to-watchlist");
    removeBtn.innerHTML = `<i class="fa-solid fa-plus watchlist-icon"></i> Watchlist`;
  }
});
