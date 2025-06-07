import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [wishlist, setWishlist] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (loggedInUser) {
      const key = `wishlist-${loggedInUser.username}`;
      const storedWishlist = JSON.parse(localStorage.getItem(key)) || [];
      setWishlist(storedWishlist);
    }
  }, [loggedInUser]);

  const removeFromWishlist = (movieId) => {
    const updatedWishlist = wishlist.filter(movie => movie.imdbID !== movieId);
    setWishlist(updatedWishlist);
    if (loggedInUser) {
      const key = `wishlist-${loggedInUser.username}`;
      localStorage.setItem(key, JSON.stringify(updatedWishlist));
    }
  };

  return (
    <div className="dashboard-wrapper text-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        * {
          font-family: 'Inter', sans-serif;
        }

        .dashboard-wrapper {
          background: linear-gradient(145deg, #000000, #0c0c0c, #111);
          min-height: 100vh;
          padding-top: 60px;
          position: relative;
          overflow: hidden;
        }

        .dashboard-wrapper::before {
          content: '';
          position: absolute;
          top: -10%;
          left: -10%;
          width: 150%;
          height: 150%;
          background: radial-gradient(circle, rgba(255,0,0,0.05) 10%, transparent 70%);
          animation: rotateBG 20s linear infinite;
          z-index: 0;
        }

        @keyframes rotateBG {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .dashboard-wrapper .container {
          position: relative;
          z-index: 2;
        }

        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: scale(1.03);
          box-shadow: 0 0 20px rgba(255, 77, 77, 0.4);
        }

        .card {
          animation: fadeInCard 0.6s ease forwards;
          transform: translateY(15px);
          opacity: 0;
        }

        @keyframes fadeInCard {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      <div className="container">
        <h2 className="text-center mb-4">Your Wishlist</h2>

        {wishlist.length === 0 ? (
          <p className="text-center">No movies in your wishlist yet.</p>
        ) : (
          <div className="row">
            {wishlist.map((movie) => (
              <div key={movie.imdbID} className="col-md-4 mb-4">
                <div
                  className="card text-light"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 77, 77, 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="card-img-top"
                    style={{
                      borderTopLeftRadius: '15px',
                      borderTopRightRadius: '15px',
                      height: '300px',
                      objectFit: 'contain',
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.Title} ({movie.Year})</h5>
                    <p className="card-text" style={{ fontSize: '14px' }}>{movie.Plot}</p>
                    <button
                      className="btn btn-danger btn-block"
                      style={{
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                      }}
                      onClick={() => removeFromWishlist(movie.imdbID)}
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

/**mport React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [wishlist, setWishlist] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (loggedInUser) {
      const key = wishlist-${loggedInUser.username};
      const storedWishlist = JSON.parse(localStorage.getItem(key)) || [];
      setWishlist(storedWishlist);
    }
  }, [loggedInUser]);

  const removeFromWishlist = (movieId) => {
    const updatedWishlist = wishlist.filter(movie => movie.imdbID !== movieId);
    setWishlist(updatedWishlist);
    // Save the updated wishlist back to localStorage
    if (loggedInUser) {
      const key = wishlist-${loggedInUser.username};
      localStorage.setItem(key, JSON.stringify(updatedWishlist));
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#121212', padding: '0' }}>
      <div className="container text-white" style={{ paddingTop: '60px' }}>
        <h2 className="text-center mb-4">Your Wishlist</h2>
        
        {wishlist.length === 0 ? (
          <p className="text-center">No movies in your wishlist yet.</p>
        ) : (
          <div className="row">
            {wishlist.map((movie, index) => (
              <div key={movie.imdbID} className="col-md-4 mb-4">
                <div
                  className="card text-light"
                  style={{
                    backgroundColor: '#1f1f1f',
                    borderRadius: '15px',
                    boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="card-img-top"
                    style={{
                      borderTopLeftRadius: '15px',
                      borderTopRightRadius: '15px',
                      height: '300px',
                      objectFit: 'contain',
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-white">{movie.Title} ({movie.Year})</h5>
                    <p className="card-text text-light" style={{ fontSize: '14px' }}>{movie.Plot}</p>
                    <button
                      className="btn btn-danger btn-block"
                      style={{
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        transition: 'background-color 0.3s ease',
                      }}
                      onClick={() => removeFromWishlist(movie.imdbID)}
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; */

/**
 * roter dom and hooks use effect state and custom
 */