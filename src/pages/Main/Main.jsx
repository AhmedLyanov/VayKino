import "./style.css";
import "../../Components/Skeleton/Skeleton.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import MovieCard from "../../Components/MovieCard/MovieCard";
import { useState, useEffect } from "react";
import BlockHeader from "../../Components/BlockHeader/BlockHeader";

function Main() {
  const [currentMovie, setCurrentMovie] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  document.title = "Главная";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./data/data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCurrentMovie(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Header />

      <main>
        <div className="bg-joker">
          <div className="bg-joker-temnee"></div>
        </div>

        <div className="main-content1">
          <div className="main-content-now_in_movie">
            <div className="main-content-now_in_movie-header">
              <div className="main-content-now_in_movie-header-title">
                Сейчас в кино
              </div>

              <div className="main-content-now_in_movie-header-poloska">
                <div className="main-content-now_in_movie-header-polosk"></div>
              </div>

              <div className="main-content-now_in_movie-header-genres">
                <div className="main-content-now_in_movie-header-genre active">
                  Все
                </div>
                <div className="main-content-now_in_movie-header-genre">
                  Боевики
                </div>
                <div className="main-content-now_in_movie-header-genre">
                  Приключения
                </div>
                <div className="main-content-now_in_movie-header-genre">
                  Комедия
                </div>
                <div className="main-content-now_in_movie-header-genre">
                  Фантастика
                </div>
                <div className="main-content-now_in_movie-header-genre">
                  Триллеры
                </div>
                <div className="main-content-now_in_movie-header-genre">
                  Драма
                </div>
              </div>
            </div>

            <div className="main-content-now_in_movie-main">
              <div className="main-content-now_in_movie-main-films">
                {currentMovie
                  ? [...Array(8)].map((_, index) => (
                      <MovieCard
                        prop={{
                          rating: currentMovie?.rating?.kp,
                          poster: currentMovie?.poster?.url,
                          name: currentMovie?.name,
                          genres: currentMovie?.genres,
                          relationType: null,
                        }}
                        key={index}
                      />
                    ))
                  : [...Array(8)].map((_, index) => <MovieCard key={index} />)}
              </div>
            </div>

            <div className="main-content-now_in_movie-all_novinki">
              <div className="main-content-now_in_movie-all_novinki-btn">
                Все новинки
              </div>
            </div>
          </div>

          <div className="main-content-new_trealers">
            <BlockHeader
              prop={{
                title: "Новые трейлеры",
                btnText: "Все трейлеры",
                btnLink: "/",
              }}
            />

            <div className="main-content-new_trealers-main">
              <div className="main-content-new_trealers-main-active_trealer">
                <div className="main-content-new_trealers-main-active_trealer-media">
                  <img src=".././img/Main/trealer.jpg" alt="" />
                </div>

                <div className="main-content-new_trealers-main-active_trealer-info">
                  <div className="main-content-new_trealers-main-active_trealer-info-cont">
                    <div className="main-content-new_trealers-main-active_trealer-info-name">
                      Форсаж 9
                    </div>

                    <div className="main-content-new_trealers-main-active_trealer-info-socail_networks">
                      <div className="main-content-new_trealers-main-active_trealer-info-socail_network">
                        <img
                          src=".././img/Main/vk_social_media_icon.svg"
                          alt="VK"
                        />
                      </div>
                      <div className="main-content-new_trealers-main-active_trealer-info-socail_network">
                        <img
                          src=".././img/Main/instagram_social_media_icon.svg"
                          alt="Instagram"
                        />
                      </div>
                      <div className="main-content-new_trealers-main-active_trealer-info-socail_network">
                        <img
                          src=".././img/Main/facebook_social_media_icon.svg"
                          alt="Facebook"
                        />
                      </div>
                      <div className="main-content-new_trealers-main-active_trealer-info-socail_network">
                        <img
                          src=".././img/Main/twitter_social_media_icon.svg"
                          alt="Twitter(X)"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="main-content-new_trealers-main-active_trealer-info-likes">
                    <div className="main-content-new_trealers-main-active_trealer-info-likes-like">
                      <div className="main-content-new_trealers-main-active_trealer-info-likes-like-img">
                        <img src=".././img/Main/like.svg" alt="like" />
                      </div>
                      <div className="main-content-new_trealers-main-active_trealer-info-likes-like-count">
                        3 245
                      </div>
                    </div>
                    <div className="main-content-new_trealers-main-active_trealer-info-likes-dislike">
                      <div className="main-content-new_trealers-main-active_trealer-info-likes-dislike-img">
                        <img src=".././img/Main/dislike.svg" alt="dislike" />
                      </div>
                      <div className="main-content-new_trealers-main-active_trealer-info-likes-dislike-count">
                        420
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main-content-new_trealers-main-trealers">
                <div className="main-content-new_trealers-main-trealers-trealer">
                  <div className="main-content-new_trealers-main-trealers-trealer-media">
                    <img src=".././img/Main/trealer.jpg" alt="" />
                  </div>
                  <div className="main-content-new_trealers-main-trealers-trealer-name">
                    Мулан
                  </div>
                </div>

                <div className="main-content-new_trealers-main-trealers-trealer">
                  <div className="main-content-new_trealers-main-trealers-trealer-media">
                    <img src=".././img/Main/trealer.jpg" alt="" />
                  </div>
                  <div className="main-content-new_trealers-main-trealers-trealer-name">
                    Мулан
                  </div>
                </div>

                <div className="main-content-new_trealers-main-trealers-trealer">
                  <div className="main-content-new_trealers-main-trealers-trealer-media">
                    <img src=".././img/Main/trealer.jpg" alt="" />
                  </div>
                  <div className="main-content-new_trealers-main-trealers-trealer-name">
                    Мулан
                  </div>
                </div>

                <div className="main-content-new_trealers-main-trealers-trealer">
                  <div className="main-content-new_trealers-main-trealers-trealer-media">
                    <img src=".././img/Main/trealer.jpg" alt="" />
                  </div>
                  <div className="main-content-new_trealers-main-trealers-trealer-name">
                    Мулан
                  </div>
                </div>

                <div className="main-content-new_trealers-main-trealers-trealer">
                  <div className="main-content-new_trealers-main-trealers-trealer-media">
                    <img src=".././img/Main/trealer.jpg" alt="" />
                  </div>
                  <div className="main-content-new_trealers-main-trealers-trealer-name">
                    Мулан
                  </div>
                </div>

                <div className="main-content-new_trealers-main-trealers-trealer">
                  <div className="main-content-new_trealers-main-trealers-trealer-media">
                    <img src=".././img/Main/trealer.jpg" alt="" />
                  </div>
                  <div className="main-content-new_trealers-main-trealers-trealer-name">
                    Мулан
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="main-content-popular_movies">
            <div className="main-content-popular_movies-header">
              <div className="main-content-popular_movies-header-title">
                Популярные фильмы
              </div>

              <div className="main-content-popular_movies-header-poloska">
                <div className="main-content-popular_movies-header-polosk"></div>
              </div>

              <div className="main-content-popular_movies-header-years">
                <div className="main-content-popular_movies-header-years-year">
                  Все время
                </div>
                <div className="main-content-popular_movies-header-years-year">
                  2024
                </div>
                <div className="main-content-popular_movies-header-years-year">
                  2023
                </div>
                <div className="main-content-popular_movies-header-years-year">
                  2022
                </div>
                <div className="main-content-popular_movies-header-years-year">
                  2021
                </div>
                <div className="main-content-popular_movies-header-years-year">
                  2020
                </div>
                <div className="main-content-popular_movies-header-years-year">
                  2019
                </div>
              </div>
            </div>

            <div className="main-content-popular_movies-main">
              <div className="main-content-popular_movies-main-movies">
                <div className="main-content-popular_movies-main-movie">
                  <div className="main-content-popular_movies-main-movies-movie-cont">
                    <div className="main-content-popular_movies-main-movies-movie-img">
                      <div className="main-content-popular_movies-main-movies-movie-rating">
                        6.70
                      </div>

                      <img
                        src=".././img/Main/image 1.jpg"
                        alt=""
                        width="340"
                        height="460"
                      />
                    </div>

                    <div className="main-content-popular_movies-main-movies-movie-name">
                      Побег из Претории
                    </div>

                    <div className="main-content-popular_movies-main-movies-movie-genres">
                      Триллер
                    </div>
                  </div>
                </div>

                <div className="main-content-popular_movies-main-movie">
                  <div className="main-content-popular_movies-main-movies-movie-cont">
                    <div className="main-content-popular_movies-main-movies-movie-img">
                      <div className="main-content-popular_movies-main-movies-movie-rating">
                        6.70
                      </div>

                      <img
                        src=".././img/Main/image 1.jpg"
                        alt=""
                        width="340"
                        height="460"
                      />
                    </div>

                    <div className="main-content-popular_movies-main-movies-movie-name">
                      Побег из Претории
                    </div>

                    <div className="main-content-popular_movies-main-movies-movie-genres">
                      Триллер
                    </div>
                  </div>
                </div>

                <div className="main-content-popular_movies-main-movie">
                  <div className="main-content-popular_movies-main-movies-movie-cont">
                    <div className="main-content-popular_movies-main-movies-movie-img">
                      <div className="main-content-popular_movies-main-movies-movie-rating">
                        6.70
                      </div>

                      <img
                        src=".././img/Main/image 1.jpg"
                        alt=""
                        width="340"
                        height="460"
                      />
                    </div>

                    <div className="main-content-popular_movies-main-movies-movie-name">
                      Побег из Претории
                    </div>

                    <div className="main-content-popular_movies-main-movies-movie-genres">
                      Триллер
                    </div>
                  </div>
                </div>

                <div className="main-content-popular_movies-main-movie">
                  <div className="main-content-popular_movies-main-movies-movie-cont">
                    <div className="main-content-popular_movies-main-movies-movie-img">
                      <div className="main-content-popular_movies-main-movies-movie-rating">
                        6.70
                      </div>

                      <img
                        src=".././img/Main/image 1.jpg"
                        alt=""
                        width="340"
                        height="460"
                      />
                    </div>

                    <div className="main-content-popular_movies-main-movies-movie-name">
                      Побег из Претории
                    </div>

                    <div className="main-content-popular_movies-main-movies-movie-genres">
                      Триллер
                    </div>
                  </div>
                </div>
              </div>

              <div className="main-content-popular_movies-main-slider">
                <div className="main-content-popular_movies-main-slider-strelka_levo">
                  ←
                </div>
                <div className="main-content-popular_movies-main-slider-page_number">
                  1/15
                </div>
                <div className="main-content-popular_movies-main-slider-strelka_pravo">
                  →
                </div>
              </div>
            </div>
          </div>

          <div className="main-content-last_news">
            <BlockHeader
              prop={{
                title: "Последние новости",
                btnText: "Все новости",
                btnLink: "/",
              }}
            />

            <div className="main-content-last_news-main">
              <div className="main-content-last_news-main-levo">
                <div className="main-content-last_news-main-levo-news">
                  <div className="main-content-last_news-main-levo-news-img">
                    <img src=".././img/Main/image 3 (1).jpg" alt="" />
                  </div>

                  <div className="main-content-last_news-main-levo-news-cont">
                    <div className="main-content-last_news-main-levo-news-cont-date">
                      15 Апр 2020
                    </div>

                    <div>
                      <div className="main-content-last_news-main-levo-news-cont-title">
                        Не время умирать. Перенос релиза фильма{" "}
                      </div>

                      <div className="main-content-last_news-main-levo-news-cont-description">
                        Но действия представителей оппозиции в равной степени
                        предоставлены сами себе. В рамках спецификации
                        современных стандартов, стремящиеся вытеснить
                        традиционное производство, нанотехнологии указаны как
                        претенденты на роль ключевых факторов.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main-content-last_news-main-pravo">
                <div className="main-content-last_news-main-pravo-news">
                  <div className="main-content-last_news-main-pravo-news-new">
                    <div className="main-content-last_news-main-pravo-news-new-img">
                      <img src=".././img/Main/image 3 (1).jpg" alt="" />
                    </div>

                    <div className="main-content-last_news-main-pravo-news-new-cont">
                      <div className="main-content-last_news-main-pravo-news-new-cont-date">
                        15 Апр 2020
                      </div>
                      <div className="main-content-last_news-main-pravo-news-new-cont-title">
                        Как изменили Соника с последнего анонса
                      </div>
                    </div>
                  </div>

                  <div className="main-content-last_news-main-pravo-news-new">
                    <div className="main-content-last_news-main-pravo-news-new-img">
                      <img src=".././img/Main/image 3 (1).jpg" alt="" />
                    </div>

                    <div className="main-content-last_news-main-pravo-news-new-cont">
                      <div className="main-content-last_news-main-pravo-news-new-cont-date">
                        15 Апр 2020
                      </div>
                      <div className="main-content-last_news-main-pravo-news-new-cont-title">
                        Как изменили Соника с последнего анонса
                      </div>
                    </div>
                  </div>

                  <div className="main-content-last_news-main-pravo-news-new">
                    <div className="main-content-last_news-main-pravo-news-new-img">
                      <img src=".././img/Main/image 3 (1).jpg" alt="" />
                    </div>

                    <div className="main-content-last_news-main-pravo-news-new-cont">
                      <div className="main-content-last_news-main-pravo-news-new-cont-date">
                        15 Апр 2020
                      </div>
                      <div className="main-content-last_news-main-pravo-news-new-cont-title">
                        Как изменили Соника с последнего анонса
                      </div>
                    </div>
                  </div>

                  <div className="main-content-last_news-main-pravo-news-new">
                    <div className="main-content-last_news-main-pravo-news-new-img">
                      <img src=".././img/Main/image 3 (1).jpg" alt="" />
                    </div>

                    <div className="main-content-last_news-main-pravo-news-new-cont">
                      <div className="main-content-last_news-main-pravo-news-new-cont-date">
                        15 Апр 2020
                      </div>
                      <div className="main-content-last_news-main-pravo-news-new-cont-title">
                        Как изменили Соника с последнего анонса
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content2">
          <div className="main-cont2">
            <div className="main-content-planned_to_watch_movies">
              <div className="main-content-planned_to_watch_movies-header">
                <div className="main-content-planned_to_watch_movies-header-title">
                  Ожидаемые новинки
                </div>

                <div className="main-content-planned_to_watch_movies-header-slider">
                  <div className="main-content-planned_to_watch_movies-header-slider-strelka_levo">
                    ←
                  </div>
                  <div className="main-content-planned_to_watch_movies-header-slider-page_number">
                    1/5
                  </div>
                  <div className="main-content-planned_to_watch_movies-header-slider-strelka_pravo">
                    →
                  </div>
                </div>
              </div>

              <div className="main-content-planned_to_watch_movies-main">
                <div className="main-content-planned_to_watch_movies-main-movies">
                  <div className="main-content-planned_to_watch_movies-main-movies-movie">
                    <div className="main-content-planned_to_watch_movies-main-movies-movie-cont">
                      <div className="main-content-planned_to_watch_movies-main-movies-movie-img">
                        <div className="main-content-planned_to_watch_movies-main-movies-movie-rating">
                          6.70
                        </div>

                        <img
                          src=".././img/Main/image 1.jpg"
                          alt=""
                          width="340"
                          height="460"
                        />
                      </div>

                      <div className="main-content-planned_to_watch_movies-main-movies-movie-name">
                        Побег из Претории
                      </div>

                      <div className="main-content-planned_to_watch_movies-main-movies-movie-genres">
                        Триллер
                      </div>
                    </div>
                  </div>

                  <div className="main-content-planned_to_watch_movies-main-movies-movie">
                    <div className="main-content-planned_to_watch_movies-main-movies-movie-cont">
                      <div className="main-content-planned_to_watch_movies-main-movies-movie-img">
                        <div className="main-content-planned_to_watch_movies-main-movies-movie-rating">
                          6.70
                        </div>

                        <img
                          src=".././img/Main/image 1.jpg"
                          alt=""
                          width="340"
                          height="460"
                        />
                      </div>

                      <div className="main-content-planned_to_watch_movies-main-movies-movie-name">
                        Побег из Претории
                      </div>

                      <div className="main-content-planned_to_watch_movies-main-movies-movie-genres">
                        Триллер
                      </div>
                    </div>
                  </div>

                  <div className="main-content-planned_to_watch_movies-main-movies-movie">
                    <div className="main-content-planned_to_watch_movies-main-movies-movie-cont">
                      <div className="main-content-planned_to_watch_movies-main-movies-movie-img">
                        <div className="main-content-planned_to_watch_movies-main-movies-movie-rating">
                          6.70
                        </div>

                        <img
                          src=".././img/Main/image 1.jpg"
                          alt=""
                          width="340"
                          height="460"
                        />
                      </div>

                      <div className="main-content-planned_to_watch_movies-main-movies-movie-name">
                        Побег из Претории
                      </div>

                      <div className="main-content-planned_to_watch_movies-main-movies-movie-genres">
                        Триллер
                      </div>
                    </div>
                  </div>

                  <div className="main-content-planned_to_watch_movies-main-movies-movie">
                    <div className="main-content-planned_to_watch_movies-main-movies-movie-cont">
                      <div className="main-content-planned_to_watch_movies-main-movies-movie-img">
                        <div className="main-content-planned_to_watch_movies-main-movies-movie-rating">
                          6.70
                        </div>

                        <img
                          src=".././img/Main/image 1.jpg"
                          alt=""
                          width="340"
                          height="460"
                        />
                      </div>

                      <div className="main-content-planned_to_watch_movies-main-movies-movie-name">
                        Побег из Претории
                      </div>

                      <div className="main-content-planned_to_watch_movies-main-movies-movie-genres">
                        Триллер
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Main;
