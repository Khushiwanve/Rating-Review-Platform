import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewsPage = () => {
  const [groupedReviews, setGroupedReviews] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(loggedUser);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const allReviews = users.flatMap(user =>
      (user.reviews || []).map(review => ({
        ...review,
        username: user.username,
        userEmail: user.email,
      }))
    );

    const grouped = {};
    allReviews.forEach(review => {
      if (!grouped[review.movieId]) {
        grouped[review.movieId] = {
          movieTitle: review.movieTitle,
          movieId: review.movieId,
          reviews: [],
        };
      }
      grouped[review.movieId].reviews.push(review);
    });

    setGroupedReviews(grouped);
  }, []);

  const handleDeleteReview = (movieId, reviewToDelete) => {
    if (!loggedInUser || loggedInUser.email !== reviewToDelete.userEmail) return;

    if (!window.confirm('Are you sure you want to delete your review?')) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const updatedUsers = users.map(user => {
      if (user.email === reviewToDelete.userEmail) {
        const updatedReviews = (user.reviews || []).filter(
          r => !(r.movieId === movieId && r.reviewText === reviewToDelete.reviewText)
        );
        return { ...user, reviews: updatedReviews };
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const updatedGrouped = { ...groupedReviews };
    updatedGrouped[movieId].reviews = updatedGrouped[movieId].reviews.filter(
      r => !(r.userEmail === reviewToDelete.userEmail && r.reviewText === reviewToDelete.reviewText)
    );
    if (updatedGrouped[movieId].reviews.length === 0) {
      delete updatedGrouped[movieId];
    }

    setGroupedReviews(updatedGrouped);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          size={18}
          style={{ marginRight: 3 }}
          color={i <= rating ? '#f5c518' : '#6b5e1f'}
          title={`${i} star${i > 1 ? 's' : ''}`}
        />
      );
    }
    return stars;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        padding: '2rem',
        background: 'linear-gradient(135deg, #121212, #2c2c2c)',
        color: '#fff',
        fontFamily: "'Merriweather', serif",
        boxSizing: 'border-box',
        overflowX: 'hidden', // ✅ Removes horizontal scroll
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#fff',
            fontWeight: '700',
            letterSpacing: '1.5px',
            fontSize: '2.2rem',
          }}
        >
          🌟 All User Reviews
        </h2>

        {Object.keys(groupedReviews).length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.2rem',
              color: '#ccc',
              fontStyle: 'italic',
            }}
          >
            No reviews available yet.
          </p>
        ) : (
          Object.values(groupedReviews).map((group, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '15px',
                padding: '1.5rem',
                marginBottom: '2rem',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'background-color 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(10,10,10,0.95)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(40,40,40,0.75)';
              }}
            >
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <img
                  src={`https://img.omdbapi.com/?i=${group.movieId}&apikey=5582b31d`}
                  alt={group.movieTitle}
                  style={{
                    width: '140px',
                    height: '210px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    backgroundColor: '#1a1a1a',
                    boxShadow: '0 3px 15px rgba(245, 197, 24, 0.5)',
                    userSelect: 'none',
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/140x210?text=No+Image';
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      margin: 0,
                      color: '#fff',
                      fontWeight: '700',
                      userSelect: 'text',
                      fontSize: '1.5rem',
                    }}
                  >
                    {group.movieTitle}
                  </h3>
                  <div
                    style={{
                      marginTop: '1rem',
                      maxHeight: '230px',
                      overflowY: 'auto',
                      paddingRight: '0.5rem',
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#f5c518 transparent',
                    }}
                  >
                    {group.reviews.map((review, i) => (
                      <div
                        key={i}
                        style={{
                          borderBottom: '1px solid rgba(245, 197, 24, 0.15)',
                          padding: '0.8rem 0',
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            color: '#fff',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <span>{review.username}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                            {renderStars(review.rating)}
                          </span>
                        </p>
                        <p
                          style={{
                            margin: '0.3rem 0 0',
                            color: '#ddd',
                            fontStyle: 'normal', // ✅ Removed italic
                            lineHeight: '1.3',
                          }}
                        >
                          {review.reviewText}
                        </p>
                        {loggedInUser?.email === review.userEmail && (
                          <button
                            onClick={() => handleDeleteReview(group.movieId, review)}
                            style={{
                              backgroundColor: '#444',
                              color: '#eee',
                              border: 'none',
                              padding: '0.4rem 0.8rem',
                              borderRadius: '6px',
                              fontSize: '0.9rem',
                              cursor: 'pointer',
                              marginTop: '0.4rem',
                              userSelect: 'none',
                            }}
                            title="Delete your review"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
