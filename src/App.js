import './App.css';
import React, { useState } from 'react';
import Photos from './Components/Photos';
import Favourites from './Components/Favourites';
import { FaSearch } from 'react-icons/fa';

function App() {
  const [query, setQuery] = useState('');
  const [favouritePhotos, setFavouritePhotos] = useState([]);
  const [isFavouriteSection, setIsFavouriteSection] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target[0].value);
  };

  const handleRemoveFavourite = (photoID) => {
    setFavouritePhotos((prevFavorites) =>
      prevFavorites.filter((favPhoto) => favPhoto.id !== photoID)
    );
  };

  const toggleFavouriteSection = () => {
    setIsFavouriteSection(!isFavouriteSection);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar__logo">FotoFlix</div>
        <form className="navbar__search-form" onSubmit={handleSearch}>
          <input type="text" className="form-input" placeholder="Search" />
          <button type="submit" className="submit-btn">
            <FaSearch />
          </button>
        </form>
        <div className="navbar__links">
          <a href="#" onClick={toggleFavouriteSection}>
            {isFavouriteSection ? 'Home' : 'Favourites'}
          </a>
        </div>
      </nav>
      {isFavouriteSection ? (
        <Favourites favouritePhotos={favouritePhotos} handleRemoveFavourite={handleRemoveFavourite} />
      ) : (
        <Photos query={query} favouritePhotos={favouritePhotos} setFavouritePhotos={setFavouritePhotos} />
      )}
    </div>
  );
}

export default App;
