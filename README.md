# Movie Watchlist

[Live Demo](https://harmonious-phoenix-dd5c22.netlify.app)

## Description

Movie Watchlist is a web application that allows users to search for movies and manage their personal watchlist. Users can find movies using the OMDb API, view details such_as rating, runtime, genre, and plot, and add or remove movies from their watchlist. The watchlist is saved locally in the browser using `localStorage`.

## Features

*   **Movie Search:** Search for movies by title.
*   **Movie Details:** View detailed information for each movie, including:
    *   Poster
    *   Title
    *   Rating
    *   Runtime
    *   Genre
    *   Plot summary
*   **Personal Watchlist:**
    *   Add movies to a personal watchlist.
    *   View all movies in the watchlist.
    *   Remove movies from the watchlist.
*   **Persistent Storage:** The watchlist is saved in the browser's `localStorage`, so it persists across sessions.
*   **Responsive Design:** The application is designed to work on different screen sizes.
*   **Dark Mode:** Adapts to the user's system preference for dark mode.

## How to Use

1.  **Clone the repository (or download the files):**
    ```bash
    git clone <repository-url>
    cd movie-watchlist
    ```
2.  **Open `index.html` in your web browser** to start searching for movies.
3.  **Search for movies:** Use the search bar on the main page.
4.  **Add to Watchlist:** Click the "Add to Watchlist" (or `+ Watchlist`) button on a movie card.
5.  **View Watchlist:** Navigate to the "My Watchlist" page (usually `watchlist.html`).
6.  **Remove from Watchlist:** On the watchlist page, click the "Remove" button on a movie card.

## Technologies Used

*   **HTML5:** For the basic structure of the web pages.
*   **CSS3:** For styling the application, including Flexbox/Grid for layout and custom properties.
*   **JavaScript (ES6+):** For application logic, API interaction, and DOM manipulation.
*   **OMDb API:** To fetch movie data.
*   **Font Awesome:** For icons.
*   **Google Fonts (Inter):** For typography.
*   **localStorage:** For client-side storage of the watchlist.

## Project Structure

*   `index.html`: The main page for searching movies.
*   `watchlist.html`: The page to display the user's watchlist.
*   `styles.css`: Contains all the CSS rules for the application.
*   `index.js` (or `app.js`): JavaScript for the main search page functionality.
*   `watchlist.js`: JavaScript for the watchlist page functionality.
*   `/assets/images/`: Contains static image assets.

## Future Enhancements (Optional)

*   User authentication to store watchlists on a server.
*   More detailed movie information (e.g., cast, director).
*   Sorting and filtering options for the watchlist.
*   Notifications for new releases added to the watchlist.