import { useEffect, useState } from "react";
import "./style.css";

function TableInfo(obj) {
  const [countries, setCountries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [editors, setEditors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [producers, setProducers] = useState([]);
  const [operators, setOperators] = useState([]);
  const [composers, setComposers] = useState([]);

  useEffect(() => {
    if (obj && obj.prop && obj.prop.countries) {
      setCountries(obj.prop.countries);
    }
  }, [obj.prop.countries, obj]);

  useEffect(() => {
    if (obj && obj.prop && obj.prop.genres) {
      setGenres(obj.prop.genres);
    }
  }, [obj]);

  useEffect(() => {
    if (obj && obj.prop && obj.prop.persons) {
      const professions = {
        designers: "designer",
        editors: "editor",
        directors: "director",
        writers: "writer",
        producers: "producer",
        operators: "operator",
        composers: "composer",
      };

      const result = {};
      for (const [key, value] of Object.entries(professions)) {
        result[key] = obj.prop.persons
          .filter((person) => person.enProfession === value)
          .map((person) => person.name);
      }

      setDesigners(result.designers.slice(0, 2));
      setEditors(result.editors.slice(0, 2));
      setDirectors(result.directors.slice(0, 2));
      setWriters(result.writers.slice(0, 2));
      setProducers(result.producers.slice(0, 2));
      setOperators(result.operators.slice(0, 2));
      setComposers(result.composers.slice(0, 2));
    }
  }, [obj]);

  return (
    <div className="main-content-movie_info-main-table_info">
      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Год:
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
          {obj.prop.year}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Художники:
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
          {designers.map((name, index) => (
            <span key={index}>
              {name}{index < designers.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Страна:
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
          {countries.map((country, index) => (
            <span key={index}>
              {country.name}{index < countries.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Монтаж:
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
          {editors.map((name, index) => (
            <span key={index}>
              {name}{index < editors.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Слоган:
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
          {obj.prop.slogan}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Жанр:
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
          {genres.map((genre, index) => (
            <span key={index}>
              {genre.name}{index < genres.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Режисер:
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
          {directors.map((name, index) => (
            <span key={index}>
              {name}{index < directors.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Сборы в мире:
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
          {(obj &&
            obj.prop &&
            obj.prop.fees &&
            obj.prop.fees.world &&
            `${obj.prop.fees.world.currency}${obj.prop.fees.world.value
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`) || <></>}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Сценарий:
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
          {writers.map((name, index) => (
            <span key={index}>
              {name}{index < writers.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Премьера (мир):
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
          {(obj.prop.premiere) ? new Date(`${obj.prop.premiere.world}`).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }) : <></>}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Продюсер:
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
          {producers.map((name, index) => (
            <span key={index}>
              {name}{index < producers.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Премьера (РФ):
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
        {(obj.prop.premiere) ? new Date(`${obj.prop.premiere.russia}`).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }) : <></>}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Оператор:
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
          {operators.map((name, index) => (
            <span key={index}>
              {name}{index < operators.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Возраст:
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
        {(obj.prop.ageRating) ? obj.prop.ageRating + "+" : <></>}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Композитор:
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
          {composers.map((name, index) => (
            <span key={index}>
              {name}{index < composers.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="main-content-movie_info-main-table_info-row">
        <div className="main-content-movie_info-main-table_info-row-cell1">
          Время:
        </div>
        <div className="main-content-movie_info-main-table_info-row-cell2">
        {`${obj.prop.movieLength} мин. / 0${Math.floor(obj.prop.movieLength / 60)}:${obj.prop.movieLength % 60}`}
        </div>
      </div>
    </div>
  );
}

export default TableInfo;
