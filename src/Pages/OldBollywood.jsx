import React from 'react';
import MovieCard from '../Components/MovieCard';

const oldMovies = [
  {
    title: "Sholay",
    image: "https://upload.wikimedia.org/wikipedia/en/5/52/Sholay-poster.jpg"
  },
  {
    title: "Mughal-e-Azam",
    image: "https://m.media-amazon.com/images/M/MV5BNWE0M2M0NTQtMTNkMS00ODgyLTg4MDMtODEwZjZjOTE1MDhjXkEyXkFqcGc@._V1_.jpg"
  },
  {
    title: "Mother India",
    image: "https://upload.wikimedia.org/wikipedia/en/2/20/Mother_India_poster.jpg"
  },
  {
    title: "Anand",
    image: "https://m.media-amazon.com/images/M/MV5BN2M5YjUyOTktNTQxNC00MzQ2LTk2NDAtMTFkMjBlODlhOGRlXkEyXkFqcGc@._V1_.jpg" // Ensure this image exists in the public/assets/Img folder
  },
  {
    title: "Guide",
    image: "https://image.tmdb.org/t/p/w500/crJkaIn41tuaN1QJPwliOzotIRv.jpg" // Ensure this image exists in the public/assets/Img folder
  },

  {
    title: "Pyaasa",
    image: "https://upload.wikimedia.org/wikipedia/en/9/93/Pyaasa_poster.jpg"
  },
  
  {
    title: "Pakeezah",
    image: "https://upload.wikimedia.org/wikipedia/en/f/f5/Pakeezah.jpg"
  },
  {
    title: "Aradhana (1969)",
    image: "https://m.media-amazon.com/images/M/MV5BYjFkYTI5ZDMtMzgwMy00NTg2LTljYzktNDEwOGM4YzRjZTg2XkEyXkFqcGc@._V1_.jpg"
  },
  {
    title: "Do Bigha Zamin",
    image: "https://m.media-amazon.com/images/M/MV5BZTdlNTJkY2YtNWQ4Ny00M2U0LWExOTctYzg3ODk2MTk5MTIyXkEyXkFqcGc@._V1_.jpg"
  },
  
  {
    title: "Pather Panchali",
    image: "https://m.media-amazon.com/images/M/MV5BNmZhNzc0ZDMtZDg2My00MjkxLWJjZTctNTljODc2ZjQzMzJkXkEyXkFqcGc@._V1_.jpg"
  },
  {
    title: "DON",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Don_1978_poster.jpg/250px-Don_1978_poster.jpg"
  },
  {
    title: "Silsila",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg_pK6QCS-RN48xtUpSDKMPE0iW1RLcABYuQ&s"
  }

];

const OldBollywood = () => {
  return (
    <div style={styles.container}>
      <h2 className="text-danger text-center fw-bold mb-4">🎬 Old Bollywood Classics</h2>
      <p className="text-center text-light">⭐ Rate & Relive the Golden Era</p>
      <div className="row">
        {oldMovies.map((movie, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <MovieCard movie={{ title: movie.title, poster: movie.image }} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(135deg, #000, #434343)',  // Black to dark gray gradient for modern look
    backgroundSize: 'cover',
    animation: 'backgroundAnimation 5s ease-in-out infinite', // Apply smooth background transition animation
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  },
};

export default OldBollywood;




// OldBollywood.jsx
// import React from 'react';
// import MovieCard from '../Components/MovieCard';

// const oldMovies = [
//   {
//     title: "Sholay",
//     image: "https://upload.wikimedia.org/wikipedia/en/5/52/Sholay-poster.jpg"
//   },
//   {
//     title: "Mughal-e-Azam",
//     image: "https://m.media-amazon.com/images/M/MV5BNWE0M2M0NTQtMTNkMS00ODgyLTg4MDMtODEwZjZjOTE1MDhjXkEyXkFqcGc@._V1_.jpg"
//   },
//   {
//     title: "Mother India",
//     image: "https://upload.wikimedia.org/wikipedia/en/2/20/Mother_India_poster.jpg"
//   },
//   {
//     title: "Deewaar",
//     image: "https://m.media-amazon.com/images/M/MV5BMTc0NDM4MjYwOV5BMl5BanBnXkFtZTcwMDM3ODgzMQ@@._V1_.jpg"
//   },
//   {
//     title: "Guide",
//     image: "" // Ensure this image exists in your public folder
//   },
//   {
//     title: "Pakeezah",
//     image: "https://m.media-amazon.com/images/I/61tL4UubomL._AC_UF894,1000_QL80_.jpg"
//   },
//   {
//     title: "Kaagaz Ke Phool",
//     image: "https://m.media-amazon.com/images/I/81RIx1swDCL._AC_UF894,1000_QL80_.jpg"
//   },
//   {
//     title: "Awara",
//     image: "https://m.media-amazon.com/images/I/71V6MvA8N3L._AC_UF894,1000_QL80_.jpg"
//   },
//   {
//     title: "Anand",
//     image: "/assets/Img/anad.jpg" // Ensure this image exists in your public folder
//   },
//   {
//     title: "Chalti Ka Naam Gaadi",
//     image: "https://m.media-amazon.com/images/I/61RxTrnnA1L._AC_UF894,1000_QL80_.jpg"
//   }
// ];

// const OldBollywood = () => {
//   return (
//     <div className="container my-5">
//       <h2 className="text-danger text-center fw-bold mb-4">🎬 Old Bollywood Classics</h2>
//       <p className="text-center text-light">⭐ Rate & Relive the Golden Era</p>
//       <div className="row">
//         {oldMovies.map((movie, index) => (
//           <div className="col-md-3 mb-4" key={index}>
//             <MovieCard movie={{ title: movie.title, image: movie.image }} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OldBollywood;
