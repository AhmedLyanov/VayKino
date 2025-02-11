import MovieCard from "../../../../Components/MovieCard/MovieCard";
import { PaginationArrows } from "../../../../Components/PaginationArrows/PaginationArrows";
import "./style.css";
import { useState, useRef, useEffect } from "react";

export const Similars = (obj) => {
  const similars = obj.prop;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageTransform, setCurrentPageTransform] = useState(0);
  const itemsPerPage = 4;
  const endIndex = currentPage * itemsPerPage;
  const ref = useRef(null);
  const [elWidth, setElWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setElWidth(rect.width);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [elWidth]);

  return (
    <div className="similars-cont">
      <div className="similars-header">Похожие фильмы</div>
      <div className="similars-main">
        <div
          className="similars-cards"
          ref={ref}
          style={{ transform: `translateX(-${currentPageTransform}px)` }}
        >
          {similars.slice(0, endIndex).map((el, index) => (
            <MovieCard
              key={index}
              prop={{
                rating: null,
                poster: el.posterUrl,
                name: el.nameRu || el.nameEn,
                genres: null,
                relationType: el.relationType,
              }}
            />
          ))}
        </div>

        <div className="similars-pagination">
          <PaginationArrows
            data={similars}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            currentPageTransform={currentPageTransform}
            setCurrentPageTransform={setCurrentPageTransform}
            elWidth={elWidth}
          />
        </div>
      </div>
    </div>
  );
};
