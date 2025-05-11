import "./styles.css";

const sectionContainerEl = document.querySelector("section.container");

const getWatchListFromLocalStorage = () => {
  const watchList = localStorage.getItem("watchlist");
  return watchList ? JSON.parse(watchList) : [];
};

const renderWatchList = () => {
  const watchList = getWatchListFromLocalStorage();
  if (watchList.length === 0) {
    sectionContainerEl.innerHTML = `
                        <div class="watchlist-without-movies">
                           <p>Your watchlist is looking a little empty...</p>
                           <p><i class="fa-solid fa-plus"></i> Let's add some movies!</p>
                        </div>`;

    return;
  }
  sectionContainerEl.innerHTML = "";
  const moviesListEl = document.createElement("div");
  moviesListEl.classList.add("movies-list");
  Array.from(watchList).forEach((movie) => {
    const movieCard = createMovieCardWatchlist(movie);
    moviesListEl.innerHTML += movieCard;
  });
  sectionContainerEl.appendChild(moviesListEl);
};

const createMovieCardWatchlist = (movie) => {
  const { id, title, poster, plot, runtime, genre, rating } = movie;

  return `
                                    <div class="movie-card" id="${id}">
                                       <img
                                       src="${poster}"
                                       alt="${title} poster"
                                       class="movie-poster"
                                       />
                                       <div class="movie-info">
                                          <div class="movie-header">
                                             <h2>
                                                ${title}
                                             </h2>
                                             <p><i class="fa-solid fa-star"></i><span class="movie-rating"> ${rating}</span></p>
                                          </div>
                                          <div class="movie-details">
                                             <p class = "movie-runtime">${runtime}</p>
                                             <p class="movie-genre">${genre}</p>
                                             <button class="remove-from-watchlist" data-movie-id="${id}">
                                                <i class="fa-solid fa-minus watchlist-icon"></i>Remove
                                             </button>
                                          </div>
                                          <p class="movie-plot">
                                             ${plot} 
                                          </p>
                                       </div>
                                    </div>
   `;
};

const removeMovieFromWatchList = (movieId) => {
  const watchList = getWatchListFromLocalStorage();
  const updatedWatchList = watchList.filter((movie) => movie.id !== movieId);
  localStorage.setItem("watchlist", JSON.stringify(updatedWatchList));
  renderWatchList();
};
const handleMovieCardClick = (event) => {
  const target = event.target;
  const button = target.classList.contains("watchlist-icon")
    ? target.closest("button.remove-from-watchlist")
    : target;
  if (button && button.classList.contains("remove-from-watchlist")) {
    const movieId = button.dataset.movieId;
    removeMovieFromWatchList(movieId);
  }
};
sectionContainerEl.addEventListener("click", handleMovieCardClick);

renderWatchList();
