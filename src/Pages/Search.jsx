import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const API_KEY = '5582b31d';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${API_KEY}`);
      const data = await res.json();

      if (data.Response === 'True') {
        setMovie(data);
        const storedReviews = JSON.parse(localStorage.getItem(`reviews-${data.imdbID}`)) || [];
        setSubmittedReviews(storedReviews);
        setError('');
      } else {
        setMovie(null);
        setSubmittedReviews([]);
        setError(data.Error);
      }
    } catch (err) {
      console.error('API error:', err);
      setError('Something went wrong. Try again.');
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setError('');
    setMovie(null);

    if (value.length < 1) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(value)}&apikey=${API_KEY}`);
      const data = await res.json();
      if (data.Response === 'True') {
        setSuggestions(data.Search.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error('Suggestion error:', err);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.Title);
    setSuggestions([]);
    handleSearch({ preventDefault: () => {} });
  };

  const handleSubmitReview = () => {
    if (!loggedInUser) {
      alert('Please log in to submit a review.');
      return;
    }

    if (rating < 1 || rating > 5) {
      alert('Please provide a rating between 1 and 5.');
      return;
    }

    const newReview = {
      user: loggedInUser.username,
      rating,
      review,
      timestamp: new Date().toISOString(),
      movieId: movie.imdbID,
      movieTitle: movie.Title
    };

    const updated = [...submittedReviews, newReview];
    localStorage.setItem(`reviews-${movie.imdbID}`, JSON.stringify(updated));
    setSubmittedReviews(updated);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
      if (user.email === loggedInUser.email) {
        const userReviews = user.reviews || [];
        return {
          ...user,
          reviews: [...userReviews, {
            movieId: movie.imdbID,
            movieTitle: movie.Title,
            rating,
            reviewText: review,
            timestamp: new Date().toISOString()
          }]
        };
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setRating(0);
    setReview('');
  };

  const handleDeleteReview = (index) => {
    const updated = submittedReviews.filter((_, i) => i !== index);
    setSubmittedReviews(updated);
    localStorage.setItem(`reviews-${movie.imdbID}`, JSON.stringify(updated));

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
      if (user.email === loggedInUser.email) {
        const filtered = (user.reviews || []).filter(r =>
          !(r.movieId === movie.imdbID && r.reviewText === submittedReviews[index].review)
        );
        return { ...user, reviews: filtered };
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleAddToWishlist = () => {
    if (!loggedInUser) {
      alert('Please log in to add to wishlist.');
      return;
    }

    const key = `wishlist-${loggedInUser.username}`;
    const current = JSON.parse(localStorage.getItem(key)) || [];
    const already = current.find(m => m.imdbID === movie.imdbID);

    if (already) {
      alert('Already in wishlist!');
      return;
    }

    const updated = [...current, movie];
    localStorage.setItem(key, JSON.stringify(updated));
    alert(`${movie.Title} added to your wishlist!`);
  };

  const renderStars = (ratingStr) => {
    if (!ratingStr || ratingStr === 'N/A') return null;

    const rating = parseFloat(ratingStr);
    const stars = Math.round(rating / 2);

    return (
      <div>
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} color={i < stars ? '#ffc107' : '#555'} />
        ))}
        <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>{ratingStr}/10</span>
      </div>
    );
  };

  return (
    <div className="container mt-4 text-white search-page">
      <style>{`
        body {
          background-color: #0d0d0d !important;
        }
        .search-page {
          animation: fadeIn 0.8s ease;
        }
        .search-card {
          background-color: #121212;
          border-radius: 12px;
          padding: 1.2rem;
          animation: fadeInUp 0.6s ease;
          transform: scale(0.9);
        }
        .search-card:hover {
          box-shadow: 0 0 12px rgba(255, 0, 0, 0.2);
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .review-list {
          max-height: 200px;
          overflow-y: auto;
          padding-right: 10px;
        }
        .review-list::-webkit-scrollbar {
          width: 6px;
        }
        .review-list::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 4px;
        }
        .review-list::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
        .suggestion-list {
          position: absolute;
          background-color: #1f1f1f;
          border-radius: 5px;
          width: 100%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1000;
        }
        .suggestion-item {
          padding: 10px;
          cursor: pointer;
          color: #fff;
        }
        .suggestion-item:hover {
          background-color: #333;
        }
        ::placeholder {
          color: #aaa !important;
          opacity: 1;
        }
        .star-input {
          cursor: pointer;
          display: inline-block;
          margin-right: 5px;
        }
      `}</style>

      <h2 className="mb-4">🔍 Search a Movie</h2>

      <form className="mb-4" onSubmit={handleSearch}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter movie title (e.g., Inception)"
            value={query}
            onChange={handleInputChange}
            style={{
              backgroundColor: '#222',
              color: '#fff',
              borderColor: '#444',
            }}
          />
          <button type="submit" className="btn btn-danger">
            Search
          </button>
        </div>
        {suggestions.length > 0 && (
          <div className="suggestion-list">
            {suggestions.map((item) => (
              <div
                key={item.imdbID}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(item)}
              >
                {item.Title} ({item.Year})
              </div>
            ))}
          </div>
        )}
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {movie && (
        <div className="card search-card text-light">
          <div className="row">
            <div className="col-md-4">
              <img src={movie.Poster} alt={movie.Title} className="img-fluid rounded" />
            </div>
            <div className="col-md-8">
              <h3>{movie.Title} ({movie.Year})</h3>
              <p>{movie.Plot}</p>
              <p><strong>Genre:</strong> {movie.Genre}</p>
              <p><strong>IMDb Rating:</strong> {renderStars(movie.imdbRating)}</p>

              <button className="btn btn-outline-warning mb-3" onClick={handleAddToWishlist}>
                ❤️ Add to Wishlist
              </button>

              {loggedInUser && (
                <div className="mt-3">
                  <h5>Submit Your Review</h5>
                  <div className="mb-2">
                    <label className="form-label">Your Rating (1–5):</label>
                    <div>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={30}
                          className="star-input"
                          color={star <= rating ? '#ffc107' : '#555'}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setRating(star)}
                          onMouseLeave={() => setRating(rating)}
                          style={{ cursor: 'pointer' }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mb-2">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Write your review..."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-success" onClick={handleSubmitReview}>Submit</button>
                </div>
              )}

              <div className="mt-4">
                <h5>User Reviews</h5>
                {submittedReviews.length > 0 ? (
                  <div className="review-list">
                    {submittedReviews.map((r, idx) => (
                      <div key={idx} className="border-top pt-2 d-flex justify-content-between align-items-start">
                        <div>
                          <p>
                            <strong>{r.user}</strong> rated it:
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} color={i < r.rating ? '#ffc107' : '#555'} />
                            ))} ({r.rating}/5)
                          </p>
                          <p>{r.review}</p>
                        </div>
                        {loggedInUser && loggedInUser.username === r.user && (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteReview(idx)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
