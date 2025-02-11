import "./style.css";
import BlockHeader from "../../../../Components/BlockHeader/BlockHeader";
import { useEffect, useState, useRef } from "react";
import KinoboxWidger from "./KinoboxWidget";

export const WatchMovie = (obj) => {
  const [movieURL, setMovieURL] = useState(true);
  const [errorMessage, setErrorMessage] = useState(
    "К сожалению данного фильма нету в API"
  );
  const id = obj.prop;

  // useEffect(() => {
  //   if (id !== undefined) {
  //     const fetchData = async (retries = 2) => {
  //       try {
  //         const response = await fetch(
  //           `https://api1650820663.bhcesh.me/list?token=3794a7638b5863cc60d7b2b9274fa32e&kinopoisk_id=${id}`
  //         );
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         const data = await response.json();
  //         console.log(data);
          

  //         if (
  //           data &&
  //           data.total &&
  //           data.total > 0 &&
  //           Array.isArray(data.results)
  //         ) {
  //           setMovieURL(data);
  //         } else if (retries > 0 && data && data.total === 0) {
  //           await new Promise((resolve) => setTimeout(resolve, 300));
  //           await fetchData(retries - 1);
  //         } else {
  //           setMovieURL(false);
  //           console.warn(
  //             "API returned unexpected data or no results after multiple attempts:",
  //             data
  //           );
  //         }
  //       } catch (error) {
  //         console.error("Error fetching data:", error);

  //         if (error.message === "Failed to fetch") {
  //           setErrorMessage("У вас проблемы с интернетом!");
  //         }
  //       }
  //     };

  //     fetchData();
  //   }
  // }, [id]);

  return (
    <div className="watch_movie-cont">
      <BlockHeader
        prop={{ title: "Смотреть онлайн", btnText: false, btnLink: false }}
      />
      <div className="watch_movie-main">
        {movieURL ? (
          // <iframe
          //   title={movieURL.results[0]?.name}
          //   src={movieURL.results[0]?.iframe_url}
          //   frameBorder="0"
          //   allowFullScreen
          // ></iframe>
          
          <KinoboxWidger kpId={id}/>
        ) : (
          <div
            style={{
              color: "white",
              width: "100%",
              height: "850px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <h1>{errorMessage}</h1>
          </div>
        )}
      </div>
    </div>
  );
};
