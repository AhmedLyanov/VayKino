import { useState, useEffect, useRef } from "react";
import "./style.css";
import "../../Components/Skeleton/Skeleton.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Rating from "./Components/Rating/Rating";
import TableInfo from "./Components/TableInfo/TableInfo";
import InMainRoles from "./Components/InMainRoles/InMainRoles";
import Trealers from "./Components/Trealers/Trealers";
import Awards from "./Components/Awards/Awards";
import { Posters } from "./Components/Posters/Posters";
import { Stills } from "./Components/Stills/Stills";
import { WatchMovie } from "./Components/WatchMovie/WatchMovie";
import { SequelsAndPrequels } from "./Components/SequelsAndPrequels/SequelsAndPrequels";
import { Similars } from "./Components/Similars/Similars";

function MoviePage() {
  const [currentMovie, setCurrentMovie] = useState(false);
  const [currentMovieAwards, setCurrentMovieAwards] = useState({});
  const [currentMoviePosters, setCurrentMoviePosters] = useState({});
  const [currentMovieStills, setCurrentMovieStills] = useState({});
  const [currentMovieSequelsAndPrequels, setCurrentMovieSequelsAndPrequels] =
    useState({});
  const [currentMovieSimilars, setCurrentMovieSimilars] = useState({});

  const targetDiv = useRef(null);

  const movieTypes = {
    movie: "Фильм",
    "tv-series": "Сериал",
    cartoon: "Мультфильм",
    "animated-series": "Мультсериал",
    anime: "Аниме",
  };

  document.title = `${
    currentMovie
      ? movieTypes[currentMovie?.type] + " " + currentMovie.name
      : "Загрузка..."
  }`;

  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    fetchData("./data/data.json", setCurrentMovie);
    fetchData("./data/awards.json", setCurrentMovieAwards);
    fetchData("./data/posters.json", setCurrentMoviePosters);
    fetchData("./data/still.json", setCurrentMovieStills);
    fetchData(
      "./data/sequelsAndPrequels.json",
      setCurrentMovieSequelsAndPrequels
    );
    fetchData("./data/similars.json", setCurrentMovieSimilars);
  }, []);

  const handleClick = () => {
    if (targetDiv.current) {
      targetDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="main-content">
          <div className="main-content-movie_info">
            <div className="main-content-movie_info-main">
              <div className="main-content-movie_info-main-levo">
                <div className="main-content-movie_info-main-levo-img">
                  {currentMovie &&
                  currentMovie.poster &&
                  currentMovie.poster.url ? (
                    <img src={currentMovie.poster.url} alt="" />
                  ) : (
                    <div
                      className="loading"
                      style={{ width: "100%", height: "100%" }}
                    ></div>
                  )}
                </div>
              </div>
              <div className="main-content-movie_info-main-pravo">
                <div className="main-content-movie_info-main-pravo-path">
                  <span>Главная</span>{" "}
                  <span style={{ marginLeft: "4px", marginRight: "4px" }}>
                    <img width="7" src="img/MovieCard/arrow_mini.svg" alt="arrow" />
                  </span>{" "}
                  <span>Фильмы</span>{" "}
                  <span style={{ marginLeft: "4px", marginRight: "4px" }}>
                    <img width="7" src="img/MovieCard/arrow_mini.svg" alt="arrow" />
                  </span>
                  {currentMovie && currentMovie.name ? (
                    <span>
                      {currentMovie.name}
                    </span>
                  ) : (
                    <div
                      className="loading"
                      style={{
                        width: "200px",
                        height: "75%",
                        marginLeft: "3px",
                      }}
                    ></div>
                  )}
                </div>
                <div className="main-content-movie_info-main-pravo-more_info">
                  <div className="main-content-movie_info-main-pravo-more_info-name_ru">
                    {currentMovie && currentMovie.name ? (
                      <span>{currentMovie.name}</span>
                    ) : (
                      <div
                        className="loading"
                        style={{ width: "700px", height: "60px" }}
                      ></div>
                    )}
                  </div>
                  <div className="main-content-movie_info-main-pravo-more_info-name_en">
                    {currentMovie && currentMovie.alternativeName ? (
                      <span>{currentMovie.alternativeName}</span>
                    ) : (
                      <div
                        className="loading"
                        style={{
                          width: "300px",
                          height: "30px",
                          marginTop: "30px",
                        }}
                      ></div>
                    )}
                  </div>
                  <div className="main-content-movie_info-main-pravo-more_info-ratings">
                    <Rating
                      rating={currentMovie ? currentMovie.rating.kp : 1}
                      label="Kinopoisk"
                    />
                    <Rating
                      rating={currentMovie ? currentMovie.rating.imdb : 1}
                      label="IMDb"
                    />
                  </div>
                  <div className="main-content-movie_info-main-pravo-more_info-discription">
                    {currentMovie && currentMovie.description ? (
                      <span>{currentMovie.description}</span>
                    ) : (
                      <div
                        className="loading"
                        style={{ width: "940px", height: "100px" }}
                      ></div>
                    )}
                  </div>
                  <div className="main-content-movie_info-main-pravo-more_info-deystvia">
                    <div
                      className="main-content-movie_info-main-pravo-more_info-deystvia-watch_trealer"
                      onClick={handleClick}
                    >
                      <img src="img/MovieCard/play.svg" alt="" />
                      Смотерть трейлер
                    </div>

                    <div className="main-content-movie_info-main-pravo-more_info-deystvia-social_medias">
                      <div className="main-content-movie_info-main-pravo-more_info-deystvia-social_medias-social_media">
                        <img
                          src="img/MovieCard/vk_social_media_icon.svg"
                          alt=""
                        />
                      </div>
                      <div className="main-content-movie_info-main-pravo-more_info-deystvia-social_medias-social_media">
                        <img
                          src="img/MovieCard/instagram_social_media_icon.svg"
                          alt=""
                        />
                      </div>
                      <div className="main-content-movie_info-main-pravo-more_info-deystvia-social_medias-social_media">
                        <img
                          src="img/MovieCard/facebook_social_media_icon.svg"
                          alt=""
                        />
                      </div>
                      <div className="main-content-movie_info-main-pravo-more_info-deystvia-social_medias-social_media">
                        <img
                          src="img/MovieCard/twitter_social_media_icon.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-content-movie_info-main-deystvia">
              <div className="main-content-movie_info-main-deystvia-reactions">
                <div className="main-content-movie_info-main-deystvia-like">
                  <img src="img/MovieCard/like.svg" alt="" />
                </div>
                <div className="main-content-movie_info-main-deystvia-dislike">
                  <img src="img/MovieCard/dislike.svg" alt="" />
                </div>
              </div>

              <div className="main-content-movie_info-main-deystvia-favourites">
                <div className="main-content-movie_info-main-deystvia-favorites-favorite">
                  <img src="img/MovieCard/heart.svg" alt="" />
                </div>
                <div className="main-content-movie_info-main-deystvia-favorites-in_favorite">
                  В избранном у 37933 человек
                </div>
              </div>
            </div>

            <TableInfo prop={currentMovie} />
          </div>

          <div className="main-content-in_main_roles">
            {currentMovie ? <InMainRoles prop={currentMovie} /> : <></>}
          </div>

          {/* <div className="main-content-choice">
            {currentMovie ? (
              <div 
              className={currentMovieComponent.title === "Трейлеры" ? "active" : ""}
                onClick={() => {
                  setCurrentMovieComponent({
                    title: "Трейлеры",
                    component: <Trealers prop={currentMovie} />,
                  });
                }}
              >
                Трейлеры
              </div>
            ) : (
              <></>
            )}

            {currentMovieAwards.total > 0 ? (
              <div
              className={currentMovieComponent.title === "Награды" ? "active" : ""}
                onClick={() => {
                  setCurrentMovieComponent({
                    title: "Награды",
                    component: <Awards prop={currentMovieAwards} />,
                  });
                }}
              >
                Награды
              </div>
            ) : (
              <></>
            )}

            {currentMoviePosters.total > 0 ? (
              <div
              className={currentMovieComponent.title === "Постеры" ? "active" : ""}
                onClick={() => {
                  setCurrentMovieComponent({
                    title: "Постеры",
                    component: <Posters prop={currentMoviePosters} />,
                  });
                }}
              >
                Постеры
              </div>
            ) : (
              <></>
            )}

            {currentMovieStills.total > 0 ? (
              <div
              className={currentMovieComponent.title === "Кадры" ? "active" : ""}
                onClick={() => {
                  setCurrentMovieComponent({
                    title: "Кадры",
                    component: <Stills prop={currentMovieStills} />,
                  });
                }}
              >
                Кадры
              </div>
            ) : (
              <></>
            )}

            {
              <div
              className={currentMovieComponent.title === "Фильм" ? "active" : ""}
                onClick={() => {
                  setCurrentMovieComponent({
                    title: "Фильм",
                    component: <WatchMovie prop={currentMovie.id} />,
                  });
                }}
              >
                Фильм
              </div>
            }

            {currentMovieSequelsAndPrequels.length > 0 ? (
              <div
              className={currentMovieComponent.title === "Сиквелы и Приквелы" ? "active" : ""}
                onClick={() => {
                  setCurrentMovieComponent({
                    title: "Сиквелы и Приквелы",
                    component: (
                      <SequelsAndPrequels
                        prop={currentMovieSequelsAndPrequels}
                      />
                    ),
                  });
                }}
              >
                Сиквелы и Приквелы
              </div>
            ) : (
              <></>
            )}

            {currentMovieSimilars.total > 0 ? (
              <div
              className={currentMovieComponent.title === "Похожие" ? "active" : ""}
                onClick={() => {
                  setCurrentMovieComponent({
                    title: "Похожие",
                    component: <Similars prop={currentMovieSimilars.items} />,
                  });
                }}
              >
                Похожие
              </div>
            ) : (
              <></>
            )}
          </div> */}

          {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

          <div className="main-content-trealers" ref={targetDiv}>
            <Trealers prop={currentMovie} />
          </div>

          <div className="main-content-awards">
            {currentMovieAwards.total > 0 ? (
              <Awards prop={currentMovieAwards} />
            ) : (
              <></>
            )}
          </div>

          <div className="main-content-posters">
            {currentMoviePosters.total > 0 ? (
              <Posters prop={currentMoviePosters} />
            ) : (
              <></>
            )}
          </div>

          <div className="main-content-stills">
            {currentMovieStills.total > 0 ? (
              <Stills prop={currentMovieStills} />
            ) : (
              <></>
            )}
          </div>

          <div className="main-content-watch_movie">
            <WatchMovie prop={currentMovie.id} />
          </div>

          <div className="main-content-sequels_and_prequels">
            {currentMovieSequelsAndPrequels.length > 0 ? (
              <SequelsAndPrequels prop={currentMovieSequelsAndPrequels} />
            ) : (
              <></>
            )}
          </div>

          <div className="main-content-similars">
            {currentMovieSimilars.total > 0 ? (
              <Similars prop={currentMovieSimilars.items} />
            ) : (
              <></>
            )}
          </div>

          <div
            className="bg-movie_cadr"
            style={{
              backgroundImage: `url(${
                currentMovie ? currentMovie.backdrop.url : ""
              })`,
            }}
          >
            <div className="bg-movie_cadr-temnee"></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MoviePage;
