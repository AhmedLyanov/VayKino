import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./style.css";

const Rating = ({rating, label}) => {
  const colorScale = {
    1: { bright: "#FF0000", dull: "#FF00004D" },
    2: { bright: "#FF3300", dull: "#FF33004D" },
    3: { bright: "#FF6600", dull: "#FF66004D" },
    4: { bright: "#FF9900", dull: "#FF99004D" },
    5: { bright: "#FFCC00", dull: "#FFCC004D" },
    6: { bright: "#FFFF00", dull: "#FFFF004D" },
    7: { bright: "#CCFF00", dull: "#CCFF004D" },
    8: { bright: "#99FF00", dull: "#99FF004D" },
    9: { bright: "#66FF00", dull: "#66FF004D" },
    10: { bright: "#00FF00", dull: "#00FF004D" },
  };
  
  const ratingValue = Number(rating)

  return (
    <div className="rating-container">
      <div
        className="progress-bar-container"
        style={{ backgroundColor: colorScale[Math.ceil(ratingValue)].dull }}
      >
        <CircularProgressbar
          value={ratingValue * 10}
          text={ratingValue.toFixed(2)}
          styles={buildStyles({
            pathColor: colorScale[Math.ceil(ratingValue)].bright,
            textColor: "#FFFFFF",
            trailColor: "none",
            strokeLinecap: "butt",
          })}
        />
      </div>
      <div className="rating-text">{label}</div>
    </div>
  );
};

export default Rating;