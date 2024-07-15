import React, { useState, useEffect } from 'react';
import { FaHeart, FaDownload, FaShare } from 'react-icons/fa';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This is required for the lightbox to work

const Photos = ({ query, favouritePhotos, setFavouritePhotos }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const clientID = '?client_id=hsvOzXeH-7FN9GZv3jSwRPEDLkix7B9RVgPQIp1uPJc';
      const mainUrl = 'https://api.unsplash.com/photos/';
      let url = mainUrl + clientID;
      if (query) {
        url = `https://api.unsplash.com/search/photos/${clientID}&query=${query}&page=${page}`;
      } else {
        url = `${mainUrl}${clientID}&page=${page}`; // Correct URL construction for pagination
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setPhotos((prevPhotos) => [...prevPhotos, ...(data.results || data)]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchImages();
  }, [query, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (!loading && window.innerHeight + window.scrollY >= document.body.scrollHeight - 200) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Corrected 'scroll' instead of 'Scroll'
  }, [loading]);

  const handleFavouriteClick = (photoID) => {
    const existingIndex = favouritePhotos.findIndex((favPhoto) => favPhoto.id === photoID);
    if (existingIndex !== -1) {
      setFavouritePhotos((prevFavorites) => prevFavorites.filter((favPhoto) => favPhoto.id !== photoID));
    } else {
      const photoToAdd = photos.find((photo) => photo.id === photoID);
      setFavouritePhotos((prevFavorites) => [...prevFavorites, photoToAdd]);
    }
  };

  const handleShare = (photoUrl) => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `Check out this awesome photo: ${photoUrl}`
    )}`;
    window.open(shareUrl, '_blank');
  };

  const handleDownload = (photoUrl, photoId) => {
    const link = document.createElement('a');
    link.href = photoUrl;
    link.download = `photo_${photoId}.jpg`;
    link.click();
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <main>
      <section className="photos">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="photos-center">
            {photos.map((photo, index) => (
              <article
                key={photo.id}
                className={`photo ${favouritePhotos.some((favPhoto) => favPhoto.id === photo.id) ? 'favourite-photo' : ''}`}
              >
                <img
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  onClick={() => openLightbox(index)}
                />
                <div className="photo-info">
                  <div className="photo-header">
                    <h4>{photo.user.name}</h4>
                    <button
                      className={`favorite-btn ${favouritePhotos.some((favPhoto) => favPhoto.id === photo.id) ? 'active' : ''}`}
                      onClick={() => handleFavouriteClick(photo.id)}
                    >
                      <FaHeart />
                    </button>
                  </div>
                  <div className="photo-actions">
                    <p>
                      <FaHeart className="heart-icon" /> {photo.likes}
                    </p>
                    <button className="share-btn" onClick={() => handleShare(photo.urls.regular)}>
                      <FaShare />
                    </button>
                    <button className="download-btn" onClick={() => handleDownload(photo.urls.full, photo.id)}>
                      <FaDownload />
                    </button>
                  </div>
                  <a href={photo.user.portfolio_url}>
                    <img
                      src={photo.user.profile_image.medium}
                      className="user-img"
                      alt={photo.user.name}
                    />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      {isLightboxOpen && (
        <Lightbox mainSrc={photos[lightboxIndex].urls.full} onCloseRequest={closeLightbox} />
      )}
    </main>
  );
};

export default Photos;
