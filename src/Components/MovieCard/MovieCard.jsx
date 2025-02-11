import { useNavigate } from "react-router-dom";
import "./style.css";

function MovieCard(obj) {
  const navigate = useNavigate();

  const colorScale = {
    1: { color: "#CC0000" },
    2: { color: "#CC3300" },
    3: { color: "#CC6600" },
    4: { color: "#CC9900" },
    5: { color: "#CCCC00" },
    6: { color: "#CCCC00" },
    7: { color: "#99CC00" },
    8: { color: "#66CC00" },
    9: { color: "#33CC00" },
    10: { color: "#00CC00" },
  };

  return (
    obj.prop ? <div className="movie-card" onClick={() => navigate("/MoviePage")}>
    <div className="movie-card-content">
      <div className="movie-card-img">
        {obj.prop.rating ? (
          <div
            className="movie-card-rating"
            style={{
              backgroundColor:
                colorScale[Math.ceil(Number(obj.prop.rating))]?.color,
            }}
          >
            {obj.prop.rating?.toFixed(2)}
          </div>
        ) : null}

        {obj.prop.relationType ? (
          <div className="movie-card-relationType">
            {obj?.prop?.relationType === "PREQUEL" ? "Приквел" : obj?.prop?.relationType === "SEQUEL" ? "Сиквел" : "Похожий"}
          </div>
        ) : null}
        <img
          src={obj.prop.poster}
          alt={obj.prop.name}
        />
      </div>
      <div className="movie-card-title">{obj.prop.name}</div>
      <div className="movie-card-genres">
        {obj.prop.genres?.map((genre, index) => (
          <span key={index}>
            {genre.name} {index < obj.prop.genres.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
    </div>
  </div> : <div className="movie-card" onClick={() => navigate("/MoviePage")}>
      <div className="movie-card-content">
        <div className="movie-card-img">
          <div style={{width: "100%", height: "100%", borderRadius: "10px"}} className="loading"></div>
        </div>
        <div className="movie-card-title"><div style={{width: "200px", height: "20px"}} className="loading"></div></div>
        <div className="movie-card-genres">
        <div style={{width: "150px", height: "20px"}} className="loading"></div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
