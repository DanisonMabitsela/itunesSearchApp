import React, { useState } from "react";
import "./App.css";

function App() {
  // Define state variables using the useState hook
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMedia, setSearchMedia] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [favourites, setFavourites] = useState([]);

  // Define the handleSearch function, which is called when the search button is clicked
  const handleSearch = async () => {
    try {
      // Make a request to the back-end API using fetch
      const response = await fetch(
        `http://localhost:5000/search/${searchTerm}/${searchMedia}`
      );
      // Convert the response to JSON
      const data = await response.json();
      // Update the search results state variable with the results from the API
      setSearchResults(data.results);
    } catch (error) {
      // Log any errors to the console
      console.error(error);
    }
  };

  // Define the handleAddToFavourites function, which is called when the "Add to Favourites" button is clicked
  const handleAddToFavourites = (result) => {
    // Add the clicked result to the favourites array using the spread operator
    setFavourites([...favourites, result]);
  };

  // Define the handleRemoveFromFavourites function, which is called when the "Remove from Favourites" button is clicked
  const handleRemoveFromFavourites = (result) => {
    // Remove the clicked result from the favourites array using the filter method
    setFavourites(
      favourites.filter((favourite) => favourite.trackId !== result.trackId)
    );
  };

  return (
    <div className="container">
      <h1>iTunes Search</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={searchMedia}
          onChange={(e) => setSearchMedia(e.target.value)}
        >
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="podcast">Podcasts</option>
          <option value="music">Music</option>
          <option value="audiobook">Audiobooks</option>
          <option value="shortFilm">Short Films</option>
          <option value="tvShow">TV Shows</option>
          <option value="software">Software</option>
          <option value="ebook">eBooks</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      {/* Display the search results and provide a button to add each result to the favourites list */}
      <div className="search-results">
        {searchResults.map((result) => (
          <div key={result.trackId} className="search-result">
            <img src={result.artworkUrl100} alt={result.trackName} />
            <div className="search-result-info">
              <h3>{result.trackName}</h3>
              <p>{result.artistName}</p>
              <button onClick={() => handleAddToFavourites(result)}>
                Add to Favourites
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Display the favourites and provide a button to remove each result to the favourites list */}
      <div className="favourites-container">
        <h2>Favourites</h2>
        {favourites.map((favourite) => (
          <div key={favourite.trackId} className="favourite">
            <img src={favourite.artworkUrl100} alt={favourite.trackName} />
            <div className="favourite-info">
              <h3>{favourite.trackName}</h3>
              <p>{favourite.artistName}</p>
              <button onClick={() => handleRemoveFromFavourites(favourite)}>
                Remove from Favourites
              </button>
            </div>
          </div>
        ))}
      </div>
      <a
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  );
}

export default App;
