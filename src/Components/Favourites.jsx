import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Favourites = ({ favouritePhotos, handleRemoveFavourite }) => {
  return (
    <div>
      <main>
        <section className="photos">
          <div className="photos-center">
            {favouritePhotos && favouritePhotos.length > 0 ? (
              favouritePhotos.map((image, index) => (
                <article key={index} className="photo favourite-photo">
                  <img src={image.urls.regular} alt={image.alt_description} />
                  <div className="photo-info favourite-photo-info">
                    <div className="photo-header">
                      <h4>{image.user.name}</h4>
                      <button
                        className="favorite-btn active"
                        onClick={() => handleRemoveFavourite(image.id)}
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                  <span>Added to favourite</span>
                </article>
              ))
            ) : (
              <p>No favourite photos yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Favourites;
