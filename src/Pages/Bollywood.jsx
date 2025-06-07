import React from "react";
import MovieCard from "../Components/MovieCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const bollywoodMovies = [
  {
    id: 1,
    title: "Jab We Met",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/jab-we-met-et00000182-1681714389.jpg"
  },
  {
    id: 2,
    title: "3 Idiots",
    image: "https://m.media-amazon.com/images/M/MV5BNzc4ZWQ3NmYtODE0Ny00YTQ4LTlkZWItNTBkMGQ0MmUwMmJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  },
  {
    id: 3,
    title: "Taare Zameen Par",
    image: "https://m.media-amazon.com/images/M/MV5BZTI0ZGRiMDEtNGNjMS00MGU4LWI3OTktNzcxMDZmZTk3MTljXkEyXkFqcGc@._V1_.jpg"
  },
  {
    id: 4,
    title: "Veer-Zaara",
    image: "https://m.media-amazon.com/images/M/MV5BMmI0ODNhYmEtOWM4My00MmFlLTk4ZmEtYmQ2MmNjODcxNzU2XkEyXkFqcGc@._V1_.jpg"
  },
  {
    id: 5,
    title: "Dangal",
    image: "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_.jpg"
  },
  {
    id: 6,
    title: "Swades",
    image: "https://upload.wikimedia.org/wikipedia/en/8/85/Swades_poster.jpg"
  },
  {
    id: 7,
    title: "Dil Chahta Hai",
    image: "https://m.media-amazon.com/images/M/MV5BYjY4NzgzNTQtZDhiNi00ZGJiLWIzMWQtNDg3YzkyNTdkZjAyXkEyXkFqcGc@._V1_.jpg"
  },
  {
    id: 8,
    title: "Zindagi Na Milegi Dobara",
    image: "https://upload.wikimedia.org/wikipedia/en/1/17/Zindagi_Na_Milegi_Dobara.jpg"
  },
  {
    id: 9,
    title: "Barfi!",
    image: "https://m.media-amazon.com/images/M/MV5BYjg3N2E5ZDYtZTBkNi00ZjMxLWE1NzMtMTRhMzZlMzI2ZDhiXkEyXkFqcGc@._V1_.jpg"
  },
  {
    id: 10,
    title: "Rang De Basanti",
    image: "https://upload.wikimedia.org/wikipedia/en/0/08/Rang_De_Basanti_poster.jpg"
  },
  {
    id: 11,
    title: "Kal Ho Naa Ho",
    image: "https://upload.wikimedia.org/wikipedia/en/4/45/Kal_Ho_Naa_Ho.jpg"
  },
  {
    id: 12,
    title: "Koi.. Mil Gaya",
    image: "https://images.justwatch.com/poster/258218096/s718/koi-mil-gaya.jpg"
  },
  // {
  //   id: 13,
  //   title: "Andaz Apna Apna",
  //   image: "https://m.media-amazon.com/images/I/51r5jnbVdiL._AC_.jpg"
  // }
];

const Bollywood = () => {
  const slides = bollywoodMovies.reduce((result, movie, index) => {
    const slideIndex = Math.floor(index / 4);
    if (!result[slideIndex]) result[slideIndex] = [];
    result[slideIndex].push(movie);
    return result;
  }, []);

  return (
    <div className="bg-black text-light py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="text-danger fw-bold display-5"> Bollywood Best Movies</h2>
          <p className="lead">✨ Relive the magic. Rate & share your filmi love!</p>
        </div>

        <div id="bollywoodCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {slides.map((group, i) => (
              <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
                <div className="row g-4">
                  {group.map((movie) => (
                    <div className="col-md-3" key={movie.id}>
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#bollywoodCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#bollywoodCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bollywood;

